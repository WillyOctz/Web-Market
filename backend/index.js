const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const { spawn } = require('child_process')
const bcrypt = require("bcrypt")
const multer = require("multer")
const path = require("path")
const fs = require('fs')
const Stripe = require("stripe")

const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use('/uploads', express.static('uploads'))

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: function (req, file, cb) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only JPEG, PNG, and JPG images are allowed'), false);
        }
        cb(null, true);
    }
});

const PORT = process.env.PORT || 8080
//database mongodb
console.log(process.env.MONGODB_URL)
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Database Connected"))
.catch((err)=>console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstname : String,
    lastname : String,
    email : {
        type : String,
        unique : true,
    },
    password : String,
    confirmpassword : String,
    image: String,
})
//model
const userModel = mongoose.model("user", userSchema)

//api
app.get("/",(req,res) => {
    res.send("Server Is Running...")
})

//sign up backend
app.post("/Signup", async (req, res) => {
    try {
        //console.log(req.body);
        const { email,password } = req.body;

        // Use async/await with findOne
        const result = await userModel.findOne({ email: email });

        if (result) {
            res.send({ message: "Email is already taken!",alert : false });
        } else {

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password

            const data = new userModel({
                ...req.body,
                password: hashedPassword, // Replace the plain password with the hashed password
                confirmpassword: hashedPassword,
            });
            await data.save(); // Save the data
            
            res.send({message: "Sign Up Is Successful!",alert : true });
        }
    } catch (err) {
        console.error(err);
        console.log(err)
        res.status(500).send({message: "Sign Up Error!Check Your Internet Connection"});
    }
});

//login backend
app.post("/Login",async(req,res)=>{
    
    try {
       //console.log(req.body)
        const { email, password } = req.body
        
        const result = await userModel.findOne({ email: email });
        if (result) {
            const isPasswordValid = await bcrypt.compare(password, result.password);
            console.log("Password comparison result:", isPasswordValid);

            if (isPasswordValid) {
                
                const dataSend = {
                    _id: result._id,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    email: result.email,
                    image: result.image,
                };
                
                console.log(dataSend)
                res.send({ message: "Login Sucessfully!",alert : true, user : dataSend });
            }

            else {
                res.send({ message: "Incorrect Password!",alert : false })
            }
        }
        else {
            res.send({ message: "Email is taken or is not registered yet",alert : false });
        }
    }
    catch (err) {
        console.error(err);
        console.log(err)
        res.status(500).send({message: "Login Error!Check Your Internet Connection"});
    }
});

//fetching the user data to userprofile page
app.get("/Userprofile/:_id",async(req,res) => {
    
    try {
        const { _id } = req.params
        const user = await userModel.findById(_id)

        if (!user) {
            res.status(500).send({message: "User Not Found!"})
        }

        const userData = {
            _id : user._id,
            firstname : user.firstname,
            lastname : user.lastname,
            email : user.email,
            image : user.image || null
        }

        res.status(200).send({message: "User Profile Retrieved Succesfully", data : userData})
    }

    catch(err) {
        console.error(err)
        console.log(err)
        res.status(500).send({message: "Cannot get User Profile!Internet Connection Maybe Error!"})
    }
})

//updating the userprofile data from the userprofile page
app.put("/UpdateUserProfile/:_id", upload.single("image"), async(req,res) => {
       
    try {
        console.log("Request Body:", req.body); // Log the request body
        console.log("Request File:", req.file)

        const { _id } = req.params
        const { firstname, lastname, email, password, confirmpassword } = req.body
        
        let hashedPassword = null
        if (password) {
            if (password !== confirmpassword) {
                res.status(400).send({message : "Password Do Not Match!"})
            }
            const saltRounds = 10
            hashedPassword = await bcrypt.hash(password, saltRounds)
        }

        const updateData = {
            firstname,
            lastname,
            email,
            ...(hashedPassword && { password : hashedPassword, confirmpassword : hashedPassword}),
            ...(req.file && { image : `/uploads/${req.file.filename}` })
        }

        const updateduser = await userModel.findByIdAndUpdate(
            _id, 
            updateData,
            { new : true, runValidators : true }
        )

        if (!updateduser) {
            res.status(404).send({message: "User Not Found!"})
        }

        res.status(200).send({message: "User Profile Updated Successfully", data: updateduser})
    }

    catch(err) {
        console.log(err)
        res.status(500).send({message: "Error Occured When Updating Profile!"})
    }
})

//product backend
//schema for product
const Productschema = mongoose.Schema({
    
    name : String,
    categories : String,
    image : String,
    prices : String,
    description : String
    
})
//product model
const ProductModel = mongoose.model("products", Productschema)

//product POST data
app.post("/uploadProducts",async(req,res)=>{
    
    try {
        //console.log(req.body)
        const data = await ProductModel(req.body)

        const savedata = await data.save()
        res.send({message: "Product Info Is Uploaded!",alert : true });
    }
    catch (err) {
        console.error(err);
        console.log(err)
        res.status(500).send({message: "Product Upload Error!Check Your Internet Connection"});
    }
})

//getting data product to display
app.get("/products", async(req,res) => {

    try {
        const data = await ProductModel.find({})
        res.send(JSON.stringify(data))

    }
    catch (err) {
        console.error(err);
        console.log(err)
        res.status(500).send({message: "Product Fetch Error!Check Your Internet Connection"});
    }
})

//payment gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
app.post("/checkout-payment", async(req,res) => {
    //console.log(req.body)
    try {
        
        const params = {
            submit_type : 'pay',
            mode : 'payment',
            payment_method_types : ["card"],
            billing_address_collection : "auto",
            shipping_options : [{shipping_rate : "shr_1QoisaKtd9IP8qK5R2wOXXt0"}],
            
            line_items : req.body.map((item)=>{
                return {
                    price_data : {
                        currency : "usd",
                        product_data : {
                            name : item.name,
                            //images : [item.image]
                        },
                        unit_amount : Math.round(parseFloat(item.prices) * 100),
                    },

                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1,
                    },
                    quantity : item.qty,
                }
            }),
            
            success_url : `${process.env.FRONTEND_URL}/Success`,
            cancel_url : `${process.env.FRONTEND_URL}/Cancel`,
        }
        
        const session = await stripe.checkout.sessions.create(params)
        console.log(session)
        res.status(200).json(session.id)
    }

    catch(err) {
        console.error("Stripe Checkout Error:", err)
        res.status(500).send({message: "Error Occured With The Payment"})
    }
})

//machine learning gateway
app.listen(PORT,() => console.log("Server is running at port : " + PORT))