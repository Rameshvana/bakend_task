const mongoose = require('mongoose');

const transaction_schem = mongoose.Schema({
    date: {type: String, required: true,},
    description: {type: String, required: true,},
    transaction_type: {type: String, required: true,},
    balance: {type: String, required: true},
    current_balance: {type: String, required: true}


})

module.exports = mongoose.model('Transactions',transaction_schem)