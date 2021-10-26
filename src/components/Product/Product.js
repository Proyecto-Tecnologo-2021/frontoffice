import React from 'react'
import {Card, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {addToCart} from "../../redux/Shopping/shopping-actions";

const Product = ({product, onClick, addToCart}) => {

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
                    <button
                        onClick={() => addToCart(product.id)}>
                        Add To Cart
                    </button>
                </Card.Body>
            </Card>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (id) => dispatch(addToCart(id)),
    };
};

export default connect(null, mapDispatchToProps)(Product)
