import React from 'react'
import { Button } from "@/components/ui/button"

interface SignInButtonProps {
  isLoading: boolean;
  onClick?: () => void;
}

export default function SignInButton({ isLoading, onClick }: SignInButtonProps = { isLoading: false }) {
  return (
    <Button
      className="w-full bg-primary rounded-cu text-primary-foreground hover:bg-primary/60"
      disabled={isLoading}
      onClick={onClick}
      type='submit'
    >
      {isLoading ? (
        <>
          <span className="mr-2">Logging in</span>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </>
      ) : (
        'Login'
      )}
    </Button>
  )
}