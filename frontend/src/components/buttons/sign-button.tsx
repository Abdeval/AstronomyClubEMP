import { Link } from "react-router-dom";
import { ShinyButton } from "../magicui/shiny-button";
import { useUser } from "@/hooks";

export default function SignButton() {
  const { user, logout } = useUser({});
  const isAuthenticated = user ? true : false;
  return (
    <Link to={"/auth/sign-in"}>
      {isAuthenticated ? (
        <ShinyButton onClick={() => logout()} className="text-foreground z-50">
          sign out
        </ShinyButton>
      ) : (
        <ShinyButton className="text-foreground z-50">Sign in</ShinyButton>
      )}
    </Link>
  );
}
