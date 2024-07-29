const express = require('express')
const app = express();
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

const Transactions = require('./schemas/transactions')

dotEnv.config()
const PORT = process.env.PORT || 8000
app.use(express.json())
app.use(cors())
let current_balance = 0

mongoose.connect(process.env.mango_Url)
.then(() => {
   console.log("Mongodb Connected Successfully!")       
})
.catch((error) => {
    console.log('Error',error)      
})

app.listen(PORT, () => {
    console.log(`Server is running at localhost ${PORT}`)       
 })
 app.get('/', (req,res) => {
    res.send(`<h1>Hello Ramesh`)       
 })

app.post('/add-tranaction', async (req,res) => {
   const con = req.body;
   console.log(con)
   const {date,description,transaction_type,balance,cure} = con
   if (transaction_type === 'credit'){
      current_balance =  current_balance + balance
   } else if (transaction_type === 'debit'){
      current_balance =  current_balance - balance
   }
   console.log(current_balance)
   try {
     const newdata = new Transactions({date,description,transaction_type,balance,current_balance})
     await newdata.save();
     res.status(201).json(newdata)
   } catch (error) {
    console.log(error.message)
   }
})

app.get('/transactions', async (req,res) => {
    try {
        const allData = await Transactions.find();
        return res.json(allData) ;  
    } catch (error) {
       console.log(error.message)    
    }       
 })



