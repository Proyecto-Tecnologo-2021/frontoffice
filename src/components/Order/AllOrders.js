import React, {useEffect, useState} from 'react'
import {getOrdersFromClientById} from "../Services/getOrdersFromClientById";
import {useCookies} from "react-cookie";
import CartItem from "../Cart/CartItem";
import LineOrder from "./LineOrder";

const AllOrders = () => {
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState(undefined)
    const [cookies, setCookie] = useCookies(['__FOsession'])

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
        {loading && orders === undefined
        ? <></>
        : <>
                {orders.map(order => (
                    <>
                        <LineOrder order={order}/>
                    </>
                ))}
            </>
        }
        </>
    )
}

export default AllOrders

