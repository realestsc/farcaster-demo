"use client"

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
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

export default function RiderPage() {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false);
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [rideStatus, setRideStatus] = useState<string>("none");
    const [currentRideId, setCurrentRideId] = useState<string | null>(null);

    const States: string[] = ["CO", "CA", "NY", "TX", "FL", "WA"];
    const CONTRACT_ADDRESS = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";

    const { address } = useAccount();

    // Load Frame SDK
    useEffect(() => {
        const load = async () => {
            await sdk.context;
            sdk.actions.ready();
        };
        if (sdk && !isSDKLoaded) {
            setIsSDKLoaded(true);
            load();
        }
    }, [isSDKLoaded]);

    // Monitor ride status if we have an active ride
    const { data: currentRide } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "getRide",
        args: currentRideId ? [currentRideId] : undefined,
        watch: true,
        enabled: !!currentRideId,
    });

    useEffect(() => {
        if (currentRide) {
            setRideStatus(currentRide.status);
        }
    }, [currentRide]);

    const { writeContract, isPending: isLoading } = useWriteContract();

    const requestRide = async () => {
        if (!street || !city || !state || !zip) {
            alert("Please fill in all address fields");
            return;
        }

        const fullAddress = `${street}, ${city}, ${state} ${zip}`;
        const mockDistance = (Math.random() * 5).toFixed(1);

        try {
            const result = await writeContract({
                address: CONTRACT_ADDRESS as `0x${string}`,
                abi,
                functionName: "requestRide",
                args: [fullAddress, mockDistance],
            });

            // In a real implementation, you'd want to get the rideId from the event
            // For now, we'll monitor the transaction receipt
            setRideStatus("pending");
            // You'd get the actual rideId from the event logs
            // setCurrentRideId(rideId);
        } catch (error) {
            console.error("Error requesting ride:", error);
            alert("Failed to request ride");
        }
    };

    return (
        <div className="w-[300px] mx-auto py-4 px-2">
            <h1 className="text-2xl font-bold text-center mb-4">DeRide</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Where are you headed?</CardTitle>
                    <CardDescription>
                        {rideStatus === "none" 
                            ? "Enter your destination" 
                            : `Ride Status: ${rideStatus}`}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="street">Street</Label>
                        <Input
                            id="street"
                            placeholder="Enter street address"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            disabled={rideStatus !== "none"}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            disabled={rideStatus !== "none"}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="state">State</Label>
                            <Select 
                                value={state} 
                                onValueChange={setState}
                                disabled={rideStatus !== "none"}
                            >
                                <SelectTrigger id="state">
                                    <SelectValue placeholder="State" />
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
                                placeholder="Zip"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                disabled={rideStatus !== "none"}
                            />
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button 
                        onClick={requestRide} 
                        disabled={rideStatus !== "none" || isLoading}
                        className="w-full"
                    >
                        {isLoading ? "Requesting..." : "Request Ride"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
