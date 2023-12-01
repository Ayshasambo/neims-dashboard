const express = require('express');
const router = express.Router();
const SingleProduct = require('../models/SingleProduct.js');
const Category = require('../models/Category.js');

router.post("/",  async (req, res) => {
    const {name, category}  = req.body;
    try{
        const populatedCategory = await Category.findById(category);

        const newSingleProduct = new SingleProduct({
            name,
            category:{
                id:populatedCategory._id,
                name:populatedCategory.name
            }
        })
     await newSingleProduct.save();
     res.json({ product: newSingleProduct});

    }catch(err) {
        console.error(err);
        res.status(500).send('Error creating product');
    }
});

// GET reports
router.get('/', async (req, res) => {
    try {
      const singleProduct = await SingleProduct.find().sort({ createdAt: -1 });
      res.status(200).json(singleProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  });


// GET a single product
router.get('/:id', async (req, res) => {
    try {
      const singleProduct = await SingleProduct.findById(req.params.id);
      if (!singleProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(singleProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  //UPDATE products
 router.put('/:id',  async (req, res) =>{
    try{
      const updateSingleProduct = await SingleProduct.updateOne(
        {_id: req.params.id}, 
        {$set: req.body}
      );
      res.json('Product Updated')
    }
    catch(err){ 
      res.json({message:err})
    }
  });

  // DELETE a product
router.delete('/:id', async (req, res) => {
    try {
      const deletedSingleProduct = await SingleProduct.findByIdAndDelete(req.params.id);
      if (!deletedSingleProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



module.exports = router;