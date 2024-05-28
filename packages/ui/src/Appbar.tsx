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
    <div className="flex justify-between border-black px-4">
      <div className="text-lg flex flex-col justify-center font-bold">
        VelociPay
      </div>
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
      </div>
    </div>
  )
}