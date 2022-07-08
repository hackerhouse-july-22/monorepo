/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IProxyCreationCallback,
  IProxyCreationCallbackInterface,
} from "../IProxyCreationCallback";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract GnosisSafeProxy",
        name: "proxy",
        type: "address",
      },
      {
        internalType: "address",
        name: "_singleton",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "initializer",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "saltNonce",
        type: "uint256",
      },
    ],
    name: "proxyCreated",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IProxyCreationCallback__factory {
  static readonly abi = _abi;
  static createInterface(): IProxyCreationCallbackInterface {
    return new utils.Interface(_abi) as IProxyCreationCallbackInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IProxyCreationCallback {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IProxyCreationCallback;
  }
}
