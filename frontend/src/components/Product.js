import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
    return (
        <Card className="my-3 p-3 rounded" key={product._id}>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} alt={product.name} variant='top'/>
            </Link>
            <Card.Body>
                 <Link to={`/product/${product._id}`}>
                <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
                </Link>
                <Card.Text as="div">
                    <Rating product={product}/>
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
             </Card.Body>
        </Card>
    )
}

export default Product
