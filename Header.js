import React from "react";
import { Navbar, Container, Nav, NavDropdown, Table, NavLink } from "react-bootstrap";
import { Link } from 'react-router-dom';
import logo from './img/Icon.png';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DLT } from "./redux/actions/action";
function Header(props) {
    const getdata = useSelector((state) => state.cartreducer.carts);
    // console.log(getdata);
    const dispatch = useDispatch();
    const [price, setPrice] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dlt = (id) => {
        dispatch(DLT(id))
    }
    const total = () => {
        let price = 0;
        getdata.map((ele, p) => {
            price = ele.price * ele.qnty + price;
        })
        setPrice(price);
    }
    useEffect(()=>{
        total();
    },[total])
    return (
        <>
            <Navbar data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/"><img
                        src={logo}
                        alt="Logo"
                        width="100"
                        height="50"
                        className="d-inline-block align-top"
                    /></Navbar.Brand>
                    <Nav className="me-auto nav_bar_wrapper">
                        {/* <Link to='/'>Home</Link> */}
                        <Link to='/about'>About</Link>
                        <Link to='/register'>Register</Link>
                        <Link to='/cards'>Cards</Link>

                        {
                            props.user ? (
                                <>
                                    <Link to='/crud'>User Information</Link>
                                    {/* <Link to="/welcome">Welcome</Link> */}
                                    <Link to="/product">Product</Link>
                                    <Link to='/list'>List</Link>
                                </>
                            ) : ""
                        }
                    </Nav>

                    <NavDropdown title="Action" id="basic-nav-dropdown">
                        <NavDropdown.Item> <Link to="/editprofile">Edit Profile</Link></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                            {
                                props.user ? <Link onClick={props.onLogout}>Logout</Link> : <Link to='/login'>Login</Link>
                            }
                        </NavDropdown.Item>
                    </NavDropdown>

                    <Badge badgeContent={getdata.length} color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i className="fa fa-shopping-cart" style={{ fontSize: "35px" }}></i>
                    </Badge>

                </Container>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        getdata.length ?
                            <div className="card_details" style={{ width: "24rem", padding: "10px" }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Restaurant Name</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            getdata.map((e, i) => {
                                                return (
                                                    <>
                                                        <tr key={e.id}>
                                                            <td>
                                                                {/* <NavLink to={'/cards/' + e.id} */}
                                                                <Link to={`/cards/${e.id}`} onClick={handleClose}>
                                                                    <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" />
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <p>{e.rname}</p>
                                                                <p>Price: {e.price}</p>
                                                                <p>Quantity: {e.qnty}</p>
                                                                <p style={{ color: "red", fontSize: "20px", cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                                                    <i className="fas fa-trash smalltrash"></i>
                                                                </p>
                                                            </td>
                                                            <td className="mt-5" style={{ color: "red", fontSize: "20px", cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                                                <i className="fas fa-trash largetrash"></i>

                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <p className="text-center">Total: {price}</p>
                                    </tbody>
                                </Table>
                            </div> :
                            <div className="cards_details d-flex justify-content-center align-items-center" style={{ width: "24rem", padding: "10px", position: "relative" }}>
                                <i className="fa fa-close smallclose" style={{ position: "absolute", top: '2px', right: '20px', fontSize: "23", cursor: 'pointer' }}></i>
                                <p style={{ fontSize: "25px" }}>Your Cart is empty</p>
                                <img src="./cart.gif" alt="image" className="emptycart_img" style={{ width: "5rem", padding: "10px" }} />
                            </div>
                    }

                </Menu>
            </Navbar>

        </>
    )
}
export default Header;