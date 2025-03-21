import { Link } from "react-router-dom";
import { ShinyButton } from "../magicui/shiny-button";

export default function SignButton() {
  return (
    <Link to={"/auth/sign-in"} >
      <ShinyButton className="text-foreground z-50">
        Sign in
      </ShinyButton>
    </Link>
  );
}
