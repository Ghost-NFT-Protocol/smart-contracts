import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const ghoTokenAddress = "0xa262061DBDabc152EE62a75d985Fa5dEF8F72B88";

  console.log(
    `Deploying contract with the account: ${deployer.address}`
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const GhoMintingContract = await ethers.getContractFactory("GhoMintingContract");
  const ghoMintingContract = await GhoMintingContract.deploy(ghoTokenAddress);
  await ghoMintingContract.deployed();
  console.log("GhoMintingContract deployed to:", ghoMintingContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
