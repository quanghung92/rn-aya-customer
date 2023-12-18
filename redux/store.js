import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import clientInfo from './reducers/clientInfo'


const store = configureStore({
    reducer: {
        userReducer,
        clientInfo
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store