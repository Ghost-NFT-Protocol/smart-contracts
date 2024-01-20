import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const ghoTokenAddress = "0x5820e16b311664a9596bbb666917966b58912421";

  console.log(
    `Deploying contract with the account: ${deployer.address}`
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const FacilitatorContract = await ethers.getContractFactory("FacilitatorContract");
  const facilitatorContract = await FacilitatorContract.deploy(ghoTokenAddress, deployer.address);
  await facilitatorContract.deployed();
  console.log("FacilitatorContract deployed to:", facilitatorContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
