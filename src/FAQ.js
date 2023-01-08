import React, { useState } from 'react';
import "./FAQ.css"

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [faqData, setFaqData] = useState([
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of purchase.',
    },
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by logging into your account and viewing your order history.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'No, we only supply food items within the UK',
    },
  ]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredFaqData = faqData.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="faq">
      <form>
        <input type="text" name="search" value={searchQuery} onChange={handleSearch} placeholder="Search FAQ"/>
      </form>
      <section>
        {filteredFaqData.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default FAQPage;