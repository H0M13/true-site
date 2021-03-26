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
    setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
    oracle = 0xAcBfAF35Aa28Cb45beC5f21dad6478fA445fFcC5;
    jobId = "e381e964377d4f978d534fa0973e4d73";
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
