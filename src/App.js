import * as Style from "./style.js";
import StatusBar from "./components/MetaMaskDetector/index.js";
import StakingBox from "./components/StakingBox/index.js";
import StakingStats from "./components/StakingStats/index.js";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import NetworkRedirect from "./components/NetworkRedirect/index.js";
import { PendingContext } from "./PendingContext";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 56, 97],
});

function App() {
  const [pendingStatus, setPendingStatus] = useState(false)
  const { account, chainId, active, activate } = useWeb3React();
  useEffect(async () => {
    if (!account) {
      await activate(injected);
    }
  }, []);

  if (active && (chainId == "0x61" || chainId == "0x38")) {
    return (
      <PendingContext.Provider value={{ pendingStatus, setPendingStatus }}>
        <Style.MainArea>
          <StatusBar />
          <Style.StakingArea>
            <Style.StakingNumbers>
              <StakingStats />
            </Style.StakingNumbers>
            <Style.StakingInputs>
              <StakingBox />
            </Style.StakingInputs>
          </Style.StakingArea>
        </Style.MainArea>
      </PendingContext.Provider>
    );
  } else {
    return (
      <Style.MainArea>
        <StatusBar />
        <NetworkRedirect />
      </Style.MainArea>
    );
  }
}

export default App;
