import { ethers } from "hardhat";

async function main() {
  const facilitatorContractAddress = "0x8cF9064B292FEbB17312728af0284B2e6F3a4514";
  const ghoTokenAddress = "0xa262061DBDabc152EE62a75d985Fa5dEF8F72B88";
  const tokenId = 21;
  const amountToRepay = ethers.utils.parseEther("1.5");
  console.log("Amount to repay:", amountToRepay.toString());

  const [signer] = await ethers.getSigners();

  // Connect to the GhoToken Contract
  const GhoToken = await ethers.getContractFactory("GhoToken", signer);
  const ghoToken = GhoToken.attach(ghoTokenAddress);

  // Get the user's GHO token balance
  const userBalance = await ghoToken.balanceOf(signer.address);
  console.log(`User's GHO token balance: ${userBalance.toString()}`);
  
  // Get the facilitator bucket level
  const bucket = await ghoToken.getFacilitatorBucket(facilitatorContractAddress);
  console.log(`Bucket capacity: ${bucket[0].toString()}, Bucket level: ${bucket[1].toString()}`);

  if (userBalance.lt(amountToRepay)) {
    throw new Error("Insufficient GHO tokens to repay.");
  }

  // Connect to the FacilitatorContract
  const FacilitatorContract = await ethers.getContractFactory("FacilitatorContract", signer);
  const facilitatorContract = FacilitatorContract.attach(facilitatorContractAddress);

  // Repay GHO and retrieve NFT
  await facilitatorContract.repayGhoAndRetrieveNFT(tokenId, amountToRepay);
  console.log(`Repaid GHO and retrieved NFT with tokenId ${tokenId}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
