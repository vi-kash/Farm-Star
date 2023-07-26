const express = require('express')
const app = express()
const mongoose= require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./config/keys')



mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahh")
})

mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


    app.use(express.static(__dirname+ '/client/build/static/'))
    const path= require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })

app.listen(process.env.PORT || PORT,()=>{
    console.log("server is running",PORT)
})