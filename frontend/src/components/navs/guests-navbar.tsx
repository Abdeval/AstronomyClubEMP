import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import SignButton from "../buttons/sign-button"
import HoveredButton from "../buttons/HoveredButton"
import Logo from "../Logo"
import ChangeThemeButton from "../change-theme-button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Prevent scrolling when menu is open
  if (typeof window !== "undefined") {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  return (
    <div className="fixed left-0 top-0 z-50 bg-background/10 backdrop-blur w-full p-4 px-8 flex items-center justify-between">
      <Logo type="nav" />
      <ChangeThemeButton />

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          to="/guests/articles"
          className="font-medium text-primary hover:text-foreground capitalize transition-all duration-200"
        >
          articles
        </Link>
        <Link
          to="/members"
          className="font-medium text-primary hover:text-foreground capitalize transition-all duration-200"
        >
          dashboard
        </Link>
        <Link
          to="/guests/news"
          className="font-medium text-primary hover:text-foreground capitalize transition-all duration-200"
        >
          news
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <SignButton />
        <HoveredButton />
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden z-50 relative w-10 h-10 flex items-center justify-center"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className="relative w-6 h-6">
          <AnimatePresence>
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <X className="w-6 h-6 text-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Menu className="w-6 h-6 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 border rounded-b-cu border-border bg-background/60 backdrop-blur-lg md:hidden h-[500px]"
          >
            <div className="flex flex-col h-full justify-center items-center gap-4 p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full"
              >
                <Link
                  to="/guests/articles"
                  className="font-medium text-2xl text-primary hover:text-muted-foreground capitalize transition-all duration-200 flex justify-center py-4 w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  articles
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full"
              >
                <Link
                  to="/members"
                  className="font-medium text-2xl text-primary hover:text-muted-foreground capitalize transition-all duration-200 flex justify-center py-4 w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  dashboard
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full"
              >
                <Link
                  to="/guests/news"
                  className="font-medium text-2xl text-primary hover:text-muted-foreground capitalize transition-all duration-200 flex justify-center py-4 w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  news
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-4 mt-8 w-full"
              >
                <div className="w-full flex justify-center">
                  <SignButton />
                </div>
                <div className="w-full flex justify-center">
                  <HoveredButton />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

