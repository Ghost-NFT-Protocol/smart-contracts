import { ethers } from "hardhat";

async function main() {
  const burnContractAddress = "0x403a192aE6c938E2290d2e4C62338B965379f747";
  const ghoTokenAddress = "0x35a26051F49b140dDa56D5aAFfa46a3DDdAFb524";
  const mintAmount = ethers.utils.parseUnits("1", 18);
  const burnAmount = ethers.utils.parseUnits("1", 18);

  const [signer] = await ethers.getSigners();

  const BurnContract = await ethers.getContractFactory("BurnContract2", signer);
  const burnContract = BurnContract.attach(burnContractAddress);

  const ghoToken = await ethers.getContractAt("IGhoToken", ghoTokenAddress, signer);

  const facilitatorInfoBefore = await ghoToken.getFacilitator(burnContractAddress);
  console.log("Before Minting: ", facilitatorInfoBefore);

  const mintTx = await burnContract.mintGho(mintAmount);
  await mintTx.wait();
  console.log(`Minted ${mintAmount} GHO tokens. Transaction Hash: ${mintTx.hash}`);

  const facilitatorInfo = await ghoToken.getFacilitator(burnContractAddress);
  console.log("After Minting: ", facilitatorInfo);

  const transferTx = await ghoToken.transfer(burnContractAddress, burnAmount);
  await transferTx.wait();
  console.log(`Transferred ${burnAmount} GHO tokens to Burn Contract. Transaction Hash: ${transferTx.hash}`);

  const burnTx = await burnContract.burnGho(burnAmount);
  await burnTx.wait();
  console.log(`Burned ${burnAmount} GHO tokens. Transaction Hash: ${burnTx.hash}`);

  const facilitatorInfoAfter = await ghoToken.getFacilitator(burnContractAddress);
  console.log("After Burning: ", facilitatorInfoAfter);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
