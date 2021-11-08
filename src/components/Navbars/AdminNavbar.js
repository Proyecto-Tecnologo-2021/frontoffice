import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Button, Col, Container, Nav, Navbar} from "react-bootstrap";

import routes from "routes.js";
import Swal from "sweetalert2";
import {logOut} from "../SessionService";

import {useSelector} from "react-redux";
import OrderProgress from "./OrderProgress";

function Header({}) {
    const [cartCount, setCartCount] = useState(0)
    const location = useLocation();

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;

    const mobileSidebarToggle = (e) => {
        e.preventDefault();
        document.documentElement.classList.toggle("nav-open");
        var node = document.createElement("div");
        node.id = "bodyClick";
        node.onclick = function () {
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle("nav-open");
        };
        document.body.appendChild(node);
    };

    const getBrandText = () => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "Appetit";
    };

    useEffect(() => {
        let count = 0
        cartItems.forEach(item => {
            count += item.qty;
        });

        setCartCount(count);

    }, [cartItems, cartCount])

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Col md="1">
                    <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
                        <Button
                            variant="dark"
                            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
                            onClick={mobileSidebarToggle}
                        >
                            <i className="fas fa-ellipsis-v"></i>
                        </Button>
                        <Navbar.Brand
                            href="#home"
                            onClick={(e) => e.preventDefault()}
                            className="mr-2"
                        >
                            {getBrandText()}
                        </Navbar.Brand>
                    </div>
                </Col>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
                    <span className="navbar-toggler-bar burger-lines"></span>
                    <span className="navbar-toggler-bar burger-lines"></span>
                    <span className="navbar-toggler-bar burger-lines"></span>
                </Navbar.Toggle>
                <Col md="10">
                    <OrderProgress/>
                </Col>
                <Col md="1">
                    <Navbar.Collapse id="basic-navbar-nav" style={{flexGrow: '0'}}>
                        <Nav className="nav mr-auto" navbar>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <Nav.Item>
                                <Link to="/home/cart">
                                    <a className="nav-link ">
                                        <span className="notification">{cartCount}</span>
                                        <i className="fas fa-hamburger ps-2"></i>
                                    </a>
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    className="m-0 mt-1"
                                    onClick={() => {
                                        Swal.fire({
                                            title: '¿Está seguro que desea desconectarse?',
                                            showDenyButton: true,
                                            confirmButtonColor: '#27ae60',
                                            confirmButtonText: 'Sí',
                                            denyButtonColor: '#c00e0e',
                                            denyButtonText: `No`,
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                logOut()
                                                window.location = '/'
                                            } else if (result.isDenied) {
                                            }
                                        })
                                    }
                                    }>
                                    <span className="no-icon">Salir</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Col>
            </Container>
        </Navbar>
    );
}

export default Header;
