const hre = require("hardhat");

async function main() {
  const FileHashStorage = await hre.ethers.getContractFactory("FileHashStorage");
  const contract = await FileHashStorage.deploy();
  await contract.waitForDeployment();

  console.log("Contract deployed at:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
