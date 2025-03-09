import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // URL de Ganache
      accounts: ["0x046069045c9868fdd24bd8430dda23232f46629f5febc63a5b1633c8f88ea331"] // Remplace par ta clé privée sans "0x"
    }
  }
};

export default config;
