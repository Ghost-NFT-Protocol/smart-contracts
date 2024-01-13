import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const nftContractAddress = "0xef8255ECFd54Cc37E8c85e8F4038dbf384776e58";

  console.log(
    `Deploying contract with the account: ${deployer.address}`
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const NFTCollateralContract = await ethers.getContractFactory("NFTCollateralContract");
  const nftCollateralContract = await NFTCollateralContract.deploy(nftContractAddress);
  await nftCollateralContract.deployed();
  console.log("NFTCollateralContract deployed to:", nftCollateralContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
