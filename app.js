const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path')
const app = express();
const Blog = require('./models/Blog')

//connect DB

mongoose.connect('mongodb://127.0.0.1:27017/cleanBlog-test-db');


app.set("view engine","ejs");

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


const port = 3000;

app.get("/",async(req,res) => {
    const blogs = await Blog.find({})
    res.render("index", {
        blogs
    })
})

app.get("/blogs/:id",async(req,res) => {
    const blog = await Blog.findById(req.params.id)
    res.render("post",{
        blog
    })
    //res.render("add_post")
})
app.get("/about",(req,res) => {

    res.render("about")
})
app.get("/add_post",(req,res) => {

    res.render("add_post")
})

app.post("/blogs",async(req,res) => {

    await Blog.create(req.body);
    res.redirect('/');
})


app.listen(port, ()=>{
    console.log(port+"...");
})