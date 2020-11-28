const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
var contractData = fs.readFileSync('C:/Users/USER/Desktop/Web3_deploy_with_constr_param/build/contracts/ConstrParamWeb3.json');
var contract = JSON.parse(contractData);
var abi = contract['abi'];
var bytecode = contract['bytecode'];

const provider = new HDWalletProvider(
  'keen happy flash antenna zoo federal fever defy east fatigue still scan',
  'https://ropsten.infura.io/v3/5d455967a1e14ee8889b06f0220b5f75'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);


  const result = await new web3.eth.Contract(abi);
    .deploy({data:bytecode, arguments:[120]})
    .send({gas:'1000000', from: accounts[0]});

  console.log('Contract deployed to ', result.options.address);
};
deploy();