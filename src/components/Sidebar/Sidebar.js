import React, {useState} from "react";
import {NavLink, useLocation} from "react-router-dom";

import {Nav} from "react-bootstrap";
import {getToken, onMessageListener} from "../../firebase/Firebase";

function Sidebar({color, image, routes}) {

    const location = useLocation();
    const activeRoute = (routeName) => {
        return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };
    return (
        <div className="sidebar" data-image={image} data-color={color}>
            <div
                className="sidebar-background"
                style={{
                    backgroundImage: "url(" + image + ")",
                }}
            />
            <div className="sidebar-wrapper">
                <div className="logo  ">
                    <div className="logo-img">
                        <img
                            src={require("assets/img/logoAppetitTrans.png").default}
                            alt="..."
                        />
                    </div>
                </div>
                <Nav>
                    {routes.map((prop, key) => {
                        if (!prop.redirect)
                            return (
                                <li
                                    className={
                                        prop.upgrade
                                            ? "active active-pro"
                                            : activeRoute(prop.layout + prop.path)
                                    }
                                    key={key}
                                >
                                    <NavLink
                                        to={prop.layout + prop.path}
                                        className="nav-link"
                                        activeClassName="active"
                                    >
                                        <i className={prop.icon}/>
                                        <p style={{color: "#ffffff"}}>{prop.name}</p>
                                    </NavLink>
                                </li>
                            );
                        return null;
                    })}
                </Nav>
            </div>
        </div>
    );
}

export default Sidebar;
