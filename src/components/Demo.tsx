import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';
import { useAccount, useReadContract } from 'wagmi';

import { abi } from "../abi/proposal-abi";

export default function Demo() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
        console.log('sdk is ready');
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const { address } = useAccount();
  const CONTRACT_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

  const { data: deadline } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "getDeadline",
    args: ["bitcoin"],
  });

  return (
    <div className="w-[300px] mx-auto py-4 px-2">
      <h1 className="text-2xl font-bold text-center mb-4">Frames v2 Demo</h1>
      <div className="flex justify-between">
        <p>address: {address}</p>
        <p>Deadline: {deadline}</p>
      </div>
    </div>
  );
}