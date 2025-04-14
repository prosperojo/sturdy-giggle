import React, { useState, useEffect } from 'react'
import { Container, Button, Col, Row } from "react-bootstrap";
import BlogCard from '../components/BlogCard';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Spinners from '../components/Spinner';
import '../css/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const postsPerPage = 9;
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async (pageNum = 1, allPages = false) => {
    try {
      const response = await fetch(`https://dev.to/api/articles?page=${pageNum}&per_page=${postsPerPage}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const formattedBlogs = data.map((blog) => ({
        id: blog.id,
        title: blog.title,
        description: blog.description || blog.body_markdown.substring(0, 100) + "...",
        image: blog.cover_image || "/images/default-blog.jpg",
        url: blog.url,
      }));

      if (allPages) {
        setBlogs(prevBlogs => [...prevBlogs, ...formattedBlogs]);
      } else {
        setBlogs(formattedBlogs);
      }
      setTotalPages(7);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }

  };

  useEffect(() => {
    if (!isSearching) {
      fetchBlogs(page);
    }
  }, [page, isSearching]);

  const handleSearch = async (query) => {
    setSearchQuery(query.toLowerCase());
    setIsSearching(true);
    setPage(1);
    setBlogs([]);

    for (let i = 1; i <= 7; i++) {
      await fetchBlogs(i, true);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery) ||
    blog.description.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <div className="hero">
        <div className="hero-overlay"></div>
        <Container className="hero-content">
          <Container className='mt-4'>
            <SearchBar setSearchQuery={handleSearch} />
          </Container>
          <h1 className="text-light fw-bold mx-auto text-wrap">Read, Publish and Inspire Effortlessly</h1>
          <div className='subheader-text mx-auto'>
            <p className="text-light fw-normal text-wrap">
            Fresh perspectives, technical deep dives, and community conversations on latest development topics.
            </p>
          </div>
          <Button as={Link} to='/SignUp' variant="primary" className="mt-3">Get Started</Button>
        </Container>
      </div>
      <Container className="mt-3">
        <h2 className="text-center mb-4">Recent Blogs</h2>

        {}
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <Spinners />
          </div>
        ) : (
          <>
            <Row>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <Col key={blog.id} md={4}>
                    <BlogCard
                      title={blog.title}
                      description={blog.description}
                      image={blog.image}
                      url={blog.url}
                    />
                  </Col>
                ))
              ) : (
                <p className="text-center">No blogs found.</p>
              )}
            </Row>

            {!isSearching && (
              <div className="d-flex justify-content-center mt-4">
                <Button
                  variant="secondary"
                  className="me-2"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}>Previous
                </Button>
                <span className="fw-bold mx-3">Page {page} of {totalPages}</span>
                <Button
                  variant="secondary"
                  disabled={page >= totalPages}
                  onClick={() => setPage((prev) => prev + 1)}>Next
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  )
}

export default Home;
