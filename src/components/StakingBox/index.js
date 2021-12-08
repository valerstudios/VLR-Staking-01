import TextField from "@mui/material/TextField";
import * as Style from "./style.js";
import useStaker from "../../useStaker.js";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

async function stake(staker, mockEvlr, amountStaked, signer, provider2) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const permission = await mockEvlr.allowance(signer._address, staker.address);
  if (permission < amountStaked) {
    const approvalTx = await mockEvlr.approve(
      staker.address,
      amountStaked + 100
    );
    await provider.waitForTransaction(approvalTx.hash);
    const stakeTx = await staker.stake(amountStaked);
    await provider.waitForTransaction(stakeTx.hash);
    window.location.reload();
  } else {
    const stakeTx = await staker.stake(amountStaked);
    await provider.waitForTransaction(stakeTx.hash);
    window.location.reload();
  }
}

async function unstake(staker, mockEvlr, amountUnstaked, signer) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const permission = await mockEvlr.allowance(signer._address, staker.address);


  if (permission < amountUnstaked) {
    const approvalTx = await mockEvlr.approve(
      staker.address,
      amountUnstaked + 100
    );
    await provider.waitForTransaction(approvalTx.hash);
    const unstakeTx = await staker.unstake(amountUnstaked);
    await provider.waitForTransaction(unstakeTx.hash);
    window.location.reload();
    } else {
      // const unstakeTx = await staker.unstake(amountUnstaked);
      // await provider.waitForTransaction(unstakeTx.hash);
      window.location.reload();
  }
}

export default function StakingBox() {
  const [inputAmount, setInputAmount] = useState(0);
  const { staker, mockEvlr, signer, provider } = useStaker();

  return (
    <Style.StakingArea>
      <Style.StakerInput onInput={(e) => setInputAmount(e.target.value)} />
      <Style.StakerButton
        onClick={() => stake(staker, mockEvlr, inputAmount, signer, provider)}
      >
        Stake
      </Style.StakerButton>
      <Style.StakerButton
        onClick={() => unstake(staker, mockEvlr, inputAmount, signer, provider)}
      >
        UnStake
      </Style.StakerButton>
    </Style.StakingArea>
  );
}
