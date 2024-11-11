import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GetSuggestionsButton.css';

const GetSuggestionsButton = ({ session }) => {
  const navigate = useNavigate();
  const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchTerm !== '') {
      // Handle search logic here
      navigate('/suggestions', { state: { searchTerm } });
    }
  };

  const handleGetSuggestions = () => {
    if (!session) {
      navigate('/signin');
      return;
    }
    setIsTextBoxVisible(true);
  };

  return (
    <>
      {isTextBoxVisible ? (
        <div className='input-wrapper'>
          <i className='fas fa-search'></i>
          <input 
            type='text'
            className='text-suggest'
            placeholder='Your search term, e.g. JavaScript'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      ) : (
        <button type='button' className='button-suggest' onClick={handleGetSuggestions}>
          Get suggestions
        </button>
      )}
    </>
  );
};

export default GetSuggestionsButton;