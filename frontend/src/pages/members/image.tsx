import { ImageType } from "@/lib/types";


export default function Image() {
  // const { id } = useParams();
  //  todo: get the image from the db

  const image: ImageType = {
    id: 1,
    title: "image title",
    description: "image description",
    image: "/images/telescope1.jpg",
    tags: ["planet", "galaxy", "stars"],
  };

  return (
    <div className="flex rounded-cu flex-col items-center bg-background p-2 gap-2">
      {/* the image  */}

      <div className="w-full h-[300px]">
        <img src={image.image} alt="image" className="w-full h-full object-cover 
        rounded-cu" />
      </div>

      {/* listing the tagse if exists */}
      <div className="w-full flex gap-2 items-center justify-center">
        {image.tags?.map((tag: string, index: number) => (
          <h1 key={index} className="font-regular">
            {tag}
          </h1>
        ))}
      </div>

      {/* the title of the image */}
      <div className="w-full border-l-4 border-primary pl-2 font-semibold text-foreground">
        <h1>{image.title}</h1>
      </div>

      {/* image description */}
      <p className="w-full font-regular text-muted-foreground">{image?.description}</p>
    </div>
  );
}
