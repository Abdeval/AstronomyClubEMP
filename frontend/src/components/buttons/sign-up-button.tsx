import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function SignUpButton() {
  return (
    <Button asChild className="bg-secondary" variant={'destructive'}>
      <Link to={"/auth/login"} className="font-medium capitalize">sign in</Link>
    </Button>
  );
}

export default SignUpButton;