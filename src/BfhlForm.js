import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const BfhlForm = () => {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Options for the multi-select dropdown
  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(jsonData);  // Attempt to parse the JSON
      console.log('Parsed JSON:', data);  // Log the parsed JSON to the console for debugging
      const res = await axios.post('https://your-backend-url/bfhl', { data });  // Use your actual backend URL
      setResponse(res.data);
      setError('');
    } catch (err) {
      console.error('JSON parsing error:', err.message);
      setError('Invalid JSON');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          placeholder="Enter JSON here"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h3>Response</h3>
          <Select
            isMulti
            name="filters"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) => setSelectedOptions(selected)}
          />
          <div>
            {selectedOptions.map((option) => (
              <div key={option.value}>
                <h4>{option.label}</h4>
                <pre>{JSON.stringify(response[option.value], null, 2)}</pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BfhlForm;
