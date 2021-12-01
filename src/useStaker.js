import { useActiveWeb3React } from "./utils/index.js";
import { chainIdMap } from "./utils/constants";

export default () => {
  const { account, library, chainId } = useActiveWeb3React();
  console.log(chainId);
  const networkName = chainIdMap[chainId];
  const stakerAbi = require("./deployments/" +
    networkName +
    "/EvlrStaker.json");
  console.log(stakerAbi);
  return { stakerAbi };
};
