// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentRegistry {
    address public owner;
    
    mapping(address => mapping(uint => string)) private documentHashes;
    mapping(address => mapping(uint => address)) private documentIssuers;
    mapping(address => bool) private shortlistedIssuer;

    event DocumentAdded(address indexed student, uint documentType, string ipfsHash, address issuer);
    event DocumentVerified(address indexed student, uint documentType, address issuer, bool isVerified);
    event AllDocs(string[] allDocs);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner!");
        _;
    }

    modifier isIssuer {
        require(shortlistedIssuer[msg.sender], "Not the credential issuer");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addIssuer(address _issuer) external  onlyOwner {
        shortlistedIssuer[_issuer] = true;
    }

    function addDocument(address _student, uint _documentType, string memory _ipfsHash) external isIssuer {
        documentHashes[_student][_documentType] = _ipfsHash;
        documentIssuers[_student][_documentType] = msg.sender;
        emit DocumentAdded(_student, _documentType, _ipfsHash, msg.sender);
    }

    function getDocumentHash(address _student, uint _documentType) external view returns (string memory) {
        return documentHashes[_student][_documentType];
    }

    function getDocumentIssuer(address _student, uint _documentType) external view returns (address) {
        return documentIssuers[_student][_documentType];
    }

    function isDocumentVerified(address _student, uint _documentType) external view returns (bool) {
        address _issuer = documentIssuers[_student][_documentType];
        return shortlistedIssuer[_issuer];
    }

    function getAllDocumentHashes(address _student) external {
        require(_student == msg.sender,"Cannot access!");
        string[] memory allHashes = new string[](5); // Assuming there are 5 document types

        allHashes[0] = documentHashes[_student][1];
        allHashes[1] = documentHashes[_student][2];
        allHashes[2] = documentHashes[_student][3];
        allHashes[3] = documentHashes[_student][4];
        allHashes[4] = documentHashes[_student][5];

        emit AllDocs(allHashes);
    }
}