import { ethers } from "hardhat";

async function main() {
  const nftContractAddress = "0x4b07E711e5C9b5bF05e69f8B7fc46F67C81A730A";
  const operatorAddress = "0xc249E01F5F361b862BFCf1c9651A20fDe18A50a4"; // Replace with the operator's address

  const [signer] = await ethers.getSigners();

  // Attach to the NFT contract
  const NFTContract = await ethers.getContractAt("IERC721", nftContractAddress, signer);

  // Revoke approval for all
  const revokeTx = await NFTContract.setApprovalForAll(operatorAddress, false);
  await revokeTx.wait();

  console.log(`Approval for all revoked for operator ${operatorAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
