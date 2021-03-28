pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;
//SPDX-License-Identifier: MIT
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract YourContract is ChainlinkClient {

  string[] public images;
  mapping (string => bytes32) public imagesToModerationLabels;
  mapping (bytes32 => string) public requestIdsToImages;
  address private oracle;
  bytes32 private jobId;
  uint256 private fee;

  /// Emitted when an image is stored in the 'images' public variable
  event ImageAdded(string _imageContentHash);

  /// Emitted when Chainlink request has successfully returned moderation label result
  event ModerationCompleted(string _imageContentHash, bytes32 _moderationLabels);

  /**
   * Network: Mumbai Testnet
   * Oracle: 0xAcBfAF35Aa28Cb45beC5f21dad6478fA445fFcC5
   * Job ID: e381e964377d4f978d534fa0973e4d73
   * Fee: 0.001 LINK
   */
  constructor() public {
    setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
    oracle = 0xAcBfAF35Aa28Cb45beC5f21dad6478fA445fFcC5;
    jobId = "e381e964377d4f978d534fa0973e4d73";
    fee = 0.001 * 10 ** 18; // 0.001 LINK
  }

  /// @notice Get all stored images
  /// @return Array of image IPFS content hashes
  function getImages() public view returns (string[] memory) {
    return images;
  }

  /// @notice Add an image by IPFS content hash and request moderation labels from Chainlink node
  /// @param _imageContentHash - IPFS content hash of image to store
  /// @return requestId - ID of Chainlink request
  function addImage(string memory _imageContentHash) public returns (bytes32 requestId) {
    images.push(_imageContentHash);
    emit ImageAdded(_imageContentHash);

    return requestModerationLabels(_imageContentHash);
  }

  /// @notice Request moderation labels from Chainlink node
  /// @param _imageContentHash - IPFS content hash of image to get moderation labels for
  /// @return requestId - ID of Chainlink request
  function requestModerationLabels(string memory _imageContentHash) public returns (bytes32 requestId) 
  {
      Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
      
      request.add("hash", _imageContentHash);
      
      requestId = sendChainlinkRequestTo(oracle, request, fee);

      requestIdsToImages[requestId] = _imageContentHash;

      return requestId;
  }
  
  /// @notice Callback function to receive response
  /// @param _requestId - ID of Chainlink request
  /// @param _moderationLabelsBytes32 - The resulting moderation labels in bytes32 format
  /// @dev The response is a bytes32 which must be converted to an IPFS content hash in client code
  function fulfill(bytes32 _requestId, bytes32 _moderationLabelsBytes32) public recordChainlinkFulfillment(_requestId)
  {
      string memory imageContentHash = requestIdsToImages[_requestId];
    
      imagesToModerationLabels[imageContentHash] = _moderationLabelsBytes32;

      emit ModerationCompleted(imageContentHash, _moderationLabelsBytes32);
  }
}
