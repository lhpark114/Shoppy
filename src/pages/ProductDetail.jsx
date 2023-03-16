import React from 'react';

export default function ProductDetail() {
    const { productId } = useParams();
    return (
        <div>
            ProductsDetail {productId}
        </div>
    );
}

