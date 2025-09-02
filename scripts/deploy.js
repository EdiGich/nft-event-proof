const hre = require("hardhat");

async function main() {
  const myNFT = await hre.ethers.deployContract("MyNFT");

  await myNFT.waitForDeployment();

  console.log(`MyNFT deployed to: ${myNFT.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
