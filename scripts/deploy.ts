import { ethers, run, network } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    `Deploying contracts with the account: ${deployer.address}`
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy GhoToken
  const GhoToken = await ethers.getContractFactory("GhoToken");
  const ghoToken = await GhoToken.deploy(deployer.address);
  await ghoToken.deployed();
  console.log("GhoToken deployed to:", ghoToken.address);

  // Deploy GhoMintingContract
  const GhoMintingContract = await ethers.getContractFactory("GhoMintingContract");
  const ghoMintingContract = await GhoMintingContract.deploy(ghoToken.address);
  await ghoMintingContract.deployed();
  console.log("GhoMintingContract deployed to:", ghoMintingContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
