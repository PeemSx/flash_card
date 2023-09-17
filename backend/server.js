const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const app = express();
const cors = require('cors')
const PORT = 3222;
app.use(express.json())
//routes
app.use(cors({
    origin: '*',
  }));
app.use(express.static("public"));

app.get('/',(req,res) =>{

    res.send(({message:"Hello bro"}))


})

app.get('/test',(req,res) =>{
    
    res.send('Hello TEst')

})

// ---------------- Get section ---------------
app.get('/products',async(req,res) => {

    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message})
    }

})

app.get('/products/id/:id',async(req,res) => {

    try{
        const {id} = req.params;     
        const products = await Product.findById(id);
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message})
    }

})

app.get('/products/name/:name',async(req,res) => {

    try{
        const name = req.params.name;     
        const products = await Product.find({name});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message})
    }

})

//--------------- Post------------------------

app.post('/products/post', async(req,res) =>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)

    }catch(error){

        console.log(error.message);
        res.status(500).json({message: error.message});

    }

})

// --------------- Put / update ------------------------


app.put('/products/id/:id',async(req,res) =>{
    try{
        const {id} = req.params;     
        const products = await Product.findByIdAndUpdate(id, req.body);
        if(!products){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }

        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message})
    }

})
// append words and definitions;

app.put('/products/name/:name',async(req,res) =>{
    try{
        const {name} = req.params;     
        const {word, definition} = req.body;
        const products = await Product.findOneAndUpdate({name:name}, {$push:{words : word,definitions : definition}});
        if(!products){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//remove words

app.put('/products/name/:name/remove',async(req,res) =>{
    try{
        const {name} = req.params;     
        const {word, definition} = req.body;
        const products = await Product.findOneAndUpdate({name:name}, {$pull:{words : word,definitions : definition}});
        if(!products){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

/*---------- delete ----------------*/

app.delete('/products/name/:name', async(req,res) =>{
    try{
        const name = req.params.name;
        const products = await Product.deleteMany({name:name});
       
        if(products.deletedCount === 0){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        
        return res.status(200).json({ message: 'Products deleted successfully.' });
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

/*-------------- bottom --------------*/
app.listen(PORT, "0.0.0.0", () => {
    console.log(`API ready at http://localhost:${PORT}`);
  });
  

mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://cedtDB:1234@cedtdb.io27xix.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log(`connected to MongoDB`)

}).catch((error) => {

    console.log(error)

})