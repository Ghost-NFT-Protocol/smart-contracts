import { ethers } from "hardhat";

async function main() {
  const ghoMintingContractAddress = "0xf06B79d489Fc924eBe08bCF7ECbEB2C18EDD0322";

  // Get the signer who will interact with the contract
  const [signer] = await ethers.getSigners();

  // Attach the signer to the deployed GhoMintingContract
  const GhoMintingContract = await ethers.getContractFactory("GhoMintingContract");
  const ghoMintingContract = GhoMintingContract.attach(ghoMintingContractAddress).connect(signer);

  // Call the mintGho function
  const transaction = await ghoMintingContract.mintGho();
  await transaction.wait();

  console.log(`GHO tokens minted successfully. Transaction Hash: ${transaction.hash}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
