import { ethers } from "hardhat";

async function main() {
  const facilitatorContractAddress = "0xc249E01F5F361b862BFCf1c9651A20fDe18A50a4";
  const nftContractAddress = "0x4b07E711e5C9b5bF05e69f8B7fc46F67C81A730A"

  const [signer] = await ethers.getSigners();

  const FacilitatorContract = await ethers.getContractFactory("FacilitatorContract", signer);
  const facilitatorContract = FacilitatorContract.attach(facilitatorContractAddress);

  const borrowPower = await facilitatorContract.borrowPower(signer.address);
  console.log(`Bowwor power for user address ${signer.address}:`, borrowPower);

  const azukiPrice = await facilitatorContract.getNFTPrice(nftContractAddress);
  console.log(`Azuki price:`, azukiPrice);

  const ethPrice = await facilitatorContract.getETHDataFeed();
  console.log(`ETH price:`, ethPrice);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

2473.99130163
