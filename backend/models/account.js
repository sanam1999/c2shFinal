const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['withdrawal', 'deposit'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  purpose: {
    type: String
  }
}, { _id: false });

const clubAccountSchema = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0
  },
  transactions: {
    type: [transactionSchema], // Array of transactions
    default: []
  }
}, { timestamps: true });

// Add a method to update the balance and save transactions
clubAccountSchema.methods.addTransaction = function(type, amount, purpose) {
  const transaction = { type, amount, date: Date.now(), purpose };

  // Update the balance based on the transaction type
  if (type === 'deposit') {
    this.balance += amount;
  } else if (type === 'withdrawal') {
    this.balance -= amount;
  }

  // Add the transaction to the transactions array
  this.transactions.push(transaction);

  // Save the updated account
  return this.save();
};

module.exports = mongoose.model('Account', clubAccountSchema);
