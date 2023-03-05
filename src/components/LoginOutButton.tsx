import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Button } from "react-bootstrap";

interface LoginOutProps {
  session: Session | null;
}

export default function LoginOutButton(props: LoginOutProps) {
  return (
    <>
      {props.session?.user ? (
        <Button onClick={() => signOut()}>Sign out</Button>
      ) : (
        <Button onClick={() => signIn("google")}>Sign in</Button>
      )}
    </>
  );
}
