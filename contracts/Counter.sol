// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract TrustChain {
    struct Document {
        address owner;
        string hash;    
        uint256 timestamp;
    }

    Document[] private documents;

    event DocumentStored(address indexed owner, string hash, uint256 timestamp);

    function storeHash(string memory _hash) public {
        require(bytes(_hash).length > 0, "Hash cannot be empty");

        documents.push(Document({
            owner: msg.sender,
            hash: _hash,
            timestamp: block.timestamp
        }));

        emit DocumentStored(msg.sender, _hash, block.timestamp);
    }

    function getAllDocuments() public view returns (Document[] memory) {
        return documents;
    }

    function getDocument(uint256 index) public view returns (address, string memory, uint256) {
        require(index < documents.length, "Invalid index");
        Document memory doc = documents[index];
        return (doc.owner, doc.hash, doc.timestamp);
    }

    function getDocumentCount() public view returns (uint256) {
        return documents.length;
    }
}
