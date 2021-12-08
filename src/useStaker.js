import { useActiveWeb3React } from "./utils/index.js";
import { chainIdMap } from "./utils/constants";
import { Contract } from "@ethersproject/contracts";

export default () => {
  const { account, library, chainId } = useActiveWeb3React();
  const signer = library.getSigner(account);
  const provider = library.provider;
  const networkName = chainIdMap[chainId];
  const stakerAbi = require("./deployments/" +
    networkName +
    "/EvlrStaker.json");
  const staker = new Contract(stakerAbi.address, stakerAbi.abi, signer);
  const mockEvlrAbi = require("./deployments/" +
    networkName +
    "/MockEVLR1.json");
  const mockEvlr = new Contract(mockEvlrAbi.address, mockEvlrAbi.abi, signer);
  return { staker, mockEvlr, signer, provider };
};
