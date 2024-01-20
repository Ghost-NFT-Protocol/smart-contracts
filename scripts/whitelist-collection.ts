import { ethers } from "hardhat";

async function main() {
  const facilitatorAddress = "0xc249E01F5F361b862BFCf1c9651A20fDe18A50a4";

  const collectionAddress = "0x4b07E711e5C9b5bF05e69f8B7fc46F67C81A730A";
  const priceFeedAddress = "0xB677bfBc9B09a3469695f40477d05bc9BcB15F50";

  const [deployer] = await ethers.getSigners();

  const FacilitatorContract = await ethers.getContractFactory("FacilitatorContract");
  const facilitatorContract = FacilitatorContract.attach(facilitatorAddress).connect(deployer);

  const tx = await facilitatorContract.whitelistCollection(collectionAddress, priceFeedAddress);
  await tx.wait();

  console.log(`Collection whitelisted successfully. Transaction Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
