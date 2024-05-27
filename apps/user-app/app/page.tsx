"use client";

import { Button } from "@repo/ui/button";
import { useBalance } from "@repo/store/useBalance";

export default function Page(): JSX.Element {
  
  const balance = useBalance();
  return (
    <div className="text-3xl">
      Hi there
      <br/>
      <Button appName="Click Me" className="bg-blue-300 rounded-md text-gray-900">
        I am here
      </Button>
      <h2>Your balance is: {balance}</h2>
    </div>
  );
}
