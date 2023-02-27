const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8080

const app = express()

const DataBaseUrl = process.env.MONGO_URI

const errorHandler = require('./middleware/errorHandler')

const Router = require('./routes/router')

const cors = require("cors");


// Initialize DB in same or diferenet file
const connectDB = () => {
    const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://tummetisairamkumar:Tsrk1234@cluster0.5ypbwfy.mongodb.net/mytodos?retryWrites=true&w=majority`
    mongoose.set('strictQuery', false);
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("DataBase Connection Established")
    })
    .catch((error) => {
        console.log(error)
    })
}
connectDB()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/api/todos',Router)
app.use(errorHandler)

app.use('/' , express.static('build'))



app.get('*', (req,res) => {
    console.log(path.resolve(__dirname , 'build', 'index.html'))

    res.sendFile(path.resolve(__dirname  , 'build', 'index.html'))
})

app.listen(PORT , () => {
    console.log("Server running on PORT : - " + PORT)
})