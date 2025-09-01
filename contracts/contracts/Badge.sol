// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Badge {
    struct Attendance {
        bool checkedIn;
        uint256 timestamp;
    }

    mapping(address => Attendance) private attendance;
    address public owner;

    event CheckedIn(address indexed attendee, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function checkIn() external {
        require(!attendance[msg.sender].checkedIn, "Already checked in");
        attendance[msg.sender] = Attendance(true, block.timestamp);
        emit CheckedIn(msg.sender, block.timestamp);
    }

    function hasCheckedIn(address user) external view returns (bool, uint256) {
        Attendance memory record = attendance[user];
        return (record.checkedIn, record.timestamp);
    }
}
