import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const nftContractAddress = "0xef8255ECFd54Cc37E8c85e8F4038dbf384776e58";

  console.log(
    `Deploying contracts with the account: ${deployer.address}`
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy GhoToken
  const GhoToken = await ethers.getContractFactory("GhoToken");
  const ghoToken = await GhoToken.deploy(deployer.address);
  await ghoToken.deployed();
  console.log("GhoToken deployed to:", ghoToken.address);

  // Deploy NFTCollateralContract
  const NFTCollateralContract = await ethers.getContractFactory("NFTCollateralContract");
  const nftCollateralContract = await NFTCollateralContract.deploy(nftContractAddress);
  await nftCollateralContract.deployed();
  console.log("NFTCollateralContract deployed to:", nftCollateralContract.address);

  // Deploy FacilitatorContract
  const FacilitatorContract = await ethers.getContractFactory("FacilitatorContract");
  const facilitatorContract = await FacilitatorContract.deploy(nftCollateralContract.address, ghoToken.address);
  await facilitatorContract.deployed();
  console.log("FacilitatorContract deployed to:", facilitatorContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
