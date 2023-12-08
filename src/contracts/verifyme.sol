// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSStorage {
    // mapping user's address to the document type and their corresponding ipfs hash
    mapping(address => mapping(uint256 => string)) private ipfsHashes;
    // mapping user's address to all the document types
    mapping(address => uint[]) private documentTypeMap;

    event IPFSHashAdded(address indexed user, uint documentType, string ipfsHash);

    function addIPFSHash(uint documentType, string memory _ipfsHash) public {
        require(bytes(ipfsHashes[msg.sender][documentType]).length == 0, "Error: Document already added"); 
        
        ipfsHashes[msg.sender][documentType] = _ipfsHash;
        documentTypeMap[msg.sender].push(documentType);

        emit IPFSHashAdded(msg.sender, documentType, _ipfsHash);
    }

    function getMyIPFSHashes(uint documentType) public view returns (string memory) {
        return ipfsHashes[msg.sender][documentType];
    }

    // Function to get IPFS hashes associated with a specific address
    function getIPFSHashes(address _user) public view returns (uint256[] memory) {
        return documentTypeMap[_user];
    }
}
