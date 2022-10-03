const mongoose=require('mongoose')
// const url="mongodb://localhost:27017/libraryapp"
const url=`mongodb+srv://soorya:${process.env.DATA}@cluster0.0pssj.mongodb.net/machinetest?retryWrites=true&w=majority`
mongoose.connect(url,()=>{
    console.log("database connected");
})
const productSchema=mongoose.Schema({
    productname:String,
    price:String,
    minimumquantity:Number,
    
})


const productData=mongoose.model("product",productSchema)


module.exports={productData}



