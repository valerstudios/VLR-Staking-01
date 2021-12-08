import * as Style from "./style.js";
import StatusBar from "./components/MetaMaskDetector/index.js";
import StakingBox from "./components/StakingBox/index.js";
import StakingStats from "./components/StakingStats/index.js";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { isMetaMaskInstalled } from "./utils/index.js";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 56, 97],
});

function App() {
  const { account, chainId, active, activate } = useWeb3React();
  useEffect(async () => {
    if (!account) {
      await activate(injected);
    }
  }, []);

  if(active){
  return (
    <Style.MainArea>
      <StatusBar />
      <StakingBox />
      <StakingStats />
    </Style.MainArea>
  );}
  else{
    return(
      <Style.MainArea>
      <StatusBar />
    </Style.MainArea>
    )
  }
}

export default App;
