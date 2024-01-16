import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const ghoTokenAddress = "0x35a26051F49b140dDa56D5aAFfa46a3DDdAFb524";

  console.log(
    `Deploying contract with the account: ${deployer.address}`
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const BurnContract = await ethers.getContractFactory("BurnContract2");
  const burnContract = await BurnContract.deploy(ghoTokenAddress);
  await burnContract.deployed();
  console.log("BurnContract2 deployed to:", burnContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
