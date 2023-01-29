// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LicenseToken is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    struct Details {
        string title;
        string authorName;
        string abst;
        string bg;
        string des;
        string claims;
        string nftUrl;   
        string []drawings;
    }
    
    uint256 number;
    Details tmp;

    mapping(string => uint8) existingURIs;
    
    mapping(string => Details) db;

    Counters.Counter public _tokenIdCounter;

    constructor() ERC721("LicenseTokens", "LTK") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
    function count() public view returns (uint256) {
        return number;
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }

    function returnToken(string memory licenseNum) view public returns (Details memory) {
        return db[licenseNum];
    }

    function payToMint(
        address recipient,
        string memory licenseNum,
        string memory title,
        string memory authorName,
        string memory abst,
        string memory bg,
        string memory des,
        string memory claims,
        string memory nftUrl,
        string[] memory drawings
    ) public payable returns (uint256) {
        require(existingURIs[licenseNum] != 1, 'NFT already minted!');
        require (msg.value >= 0.05 ether, 'Need to pay up!');


        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        number++;
        existingURIs[licenseNum] = 1;

        tmp = Details(title, authorName, abst, bg, des, claims, nftUrl, drawings);
        db[licenseNum] = tmp;

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, licenseNum);

        return newItemId;
    }
}