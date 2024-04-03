import React, { useEffect, useState } from "react";
import {addAadhaarIDToBlockchain, retrieveAadhaarCIDFromBLockchain, addAadhaarDataToIPFS, retrieveAadhaarDataFromIPFS } from './aadhaarInteractions';


function App(){
  // Demographics
  const [aadhaarId, setAadhaarId] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [gender, setGender] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();

  // Biometrics
  const [picture, setPicture] = useState('Picture');
  const [iris, setIris] = useState('Iris scan');
  const [fingerPrints, setFingerPrints] = useState('Finger prints');

  // IPFS
  const [ipfsCID, setIpfsCID] = useState();
  // const [retrievedIpfsCID, setRetrievedIpfsCID] = useState();

  // Data
  // const [retrievedAadhaarData, setRetrievedAadhaarData] = useState();

  // Add Aadhaar id and CID to blockchain
    // useEffect(() => {
    //   const addIdToBlockchain = async () => {
    //     if (ipfsCID) {
    //       try {
    //         // add data to blockchain
    //         await addAadhaarIDToBlockchain(ipfsCID, Number(aadhaarId));

    //         // retrieve ipfs cid from blockchain after adding it
    //         const ethResponseIpfsCID = await retrieveAadhaarCIDFromBLockchain(aadhaarId);
    //         setRetrievedIpfsCID(ethResponseIpfsCID);
    //       } catch (error) {
    //         console.error('Error adding data to blockchain:', error);
    //       }
    //     }
    //   };
    //   addIdToBlockchain();
    // }, [ipfsCID, aadhaarId]);

  // Get Aadhaar data
  // useEffect(() => {
  //   const retrievedIFPSData = async () => {
  //     if (retrievedIpfsCID){
  //       try {
  //         // Retrieve data from ipfs
  //         const retrievedData = await retrieveAadhaarDataFromIPFS(retrievedIpfsCID);
  //         setRetrievedAadhaarData(retrievedData);
  //       } catch (error) {
  //         console.error('Error retrieving data from IPFS:', error);
  //       }
  //     }
  //   };
  //   retrievedIFPSData();
  // }, [retrievedIpfsCID]);


  // Hadnle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const aadhaarData = {
      aadhaarId, firstName, lastName, dateOfBirth, gender, mobileNumber, email, address, 
      picture, iris, fingerPrints 
    };

    const aadhaarDataJSON = JSON.stringify(aadhaarData);

    try {
      const responseIpfsCID = await addAadhaarDataToIPFS(aadhaarDataJSON);
      setIpfsCID(responseIpfsCID)
      await addAadhaarIDToBlockchain(responseIpfsCID, Number(aadhaarId));

      // await addAadhaarIDToBlockchain(ipfsCID, aadhaarId);
      // console.log('Aadhaar data stored on IPFS and blockchain!');
    } catch (error) {
      console.error('Error storing Aadhaar data:', error);
    }
  };

  return (
    <div>
      <h2>Aadhaar Registration Form</h2> 
      <form onSubmit={handleFormSubmit}>
        <label>
          Aadhaar ID: 
          <input type="number" value={aadhaarId} onChange={(e) => setAadhaarId(e.target.value)} /> 
        </label>
        <br />
        <label>
          First Name: 
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name: 
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <br />
        <label>
          Date of Birth: 
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </label>
        <br />
        <label>
          Gender: 
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </label>
        <br />
        <label>
          Mobile Number: 
          <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
        </label>
        <br />
        <label>
          Email: 
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Address: 
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <br />
        <label>
          Picture: 
          <input type="text" value={picture} onChange={(e) => setPicture(e.target.value)} />
        </label>
        <br />
        <label>
          Iris scan: 
          <input type="text" value={iris} onChange={(e) => setIris(e.target.value)} />
        </label>
        <br />
        <label>
          Finger Prints: 
          <input type="text" value={fingerPrints} onChange={(e) => setFingerPrints(e.target.value)} />
        </label>
        <br />        
        {/* <label>
          Picture: 
          <input type="file" onChange={(e) => setPicture(e.target.files[0])} /> 
        </label>
        <br /> 
        <label>
          Iris Scan: 
          <input type="file" onChange={(e) => setIris(e.target.files[0])} /> 
        </label>
        <br />
        <label>
          Fingerprints: 
          <input type="file" onChange={(e) => setFingerPrints(e.target.files[0])} /> 
        </label> */}
        <br /> 
        <button type="submit">Register Aadhaar</button>
      </form>

      <p>IPFS CID for registered data: {ipfsCID}</p>
      {/* <p>Retrieved IPFS CID : {retrievedIpfsCID}</p>
      <p>Retrieved IPFS Data: {retrievedAadhaarData}</p> */}

    </div>
  );  
}

export default App;