import { createContext, useState, useEffect } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const API_KEY = "gWY3wLf1jN7fDo3zevE7EARA";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://dev.to/api/articles?per_page=5", {
          headers: { "api-key": API_KEY },
        });

        const data = await response.json();
        const formattedBlogs = data.map((blog) => ({
          id: blog.id,
          title: blog.title,
          description: blog.description || blog.body_markdown.substring(0, 100) + "...",
          image: blog.cover_image || "/images/default-blog.jpg",
          url: blog.url,
        }));

        setBlogs(formattedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
