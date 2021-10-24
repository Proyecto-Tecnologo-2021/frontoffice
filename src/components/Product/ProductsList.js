import React from 'react'
import Product from "./Product";
import {Container} from "react-bootstrap";

const ProductsList = ({products}) => {
    return (
        <>
            <Container fluid>
                <div className="d-flex flex-wrap justify-content-evenly" style={{gap:'20px'}}>
                {products && products.map((product) => {
                        return (
                            <Product
                                product={product}
                                onClick={() => {
                                    console.log("mensaje1")
                                }}
                            />
                        );
                    }
                )}
                </div>
            </Container>
        </>
    )
}

export default ProductsList
