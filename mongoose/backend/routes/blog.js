import express from "express";

import {BlogModel} from "../schema/blog.js";

const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
  const allDeBlogs = await BlogModel.find({});

  return res.send(allDeBlogs.map((blog) => blog.toObject()));
  }
  catch (err) {
    console.log(err);
  }
});

const realPassword = "1234";

router.post("/create-post", async (req, res) => {
try{
  const hisInput = req.body;

  if (hisInput.password !== realPassword) {
    alert("Good luck getting the password. It's not that easy.");
    return res.send({ error: "Wrong password" }, 40)
  }
 
  const newBlogPost = new BlogModel({
    content: hisInput.content, 
    title: hisInput.title});

  await newBlogPost.save();
  
  res.status(200).json({message: "Post has been created"});
  return res.send(blog.toObject());
}
catch (err) {
  console.log(err);
}
});

router.post("/delete-post", async (req, res) => {
  try {
  const body = req.body;
  await BlogModel.deleteOne({ title: body.title });
  const blogs = await BlogModel.find({});
  return res.send(blogs.map((blog) => blog.toObject()));
  }
  catch (err) {
    console.log(err);
  }
});

router.post("/edit-post", async (req, res) => {
  try {
  const body = req.body;

  if (body.password !== realPassword) {
    alert("Good luck getting the password. It's not that easy.");
    return res.send({ error: "Wrong password" }, 40)
  }

  const newBlogPost = await BlogModel.findOne({
    title: body.oldTitle
  });
  newBlogPost.title = body.title;
  newBlogPost.content = body.content;
  
  await newBlogPost.save();

  const blogs = await BlogModel.find({});

  res.status(200).json({message: "Post has been updated"});
  return res.send(blogs.map((blog) => blog.toObject()));
}
catch (err) {
  console.log(err);
}
});


export default router;
