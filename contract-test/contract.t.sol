import { expect } from "chai";
import { ethers } from "hardhat";

describe("TrustChain", function () {
  let trustChain: any;

  beforeEach(async function () {
    const TrustChainFactory = await ethers.getContractFactory("TrustChain");
    trustChain = await TrustChainFactory.deploy();
    await trustChain.deployed();
  });

  it("should store and retrieve a hash", async function () {
    const testHash = "QmTestHash123";
    await trustChain.storeHash(testHash);

    const doc = await trustChain.getDocument(0);
    const [owner, hash, timestamp] = doc;
    const [signer] = await ethers.getSigners();
    
    expect(owner).to.equal(signer.address);
    expect(hash).to.equal(testHash);
    expect(timestamp.toNumber()).to.be.greaterThan(0);
  });
});
