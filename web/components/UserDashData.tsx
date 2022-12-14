import { useEffect, useState } from "react";

import { useAccount, useContract, useSigner } from "wagmi";
import { SBT_ABI } from "../abis/currentABI";
import Spinner from "./Spinner";

type Nft = {
  status: number;
  totalItems: number;
  tokenId: number;
  items: [
    {
      id: string;
      createdAt: string;
      cid: string;
      name: string;
      originalname: string;
      size: string;
      metadata: Record<string, any>;
      type: string;
      pinToIPFS: boolean;
      uri: string;
    }
  ];
};

export default function UserDashData() {
  const [list, setList] = useState<Nft[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isBurning, setIsBurning] = useState(false);
  const { data: signer } = useSigner();
  const contract = useContract({
    address: process.env.NEXT_PUBLIC_SBT_ADDR,
    abi: SBT_ABI,
    signerOrProvider: signer,
  });
  const { address } = useAccount();

  // updates dashboard if mm or provider changes
  useEffect(() => {
    const getNFTs = async () => {
      if (signer && contract && address) {
        setLoaded(false);
        setList([]);

        const bal = parseInt(await contract.balanceOf(address), 10);

        const newList: any[] = [];
        // first token is just to initialize the array
        for (let i = 1; i < bal; i++) {
          await contract
            .ownerToTokenIds(address, i)
            .then(parseInt)
            .then((id: any) => {
              contract.cidList(id).then((cid: string) => {
                fetch("/api/getData", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ cid: cid }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    newList.push({ ...data, tokenId: i });
                    if (i === bal - 1) setList(newList);
                  });
              });
            });
        }
        setLoaded(true);
      }
    };

    // only run when mm and provider are defined
    getNFTs();
  }, [signer, contract, address]);

  async function burnToken(tokenId: number) {
    setIsBurning(true);
    console.log(`Burn token with id ${tokenId}`);
    if (contract && signer) {
      await contract.userBurn(address, tokenId);
    }
    setIsBurning(false);
  }

  if (!loaded) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (loaded && list.length == 0) {
    return (
      <div>
        <h1>No SBTs minted</h1>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center mx-auto px-8">
        {list.map((nft, index) => {
          return nft.items ? (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-white py-5 px-8 shadow-md"
            >
              <div className="flex flex-col items-start">
                <p className="text-bold text-gray-500">Token Name</p>
                <p className="truncate max-w-xs text-bold text-gray-500">
                  {nft.items[0].name.substring(0, 8)}
                </p>
              </div>
              <div className="ml-8 flex flex-col items-start">
                <p className="text-bold text-gray-500">SBT Contract</p>
                <p className="truncate max-w-xs text-bold text-gray-500">
                  {process.env.NEXT_PUBLIC_SBT_ADDR!}
                </p>
              </div>
              <div className="ml-8 flex flex-col items-start">
                <p className="text-bold text-gray-500">Rewards</p>
                <p className="text-bold text-gray-500">0.1 FIL</p>
              </div>

              <button
                className="ml-8 bg-custom-purple text-white text-bold text-md rounded-md px-6 py-2"
                disabled={!!isBurning}
                onClick={() => burnToken(nft.tokenId)}
              >
                {!!isBurning ? <Spinner /> : "Burn"}
              </button>
            </div>
          ) : null;
        })}
      </div>
    );
  }
}
