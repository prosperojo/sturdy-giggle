import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import UserPosts from '../components/UserPosts';
import Spinners from '../components/Spinner';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('userPosts')) || [];
    setUserPosts(storedPosts);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Title and description are required');
      return;
    }

    const newPost = { title, description, image, id: Date.now() };
    const updatedPosts = [newPost, ...userPosts];

    setUserPosts(updatedPosts);
    localStorage.setItem('userPosts', JSON.stringify(updatedPosts));

    setTitle('');
    setDescription('');
    setImage(null);
    alert('Post saved successfully!');
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = userPosts.filter(post => post.id !== postId);
    setUserPosts(updatedPosts);
    localStorage.setItem('userPosts', JSON.stringify(updatedPosts));
  };

  return (
    <>
      <Container className='mt-3'>
        <h2 className="text-center mb-4">Create your own Blog</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="postTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
            />
          </Form.Group>

          <Form.Group controlId="postDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter post description & Link"
            />
          </Form.Group>

          <Form.Group controlId="postImage" className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
          </Form.Group>

          {image && <img src={image} alt="Preview" className="img-fluid my-3" style={{ maxHeight: '300px' }} />}

          <Button type="submit" variant="primary" className='mb-3'>Save Post</Button>
        </Form>

        { }
        <div className="row">
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div className="col-md-4" key={post.id}>
                <div className="card mb-3">
                  {post.image && <img src={post.image} alt={post.title} className="card-img-top" />}
                  <div className="card-body">
                    <h4 className="card-title">{post.title}</h4>
                    <p className="card-text">{post.description}</p>
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : <UserPosts />}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default CreatePost;
