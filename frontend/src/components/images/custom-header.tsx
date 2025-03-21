import { DynamicIcon } from "../ui/dynamic-icon";

export default function CustomHeader({
  image,
  title,
  icon,
}: {
  image: string;
  title: string;
  icon: string;
}) {
  return (
    <div className="h-[400px] w-full relative flex items-center justify-center p-2 bg-background 
    rounded-cu
    ">
      {/* a bit image of the component */}
      <img src={image} alt={title} className="w-full h-full object-cover rounded-cu" />

      {/* the title */}
      <div className="flex gap-4 absolute -bottom-[30px] w-[43%] rounded-cu justify-center items-center">
        <div className="p-2 rounded-full bg-secondary">
          <DynamicIcon name={icon} className="text-primary " size={56} />
        </div>
        <h1 className="font-medium text-2xl capitalize p-[20px] bg-secondary/30 backdrop-blur rounded-cu">{title}</h1>
      </div>
    </div>
  );
}
