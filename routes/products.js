const express = require('express');
const connection = require('../connection');
const router = express.Router();

//creating a product
router.post('/create', (req, res) => {
  let product = req.body;
  let { name, description, price } = product;

  let sql = 'INSERT INTO product (name, description, price) VALUES (?, ?, ?)';
  connection.query(sql, [name, description, price], (error, results) => {
    if (!error) {
      return res.status(200).json({ message: 'Product created successfully' });
    } else {
      return res.status(400).json(error);
    }
  });
});

//getting all products
router.get('/read', (req, res)=>{
    let sql='select * from product'
    connection.query(sql,(err, results)=>{
        if(!err){
            return res.status(200).json(results)
        }else{
            return res.status(400).json(err)
        }
    })
})
//getting a single product with its id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    let sql = 'SELECT * FROM product WHERE id=?';
    connection.query(sql, [id], (err, results) => {
      if (!err) {
        if (results.length === 0) {
          return res.status(404).json({ message: 'Product ID not found' });
        }
        const product = results[0];
        return res.status(200).json(product);
      } else {
        return res.status(400).json(err);
      }
    });
  });
  
  //updating a product
router.patch('/update/:id', (req, res, next) => {
    const id = req.params.id;
    let product = req.body;
    let sql = 'UPDATE product SET name=?, description=?, price=? WHERE id=?';
    connection.query(sql, [product.name, product.description, product.price, id], (err, results) => {
      if (!err) {
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Product ID not found' });
        }
        return res.status(200).json({ message: 'Product updated successfully' });
      } else {
        return res.status(400).json(err);
      }
    });
  });

  //deleting a product
  router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    let sql = 'DELETE FROM product WHERE id=?';
    connection.query(sql, [id], (err, results) => {
      if (!err) {
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Product ID not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });
      } else {
        return res.status(400).json(err);
      }
    });
  });
  
  //deleting all products
  router.delete('/', (req, res, next) => {
    let sql = 'DELETE FROM product';
    connection.query(sql, (err, results) => {
      if (!err) {
        return res.status(200).json({ message: 'All products deleted successfully' });
      } else {
        return res.status(400).json(err);
      }
    });
  });
  
  

module.exports = router;
