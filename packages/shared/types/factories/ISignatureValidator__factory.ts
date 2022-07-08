/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ISignatureValidator,
  ISignatureValidatorInterface,
} from "../ISignatureValidator";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "isValidSignature",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class ISignatureValidator__factory {
  static readonly abi = _abi;
  static createInterface(): ISignatureValidatorInterface {
    return new utils.Interface(_abi) as ISignatureValidatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISignatureValidator {
    return new Contract(address, _abi, signerOrProvider) as ISignatureValidator;
  }
}
