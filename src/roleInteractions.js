const { web3, aadhaarContract } = require('./ethereumSetup')

// Function to add supervisor by the owner
async function addSupervisorByOwner(supervisorAddress) {
    try {
        const accounts = await web3.eth.getAccounts();
        const owner = accounts[0]; // Assuming the owner is the first account
        await aadhaarContract.methods.addSupervisor(supervisorAddress).send({ from: owner });
        console.log(`Supervisor added successfully by owner.`);
    } catch (error) {
        console.error(`Error adding supervisor: ${error}`);
    }
}

// Function to remove supervisor by the owner
async function removeSupervisorByOwner(supervisorAddress) {
    try {
        const accounts = await web3.eth.getAccounts();
        const owner = accounts[0]; // Assuming the owner is the first account
        await aadhaarContract.methods.removeSupervisor(supervisorAddress).send({ from: owner });
        console.log(`Supervisor removed successfully by owner.`);
    } catch (error) {
        console.error(`Error removing supervisor: ${error}`);
    }
}

// Function to add registrar by the supervisor
async function addRegistrarBySupervisor(registrarAddress) {
    try {
        const accounts = await web3.eth.getAccounts();
        const supervisor = accounts[0]; // Assuming the supervisor is the first account
        await aadhaarContract.methods.addRegistrar(registrarAddress).send({ from: supervisor });
        console.log(`Registrar added successfully by supervisor.`);
    } catch (error) {
        console.error(`Error adding registrar: ${error}`);
    }
}

// Function to remove registrar by the supervisor
async function removeRegistrarBySupervisor(registrarAddress) {
    try {
        const accounts = await web3.eth.getAccounts();
        const supervisor = accounts[0]; // Assuming the supervisor is the first account
        await aadhaarContract.methods.removeRegistrar(registrarAddress).send({ from: supervisor });
        console.log(`Registrar removed successfully by supervisor.`);
    } catch (error) {
        console.error(`Error removing registrar: ${error}`);
    }
}


export {addSupervisorByOwner, removeSupervisorByOwner, addRegistrarBySupervisor, removeRegistrarBySupervisor}