"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useBalance } from "@repo/store/useBalance";
import { Appbar } from "@repo/ui/appbar";

export default function Page(): JSX.Element {
  const session = useSession();
  const balance = useBalance();
  return (
    <div className="text-3xl">
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
      Hi there, you are in client app
      <br/>
      
      <h2>Your balance is: {balance}</h2>
    </div>
  );
}
