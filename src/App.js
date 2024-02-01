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
          console.log(id, ipfsCID)
          // add data to blockchain
          await addFormDataToBlockchain(id, ipfsCID);
        } catch (error) {
          console.error('Error adding data to blockchain:', error);
        }
      }
    };

    addDataToBlockchain();
  }, [ipfsCID, id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // add data to ipfs
      const responseIpfsCID = await addDataToIPFS(name);
      setIpfsCID(responseIpfsCID);

      // retrieve ipfs cid from blockchain
      const ethResponseIpfsCID = await retrieveCIDFromBlockchain(id);
      setRetrievedIpfsCID(ethResponseIpfsCID);

      // retrieve data from ipfs
      const retrievedData = await retrieveDataFromIPFS(ethResponseIpfsCID);
      setRetrievedData(retrievedData);
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
