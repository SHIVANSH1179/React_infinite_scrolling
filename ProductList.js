import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products?limit=10&page=${page}`);
      setProducts([...products, ...response.data.products]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`https://dummyjson.com/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchProducts}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more products</p>}
    >
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button onClick={() => deleteProduct(product.id)}>Delete</button>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default ProductList;
