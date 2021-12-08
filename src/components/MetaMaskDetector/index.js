import React, { useState, useEffect } from "react";
import * as S from "./style.js";
import detectEthereumProvider from "@metamask/detect-provider";
import MetaMaskOnboarding from "@metamask/onboarding";
import Tooltip from "@mui/material/Tooltip";

const statusColorCode = {
  true: "#76977D",
  false: "#DC7260",
  neither: "grey",
};

export default function StatusBar() {
  //function to copy address of connected metamask account
  const addressCopy = async () => {
    let copyText = await getConnectedAccount();
    let copyAddy = await copyText[0][0];
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = copyAddy;
    document.body.appendChild(tempTextArea);
    navigator.clipboard.writeText(tempTextArea.value);
    document.body.removeChild(tempTextArea);
  };

  //Function creates actions when connection status or connected address changes
  const connectionAction = async (foundStatus) => {
    if (foundStatus == true) {
      setConnectText("\u2713 Connected");
      setStatusColor(statusColorCode.true);
      setConnectDisable(true);
      setDisplayStatus("flex");
      getConnectedAccount().then((result) => {
        setConnectedAddress(result[0][0]);
        if (result[1] == "0x61") setConnectedChain("BSC Test");
        else if (result[1] == "0x38") setConnectedChain("BSC Mainnet");
        else {
          setConnectedChain("Unknown Chain");
        }
      });
      setConnectBackground("green");
      setConnectTextColor("white");
    } else {
      setStatusColor(statusColorCode.false);
      setConnectText("Connect Account");
      setConnectDisable(false);
      setDisplayStatus("none");
      setConnectBackground("white");
      setConnectTextColor("red");
    }
  };

  //Ethereum.isMetaMask and detectEthereumProvider look for metamask installed in the browser.
  //When both are true, you can be sure MetaMask is installed.
  const isMetaMaskInstalled = async () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    let value = await detectEthereumProvider();

    return Boolean(ethereum && ethereum.isMetaMask && value === ethereum);
  };

  //enable metamask installation button, used in the onClickInstall Function
  const onboarding = new MetaMaskOnboarding();

  //Function to install metamask
  const onClickInstall = () => {
    setInstallText("Reload After Install");
    onboarding.startOnboarding();
  };

  //function to connect to a chain
  const onClickConnect = async () => {
    try {
      const { ethereum } = window;
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error(error);
    }
  };

  //function to collect connected account and chain information.
  //returns values in an array
  const getConnectedAccount = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_accounts" });
      const chainId = await ethereum.request({ method: "eth_chainId" });
      return [accounts, chainId];
    } catch (error) {
      console.log(error);
    }
  };

  let installed = false;
  let [installText, setInstallText] = useState("Searching for MetaMask");
  let [connectText, setConnectText] = useState("Connect Account");
  let [statusColor, setStatusColor] = useState(statusColorCode.neither);
  let [connectDisable, setConnectDisable] = useState(true);
  let [installButtonColor, setInstallButtonColor] = useState();
  let [displayStatus, setDisplayStatus] = useState("none");
  let [connectedAddress, setConnectedAddress] = useState("0x0000000000000000000000000000000000000000");
  let [connectedChain, setConnectedChain] = useState();
  let [connectBackground, setConnectBackground] = useState(statusColorCode.neither);
  let [connectTextColor, setConnectTextColor] = useState({ statusColor });

  useEffect(async () => {
    const { ethereum } = window;
    installed = await isMetaMaskInstalled();
    if (installed) {
      setInstallButtonColor(statusColorCode.true);
      setInstallText("MetaMask Installed");
      setConnectDisable(false);
      let activeAccounts = await getConnectedAccount();
      if (activeAccounts[0].length > 0) {
        connectionAction(true);
      } else {
        connectionAction(false);
      }

      ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          connectionAction(true);
        } else {
          window.location.reload();
        }
      });
    } else {
      setInstallText("Click To Install MetaMask");
      setInstallButtonColor(statusColorCode.false);
      setConnectDisable(true);
      setStatusColor("grey");
    }
  }, []);

  return (
    <S.Bar>
      <S.InstallStatus
        color={installButtonColor}
        onClick={(e) => (installButtonColor==statusColorCode.true ? e.preventDefault() : onClickInstall())}
      >
        {installText}
      </S.InstallStatus>
      <S.Dot color={statusColor}></S.Dot>
      <S.Dot color={statusColor}></S.Dot>
      <S.Dot color={statusColor}></S.Dot>
      <S.Arrow color={statusColor}>{"\u25bc"}</S.Arrow>
      <S.Connect
        background={statusColor}
        disabled={connectDisable}
        color={connectTextColor}
        onClick={() => onClickConnect()}
      >
        {connectText}
      </S.Connect>
      <S.AccountDetails background={statusColor} display={displayStatus}>
        <S.AddressRow>
          <Tooltip title="Click to Copy Full Address" arrow>
            <S.CopyAccount onClick={() => addressCopy()}>
              Address: <b>{connectedAddress.slice(0,5)} ... {connectedAddress.slice(38, 42)}</b>
            </S.CopyAccount>
          </Tooltip>
          <S.AccountLine>
            Chain: <b>{connectedChain}</b>
          </S.AccountLine>
        </S.AddressRow>
      </S.AccountDetails>
    </S.Bar>
  );
}
