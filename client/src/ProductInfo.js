import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './constants';

function ProductInfo(x) {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/products/${x.match.params.id}`)
      .then((res) => setProduct(res.data));
  }, [x.match.params.id]);

  return (
    <div>
      {product.name}
    </div>
  );
}

export default ProductInfo;
