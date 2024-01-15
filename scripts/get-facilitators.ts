import { ethers } from "hardhat";

async function main() {
  const ghoTokenAddress = "0xa262061DBDabc152EE62a75d985Fa5dEF8F72B88";
  const burnContractAddress = "0x74d9E530616b44Ea48D3A06F47A25dFc9E1CE906";

  const [deployer] = await ethers.getSigners();

  const GhoToken = await ethers.getContractFactory("GhoToken");
  const ghoToken = GhoToken.attach(ghoTokenAddress).connect(deployer);

  // const tx = await ghoToken.addFacilitator(facilitatorAddress, "Burn 2 Facilitator Label", bucketCapacity);
  // await tx.wait();
  // const facilitatorsList = await ghoToken.getFacilitatorsList();
  // console.log(facilitatorsList);

  // let facilitator = null;

  // for (facilitator of facilitatorsList) {
  //   const facilitatorInfo = await ghoToken.getFacilitator(facilitator);
  //   console.log(facilitatorInfo);
  // }

  const facilitatorInfo = await ghoToken.getFacilitator(burnContractAddress);
  console.log(facilitatorInfo);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
