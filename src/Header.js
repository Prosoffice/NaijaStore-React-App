import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from 'react-router-dom';
import { useStateValue } from './StateProvider';
import ProtectedRoute from "./ProtectedRoute";
import getCurrentUser from "./utils";
import {useEffect, useState} from "react";

function Header() {
    const [{basket}, dispatch] = useStateValue()
    const [name, setName] = useState("Guest")
    const [error, setError] = useStateValue("")

    useEffect(() => {
    // make a GET request to the API to fetch the array of items
    fetch('http://localhost/api/v1/login/test-token', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${getCurrentUser()}`
      },
    }).then((response) => response.json())
      .then((data) => {
          console.log(data)
          setName(data.full_name);
      })
      .catch((error) => {
        setError(error)
      });
    }, []);

    return (
        <div className='header'>
        <Link to="/">
            <img
                className='header__logo'
                src="https://i.ibb.co/4VgyYFJ/Naija-Store-logos.jpg" alt=''
            />
        </Link>
        

        <div className='header__search'>

        </div>

        <div className='header__nav'>
            <Link to='/login' style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <div className='header__option'>
                <span
                className='header__optionLineOne'>
                    Hello
                </span>

                <span
                className='header__optionLineTwo'>
                    {name}
                </span>
            </div>
            </Link>

            <Link to="/contact" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className='header__option'>
                    <span
                    className='header__optionLineOne'>
                        Reach out
                    </span>

                    <span
                    className='header__optionLineTwo'>
                        Contact
                    </span>

                </div>
            </Link>

            <Link to="/faq" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <div className='header__option'>
                <span
                className='header__optionLineOne'>
                    Frequently asked
                </span>

                <span
                className='header__optionLineTwo'>
                    Questions
                </span>
            </div>
            </Link>

            <Link to="/about" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <div className='header__option'>
                <span
                className='header__optionLineOne'>
                    Naijastore
                </span>

                <span
                className='header__optionLineTwo'>
                    About
                </span>
            </div>
            </Link>

            <Link to="/checkout" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="header__optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header__optionLineTwo 
                    // header__basketCount">{basket?.length}</span>
                </div>
            </Link>
            
        </div>



    </div>
  )
}

export default ProtectedRoute(Header);