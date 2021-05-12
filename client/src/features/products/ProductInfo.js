import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { API_URL } from '../../constants';

export default function ProductInfo({ match }) {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/products/${match.params.id}`)
      .then((res) => setProduct(res.data));
  }, [match.params.id]);

  return (
    <div>
      {product.name}
    </div>
  );
}

ProductInfo.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string.isRequired }) }).isRequired,
};
