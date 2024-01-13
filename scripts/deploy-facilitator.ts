import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const ghoTokenAddress = "0xa262061DBDabc152EE62a75d985Fa5dEF8F72B88";
  const nftCollateralContractAddress = "";

  console.log(
    `Deploying contract with the account: ${deployer.address}`
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const FacilitatorContract = await ethers.getContractFactory("FacilitatorContract");
  const facilitatorContract = await FacilitatorContract.deploy(nftCollateralContractAddress, ghoTokenAddress);
  await facilitatorContract.deployed();
  console.log("FacilitatorContract deployed to:", facilitatorContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
