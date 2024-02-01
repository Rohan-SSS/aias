import React, { useEffect, useState } from "react";
import { addDataToIPFS, addFormDataToBlockchain, retrieveCIDFromBlockchain, retrieveDataFromIPFS } from './IPFSinteractions';

function App() {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [ipfsCID, setIpfsCID] = useState();
  const [retrievedIpfsCID, setRetrievedIpfsCID] = useState();
  const [retrievedData, setRetrievedData] = useState();

  useEffect(() => {
    const addDataToBlockchain = async () => {
      if (ipfsCID) {
        try {
          // add data to blockchain
          await addFormDataToBlockchain(ipfsCID, id);

          // retrieve ipfs cid from blockchain after adding
          const ethResponseIpfsCID = await retrieveCIDFromBlockchain(id);
          setRetrievedIpfsCID(ethResponseIpfsCID);
        } catch (error) {
          console.error('Error adding data to blockchain:', error);
        }
      }
    };
    addDataToBlockchain();
  }, [ipfsCID, id]);

  useEffect(() => {
    const retrieveIPFSData = async () => {
      if (retrievedIpfsCID) {
        try {
          // Retrieve data from ipfs
          const retrievedData = await retrieveDataFromIPFS(retrievedIpfsCID);
          setRetrievedData(retrievedData);
        } catch (error) {
          console.error('Error retrieving data from IPFS:', error);
        }
      }
    };
    retrieveIPFSData();
  }, [retrievedIpfsCID]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // add data to ipfs
      const responseIpfsCID = await addDataToIPFS(name);
      setIpfsCID(responseIpfsCID);


    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <div>
      <h1>React App</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          ID:
          <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <br />
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>IPFS CID: {ipfsCID}</p>
      <p>Retrieved IPFS CID: {retrievedIpfsCID}</p>
      <p>Retrieved Data from IPFS: {retrievedData}</p>
    </div>
  );
}

export default App;
