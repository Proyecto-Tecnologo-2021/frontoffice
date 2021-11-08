import React from 'react'
import {Button, Card} from "react-bootstrap";
import {useDispatch} from "react-redux";
// import {addToCart, loadCurrentItem} from "../../redux/Shopping/shopping-actions";
import Swal from "sweetalert2";
import {addToCart} from "../../redux/actions/cartActions";

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
    //     },

    const dispatch = useDispatch()

    const getImage = () => {
        //Consumir api y obtener imagen usando product.idImagen
        return require("../../assets/img/burger1.jpeg").default
    }

    const addToCartHandler = () => {
        dispatch(addToCart(product))
        // addToCart(product.id)
    }

    return (
        <>
            <Card
                style={{
                    width: '22%',
                    maxHeight: '33%',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    // console.log("mensaje2")
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
                                {product.nom_restaurante}
                            </label>
                        </div>
                        <div>
                            {product.nombre}
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
                    {/*<div>*/}
                    {/*    <Link to={`/home/${product.id}`}>*/}
                    {/*        <Button*/}
                    {/*            onClick={() => {*/}
                    {/*                loadCurrentItem(product)*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            View Item*/}
                    {/*        </Button>*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                    <br/>
                    <Button
                        className="btn-fill pull-right"
                        size="sm"
                        variant="warning"
                        onClick={() => {
                                Swal.fire({
                                    title: '¿Desea agregar este producto?',
                                    showDenyButton: true,
                                    confirmButtonColor: '#27ae60',
                                    confirmButtonText: 'Sí',
                                    denyButtonColor: '#c00e0e',
                                    denyButtonText: 'No',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        addToCartHandler(product.id)
                                        // addToCart(product.id)
                                        Swal.fire(
                                            {
                                                title: '¡Producto agregado!',
                                                confirmButtonColor: '#27ae60',
                                                icon: "success",
                                            }
                                        )
                                    }
                                })
                            }}
                        >
                        Agregar a mis pedidos
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}

// const mapDispatchToProps = dispatch => {
//     return {
//         addToCart: (id) => dispatch(addToCart(id)),
//     };
// };
//
// export default connect(null, mapDispatchToProps)(Product)

export default Product
