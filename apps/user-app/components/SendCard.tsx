"use client";

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
import { TextInput } from "@repo/ui/text-input"
import { useState } from "react"
import { p2pTransfer } from "../lib/actions/p2pTransfer";


export const SendCard = () => {
  
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  
  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send" className="bg-slate-200 rounded-lg border-slate-300">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder="Mobile Number" 
              label="Mobile Number"
              onChange={ (value) => setNumber(value) }
            />
            <TextInput
              placeholder="Amount" 
              label="Amount"
              onChange={ (value) => setAmount(value) }
            />
            <div className="pt-4 flex justify-center">
              <Button onClick={async () => {
                console.log(`number: ${number}, amount: ${amount}`)
                await p2pTransfer(number, Number(amount));
              }}>
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  )
}