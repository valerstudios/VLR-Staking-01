//@ts-nocheck
import detectEthereumProvider from "@metamask/detect-provider";
import { getAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { AddressZero } from "@ethersproject/constants";
import { useWeb3React as useWeb3ReactCore } from "@web3-react/core";
import { ethers } from "ethers";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/styles";


export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// account is not optional
export function getSigner(
  library,
  account
) {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library,
  account
) {
  return account ? getSigner(library, account) : library;
}

export function getContract(
  address,
  ABI,
  library,
  account
) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account)
  );
}

export const isMetaMaskInstalled = async () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  const { ethereum } = window;
  let value = await detectEthereumProvider();

  // return Boolean(ethereum && ethereum.isMetaMask && value === ethereum);
  return Boolean(ethereum && value === ethereum);
};

export const getConnectedAccount = async () => {
  try {
    const { ethereum } = window;
    //@ts-ignore
    const accounts = await ethereum.request({ method: "eth_accounts" });
    //@ts-ignore
    const chainId = await ethereum.request({ method: "eth_chainId" });
    return [accounts, chainId];
  } catch (error) {
    console.log(error);
  }
};

export function useActiveWeb3React() {
  const context = useWeb3ReactCore();
  console.log(context)
  // const contextNetwork = useWeb3ReactCore<Web3Provider>('NETWORK')
  // return context.active ? context : contextNetwork
  return context.active ? context : null;
}

export function toBigNumber(n) {
  // Source: https://github.com/Uniswap/uniswap-v3-core/blob/main/test/shared/utilities.ts
  return ethers.utils.parseUnits(n.toString());
}

export const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: "red",
    color: "black",
    maxWidth: 220,
    fontSize: "1em",
    border: "1px solid #dadde9",
  },
}))(Tooltip);

export const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});