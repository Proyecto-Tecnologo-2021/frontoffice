import React from 'react'
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import UserInfo from "./UserInfo";
import UserAddresses from "./UserAddresses";
import UserAddress from "./UserAddress";

const UserProfile = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="4">
                        <Row>
                            <UserInfo/>
                        </Row>
                        <Row>
                            <UserAddresses/>
                        </Row>
                    </Col>
                    <Col md="8">
                        <UserAddress/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserProfile