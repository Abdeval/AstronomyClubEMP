
import ObservationDetail from "@/components/observations/observaton-detail"
import { getObservationById } from "@/lib/data"
import { Observation } from "@/lib/types"
// import { NOTFOUND } from "dns"
import { useParams } from "react-router-dom"


export default async function ObservationDetailPage() {
  const { id } = useParams();
  const observation = await getObservationById(id as string);

  if (!observation) {
    return <div>not found</div>
  }

  return <ObservationDetail observation={observation as Observation} />
}

