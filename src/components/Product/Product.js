import React from 'react'
import {Button, Card} from "react-bootstrap";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";
import {addToCart} from "../../redux/actions/cartActions";
import {getUserAddresses} from "../Services/getUserAddresses";
import {useHistory} from "react-router";
import {useCookies} from "react-cookie";

const Product = ({product, onClick}) => {
    const [cookies, setCookie] = useCookies(['__FOsession'])
    let history = useHistory();
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
        let srcImg = null

        // console.log(product)

        if (product.imagen.imagen !== null) {
            srcImg = `data:image/jpeg;base64,${product.imagen.imagen}`
        } else {
            srcImg = require("../../assets/img/nodisponible.png").default
        }

        return (
            <img
                alt="..."
                src={srcImg}
            />
        )
    }

    const addToCartHandler = () => {
        dispatch(addToCart(product))
    }

    const checkAddresses = () => {
        if (cookies.__FOsession !== undefined) {
            getUserAddresses(cookies.__FOsession.idUsuario).then((value) => {
                if(value === null || value.length === 0){
                    Swal.fire(
                        {
                            title: 'Antes de realizar tu primer pedido, te invitamos a que ingreses tu dirección',
                            confirmButtonColor: '#00c0da',
                            icon: "info"
                        },
                    ).then((result) => history.push("/home/user"))
                }
            })
        }
    }

    return (
        <>
            <Card
                style={{
                    width: '22%',
                    maxHeight: '33%',
                    cursor: 'pointer',
                }}>
                <div className="card-image" style={{position: 'relative'}}>
                    {getImage()}
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
                                {product.precioTotal !== undefined
                                    ?
                                    <div id="divPrice">
                                        <b>${product.precioTotal}</b>&nbsp;
                                        <strike>${product.precioSimple}</strike>&nbsp;
                                    </div>
                                    :

                                    <div id="divPrice">
                                        <b>${product.precio}</b>&nbsp;
                                        <strike>${(100 * product.precio) / (100 - product.descuento)}</strike>&nbsp;
                                    </div>

                                }

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
                    <br/>
                    <Button
                        className="btn-fill pull-right"
                        size="sm"
                        variant="warning"
                        onClick={() => {
                            checkAddresses()
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
