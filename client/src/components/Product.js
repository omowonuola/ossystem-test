import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
    console.log(product, 'JUST')
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </Link> 

            <Card.Body>
                <Link to={`product/${product._id}`}>
                    <Card.Title as='div'><strong>{product.title}</strong></Card.Title>
                </Link>


                {/* <Card.Text as='h3'>${product.price}</Card.Text> */}

            </Card.Body>
             
        </Card>
    )
}

export default Product
