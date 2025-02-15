import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice.js'
import productSlideReducer from './productSlide.js'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key : 'root',
    storage,
    whitelist : ['user']
}

const persisedUserReducer = persistReducer(persistConfig, userSliceReducer)

export const store = configureStore({
    reducer: {
        user : persisedUserReducer, 
        products : productSlideReducer
        
    },
})
export const persistor = persistStore(store)