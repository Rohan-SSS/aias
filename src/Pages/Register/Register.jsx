import React, {useState} from "react";
import {addAadhaarIDToBlockchainOwner, addAadhaarDataToIPFS } from '../../aadhaarInteractions';

const Register = () => {
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
        await addAadhaarIDToBlockchainOwner(responseIpfsCID, Number(aadhaarId));

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
            <br /> 
        <button type="submit">Register Aadhaar</button>
      </form>
      <p>IPFS CID for registered data: {ipfsCID}</p>
      </div>
    );
}

export default Register;