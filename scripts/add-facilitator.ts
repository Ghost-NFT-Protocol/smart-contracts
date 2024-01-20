import { ethers } from "hardhat";

async function main() {
  const ghoTokenAddress = "0x5820e16b311664a9596bbb666917966b58912421";
  const facilitatorAddress = "0xc249E01F5F361b862BFCf1c9651A20fDe18A50a4";
  const bucketCapacity = ethers.utils.parseUnits("1000000", 18);

  const [deployer] = await ethers.getSigners();

  const GhoToken = await ethers.getContractFactory("GhoToken");
  const ghoToken = GhoToken.attach(ghoTokenAddress).connect(deployer);

  const tx = await ghoToken.addFacilitator(facilitatorAddress, "NFT Facilitator", bucketCapacity);
  await tx.wait();

  console.log(`Facilitator added successfully. Transaction Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
