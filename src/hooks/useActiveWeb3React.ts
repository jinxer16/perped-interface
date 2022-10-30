/* eslint-disable react-hooks/rules-of-hooks */
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "web3-react-core";

import { NetworkContextName } from "../constants/index";

export default function useActiveWeb3React() {
  const interfaceContext = useWeb3React<Web3Provider>();
  const interfaceNetworkContext =
    useWeb3React<Web3Provider>(NetworkContextName);

  if (interfaceContext.active) {
    return interfaceContext;
  }

  return interfaceNetworkContext;
}
