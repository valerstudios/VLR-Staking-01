import * as Style from "./style.js";
import { Card, CardContent } from "@mui/material";
import * as Constant from "../../utils/constants.js";

import { useState, useEffect } from "react";
import useStaker from "./../../useStaker.js";
import { usdFormatter } from "../../utils/index.js";

export default function StakingStats() {
  const [svlrBalance, setSvlrBalance] = useState(0);
  const [charityBalance, setCharityBalance] = useState(0);
  const [rewardOwnership, setRewardOwnership] = useState(0);

  const { staker } = useStaker();
  useEffect(async () => {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_accounts" });

    ethereum.on("accountsChanged", async (accounts) => {
      const stakedEvlr = await staker.balanceOf(accounts[0]);
      console.log("my balance: ", Number(stakedEvlr));
      let totalSupply = Number(await staker.totalSupply());
      console.log("total supply: ", totalSupply);
      let ownershipPercent = (Number(stakedEvlr) * 1000) / totalSupply;
      setRewardOwnership(ownershipPercent);
      let svlrBalance = await staker.totalSupply();
      setSvlrBalance(Number(svlrBalance));
      const charityTotal = await staker.getTotalCharityCollected();
      setCharityBalance(Number(charityTotal));
    });
    if (staker) {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      const stakedEvlr = await staker.balanceOf(accounts[0]);
      console.log("my balance: ", Number(stakedEvlr));
      let totalSupply = Number(await staker.totalSupply());
      console.log("total supply: ", totalSupply);
      let ownershipPercent = (Number(stakedEvlr) * 1000) / totalSupply;
      setRewardOwnership(ownershipPercent);
      let svlrBalance = await staker.totalSupply();
      setSvlrBalance(Number(svlrBalance));
      const charityTotal = await staker.getTotalCharityCollected();
      console.log(Number(charityTotal));
      setCharityBalance(Number(charityTotal));
    }
  }, []);

  return (
    <Style.MainArea>
      <Style.Title>EVLR Staking Pool</Style.Title>
      <Style.StatLine>
        Total Staked:{" "}
        {svlrBalance > 0 ? usdFormatter.format(svlrBalance) : null}
      </Style.StatLine>
      <Style.StatLine>
        Total Sent to Charity Bag:{" "}
        {charityBalance > 0 ? usdFormatter.format(charityBalance) : null}
      </Style.StatLine>
      <Style.StatLine>
        My pool share:{" "}
        {rewardOwnership > 0 ? ((rewardOwnership / 10).toFixed(4)).toString()+ "%" : null}
      </Style.StatLine>
    </Style.MainArea>
  );
}
