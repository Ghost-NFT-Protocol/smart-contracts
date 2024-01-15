import { ethers } from "hardhat";

async function main() {
  const ghoTokenAddress = "0xa262061DBDabc152EE62a75d985Fa5dEF8F72B88";
  // const facilitatorAddress = "0x8cF9064B292FEbB17312728af0284B2e6F3a4514";
  const facilitatorAddress = "0x23239FfE9527F9A0Ad37C95f4FC4eFF7D42F0C12";
  const bucketCapacity = ethers.utils.parseUnits("1000", 18);

  const [deployer] = await ethers.getSigners();

  const GhoToken = await ethers.getContractFactory("GhoToken");
  const ghoToken = GhoToken.attach(ghoTokenAddress).connect(deployer);

  // const tx = await ghoToken.addFacilitator(facilitatorAddress, "Facilitator Label", bucketCapacity);
  const tx = await ghoToken.addFacilitator(facilitatorAddress, "Burn 2 Facilitator Label", bucketCapacity);
  await tx.wait();

  console.log(`Facilitator added successfully. Transaction Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
