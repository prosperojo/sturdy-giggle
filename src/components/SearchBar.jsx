import React from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import '../css/SearchBar.css';

const SearchBar = ({ setSearchQuery}) => {
  const handleSearch = (e) => {
    console.log("Search Input:", e.target.value); // Debugging
    setSearchQuery(e.target.value.toLowerCase());
  }
    return (
      <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search blogs..."
        className="me-2"
        onChange={handleSearch}
      />
    </Form>
    )
}
export default SearchBar