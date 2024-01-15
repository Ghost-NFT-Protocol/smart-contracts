import { ethers } from "hardhat";

async function main() {
  const ghoTokenAddress = "0xa262061DBDabc152EE62a75d985Fa5dEF8F72B88";
  const bucketCapacity = ethers.utils.parseUnits("1", 18);
  const mintAmount = ethers.utils.parseUnits("1", 18);
  const burnAmount = ethers.utils.parseUnits("0.5", 18);

  const [deployer] = await ethers.getSigners();

  const GhoToken = await ethers.getContractFactory("GhoToken");
  const ghoToken = GhoToken.attach(ghoTokenAddress).connect(deployer);

  // Add yourself as a facilitator
  const addFacilitatorTx = await ghoToken.addFacilitator(deployer.address, "My Facilitator Label", bucketCapacity);
  await addFacilitatorTx.wait();
  console.log(`Added as facilitator. Transaction Hash: ${addFacilitatorTx.hash}`);

  // Mint GHO tokens
  const mintTx = await ghoToken.mint(deployer.address, mintAmount);
  await mintTx.wait();
  console.log(`Minted ${mintAmount} GHO tokens. Transaction Hash: ${mintTx.hash}`);

  // Burn GHO tokens
  const burnTx = await ghoToken.burn(burnAmount);
  await burnTx.wait();
  console.log(`Burned ${burnAmount} GHO tokens. Transaction Hash: ${burnTx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
