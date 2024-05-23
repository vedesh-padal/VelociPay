import { Button } from "@repo/ui/button";

export default function Page(): JSX.Element {
  return (
    <div className="text-3xl">
      Hi there
      <br/>
      <Button appName="Click Me">
        I am here
      </Button>
    </div>
  );
}
