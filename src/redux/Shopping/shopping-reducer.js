import * as actionTypes from './shopping-types'

const INITIAL_STATE = {
    products: [
        {
            idRestaurante: 1,
            nombreRestaurante: '¿Chivitos? los del Gonza',
            id: 1,
            nombreProducto: 'Chivito napolitano al plato para dos personas',
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
            id: 2,
            nombreProducto: 'nombreProducto1',
            descripcionProducto: 'descripcionProducto1',
            precioSimple: 123.123,
            descuento: 0,
            precioTotal: 123.123,
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
            id: 3,
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
    ], //{id, title, desc, price, img}
    cart: [], //{id, title, desc, price, img, qty}
    currentItem: null,
}

// const shopReducer = (state = INITIAL_STATE, action) => {
const shopReducer = (state = { cartItems: []}, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            // const item = state.products.find(product => product.id === action.payload.id)
            const item = action.payload

            // const inCart = state.cart.find((item) =>
            //     item.id === action.payload.id
            //         ? true
            //         : false
            // )

            const existItem = state.cartItems.find((x) => x.product.id === item.product.id && x.product.tipo === item.product.tipo)

            // return {
            //     ...state,
            //     cart: inCart
            //         ? state.cart.map((item) =>
            //             item.id === action.payload.id
            //                 ? {...item, qty: item.qty + 1}
            //                 : item)
            //         : [...state.cart, {...item, qty: 1}],
            // };
            // console.log(existItem)

            if(existItem){
                return {
                    ...state,
                    // cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)
                    cartItems: state.cartItems.map((x) => x.product === existItem.product
                        ? {...x, qty: x.qty + 1}
                        : x)
                }
            }else { //primera vez que se agrega
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems,
                        {...item, qty: 1}
                    ]
                }
            }

        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product.id !== action.payload)
            }

        case actionTypes.ADJUST_QTY:
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.id
                        ? {...item, qty: +action.payload.qty} :
                        item
                ),
            }

        case actionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload,
            }

        default:
            return state;
    }
};

export default shopReducer;
