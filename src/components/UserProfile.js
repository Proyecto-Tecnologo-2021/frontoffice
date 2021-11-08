import React, {useState} from 'react'
import {Col, Container, Row} from "react-bootstrap";
import UserInfo from "./UserInfo";
import UserAddresses from "./UserAddresses";
import UserAddress from "./UserAddress";

const UserProfile = () => {
    const [mode, setMode] = useState('H')
    const [address, setAddress] = useState([])
    const [onAdd, setOnAdd] = useState(false)
    const [updDel, setUpdDel] = useState(false)

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
                                }}
                                onAdd={onAdd}
                                updDel={(value) => setUpdDel(value)}
                            />
                        </Row>
                    </Col>
                    <Col md="8">
                        {mode !== 'H'
                            ? <UserAddress mode={mode} address={address} onAdd={(value) => setOnAdd(value)} updDel={updDel}/>
                            : <></>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserProfile
