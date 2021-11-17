import React, {useState} from "react";
import {Route, Switch, useLocation} from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import routes from "routes.js";

import sidebarImage from "assets/img/sidebar-3.jpg";
import {useSelector} from "react-redux";
import {Card, Col} from "react-bootstrap";
import Cart from "../components/Cart/Cart";

function Admin() {
    const [cartCount, setCartCount] = useState(0)
    const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const [hasImage, setHasImage] = React.useState(true);

    const location = useLocation();

    const mainPanel = React.useRef(null);

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/home") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        render={(props) => <prop.component {...props} />}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart;


    React.useEffect(() => {
        let count = 0
        cartItems.forEach(item => {
            count += item.qty;
        });

        setCartCount(count);

        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainPanel.current.scrollTop = 0;
        if (
            window.innerWidth < 993 &&
            document.documentElement.className.indexOf("nav-open") !== -1
        ) {
            document.documentElement.classList.toggle("nav-open");
            var element = document.getElementById("bodyClick");
            element.parentNode.removeChild(element);
        }
    }, [location, cartItems, cartCount]);
    return (
        <>
            <div className="wrapper">
                <Sidebar color={"orange"} image={hasImage ? image : ""} routes={routes}/>
                <div className="main-panel" ref={mainPanel}>
                    <AdminNavbar/>
                    {cartCount > 0
                        ? <div className="content">
                            <div style={{display: 'flex'}}>
                                <Col md="9">
                                    <div className="content">
                                        <Switch>{getRoutes(routes)}</Switch>
                                    </div>
                                </Col>

                                <Col md="3" className="h-100 imgTrns">
                                    <Card className="cardOpacity">
                                        <Card.Header>
                                            <Card.Title className="pedidoTitulo" as="h4" style={{marginTop: 20}}>
                                                Mi pedido
                                            </Card.Title>
                                        </Card.Header>
                                        <hr/>
                                        <Card.Body>
                                            <Cart/>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </div>
                        </div>
                        : <div className="content">
                            <Switch>{getRoutes(routes)}</Switch>
                        </div>
                    }
                    <Footer/>
                </div>
            </div>
        </>
    );
}

export default Admin;
