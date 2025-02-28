"use client";


import { useRouter } from 'next/navigation'
import dynamic from "next/dynamic";
import { Icons } from "@/components/icons"
import {Button} from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// const Demo = dynamic(() => import("../components/Demo"), {
//   ssr: false,
// });

export default function Home() {
    const router = useRouter()

    const selected = (value) => {
        console.log(value)
        router.push(`/${value}`)
    }

  return (
    <main className="min-h-screen flex flex-col p-4">
        <Card>
            <CardHeader>
                <CardTitle>DeRide</CardTitle>
                <CardDescription>
                    Select who you are.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <RadioGroup defaultValue="" className="grid grid-cols-3 gap-4" onValueChange={selected}>
                    <div>
                        <RadioGroupItem value="rider" id="rider" className="peer sr-only" />
                        <Label
                            htmlFor="rider"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="mb-3 h-6 w-6"
                            >
                                <rect width="20" height="14" x="2" y="5" rx="2" />
                                <path d="M2 10h20" />
                            </svg>
                            Rider
                        </Label>
                    </div>

                    <div>
                        <RadioGroupItem value="driver" id="driver" className="peer sr-only" />
                        <Label
                            htmlFor="driver"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <Icons.apple className="mb-3 h-6 w-6" />
                            Driver
                        </Label>
                    </div>
                </RadioGroup>
            </CardContent>
        </Card>

      {/*<div className="block">*/}
      {/*    <Button >Rider</Button>*/}
      {/*</div>*/}
      {/*  <div className="block">*/}
      {/*      <Button >Driver</Button>*/}
      {/*  </div>*/}
    </main>
  );
}
