import React from 'react'
import DashboardNav from '../components/Dashboard/DashboardNav'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/CommunityFeed/CreatePostPage.css'

const CreatePostPage = () => {
  const navigate = useNavigate();
  
  const [imgFile, setImgFile] = useState(null);
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", imgFile);
    formData.append("content", content);
    formData.append("location", location);

    console.log("Submitting form...")
    await fetch('http://localhost:5000/api/community/create-posts', {
      method: "POST",
      body: formData
    });
    navigate("/community-feed")
  }

  
  return (
    <div className="create-post-page">
      <DashboardNav />
      <div className="create-post">
        <form action="" onSubmit={handleSubmit}>

          Select Images: 
          <input 
            type="file"
            onChange={(e) => setImgFile(e.target.files[0])}
          /><br />

          Add Captions: 
          <textarea  
            placeholder="Enter captions"
            value={content}
            onChange={(e) => setContent(e.target.value)} 
          /><br />

          Add Location: 
          <textarea 
            placeholder="Enter location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          /><br />

          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePostPage
