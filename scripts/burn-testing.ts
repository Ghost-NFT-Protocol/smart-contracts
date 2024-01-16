import { ethers } from "hardhat";

async function main() {
  const burnContractAddress = "0x23239FfE9527F9A0Ad37C95f4FC4eFF7D42F0C12";
  const ghoTokenAddress = "0x35a26051F49b140dDa56D5aAFfa46a3DDdAFb524";
  const mintAmount = ethers.utils.parseUnits("1", 18);
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

  // try {
  //   await ghoToken.approve(burnContractAddress, burnAmount);
  //   console.log(`Approved ${burnAmount} GHO tokens for burning.`);

  //   const burnTx = await burnContract.fuckingBurnGho(burnAmount);
  //   await burnTx.wait();
  //   console.log(`Burned ${burnAmount} GHO tokens. Transaction Hash: ${burnTx.hash}`);
  // } catch (error) {
  //   console.error("Burn transaction failed, trying again: ", error);
  //   try {
  //     await ghoToken.approve(burnContractAddress, burnAmount);
  //     console.log(`Approved ${burnAmount} GHO tokens for burning.`);

  //     const retryBurnTx = await burnContract.fuckingBurnGho(burnAmount);
  //     await retryBurnTx.wait();
  //     console.log(`Burned ${burnAmount} GHO tokens on retry. Transaction Hash: ${retryBurnTx.hash}`);
  //   } catch (retryError) {
  //     console.error("Retry of burn transaction also failed: ", retryError);
  //   }
  // }

  await ghoToken.approve(burnContractAddress, burnAmount);
  console.log(`Approved ${burnAmount} GHO tokens for burning.`);

  const burnTx = await burnContract.fuckingBurnGho(burnAmount);
  await burnTx.wait();
  console.log(`Burned ${burnAmount} GHO tokens. Transaction Hash: ${burnTx.hash}`);

  const facilitatorInfoAfter = await ghoToken.getFacilitator(burnContractAddress);
  console.log("After Burning: ", facilitatorInfoAfter);

  // await ghoToken.approve(burnContractAddress, burnAmount);
  // console.log(`Approved ${burnAmount} GHO tokens for burning 2nd time.`);

  // const burnTx2 = await burnContract.fuckingBurnGho(burnAmount);
  // await burnTx2.wait();
  // console.log(`Burned ${burnAmount} GHO tokens in 2nd time. Transaction Hash: ${burnTx2.hash}`);

  // const facilitatorInfoAfter2 = await ghoToken.getFacilitator(burnContractAddress);
  // console.log("After Burning in 2nd time: ", facilitatorInfoAfter2);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
