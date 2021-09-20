import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Col, ListGroup, Form, Row, Button } from 'react-bootstrap'
import { listProductDetails } from '../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ history, match }) => {
    const [ qty, setQty ] = useState(0)
    
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)

    const { loading, error, product } = productDetails
    console.log(product, 'right')

    useEffect(() => {
            dispatch(listProductDetails(match.params.id))
        
    }, [match, dispatch])

    return (
        <>
            <Link className='btn btn-light my-3' to='/' >
                Go Back
            </Link>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                    <Col md={6} >
                        <img src={product.image} alt={product.title} style={{width: '100%', height: '100%'}} />
                    </Col>
                    <Col>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.title}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Category: {product.category}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item variant='flush'>
                                    <Row>
                                        <Col>
                                            Category:
                                        </Col>
                                        <Col>
                                            <strong>{product.category}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
            
        </>
    )
}

export default ProductScreen
