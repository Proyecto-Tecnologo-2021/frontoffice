import React, {useEffect} from 'react'
import ProductsList from "./ProductsList";

const ProductGeneral = () => {
    const arrayProducts = [
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
        {
            idRestaurante: 1,
            nombreRestaurante: 'nombreRestaurante1',
            idProducto: 1,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 12.3,
            precioTotal: 110.823,
            idImagen: 123123,
            productoExtras: [
                {
                    idProducto: 92,
                    nombreProductoExtra: 'nombreExtraProducto',
                    precioProductoExtra: 12.3
                },
                {
                    idProducto: 93,
                    nombreProductoExtra: 'nombreExtraProducto2',
                    precioProductoExtra: 45.6
                },
                {
                    idProducto: 94,
                    nombreProductoExtra: 'nombreExtraProducto3',
                    precioProductoExtra: 78.9
                },
            ],
        },
    ]

    useEffect(() => {
        function getProductsGeneral(){
            //consumo api que me devuelve todas los products y obtengo arrayProducts
        }
        getProductsGeneral()
    }, [])

    return (
        <>
            <ProductsList products={arrayProducts}/>
        </>
    )
}

export default ProductGeneral
