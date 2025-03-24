import AstronomyGallery from "@/components/gallery/astronomy-gallery";
import CustomHeader from "@/components/images/custom-header";
import { useParams } from "react-router-dom"

export default function GroupImages() {
  const { groupName } = useParams();
  // todo: fetch the images of the group by its name
  const groupDetails = {
    image: ['/images/albattani-2.jpg', "/images/albattani-1.jpg","/images/albattani-1.jpg", "/images/albattani-3.jpg"],
    title: "Astrography",
    icon: "Sun"
  };

  return (
    <div className="space-y-4">
        <CustomHeader {...groupDetails}/>

        {/* render the images of the group */}
        <AstronomyGallery title={groupName as string}/>
    </div>
  )
}
