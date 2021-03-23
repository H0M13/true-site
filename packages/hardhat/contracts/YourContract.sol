pragma solidity >=0.6.0 <0.9.0;
//SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
import "hardhat/console.sol";
//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract YourContract is ChainlinkClient {

  string[] public images;
  mapping (string => bytes32) public imagesToModerationLabels;
  mapping (bytes32 => string) public requestIdsToImages;
  address private oracle;
  bytes32 private jobId;
  uint256 private fee;

  constructor() public {
    images.push("QmdT7hKV1EfuaXSAYa65KUZWJnxF96yRPZNS9WeG8gUsR2");
    imagesToModerationLabels["QmdT7hKV1EfuaXSAYa65KUZWJnxF96yRPZNS9WeG8gUsR2"] = "";

    setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
    oracle = 0x09B8eB93195Be2151656E7CF710f8b80B95e8f76;
    jobId = "2bc3a3027d784c50802c4fff43bf8825";
    fee = 0.001 * 10 ** 18; // 0.001 LINK
  }

  function getImages() public view returns (string[] memory) {
    return images;
  }

  function addImage(string memory imageContentHash) public returns (bytes32 requestId) {
    images.push(imageContentHash);

    return requestModerationLabels(imageContentHash);
  }

  function requestModerationLabels(string memory imageContentHash) public returns (bytes32 requestId) 
  {
      Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
      
      request.add("hash", imageContentHash);
      
      requestId = sendChainlinkRequestTo(oracle, request, fee);

      requestIdsToImages[requestId] = imageContentHash;

      return requestId;
  }
  
  function fulfill(bytes32 _requestId, bytes32 _moderationLabelsContentHash) public recordChainlinkFulfillment(_requestId)
  {
      string memory imageContentHash = requestIdsToImages[_requestId];

      imagesToModerationLabels[imageContentHash] = _moderationLabelsContentHash;
  }
}
