import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // URL de Ganache
      accounts: ["0x034909f8acba868137fd99d391cf8e21bfa81b6619f51443934cec3deba13b4b"] // Remplace par ta clé privée sans "0x"
    }
  }

  
};

export default config;
