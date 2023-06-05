const express=require('express')
const app=express();
const productRoute=require('./routes/products')
const connection=require('./connection')
const port=3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/product', productRoute)





app.listen(port, (req, res)=>{
    console.log(`listening on port ${port}`)
})
module.exports=app;