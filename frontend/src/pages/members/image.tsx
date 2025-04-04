import ImageDetail from "@/components/images/image-detail";
import ImageLoading from "@/components/images/image-loading";
import { Button } from "@/components/ui/button";
import { useImageInfo } from "@/hooks";
import { Link, useParams } from "react-router-dom";


export default function Image() {
  const { id } = useParams();
  const { image, isImageLoading, isImageError } = useImageInfo(id as string);

  if (isImageLoading) {
   return <ImageLoading />
  }

  if (isImageError || !image) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Image not found</h2>
        <p className="text-muted-foreground mb-4">
          The image you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/members/images">Back to Images</Link>
        </Button>
      </div>
    );
  }


  return (
    <ImageDetail image={image}/>
    // <div className="flex rounded-cu flex-col items-center bg-background p-2 gap-2">
    //   {/* the image  */}

    //   <div className="w-full h-[300px]">
    //     <img src={image.url} alt="image" className="w-full h-full object-cover 
    //     rounded-cu" />
    //   </div>

    //   {/* listing the tagse if exists */}
    //   <div className="w-full flex gap-2 items-center justify-center">
    //     {image.tags?.map((tag: string, index: number) => (
    //       <h1 key={index} className="font-regular">
    //         {tag}
    //       </h1>
    //     ))}
    //   </div>

    //   {/* the title of the image */}
    //   <div className="w-full border-l-4 border-primary pl-2 font-semibold text-foreground">
    //     <h1>{image.title}</h1>
    //   </div>

    //   {/* image description */}
    //   <p className="w-full font-regular text-muted-foreground">{image?.description}</p>
    // </div>
  );
}
