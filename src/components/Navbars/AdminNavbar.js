import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";

import NotificationAlert from "react-notification-alert";
import {Button, Col, Container, Modal, Nav, Navbar, Stack, Alert} from "react-bootstrap";

import routes from "routes.js";
import Swal from "sweetalert2";
import {logOut} from "../SessionService";

import {useSelector} from "react-redux";
import OrderProgress from "./OrderProgress";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router";
import {getUserAddresses} from "../Services/getUserAddresses";
import Order from "../Order/Order";
import {getToken, onMessageListener} from "../../firebase/Firebase";

function Header() {
    const [showModal, setShowModal] = useState(false)
    const [cookies, setCookie] = useCookies(['__FOsession'])
    const [cartCount, setCartCount] = useState(0)
    const location = useLocation();
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;
    const firstTime = useRef(true);

    const notificationAlertRef = React.useRef(null);
    const notify = (title, body) => {
        var options = {};
        options = {
            place: "tr",
            message: (
                <div>
                    <div>
                        {title}
                        {body}
                    </div>
                </div>
            ),
            type: "warning",
            icon: "nc-icon nc-bell-55",
            autoDismiss: 10,
        };
        notificationAlertRef.current.notificationAlert(options);
    };

    const [notification, setNotification] = useState({title: '', body: ''});

    const [show, setShow] = useState(false);



    onMessageListener().then(payload => {
        setShow(true);
        setNotification({title: payload.notification.title, body: payload.notification.body})
        console.log(payload)
        notify(payload.notification.title, payload.notification.body)
        console.log(payload)
    }).catch(err => console.log('failed: ', err));




    let history = useHistory();

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
        if (firstTime.current) { //Ejecuta solo la primera vez

            firstTime.current = false;

            if (cookies.__FOsession !== undefined) {
                getUserAddresses(cookies.__FOsession.idUsuario).then((value) => {
                    if (value === null || value.length === 0) {
                        Swal.fire(
                            {
                                title: 'Antes de realizar tu primer pedido, te invitamos a que ingreses tu dirección',
                                confirmButtonColor: '#00c0da',
                                icon: "info"
                            },
                        ).then((result) => history.push("/home/user"))
                    }
                })
            }

        }

        let count = 0

        cartItems.forEach(item => {
            count += item.qty;
        });

        setCartCount(count);

    }, [cartItems, cartCount])

    function getCalification() {
        return "5"
    }

    function getName() {
        if (cookies.__FOsession !== undefined) {
            return cookies.__FOsession.nombre
        }
    }

    return (
        <>
            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
                        <span className="navbar-toggler-bar burger-lines"></span>
                        <span className="navbar-toggler-bar burger-lines"></span>
                        <span className="navbar-toggler-bar burger-lines"></span>
                    </Navbar.Toggle>
                    <Col md="8">
                        <div
                            onClick={() => setShowModal(true)}
                            style={{cursor: 'pointer'}}>
                            <OrderProgress/>
                        </div>
                    </Col>
                    <Col md="3">
                        <Stack>
                            <label>!Bienvenido {getName()}!</label>
                            <label>Tu calificación es: {getCalification()} <i className="far fa-star"></i></label>
                        </Stack>
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
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
            >
                <div className="imgTrns cardOpacity">
                    <Modal.Header className="pedidoTitulo justify-content-center" as="h4" style={{marginTop: 20}}>
                        Mi Pedido
                    </Modal.Header>
                    <hr/>
                    <Modal.Body className="">
                        <Order/>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
}

export default Header;
