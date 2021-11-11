import React, {useEffect, useState} from 'react'
import Restaurant from "./Restaurant";
import {GetOpenRestaurants} from "../Services/getOpenRestaurants";
import {CoffeeLoading} from "react-loadingg";
import {Container} from "react-bootstrap";

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        GetOpenRestaurants().then((a) => {
            setRestaurants(a)
            setLoading(false)
        })
    }, [])

    return (
        <>
            <Container fluid>
                <div className="d-flex flex-wrap justify-content-evenly" style={{gap: '5px'}}>
                    {loading
                        ? <CoffeeLoading/>
                        : restaurants.map(restaurant => (
                            <>
                                <Restaurant id={restaurant.id} restaurant={restaurant}/>
                                {/*<hr/>*/}
                            </>
                        ))
                    }

                </div>
            </Container>
        </>
    )
}

export default RestaurantList
