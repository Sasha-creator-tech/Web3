// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract ConstrParamWeb3 {
    
    uint256 val;
    
    constructor (uint256 _val) public {
        val = _val;
    }
    
    function setVal(uint256 _val) public {
        val = _val;
    }
    
    function getVal () public view returns (uint256) {
        return val;
    }
    
}