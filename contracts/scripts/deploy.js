const hre = require("hardhat");

async function main() {
  const Badge = await hre.ethers.getContractFactory("Badge");
  const badge = await Badge.deploy();

  await badge.deployed();

  console.log("Badge deployed to:", badge.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
