import React from 'react'
import {Card, Row} from "react-bootstrap";

const Product = ({product, onClick}) => {

    const getImage = () => {
        //Consumir api y obtener imagen usando product.idImagen
        return require("../../assets/img/burger1.jpeg").default
    }

    return (
        <>
            <Card
                style={{
                    width: '18%',
                    height: '33%',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    console.log("mensaje2")
                }}>
                <div className="card-image">
                    <img
                        alt="..."
                        src={getImage()}
                    />
                </div>
                <Card.Body>
                    ROBERTO
                </Card.Body>
            </Card>
        </>
    )
}

export default Product
