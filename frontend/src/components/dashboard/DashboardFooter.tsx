import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="font-regular absolute bottom-0 w-full py-4 px-4 bg-background/60 backdrop-blur-md border-t border-border mt-auto">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <span>© {currentYear} Astronomy Explorer</span>
          <span className="hidden sm:inline mx-1">•</span>
          <span className="hidden sm:flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by
            Astronomy Team
          </span>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-3">
            <Link
              to="/about"
              className="hover:text-yellow-400 transition-colors"
            >
              About
            </Link>
            <Link
              to="/privacy"
              className="hover:text-yellow-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="hover:text-yellow-400 transition-colors"
            >
              Terms
            </Link>
          </nav>

          <div className="flex items-center gap-2 border-l border-white/10 pl-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
