import ObservationLoading from "@/components/observations/observation-loading";
import ObservationDetail from "@/components/observations/observaton-detail";
import { useObservationInfo } from "@/hooks";
import { ObservationType } from "@/lib/types";
import { useParams } from "react-router-dom";

export default function ObservationDetailPage() {
  
  const { id } = useParams();
  const { observation, isObservationLoading, isObservationError } = useObservationInfo(
    id as string
  );

  if(isObservationError) return <p className="text-red-500">Internal error</p>

  return isObservationLoading ? (
    <ObservationLoading />
  ) : (
    <ObservationDetail observation={observation as ObservationType} />
  );
}
