export default function ErrorFallback({ error }: { error: any }) {
  return (
    <div className="w-full px-12 h-screen flex items-center justify-center bg-background">
      <div
        role="alert"
        className="flex w-full flex-col items-center justify-center gap-4 h-full"
      >
        <p className="font-medium text-xl">Something went wrong:</p>
        <div className="font-medium w-full text-primary">{error.message}</div>
      </div>
    </div>
  );
}
