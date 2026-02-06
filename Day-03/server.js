const app = require("./src/app")

app.get("/",(req,res)=>{
    res.send("hello Day-03 server started")
})

app.listen(3000,()=>{
    console.log("server has started on port 3000")
})