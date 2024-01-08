const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a transaction
router.post('/', async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    const newTransaction = new Transaction({ description, amount, type });
    await newTransaction.save();
    res.json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a report
router.delete('/:id', async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





// Delete a transaction
// router.delete('/:id', async (req, res) => {
//   try {
//     const transaction = await Transaction.findById(req.params.id);
//     if (!transaction) {
//       return res.status(404).json({ error: 'Transaction not found' });
//     }
//     await transaction.remove();
//     res.json({ message: 'Transaction deleted' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

module.exports = router;