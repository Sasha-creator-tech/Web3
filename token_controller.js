const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
var Tx = require('ethereumjs-tx').Transaction;
var contractData = fs.readFileSync('C:/Users/USER/Desktop/Web3_deploy_with_constr_param/build/contracts/DudleTokenWeb3.json');
var privKey = new Buffer('9a00a5b3cccaeed0e032fe0c12d645758a5960a713383ccf993062c34735aaf7', 'hex');
var contract = JSON.parse(contractData);
var abi = contract['abi'];
var bytecode = contract['bytecode'];

const provider = new HDWalletProvider(
  'keen happy flash antenna zoo federal fever defy east fatigue still scan',
  'https://ropsten.infura.io/v3/5d455967a1e14ee8889b06f0220b5f75'
);

const web3 = new Web3(provider);

const miniByOwner = async(destAddresses, transferAmount, getBalanceOf) => {
	var owner = '0x6df4530FAC225C828BCe32B9B8449D78ABc6E06A';
	var contractAddress = '0x722eC5c64A4382eB46cDe50078D6a83F1234BD93';
	var contract = new web3.eth.Contract(abi, contractAddress, {
		from: owner
	});
	var gasPriceGwei = 3;
    var gasLimit = 3000000;
    var chainId = 3;
    for (var i = 0; i < destAddresses.length; i++) {
    	var count = await web3.eth.getTransactionCount(owner);
    	console.log('num of transaction: ' + count);
    	var rawTransaction = {
	    	"from": owner,
	    	"nonce": "0x" + count.toString(16),
	    	"gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
	    	"gasLimit": web3.utils.toHex(gasLimit),
	    	"to": contractAddress,
	    	"data": contract.methods.mint(destAddresses[i], transferAmount).encodeABI(),
	    	"chainId": chainId
    	};
	    var tx = new Tx(rawTransaction, {'chain':'ropsten'});
	    tx.sign(privKey);
	    var serializedTx = tx.serialize();
	    console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}\n------------------------`);
	    var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
	    console.log('transacrion hash: ' + receipt.transactionHash);
    }

    //get balance of
    var balance = await contract.methods.balanceOf(getBalanceOf).call();
    console.log('Balance of address :' + getBalanceOf + ' is: ' + balance);
};

// miniByOwner([
// 	//add amount of addresses here as much as you like
// 	'0x0b4104c9c4bf34f82a84C19B06A6dF75B9637781'],
// 	//add here amount of token to mint it on input addresses
// 	 (3 * 1e9),
// 	 //add here address you want to see balance of
// 	'0x0b4104c9c4bf34f82a84C19B06A6dF75B9637781');

const getBalanceOf = async(abiContr, contractAddress, holderAddress) => {
	var contract = new web3.eth.Contract(JSON.parse(abiContr), contractAddress);
	var balance = await contract.methods.balanceOf(holderAddress).call();
    console.log('Balance of address :' + holderAddress + ' is: ' + balance);
};

getBalanceOf(
	//put here abi of the contract
	'[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]',
	//put here address of the contract
	'0xE1E545c89F3996Cf06E1f12C6D05e3412c7C7b11',
	//put here address of the holder to get balance of
 	'0x635a615769f044eaba81f7ae9797d9901a5b09e5');