import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const ghoTokenAddress = "0xa262061DBDabc152EE62a75d985Fa5dEF8F72B88";

  console.log(
    `Deploying contract with the account: ${deployer.address}`
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const BurnContract = await ethers.getContractFactory("BurnContract");
  const burnContract = await BurnContract.deploy(ghoTokenAddress);
  await burnContract.deployed();
  console.log("BurnContract deployed to:", burnContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
