import ObservationsList from "@/components/observations/observation-list";
import ObservationsLoading from "@/components/observations/observations-loading";
import { useObservation } from "@/hooks";

export default function Observations() {
  const { observations, isObservationsLoading } = useObservation();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-muted-foreground mb-6">
        Astronomical Observations
      </h1>
      {isObservationsLoading ? (
        <ObservationsLoading />
      ) : (
        <ObservationsList
          observations={observations}
          isLoading={isObservationsLoading}
        />
      )}
    </div>
  );
}
