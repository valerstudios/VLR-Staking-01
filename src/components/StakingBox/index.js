import TextField from "@mui/material/TextField";
import * as Style from "./style.js";
import useStaker from "../../useStaker.js";
import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { usdFormatter } from "../../utils/index.js";
import * as Constant from "../../utils/constants.js";
import { PendingContext } from "../../PendingContext";
import LinearProgress from '@mui/material/LinearProgress';

async function stake(staker, mockEvlr, amountStaked, signer, provider2) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  try {
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
  } catch (error) {
    window.location.reload();
  }
}

async function unstake(staker, mockEvlr, amountUnstaked, signer) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  try {
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
      const unstakeTx = await staker.unstake(amountUnstaked);
      await provider.waitForTransaction(unstakeTx.hash);
      window.location.reload();
    }
  } catch (error) {
    window.location.reload();
  }
}

export default function StakingBox() {
  const { pendingStatus, setPendingStatus } = useContext(PendingContext);
  const [inputAmount, setInputAmount] = useState(0);
  const { staker, mockEvlr, signer, provider } = useStaker();
  const [evlrBalance, setEvlrBalance] = useState(0);

  useEffect(async () => {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_accounts" });

    ethereum.on("accountsChanged", async (accounts) => {
      let balance = await mockEvlr.balanceOf(accounts[0]);
      setEvlrBalance(Number(balance));
    });

    if (staker) {
      let balance = await mockEvlr.balanceOf(accounts[0]);
      setEvlrBalance(Number(balance));
    }
  });

  if (pendingStatus) {
    return (
      <Style.PendingBox>
        <h3>Please check your metamask for transaction confirmations.  Transaction times may vary.  Sit tight.</h3>
        <LinearProgress />
      </Style.PendingBox>
    )
  }
  else {
    return (
      <Style.StakingArea>
        <Style.MyBalance>
          My {Constant.tokenSymbol} balance: {usdFormatter.format(evlrBalance)}
        </Style.MyBalance>
        <TextField
          label="Amount to (Un)Stake"
          placeholder="Enter Value"
          variant="filled"
          style={{ background: "white", marginBottom: "1em" }}
          onInput={(e) => setInputAmount(e.target.value)}
        />
        <Style.StakerButton
          variant="contained"
          onClick={() => {
            setPendingStatus(true)
            stake(staker, mockEvlr, inputAmount, signer, provider)
          }}
        >
          Stake
        </Style.StakerButton>
        <Style.StakerButton
          variant="contained"
          onClick={() => {
            setPendingStatus(true)
            unstake(staker, mockEvlr, inputAmount, signer, provider)
          }}
        >
          UnStake
        </Style.StakerButton>
      </Style.StakingArea>
    );
  }
}
