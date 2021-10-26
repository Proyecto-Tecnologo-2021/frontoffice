import React from 'react'
import {Card} from "react-bootstrap";

import {connect} from "react-redux";
import {addToCart} from "../../redux/Shopping/shopping-actions";

const SingleProduct = ({currentItem, addToCart}) => {

    const getImage = () => {
        //Consumir api y obtener imagen usando product.idImagen
        return require("../../assets/img/burger1.jpeg").default
    }

    return (
        <>
            <Card
                style={{
                    width: '100%',
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
                                {currentItem.nombreRestaurante}
                            </label>
                        </div>
                        <div>
                            {currentItem.nombreProducto}
                        </div>
                        <br/>
                        {currentItem.descuento > 0 ?
                            <>
                                <div id="divPrice">
                                    <b>${currentItem.precioTotal}</b>&nbsp;
                                    <strike>${currentItem.precioSimple}</strike>&nbsp;
                                </div>
                                <div id='divDiscount'>
                                    {currentItem.descuento}% OFF
                                </div>
                            </>
                            :
                            <div>
                                <div id="divPriceWODisc">
                                    <b>${currentItem.precioSimple}</b>
                                </div>
                            </div>}
                    </div>
                    <button
                        onClick={() => addToCart(currentItem.id)}>
                        Add To Cart
                    </button>
                </Card.Body>
            </Card>
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        currentItem: state.shop.currentItem,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (id) => dispatch(addToCart(id))
    };
};

// export default connect(mapStateTotProps, mapDispatchToProps)(SingleProduct);
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
