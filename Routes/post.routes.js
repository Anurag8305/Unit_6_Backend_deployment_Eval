const express=require("express");
const { PostModel } = require("../Model/Post.model");
const postRouter=express.Router();


//get
postRouter.get("/", async(req,res)=>{
    const device1=req.query
    const device2=req.query
    const post=await PostModel.find();
    res.send(post)
})

//get bu user id
postRouter.get("/posts", async(req,res)=>{
    const userID_making_req=req.body.userID;
    const post=await PostModel.find({userID:userID_making_req});
    res.send(post)
})

//create post
postRouter.post("/create",async(req,res)=>{
    const payload=req.body
    const post=new PostModel(payload);
    await post.save();
    res.send({"msg":"Post has been made"})
})

//update post
postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const id=req.params.id;
    const post=await PostModel.findOne({_id:id})
    const userID_in_post=post.userID
    const userID_making_req=req.body.userID;
    console.log(userID_in_post,userID_making_req);
    try {
        if(userID_in_post!==userID_making_req) res.send({"msg":"You are not Authorized"})
        else{
            await PostModel.findByIdAndUpdate({_id:id},payload)
            res.send({"msg":`Post ${id} has been updated`})
        }
    } catch (err) {
        console.log(err)
        res.send({"msg":"Something is wrong"})
    }
})

//delete post
postRouter.delete("/delete/:id",async(req,res)=>{

    const id=req.params.id;
    const post=await PostModel.findOne({_id:id})
    const userID_in_post=post.userID
    const userID_making_req=req.body.userID;
    console.log(userID_in_post,userID_making_req);
    try {
        if(userID_in_post!==userID_making_req) res.send({"msg":"You are not Authorized"})
        else{
            await PostModel.findByIdAndDelete({_id:id},)
            res.send({"msg":`Post ${id} has been deleted`})
        }
    } catch (err) {
        console.log(err)
        res.send({"msg":"Something is wrong"})
    }
})



module.exports={postRouter}