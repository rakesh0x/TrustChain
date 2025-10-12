// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {TrustChain} from "./Counter.sol";
import {Test} from "forge-std/Test.sol";

contract CounterTest is Test {
  TrustChain trustChain;

  function setUp() public {
    trustChain = new TrustChain();
  }

  function test_StoreAndGetHash() public {
    string memory testHash = "QmTestHash123";
    trustChain.storeHash(testHash);

    (address owner, string memory hash, uint256 timestamp) = trustChain.getDocument(0);
    assertEq(owner, address(this), "Owner should be the test contract address");
    assertEq(hash, testHash, "Hash should match the stored hash");
    assertTrue(timestamp > 0, "Timestamp should be greater than 0");
  }

  function test_GetDocumentCount() public {
    assertEq(trustChain.getDocumentCount(), 0, "Initial document count should be 0");
    trustChain.storeHash("hash1");
    trustChain.storeHash("hash2");
    assertEq(trustChain.getDocumentCount(), 2, "Document count should be 2 after storing two hashes");
  }

  function test_RevertOnEmptyHash() public {
    vm.expectRevert("Hash cannot be empty");
    trustChain.storeHash("");
  }

  function test_RevertOnInvalidIndex() public {
    vm.expectRevert("Invalid index");
    trustChain.getDocument(0);
  }
}
