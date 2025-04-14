import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
    setUserPosts(storedPosts);
  }, []);

  return (
    <div className="container mt-2">
      <h2 className='text-center'>Your Posts</h2>
      <div className="row">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post.id} className="col-md-4">
              <BlogCard title={post.title} description={post.description} image={post.image} />
            </div>
          ))
        ) : (
          <p className='text-center'>No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
