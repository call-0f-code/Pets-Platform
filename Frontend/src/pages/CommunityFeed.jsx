import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import profilePic from '../assets/images/Dashboard/CommunityFeed_PP.png'
import '../components/CommunityFeed/CommunityFeed.css'
import DashboardNav from '../components/Dashboard/DashboardNav';

const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const res = await fetch("http://localhost:5000/api/community/posts");
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      }catch(error){
        console.log(error);
      }
    };
    fetchPosts();
  }, [])

  if(loading){
    return <p>Loading Posts...;</p>
  }

  const handleLike = async (postId) => {
    try{
      const res = await fetch(`http://localhost:5000/api/community/like/${postId}`,{
          method: "POST",
        });
      const updatedPost = await res.json();
      setPosts((prevPosts) => 
        prevPosts.map((post) => 
        post._id === postId ? updatedPost : post
      ));
    }catch(error){
      console.log(error);
    }
  };

  const handleDelete = async (postId) => {
    try{
      const res = await fetch(`http://localhost:5000/api/community/delete/${postId}`,{
        method: "DELETE"
      });

      setPosts((prevPosts) => 
        prevPosts.filter((post) => post._id !== postId)
      );

    }catch(error){
      console.log(error);
    }
  }

  return (
    <div>
      <DashboardNav />
      <div className="feed-container">
        {posts.length === 0 ? ( <p className="No-posts">No posts yet</p> ) :
        (posts.map((post) => (
          <div key={post._id} className="post-card" >

            <div className="post-header">
              <div className="user-info">
                <img src={profilePic} alt="Username" className="profile-pic" />
                <p className="username">{post.author_id?.name}</p>
              </div>

              <button className="delete-btn"
                onClick={() => handleDelete(post._id)}>
                🗑️
              </button>
            </div>

            <div className="post-location">
              <p>{post.location?.name}</p>
            </div>

            <img src={post.images?.[0]?.url} alt="post" />

            <div className="post-footer">

              <div className="like-section">
                <button 
                  className="like-btn"
                  onClick={() => handleLike(post._id)}>
                  ❤️
                </button>
                <p className="like-count">{post.like_count}</p>
              </div>

              <div className="caption">
                <p>{post.content}</p>
              </div>
            </div>
          </div>
          
        )))}
      </div>
    </div>
  )
}

export default CommunityFeed