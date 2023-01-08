import React, { useState } from 'react';
import './Contact.css';
import {useHistory} from "react-router-dom";  // import the CSS styles for the contact page

const Contact = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    function getMessageCount(str) {
        return str.split(' ').filter(function(num) {
            return num != ''
         }).length;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (getMessageCount(message) > 200){
            alert("Exceeded limit of 200 words for Message")
            return
        }

        // submit the form data to the server or perform other actions
        fetch('http://localhost/api/v1/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.detail) { //error
              alert(data.detail)
            } else {
                alert("Message Successfully Submitted")
                history.push("/")
            }
          })
          .catch((error) => {
            setError(error.message);
          });
        console.log(name, email, message);
    };

    return (
        <div className="contact-page">
            <section>
                <h1>Contact Us</h1>
                <p>Have a question or need assistance? Send us a message and we'll get back to you as soon as possible.</p>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="name">Name</label>
                    <input onChange = {e => setName(e.target.value)} type="text" id="name" name="firstname" placeholder="Your name.."/>

                    <label htmlFor="name">Email</label>
                    <input onChange = {e => setEmail(e.target.value)} type="text" id="email" name="lastname" placeholder="Your last name.."/>

                    <label htmlFor="subject">Message</label>
                    <textarea onChange = {e => setMessage(e.target.value)} id="subject" name="subject" placeholder="Write something under 200 words.."></textarea>

                    <input type="submit" value="Submit"/>

                </form>
            </section>
        </div>
    )
}

export default Contact;