import React from 'react'
import {Card, Row} from "react-bootstrap";

const Product = ({product, onClick}) => {

    // const arrayProducts = [
    //     {
    //         idRestaurante: 1,
    //         nombreRestaurante: 'nombreRestaurante1',
    //         idProducto: 1,
    //         nombreProducto: 'nombreProducto1',
    //         descripcionProducto: 'descripcionProducto1',
    //         precioSimple: 123.123,
    //         descuento: 12.3,
    //         precioTotal: 110.823,
    //         idImagen: 123123,
    //         productoExtras: [
    //             {
    //                 idProducto: 92,
    //                 nombreProductoExtra: 'nombreExtraProducto',
    //                 precioProductoExtra: 12.3
    //             },
    //             {
    //                 idProducto: 93,
    //                 nombreProductoExtra: 'nombreExtraProducto2',
    //                 precioProductoExtra: 45.6
    //             },
    //             {
    //                 idProducto: 94,
    //                 nombreProductoExtra: 'nombreExtraProducto3',
    //                 precioProductoExtra: 78.9
    //             },
    //         ],
    //     },

    const getImage = () => {
        //Consumir api y obtener imagen usando product.idImagen
        return require("../../assets/img/burger1.jpeg").default
    }

    return (
        <>
            <Card
                style={{
                    width: '18%',
                    maxHeight: '33%',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    console.log("mensaje2")
                }}>
                <div className="card-image" style={{position: 'relative'}}>
                    <img
                        alt="..."
                        src={getImage()}
                    />
                </div>
                <Card.Body>
                    <div className="">
                        <div>
                            <label>
                                {product.nombreRestaurante}
                            </label>
                        </div>
                        <div>
                            {product.nombreProducto}
                        </div>
                        <br/>
                        {product.descuento > 0 ?
                            <>
                                <div id="divPrice">
                                    <b>${product.precioTotal}</b>&nbsp;
                                    <strike>${product.precioSimple}</strike>&nbsp;
                                </div>
                                <div id='divDiscount'>
                                    {product.descuento}% OFF
                                </div>
                            </>
                            :
                            <div>
                                <div id="divPriceWODisc">
                                    <b>${product.precioSimple}</b>
                                </div>
                            </div>}
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default Product
