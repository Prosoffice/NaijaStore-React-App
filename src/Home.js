import './Home.css'
import Product from './Product'
import ProtectedRoute from "./ProtectedRoute";
import {useEffect, useState} from "react";
import getCurrentUser from "./utils";

function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const token = getCurrentUser();

    useEffect(() => {
        // make a GET request to the API to fetch the array of items
        fetch('http://localhost/api/v1/products', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          },
        }).then((response) => response.json())
          .then((data) => {
              console.log(data)
              setProducts(data);
          })
          .catch((error) => {
            setError(error)
          });
      }, []);


    return (
    <div className="home">
        <div className="home__container">
            <img
            className='home__image'
            src='https://i.ibb.co/zHhQQcD/pexels-ella-olsson-1640773.jpg' alt='' />
            <div className="home__row">
                    {products.map((product) => (
                        <Product
                            key={product.id}
                            id= {product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            rating={product.rating}
                        />
                ))}
            </div>


        </div>
    </div>
    )
}

export default ProtectedRoute(Home)