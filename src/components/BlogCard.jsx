import React from "react";
import { Card, Button } from "react-bootstrap";

const BlogCard = ({ title, description, image, url }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" href={url} target="_blank">
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
