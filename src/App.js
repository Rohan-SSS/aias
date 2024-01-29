import React, { useState } from 'react';
import { testFormContract } from './ethereumSetup';

const App = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [formDataContract, setFormDataContract] = useState(null);
  const [searchResult, setSearchResult] = useState('');

  const connectToBlockchain = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        setFormDataContract(testFormContract);
      } catch (error) {
        console.error('Error connecting to blockchain', error);
      }
    } else {
      console.error('MetaMask not detected!');
    }
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleIdChange = (e) => setId(e.target.value);

  const handleSubmit = async () => {
    try {
      if (window.ethereum && window.ethereum.enable) {
        const accounts = await window.ethereum.enable();
        const selectedAddress = accounts[0];

        const idNumber = parseInt(id, 10);

        await formDataContract.methods.addFormData(name, idNumber).send({ from: selectedAddress, gas: 600000 });

        setName('');
        setId('');
      } else {
        console.error('MetaMask not detected or does not support the enable method.');
      }
    } catch (error) {
      console.error('Error submitting form data', error);
    }
  };

  const handleSearch = async () => {
    try {
      const idNumber = parseInt(id, 10);

      // Call the existing getFormData function to get the name by ID
      const result = await formDataContract.methods.getFormData(idNumber).call();

      setSearchResult(result);
    } catch (error) {
      console.error('Error fetching data from contract', error);
    }
  };
  return (
    <div>
      <h1>Form Data App</h1>
      <button onClick={connectToBlockchain}>Connect to Blockchain</button>
      {formDataContract && (
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} />
          <br />
          <label>ID:</label>
          <input type="number" value={id} onChange={handleIdChange} />
          <br />
          <button onClick={handleSubmit}>Submit Form</button>
          <br />
          <button onClick={handleSearch}>Search by ID</button>
          <div>
            <strong>Search Result:</strong> {searchResult}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
