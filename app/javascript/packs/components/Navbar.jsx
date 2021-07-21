import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';
import { Nav } from 'react-bootstrap';

const Navbar = props => {
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/api/v1/auth");
      console.log(result);
      setAuthorized(result.data);
    };

    fetchData();
  }, []);

  return (
    <Nav as={Link} defaultActiveKey="/" className="flex-column">
      <Nav.Link as={NavLink} to='/' exact>Home</Nav.Link>
      <Nav.Link as={NavLink} to='events'>Events</Nav.Link>
      <Nav.Link as={NavLink} to="/tickets">Tickets</Nav.Link>
      { authorized && (
        <>
        <Nav.Link as={NavLink} to="/my-events">My Events</Nav.Link>
        <Nav.Link as={NavLink} to="/new">Create Event</Nav.Link>
        </>
      )}
    </Nav>
  )};

export default Navbar;