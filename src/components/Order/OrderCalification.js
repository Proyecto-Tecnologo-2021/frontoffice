import React, {useEffect, useState} from 'react'
import {Rating} from 'react-simple-star-rating'
import {Button, Col, FormControl, Row} from "react-bootstrap";
import {GetOrderById} from "../Services/getOrderById";
import {CoffeeLoading} from "react-loadingg";
import {NewCalification} from "../Services/newCalification";
import Swal from "sweetalert2";
import {UpdCalification} from "../Services/updCalification";

const OrderCalification = ({orderId}) => {
    const [ratingServ, setRatingServ] = useState(0) // initial rating value
    const [ratingVel, setRatingVel] = useState(0) // initial rating value
    const [ratingFood, setRatingFood] = useState(0) // initial rating value
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState(undefined)
    const [comments, setComments] = useState("")
    const [isNew, setIsNew] = useState(undefined)
    const [clientId, setClientId] = useState(0)

    // Catch Rating value
    const handleRatingServ = (rate) => {
        setRatingServ(rate)
        // Some logic
    }

    // Catch Rating value
    const handleRatingVel = (rate) => {
        setRatingVel(rate)
        // Some logic
    }

    // Catch Rating value
    const handleRatingFood = (rate) => {
        setRatingFood(rate)
        // Some logic
    }

    useEffect(() => {
        GetOrderById(orderId).then(async (cuerpo) => {
            setOrder(cuerpo)
            setLoading(false)
            if (cuerpo.calificacion !== null){ //UPD
                setRatingFood(cuerpo.calificacion.comida)
                setRatingVel(cuerpo.calificacion.rapidez)
                setRatingServ(cuerpo.calificacion.servicio)
                setComments(cuerpo.calificacion.comentario)
                setIsNew(false)
            }else{
                setIsNew(true)
            }
            setClientId(cuerpo.idcli)
        })

    }, [])

    function confirmButton() {
        const calification = {
            "rapidez": ratingVel,
            "comida": ratingFood,
            "servicio": ratingServ,
            "comentario": comments,
            "id_pedido": orderId,
            "id_cliente": clientId
        }

        if(isNew){
            NewCalification(calification).then( (response) => {
                if (response.ok){
                    Swal.fire(
                        {
                            title: 'Tu calificación ha sido enviada',
                            confirmButtonColor: '#27ae60',
                            icon: "success",
                        },
                    )
                    setIsNew(false)
                }else{
                    Swal.fire(
                        {
                            title: 'Ups...',
                            confirmButtonColor: '#c00e0e',
                            icon: "error",
                            text: 'Ha sucedido un error...'
                        },
                    )
                }
            })
        }else{
            UpdCalification(calification).then( (response) => {
                if (response.ok){
                    Swal.fire(
                        {
                            title: 'Tu calificación ha sido modificada',
                            confirmButtonColor: '#27ae60',
                            icon: "success",
                        },
                    )
                }else{
                    Swal.fire(
                        {
                            title: 'Ups...',
                            confirmButtonColor: '#c00e0e',
                            icon: "error",
                            text: 'Ha sucedido un error...'
                        },
                    )
                }
            })
        }

    }

    return (
        <>
            {loading && order === undefined
                ? <><CoffeeLoading/></>
                :
                <>
                    <Row>
                        <Col>
                            <p>Servicio</p>
                        </Col>
                        <Col>
                            <Rating onClick={handleRatingServ} ratingValue={ratingServ} /* Rating Props */ />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Velocidad</p>
                        </Col>
                        <Col>
                            <Rating onClick={handleRatingVel} ratingValue={ratingVel}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Comida</p>
                        </Col>
                        <Col>
                            <Rating onClick={handleRatingFood} ratingValue={ratingFood}/>
                        </Col>
                    </Row>
                    <Row>
                        <Row>
                            <p>
                                Comentarios:
                            </p>
                        </Row>
                        <Row>
                            <FormControl
                                value={comments}
                                as="textarea"
                                aria-label="With textarea"
                                style={{height: 150}}
                                className="ms-2"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setComments(e.target.value);
                                }}/>
                        </Row>
                    </Row>
                    <Row>
                        <Button
                            className="mt-2 btn-fill"
                            variant="warning"
                            onClick={() =>{
                                confirmButton()
                            }}>
                            Calificar pedido
                        </Button>
                    </Row>
                </>
            }
        </>
    )

}

export default OrderCalification
