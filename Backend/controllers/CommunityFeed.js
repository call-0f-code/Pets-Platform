// const cloudinary = require('../config/cloudinary');


// async function handleCreatePost(req, res) {
//     try{
//         const userId = req.user.id;
//         console.log("Controller hits.")
//         const { content, location } = req.body;
//         const result = await new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream(
//                 { folder: 'posts' },
//                 (error, result) => {
//                     if(error) reject(error);
//                     else resolve(result);
//                 }
//             );
//             stream.end(req.file.buffer)
//         });

//         console.log("Cloudinary Url: ", result.secure_url);
//         res.send("Image uploaded successfully");

//     }catch(error){
//         console.log(error);
//         res.status(500).send("Error Uploading");
//     }
// }

// module.exports = {
//     handleCreatePost
// }

// controllers/CommunityFeed.js

import cloudinary from '../config/cloudinary.js';
import CommunityFeed from '../models/CommunityFeed.js';

export const handleCreatePost = async (req, res) => {
  try {

    const userId = "64abc1234567890abcdef123";
    // const userId = req.user.id; //--------------------------------------------------------------------

    // if (!req.user) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    const { content, location } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    
    const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'posts' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        stream.end(req.file.buffer);
    });

    const newPost = await CommunityFeed.create({
      author_id: userId,
      content,
      images: [{ url: result.secure_url }],
      location: { name: location },
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error Uploading" });
  }
};


export const getAllPosts = async (req, res) => {
  try{
    const posts = await CommunityFeed
      .find()
      .populate("author_id", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  }catch(error){
    console.log(error);
    res.send(500).json({ message: "Error fetching posts" })
  }
}

export const handleLike = async (req, res) => {
  try{
    const { postId } = req.params;
    const userId = "64abc1234567890abcdef123"
    // const userId = req.user.id; //---------------------------------------

    const post = await CommunityFeed.findById(postId);
    if(!post){
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(userId); //-------------------------------
    if(alreadyLiked){
      post.likes = post.likes.filter((id) => id.toString() !== userId); // -----------------
      post.like_count -=1;
    }else{
      post.likes.push(userId); //----------------------------------------
      post.like_count += 1;
    }

    await post.save();
    res.status(200).json(post);
  }catch(error){
    console.log(error);
    res.status(500).json({ message: "Error liking post "})
  }
}

export const handleDelete = async (req, res) => {
  try{
    const { postId } = req. params;
    const userId = "64abc1234567890abcdef123";
    // const userId = req.user.id; //---------------------------------------

    const post = await CommunityFeed.findById(postId);
    if(!post){
      return res.status(404).json({ message: "Post not found" });
    }

    if(post.author_id.toString() !== userId){
      return res.status(403).json({ message: "You cannot delete this post." })
    }else{
      await CommunityFeed.findByIdAndDelete(postId);
      return res.status(200).json({ message: "Post deleted" });
    }
  }catch(error){
    console.log(error);
    res.status(500).json({ message: "Error deleting post" });
  }

}