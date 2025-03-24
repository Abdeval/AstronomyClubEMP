import ObservationsList from "@/components/observations/observation-list";

export default function Observations() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold text-muted-foreground mb-6">Astronomical Observations</h1>
      <ObservationsList />
    </div>
  );
}
