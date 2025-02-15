async function ImagetoBase64(file) {
    
    if (!(file instanceof Blob)) {
        throw new Error("Input must be a Blob or File");
    }

    const reader = new FileReader();

    const data = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
    });

    reader.readAsDataURL(file);

    return data;
}

export {ImagetoBase64}