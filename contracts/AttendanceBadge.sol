// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AttendanceBadge is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(address => bool) public hasMinted;

    constructor() ERC721("AttendanceBadge", "ATDB") {}

    function mintBadge() external {
        require(!hasMinted[msg.sender], "Already minted");
        _safeMint(msg.sender, nextTokenId++);
        hasMinted[msg.sender] = true;
    }
}
