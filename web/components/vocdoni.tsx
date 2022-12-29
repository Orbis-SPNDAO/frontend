import { AccountData, EnvOptions, VocdoniSDKClient } from "@vocdoni/sdk";
import { useRouter } from "next/router";
import { FC, useEffect, useRef } from "react";
import { useContractRead, useSigner } from "wagmi";
import { SBT_ABI } from "../abis/currentABI";


const VocdoniUtils: FC = () => {
  const router = useRouter();

  const client = useRef<VocdoniSDKClient>();
  const vocAccount = useRef<AccountData>();

  const { data: signer } = useSigner();

  const { data: sbtHolders } = useContractRead({
    address: process.env.NEXT_PUBLIC_SBT_ADDR,
    abi: SBT_ABI,
    functionName: "fetchHolders",
  });

  useEffect(() => {
    if (!client.current && signer)
      client.current = new VocdoniSDKClient({
        env: EnvOptions.DEV,
        wallet: signer,
      });
  }, [signer]);

  useEffect(() => {
    const accountHandler = async () => {
      try {
        // account already exists
        vocAccount.current = await client.current!.fetchAccountInfo();
      } catch (e) {
        // account not created yet
        vocAccount.current = await client.current!.createAccount();
      }

      // top up account with faucet tokens
      if (vocAccount.current.balance === 0) {
        await client.current!.collectFaucetTokens();
      }
    };

    if (client.current) accountHandler();
  }, [client]);

  const createProposal = async () => {

  };

  return <></>;
};

export default VocdoniUtils;
