import React from 'react'

const Rating = ({product}) => {
    return (
        <div className="my-3">
            <span>
                <i style={{color: 'gold'}} className = {product.rating >= 1 ? 'fas fa-star': product.rating >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}/>
            </span>
            <span>
                <i style={{color: 'gold'}} className = {product.rating >= 2 ? 'fas fa-star': product.rating >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}/>
            </span>
            <span>
                <i style={{color: 'gold'}} className = {product.rating >= 3 ? 'fas fa-star': product.rating >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}/>
            </span>
            <span>
                <i style={{color: 'gold'}} className = {product.rating >= 4 ? 'fas fa-star': product.rating >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}/>
            </span>
            <span className="mr-2">
                <i style={{color: 'gold'}} className = {product.rating >= 5 ? 'fas fa-star': product.rating >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}/>
            </span>
              {product.numReviews} reviews
        </div>
    )
}

export default Rating
