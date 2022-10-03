const router= require('express').Router()
const {productData}=require('../../config/connection')

router.get('/',(req,res) => {
    res.send('connected')
})

router.post('/create',(req,res)=>{
console.log(req.body);
})




module.exports=router
