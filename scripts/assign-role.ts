import { ethers } from "hardhat";

async function main() {
  const ghoTokenAddress = "0x5820e16b311664a9596bbb666917966b58912421";

  const [deployer] = await ethers.getSigners();

  const GhoToken = await ethers.getContractFactory("GhoToken");
  const ghoToken = GhoToken.attach(ghoTokenAddress).connect(deployer);

  const FACILITATOR_MANAGER_ROLE = ethers.utils.id("FACILITATOR_MANAGER_ROLE");

  console.log(`Assigning FACILITATOR_MANAGER_ROLE to ${deployer.address}...`);

  const tx = await ghoToken.grantRole(FACILITATOR_MANAGER_ROLE, deployer.address);
  await tx.wait();

  console.log(`Role assigned successfully to ${deployer.address}. Transaction Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
