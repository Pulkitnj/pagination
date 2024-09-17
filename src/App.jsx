import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();

    if(data && data.products){
      setProducts(data.products);
    }

    console.log(products);
  };

  useEffect(() => {
    fetchProducts();
  },[]);
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default App
