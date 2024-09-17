import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const PageHandler = (page) => {
    setPage(page);
  }

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
    <div className="container">
      <header className="header">
        <h1>Pagination</h1>
      </header>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <b className="number">{product.id + " "}</b>
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination-container">
          <div className="pagination">
            <span 
              className={page > 1 ? "pagination__button" : "pagination__button pagination__disable"}
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}>◀</span>
            {[...Array(Math.ceil(products.length / 10))].map((_, index) => {
              return (
                <span
                  className={page === index + 1 ? "pagination__button pagination__selected" : "pagination__button"}
                  key={index}
                  onClick={() => PageHandler(index + 1)}
                >
                  {index + 1}
                </span>
              );
            })}
            <span 
              className={page < Math.ceil(products.length / 10) ? "pagination__button" : "pagination__button pagination__disable"}
              onClick={() => {
                if (page < Math.ceil(products.length / 10)) setPage(page + 1);
              }}>▶</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
