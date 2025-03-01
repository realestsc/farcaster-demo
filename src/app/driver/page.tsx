"use client"

import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { abi } from "../../abi/deride-abi";

interface RideRequest {
    id: string;
    rider: string;
    fullAddress: string;
    distance: string;
    timestamp: number;
    status: string;
    driver: string;
}

export default function DriverPage() {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false);
    const [selectedRide, setSelectedRide] = useState<string | null>(null);
    const [rideStatus, setRideStatus] = useState<'none' | 'accepted' | 'started'>('none');

    const CONTRACT_ADDRESS = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";

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

    // Read available rides from contract
    const { data: availableRides, refetch: refetchRides } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "getAvailableRides",
        args: [],
        watch: true,
    });

    // Monitor selected ride status
    const { data: selectedRideData } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "getRide",
        args: selectedRide ? [selectedRide] : undefined,
        watch: true,
        enabled: !!selectedRide,
    });

    useEffect(() => {
        if (selectedRideData) {
            setRideStatus(selectedRideData.status as 'none' | 'accepted' | 'started');
        }
    }, [selectedRideData]);

    const { writeContract } = useWriteContract();

    const selectRide = async () => {
        if (!selectedRide) return;

        await writeContract({
            address: CONTRACT_ADDRESS as `0x${string}`,
            abi,
            functionName: "selectRide",
            args: [selectedRide],
        });
        setRideStatus('accepted');
        refetchRides();
    };

    const startRide = async () => {
        if (!selectedRide) return;

        await writeContract({
            address: CONTRACT_ADDRESS as `0x${string}`,
            abi,
            functionName: "startRide",
            args: [selectedRide],
        });
        setRideStatus('started');
    };

    const endRide = async () => {
        if (!selectedRide) return;

        await writeContract({
            address: CONTRACT_ADDRESS as `0x${string}`,
            abi,
            functionName: "endRide",
            args: [selectedRide],
        });
        setRideStatus('none');
        setSelectedRide(null);
        refetchRides();
    };

    // Format rides for display
    const formattedRides = (availableRides as RideRequest[] || [])
        .filter(ride => ride.status === "pending");

    return (
        <div className="w-[300px] mx-auto py-4 px-2">
            <h1 className="text-2xl font-bold text-center mb-4">DeRide</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Available Rides</CardTitle>
                    <CardDescription>Select a ride to accept</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup
                        value={selectedRide || ""}
                        onValueChange={setSelectedRide}
                        className="grid gap-4"
                        disabled={rideStatus !== 'none'}
                    >
                        {formattedRides.map((ride) => (
                            <div key={ride.id} className="flex items-center space-x-2 border p-4 rounded-lg">
                                <RadioGroupItem value={ride.id} id={`ride-${ride.id}`} />
                                <Label htmlFor={`ride-${ride.id}`} className="flex-1">
                                    <div className="font-medium">{ride.distance} miles away</div>
                                    <div className="text-sm text-gray-500">{ride.fullAddress}</div>
                                    <div className="text-xs text-gray-400">
                                        {new Date(ride.timestamp * 1000).toLocaleTimeString()}
                                    </div>
                                </Label>
                            </div>
                        ))}
                        {formattedRides.length === 0 && (
                            <div className="text-center text-gray-500 py-4">
                                No rides available
                            </div>
                        )}
                    </RadioGroup>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button 
                        onClick={selectRide} 
                        disabled={!selectedRide || rideStatus !== 'none'}
                        className="w-full bg-black hover:bg-gray-800"
                    >
                        Accept Ride
                    </Button>
                    <Button 
                        onClick={startRide}
                        disabled={rideStatus !== 'accepted'}
                        className="w-full bg-black hover:bg-gray-800 text-white"
                        variant="secondary"
                    >
                        Start Ride
                    </Button>
                    <Button 
                        onClick={endRide}
                        disabled={rideStatus !== 'started'}
                        className="w-full bg-black hover:bg-gray-800"
                        variant="destructive"
                    >
                        End Ride
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}