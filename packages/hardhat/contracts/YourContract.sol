pragma solidity >=0.6.0 <0.9.0;
//SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract {

  string[] public images;
  mapping (string => bytes32) public moderationLabels;

  constructor() {
    images.push("QmdT7hKV1EfuaXSAYa65KUZWJnxF96yRPZNS9WeG8gUsR2");
    moderationLabels["QmdT7hKV1EfuaXSAYa65KUZWJnxF96yRPZNS9WeG8gUsR2"] = "";
  }

  function getImages() public view returns (string[] memory) {
    return images;
  }
}
