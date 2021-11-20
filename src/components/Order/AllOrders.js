import React, {useEffect, useState} from 'react'
import {getOrdersFromClientById} from "../Services/getOrdersFromClientById";
import {useCookies} from "react-cookie";
import CartItem from "../Cart/CartItem";
import LineOrder from "./LineOrder";
import {Modal} from "react-bootstrap";
import OrderDetail from "./OrderDetail";
import OrderCalification from "./OrderCalification";

const AllOrders = () => {
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState(undefined)
    const [cookies, setCookie] = useCookies(['__FOsession'])
    const [showModal, setShowModal] = useState(false)
    const [orderId, setOrderId] = useState(0)

    useEffect(() => {
        let userId = undefined
        if (cookies.__FOsession !== undefined) {
            userId = cookies.__FOsession.idUsuario
        }

        getOrdersFromClientById(userId).then((data) => {
            setLoading(false)
            setOrders(data)
        })

    }, [])

    return (
        <>
        {loading || orders === undefined
        ? <></>
        : <>
                {orders.map(order => (
                    <>
                        <LineOrder
                            order={order}
                            selectedOrder={(val) => {
                                setOrderId(val)
                                setShowModal(true)
                            }}
                        />
                    </>
                ))}
            </>
        }
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
            >
                {orderId !== undefined && !orderId.isCalification
                ?
                    <div className="imgTrns cardOpacity">
                        <Modal.Header className="pedidoTitulo justify-content-center" as="h4" style={{marginTop: 20}}>
                            Mi Pedido
                        </Modal.Header>
                        <hr/>
                        <Modal.Body className="">
                            <OrderDetail orderId={orderId.id}/>
                        </Modal.Body>
                    </div>
                :
                    <div className="imgTrns cardOpacity">
                        <Modal.Header className="pedidoTitulo justify-content-center" as="h4" style={{marginTop: 20}}>
                            Calificación
                        </Modal.Header>
                        <hr/>
                        <Modal.Body className="">
                            <OrderCalification/>
                        </Modal.Body>
                    </div>
                }

            </Modal>
        </>
    )
}

export default AllOrders

