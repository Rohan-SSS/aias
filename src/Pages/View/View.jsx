import React, {useState, useEffect} from "react";
import { retrieveAadhaarCIDFromBLockchain, retrieveAadhaarDataFromIPFS } from "../../aadhaarInteractions";

const View = () =>{

    const [aadhaarId, setAadhaarId] = useState();

    const [retrievedIpfsCID, setRetrievedIpfsCID] = useState();    
    const [retrievedAadhaarData, setRetrievedAadhaarData] = useState();
    
    // Get Aadhaar data
    useEffect(() => {
        const retrievedIFPSData = async () => {
        if (retrievedIpfsCID){
            try {
            // Retrieve data from ipfs
            const retrievedData = await retrieveAadhaarDataFromIPFS(retrievedIpfsCID);
            setRetrievedAadhaarData(retrievedData);
            } catch (error) {
            console.error('Error retrieving data from IPFS:', error);
            }
        }
        };
        retrievedIFPSData();
    }, [retrievedIpfsCID]);

    // Handle form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const ipfsCID = await retrieveAadhaarCIDFromBLockchain(aadhaarId);
            setRetrievedIpfsCID(ipfsCID)
        } catch (error) {
            console.error('Error storing Aadhaar data:', error);
        }
    };

    return(
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>
                Aadhaar ID: 
                <input type="number" value={aadhaarId} onChange={(e) => setAadhaarId(e.target.value)} /> 
                </label>
                <br />
                <button type="submit">View data</button>
            </form>
            <p>Retrieved IPFS CID : {retrievedIpfsCID}</p>
            <p>Retrieved IPFS Data: {retrievedAadhaarData}</p>
        </div>
    )
}

export default View;