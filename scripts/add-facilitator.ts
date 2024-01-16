import { ethers } from "hardhat";

async function main() {
  const ghoTokenAddress = "0x35a26051F49b140dDa56D5aAFfa46a3DDdAFb524";
  const facilitatorAddress = "0x23239FfE9527F9A0Ad37C95f4FC4eFF7D42F0C12";
  const bucketCapacity = ethers.utils.parseUnits("1000", 18);

  const [deployer] = await ethers.getSigners();

  const GhoToken = await ethers.getContractFactory("GhoToken");
  const ghoToken = GhoToken.attach(ghoTokenAddress).connect(deployer);

  const tx = await ghoToken.addFacilitator(facilitatorAddress, "Burn Facilitator Label", bucketCapacity);
  await tx.wait();

  console.log(`Facilitator added successfully. Transaction Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
