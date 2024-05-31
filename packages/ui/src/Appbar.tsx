import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  },
  // fix the ts type here:
  onSignin: any,
  onSignout: any
}

export const Appbar = ({
  user, onSignin, onSignout
}: AppbarProps) => {
  return (
    <div className="flex mt-2 justify-between mx-auto border-black px-4 fixed top-0 left-0 right-0 z-50 bg-opacity-20 backdrop-filter backdrop-blur-lg bg-slate-500 p-2 rounded-lg shadow-lg w-4/5">
      <div className="text-lg flex flex-col justify-center font-bold">
        VelociPay
      </div>
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
      </div>
    </div>
  )
}