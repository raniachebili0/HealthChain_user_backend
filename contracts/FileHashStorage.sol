// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileHashStorage {
    mapping(string => string) public fileHashes;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _; 
    }

    // Store the file hash (no owner restriction)
    function storeFileHash(string memory filename, string memory hash) public {
        fileHashes[filename] = hash;
    }

    // Retrieve the file hash
    function getFileHash(string memory filename) public view returns (string memory) {
        return fileHashes[filename];
    }

    // Remove a file hash (only by owner)
    function removeFileHash(string memory filename) public onlyOwner {
        delete fileHashes[filename];
    }
}
