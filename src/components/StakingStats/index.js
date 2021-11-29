import * as Style from "./style.js";
import { Card, CardContent } from "@mui/material";
import * as Constant from "../../constants.js";
import {
  eVlr1Address,
  eVlrStakerAddress,
  erc20ABi,
  evlrStakerAbi,
} from "../../smartContracts/contractAbis.js";
import { Contract, ethers } from "ethers";
import { useState, useEffect } from "react";

const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
const eVlr = new Contract(eVlr1Address, erc20ABi, signer);

export default function StakingStats() {
  const [evlrBalance, setEvlrBalance] = useState(0);

  useEffect(async () => {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_accounts" });
    let balance = await eVlr.balanceOf(accounts[0]);
    setEvlrBalance(Number(balance));
  }, []);

  return (
    <Style.MainArea>
      <Card>
        <CardContent>
          {Constant.tokenSymbol} balance: {evlrBalance}
          <br />
          Reward Ownership %<br />
        </CardContent>
      </Card>
    </Style.MainArea>
  );
}
