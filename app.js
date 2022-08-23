require('dotenv').config()
const express=require("express")
const app=new express()
const {BookData, UserData}=require("./config/connection")
const bcrypt=require("bcrypt")
//middleware
app.set('view engine','ejs')
app.set('views','./src/views')
app.use(express.static('./public'))
app.use(express.urlencoded({extended:true}))
let bookdetail=[{
                bname:"the art of julia",
                author:"julia wendel",
                publisher:"cde",
                imag:"julia.jpg"
            },

                {
                    bname:"a long road to justice",
                    author:"abc",
                    publisher:"dmnj",
                    imag:"road.jfif"
    },

        {
            bname:"macbath",
            author:"shekspier",
            publisher:"abc",
            imag:"macbath.png"

        }];




//routes
app.get("/",(req,res)=>{
    res.render('index')


})
app.get("/books",(req,res)=>{
    res.render('books',{bookdetail})
})


app.get("/books/add",(req,res)=>{

// let items= {
//     bookname:req.query.bookname,
//     author:req.query.author,
//     publisher:req.query.publisher,
//     Image:req.query.image
// }
console.log(items);
    let sample=BookData(items)
    sample.save((err)=>{
        if (err) throw err
        else{
            res.send('inserted')
        }
        

    })

})

app.get("/books/addbooks",(req,res)=>{
        res.render('addbooks')
})
app.get('/signup',(req,res)=>{
    res.render('signup')
})  
app.post('/books/add',(req,res)=>{

    let data=new BookData({
    bookname:req.body.bookname,
    author:req.body.author,
    publisher:req.body.publisher,
    Image:req.body.image

    })

    data.save((err)=>{
        if(err)throw err
        else
        {
         res.redirect("/book")   
        }
    })
    
})





app.post('/signup',async(req,res)=>{
    let hashpassword=await bcrypt.hash(req.body.password)
    let data=new UserData({
    name:req.body.name,
    email:req.body.email,
    password:hashpassword
    

})



data.save((err)=>{
    if(err)throw err
    else
    {
     res.redirect("/login")   
    }
})

})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',(req,res)=>{
    let User={
        email:req.body.email,
        password:req.body.password
    }
    UserData.findOne({email:User.email}).then((data)=>{
        bcrypt.compare(User.password,data.password,(err,result)=>{
            if(err){
                console.log(err);
                res.redirect("/login")
            }
            else{
                res.redirect("/books")
            }
        })
        
    })
    .catch((err)=>{
        console.log("err");
        res.redirect("/signup")
    })
})
app.get("/books/:id",(req,res)=>{
    let i=req.params.id;
    res.render('data',{bookdetail,i})
})

app.listen(8000)
