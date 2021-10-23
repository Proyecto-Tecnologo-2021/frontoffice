import React, {useState} from 'react'
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import UserInfo from "./UserInfo";
import UserAddresses from "./UserAddresses";
import UserAddress from "./UserAddress";

const UserProfile = () => {
    const [mode, setMode] = useState('H')
    const [address, setAddress] = useState([])

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="4">
                        <Row>
                            <UserInfo/>
                        </Row>
                        <Row>
                            <UserAddresses
                                onClick={(address, mode) => {
                                    setAddress(address)
                                    setMode(mode)
                                }
                                }
                            />
                        </Row>
                    </Col>
                    <Col md="8">
                        {mode !== 'H' ?
                        < UserAddress mode={mode} address={address}/> : <></>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserProfile