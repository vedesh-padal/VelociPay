"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useBalance } from "@repo/store/useBalance";
import { Appbar } from "@repo/ui/appbar";

export default function Page(): JSX.Element {
  
  const balance = useBalance();
  const session = useSession();

  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
      <div className="text-3xl">
        Hi there, you are in merchant app
        <br/>
        <h2>Your balance is: {balance}</h2>
      </div>
    </div>
  );
}
