/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface RandoContractInterface extends utils.Interface {
  functions: {
    "doSomething()": FunctionFragment;
    "somethingHasBeenDone()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "doSomething" | "somethingHasBeenDone"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "doSomething",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "somethingHasBeenDone",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "doSomething",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "somethingHasBeenDone",
    data: BytesLike
  ): Result;

  events: {};
}

export interface RandoContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RandoContractInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    doSomething(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    somethingHasBeenDone(overrides?: CallOverrides): Promise<[boolean]>;
  };

  doSomething(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  somethingHasBeenDone(overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    doSomething(overrides?: CallOverrides): Promise<void>;

    somethingHasBeenDone(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    doSomething(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    somethingHasBeenDone(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    doSomething(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    somethingHasBeenDone(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
