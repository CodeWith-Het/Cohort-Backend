const app = require("./src/app")

app.get("/",(req,res)=>{
    res.send("hello Day 04 server")
})

app.listen(3000,()=>{
    console.log("server started on port 3000")
})