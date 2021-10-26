import React, {useState} from 'react'

import {connect} from "react-redux";
import {removeFromCart, adjustQty} from "../../redux/Shopping/shopping-actions";

const CartItem = ({itemData, removeFromCart, adjustQty}) => {
    const [input, setInput] = useState(itemData.qty)

    const onChangeHandler = (e) => {
        setInput(e.target.value)
        adjustQty(itemData.id, e.target.value)
    }

    return (
        <div>
            <img
                // src={itemData.image}
                alt={itemData.nombreProducto}
            />
            <div>
                <p>{itemData.nombreProducto}</p>
                <p>{itemData.descripcionProducto}</p>
                <p>$ {itemData.precioTotal}</p>
            </div>
            <div>
                <div>
                    <label htmlFor="qty">Qty</label>
                    <input
                        min="1"
                        type="number"
                        id="qty"
                        name="qty"
                        value={input}
                        onChange={onChangeHandler}
                    />
                </div>
                <button
                    onClick={() => removeFromCart(itemData.id)}
                >
                    <img
                        src="https://image.flaticon.com/icons/svg/709/709519.svg"
                        alt=""
                    />
                </button>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (id) => dispatch(removeFromCart(id)),
        adjustQty: (id, value) => dispatch(adjustQty(id, value))
    }
}

export default connect(null, mapDispatchToProps)(CartItem)
