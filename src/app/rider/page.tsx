"use client"

import { useEffect, useCallback, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
// import { Button } from 'react/';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { abi } from "../../abi/deride-abi";
import { FrameContext } from "@farcaster/frame-core/esm/context";

export default function Demo() {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false);
    const [context, setContext] = useState<FrameContext>();
    const [isContextOpen, setIsContextOpen] = useState(false);

    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");

    const States: string[] = [
        "CO",
        "CA",
        "NY",
        "TX",
        "FL",
        "WA",
    ];

    useEffect(() => {
        const load = async () => {
            setContext(await sdk.context);
            sdk.actions.ready();
        };
        if (sdk && !isSDKLoaded) {
            setIsSDKLoaded(true);
            load();
        }
    }, [isSDKLoaded]);

    const toggleContext = useCallback(() => {
        setIsContextOpen((prev) => !prev);
    }, []);

    const { address } = useAccount();
    const CONTRACT_ADDRESS = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";

    const { data: ride } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "getRide",
        args: ["ker"],
    });

    useEffect(() => {
        console.log("Address: ", address);
        console.log("Ride: ", ride);
    });

    // const requestRide = (e) => {
    //   console.log("address: ", street, city, state + "," + zip);
    // };

    const { writeContract, isPending: isLoading, isSuccess } = useWriteContract();

    const requestRide = () => writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: "requestRide",
        args: [
            "user1",
            {street, city, state, zip},
        ],
    })

    return (
        <div className="w-[300px] mx-auto py-4 px-2">
            <h1 className="text-2xl font-bold text-center mb-4">DeRide</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Where are you headed?</CardTitle>
                    <CardDescription>Type the destination location</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="street">Street</Label>
                        <Input
                            id="street"
                            placeholder="..."
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            placeholder=""
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="state">State</Label>
                            <Select value={state} onValueChange={setState}>
                                <SelectTrigger id="state">
                                    <SelectValue placeholder="state" />
                                </SelectTrigger>
                                <SelectContent>
                                    {States.map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="zip">Zip code</Label>
                            <Input
                                id="zip"
                                placeholder=""
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button onClick={requestRide}>Request Ride</Button>
                </CardFooter>
            </Card>

            {/*<div className="mb-4">*/}
            {/*  <h2 className="font-2xl font-bold">Context</h2>*/}
            {/*  <Button*/}
            {/*    onClick={toggleContext}*/}
            {/*    className="flex items-center gap-2 transition-colors"*/}
            {/*  >*/}
            {/*    <span*/}
            {/*      className={`transform transition-transform ${*/}
            {/*        isContextOpen ? "rotate-90" : ""*/}
            {/*      }`}*/}
            {/*    >*/}
            {/*      ➤*/}
            {/*    </span>*/}
            {/*    Tap to expand*/}
            {/*  </Button>*/}

            {/*  {isContextOpen && (*/}
            {/*    <div className="p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg">*/}
            {/*      <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">*/}
            {/*        {JSON.stringify(context, null, 2)}*/}
            {/*      </pre>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*</div>*/}
        </div>
    );
}
