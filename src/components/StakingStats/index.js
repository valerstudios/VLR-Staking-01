import * as Style from "./style.js";
import { Card, CardContent } from "@mui/material";
import * as Constant from "../../utils/constants.js";
// import {
//   eVlr1Address,
//   eVlrStakerAddress,
//   erc20ABi,
//   evlrStakerAbi,
// } from "../../useStaker.js";
import { useState, useEffect } from "react";
import useStaker from "./../../useStaker.js";
import { usdFormatter } from "../../utils/index.js";
// const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
// const eVlr = new Contract(eVlr1Address, erc20ABi, signer);

export default function StakingStats() {
  const [evlrBalance, setEvlrBalance] = useState(0);
  const [svlrBalance, setSvlrBalance] = useState(0);
  const [charityBalance, setCharityBalance] = useState(0);
  const [rewardOwnership, setRewardOwnership] = useState(0);

  const { staker, mockEvlr } = useStaker();
  useEffect(async () => {
    if (staker) {
      console.log(staker.address);
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_accounts" });
      let balance = await mockEvlr.balanceOf(accounts[0]);
      setEvlrBalance(Number(balance));
      const stakedEvlr = await staker.balanceOf(accounts[0])
      console.log("my balance: ", Number(stakedEvlr))
      let totalSupply = (Number(await staker.totalSupply()));
      console.log("total supply: ", totalSupply)
      let ownershipPercent = (Number(stakedEvlr) *1000)/(totalSupply);
      setRewardOwnership(ownershipPercent)
      let svlrBalance = await staker.totalSupply();
      setSvlrBalance(Number(svlrBalance));
      const charityAddress = await staker.getCharityAddress();
      setCharityBalance(Number(await mockEvlr.balanceOf(charityAddress)));
    }
  }, []);

  return (
    <Style.MainArea>
      <Card>
        <CardContent>
          {Constant.tokenSymbol} balance: {usdFormatter.format(evlrBalance)}
          <br />
          Reward Ownership %<br />{rewardOwnership/1000}%<br />
          Total Staked: <br />
          {usdFormatter.format(svlrBalance)}
          <br />
          Charity Collected: {usdFormatter.format(charityBalance)}
        </CardContent>
      </Card>
    </Style.MainArea>
  );
}
