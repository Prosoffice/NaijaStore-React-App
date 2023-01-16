import React, {useState} from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer'
import {useHistory} from "react-router-dom";
import getCurrentUser from "./utils";

function Subtotal() {
    const [{basket}, dispatch] = useStateValue()
    const history = useHistory();
    const [error, setError] = useState(null);


    const placeOrder = e => {
        e.preventDefault();

        fetch('http://localhost/api/v1/create-order', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${getCurrentUser()}`},
            body: JSON.stringify(basket),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.detail) {
                console.log(data.detail)
              alert(data.detail)
            } else {
                alert("Order placed Successfully :)")
                dispatch({
                    type: "RESET_BASKET",
                    id: 0,
                })
                history.push('/')

            }
          })
          .catch((error) => {
            setError(error.message);
          });
    }

    const amountPayable = 0.2 * getBasketTotal(basket) + getBasketTotal(basket);
    const formattedAmountPayable = amountPayable.toFixed(2);
    
    return (
        <div className="subtotal">
            <CurrencyFormat
            renderText={(value) => (
            <>
                <p>Subtotal ({basket.length} items): <strong>{value}</strong></p>
                <p>Tax: 20%</p>
                <p><strong>Total</strong>: <strong>${formattedAmountPayable}</strong></p>

            </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)} // Part of the homework
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            />

            <button onClick={placeOrder}>Place Order</button>
        </div>
    )
}

export default Subtotal