const express = require("express")
const  cors = require("cors")
const menuManageModel = require('./models/menu.model')
const app = express()

app.use(cors())
app.use(express.json())

app.post("/menu", async (req, res) => {
    const { item_name, price, discount_Price, image } = req.body;

    const menuItemCreate = await menuManageModel.create({
      item_name,
      price,
      discount_Price,
      image
    });

    
    res.status(201).json({
        message: "Menu Item is created",
        menuItemCreate
    })
})

app.get("/menu",async (req, res) => {

    const menuItemFetch = await menuManageModel.find();
    
    res.status(200).json({
        message: "Your Order sir",
        menuItemFetch
    })
})

app.delete("/menu/:_id",async (req, res) => {
    const { _id } = req.params

    const menuItemDelete = await menuManageModel.deleteOne({
        _id
    })
    
    res.status(200).json({
        message: "menu item is delete",
        menuItemDelete
    })
})

app.patch("/menu/:_id",async (req, res) => {
    const { _id } = req.params
    const { item_name } = req.body
    const {price}=req.body

    const menuItemUpdate = await menuManageModel.updateOne(
      { _id },
      { $set: { item_name,price } },
    );
    
    res.status(200).json({
        message:"Menu Item IS updated"
    })
})

module.exports=app