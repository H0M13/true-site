/**
 * Here's a little converter to help you decode IPFS hashes which have been converted to bytes32 format.
 * To use it just type in your terminal: `node .\bytes32ToIpfsHashConverter.js {your_bytes32_content}`.
 */

const bs58 = require("bs58");

const customArgs = process.argv.slice(2);

const getIpfsHashFromBytes32 = bytes32Hex => {
    const hashHex = "1220" + bytes32Hex.slice(2);
    const hashBytes = Buffer.from(hashHex, "hex");
    const hashStr = bs58.encode(hashBytes);
    return hashStr;
  };

console.log(getIpfsHashFromBytes32(customArgs[0]));

