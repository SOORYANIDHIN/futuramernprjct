const mongoose=require('mongoose')
// const url="mongodb://localhost:27017/libraryapp"
const url=`mongodb+srv://soorya:${process.env.DATA}@cluster0.0pssj.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url,()=>{
    console.log("database connected");
})
const bookSchema=mongoose.Schema({
    bookname:String,
    author:String,
    publisher:String,
    Image:String
})
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    
})

const BookData=mongoose.model("data",bookSchema)
const UserData=mongoose.model("userdetails",userSchema)

module.exports={BookData,UserData}



