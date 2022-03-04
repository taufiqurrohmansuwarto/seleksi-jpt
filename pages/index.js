import { Button } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  return (
    <div>
      {JSON.stringify(data)}
      <Button onClick={signIn}>test</Button>
      <Button onClick={signOut}>signout</Button>
    </div>
  );
}
