import React, {useState} from 'react'
import { Rating, RatingView } from 'react-simple-star-rating'
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";

const OrderCalification = () => {
    const [ratingServ, setRatingServ] = useState(0) // initial rating value
    const [ratingVel, setRatingVel] = useState(0) // initial rating value
    const [ratingFood, setRatingFood] = useState(0) // initial rating value

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

    return (
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
                    <Rating onClick={handleRatingVel} ratingValue={ratingVel} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Comida</p>
                </Col>
                <Col>
                    <Rating onClick={handleRatingFood} ratingValue={ratingFood} />
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
                        as="textarea"
                        aria-label="With textarea"
                        style={{ height: 150}}
                        className="ms-2"/>
                </Row>
            </Row>
            <Row>
                <Button
                    className="mt-2 btn-fill"
                    variant="warning">
                    Calificar pedido
                </Button>
            </Row>
        </>
    )
}

export default OrderCalification
