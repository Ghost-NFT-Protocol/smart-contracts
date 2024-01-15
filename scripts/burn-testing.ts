import { ethers } from "hardhat";

async function main() {
  const burnContractAddress = "0x23239FfE9527F9A0Ad37C95f4FC4eFF7D42F0C12";
  const ghoTokenAddress = "0xa262061DBDabc152EE62a75d985Fa5dEF8F72B88";
  const mintAmount = ethers.utils.parseUnits("2", 18);
  const burnAmount = ethers.utils.parseUnits("1", 18);

  const [signer] = await ethers.getSigners();

  const BurnContract = await ethers.getContractFactory("BurnContract", signer);
  const burnContract = BurnContract.attach(burnContractAddress);

  const ghoToken = await ethers.getContractAt("IGhoToken", ghoTokenAddress, signer);

  const facilitatorInfoBefore = await ghoToken.getFacilitator(burnContractAddress);
  console.log("Before Minting: ", facilitatorInfoBefore);

  const mintTx = await burnContract.mintGho(mintAmount);
  await mintTx.wait();
  console.log(`Minted ${mintAmount} GHO tokens. Transaction Hash: ${mintTx.hash}`);

  const facilitatorInfo = await ghoToken.getFacilitator(burnContractAddress);
  console.log("After Minting: ", facilitatorInfo);

  await ghoToken.approve(burnContractAddress, burnAmount);
  console.log(`Approved ${burnAmount} GHO tokens for burning.`);

  const burnTx = await burnContract.fuckingBurnGho(burnAmount);
  await burnTx.wait();
  console.log(`Burned ${burnAmount} GHO tokens. Transaction Hash: ${burnTx.hash}`);

  const facilitatorInfoAfter = await ghoToken.getFacilitator(burnContractAddress);
  console.log("After Burning: ", facilitatorInfoAfter);

  await ghoToken.approve(burnContractAddress, burnAmount);
  console.log(`Approved ${burnAmount} GHO tokens for burning 2nd time.`);

  const burnTx2 = await burnContract.fuckingBurnGho(burnAmount);
  await burnTx2.wait();
  console.log(`Burned ${burnAmount} GHO tokens 2nd time. Transaction Hash: ${burnTx.hash}`);

  const facilitatorInfoAfter2 = await ghoToken.getFacilitator(burnContractAddress);
  console.log("After Burning 2nd time: ", facilitatorInfoAfter2);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
