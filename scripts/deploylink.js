async function main() {
  // Fetch contract to deploy
  const OpenSeaPriceFetcher = await ethers.getContractFactory("OpenSeaPriceFetcher");

  // Start deployment, returning a promise that resolves to a contract object
  const openSeaPriceFetcher = await OpenSeaPriceFetcher.deploy();
  await OpenSeaPriceFetcher.deployed();
  console.log("Contract deployed to address:", openSeaPriceFetcher.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
      console.error(error);
      process.exit(1);
  });
