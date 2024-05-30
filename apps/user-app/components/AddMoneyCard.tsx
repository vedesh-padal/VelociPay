"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { createOnrampTransaction } from "../lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [{
  name: "HDFC Bank",
  redirectUrl: "https://netbanking.hdfcbank.com"
}, {
  name: "Axis Bank",
  redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoneyCard = () => {

  const [redirectedUrl, setRedirectedUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput label="Amount" placeholder="Amount" onChange={(value) => {
          setAmount(Number(value));
        } }/>
      </div>
      <div className="pt-4 pb-2 text-left">
        Bank
      </div>
      <Select 
        onSelect={ (value) => {
          setRedirectedUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
          setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
        }}
        options={ SUPPORTED_BANKS.map(x => ({
          key: x.name,
          value: x.name
        }))}
      />
      <div className="flex justify-center pt-4">
        <Button onClick={async () => {
          await createOnrampTransaction(amount, provider);
            window.location.href = redirectedUrl || "";
          }}
        >
          Add Money
        </Button>
      </div>
    </Card>
  )
}
