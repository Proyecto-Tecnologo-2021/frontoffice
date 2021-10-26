import React from 'react'
import Product from "./Product";
import {Container} from "react-bootstrap";
import { connect } from 'react-redux'

const ProductsList = ({products}) => {
    return (
        <>
            <Container fluid>
                <div className="d-flex flex-wrap justify-content-evenly" style={{gap:'20px'}}>
                {products && products.map((product) => {
                        return (
                            <Product
                                key={product.id} //ANALIZAR SI VAN A HABER MÁS DE UN PRODUCTO CON EL MISMO ID
                                product={product}
                            />
                        );
                    }
                )}
                </div>
            </Container>
        </>
    )
}

const mapStateToProps = state =>{
    return{
        products: state.shop.products,
    }
}

export default connect(mapStateToProps)(ProductsList);
