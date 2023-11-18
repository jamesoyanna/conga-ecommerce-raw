import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import SearchIcon from '../assets/search-con.png';

interface Props {}

const SearchBox = (props: Props) => {
  const [keyword, setKeyword] = useState<string>("");
  const { push } = useHistory();

  const buttonStyle = {
    background: "#fba100",
    borderRadius: "0 3px 3px 0", 
    height: "100%", 
  };

  const inputStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "3px 0 0 3px", 
    height: "40px", 
    width: "370px",   
  };

  const imageStyle = {
    width: "20px", // Adjust the width as needed
    height: "20px", 
    filter: "brightness(0) invert(1)", // Make the image white
  };

  /**
   * Search for a keyword
   */
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      push(`/search/${keyword}`);
    } else {
      push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products, brands & categories..."
        style={inputStyle}
        data-testid="search-box"
      ></Form.Control>
    <Button style={buttonStyle} type="submit" className="p-2">
    <img src={SearchIcon} alt="search icon" style={imageStyle} />
      </Button>
    </Form>
  );
};

export default SearchBox;
