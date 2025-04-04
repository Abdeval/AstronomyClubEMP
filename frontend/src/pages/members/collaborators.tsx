import CollaboratorsList from "@/components/collaborators/collaborators-list";
import { useTheme } from "@/context/theme-provider";
import { useUser } from "@/hooks";
import { useGroupInfoForAdmin } from "@/hooks/use-group-info";

export default function Collaborators() {
  const { theme } = useTheme();
  // todo get the info of the collaborators
  const { user } = useUser({});
  if (!user) return null;
  const { group, isLoading } = useGroupInfoForAdmin(user?.sub);

  console.log("group by admin ", group);
  
  if(!group) return (
    <div className="font-regular bg-muted flex items-center justify-center h-20 rounded border border-border">
      <h1 className="text-muted-foreground">no collaborators</h1>
    </div>
  )

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <div
      className="grid lg:grid-rows-11 lg:grid-cols-11 grid-rows-10 grid-cols-10
         bg-background rounded-none relative w-full min-h-full"
    >
      {/* hello */}
      <div className="grid col-span-1 row-span-1 bg-secondary rounded-br-[16px] items-center justify-center">
        <img
          className="md:w-[40px] md:h-[40px] w-[30px] h-[30px]"
          src={group.image || "/images/groups/rover.png"}
        />
      </div>
      <div className="lg:col-span-10 col-span-9 lg:row-span-11 row-span-10 bg-secondary">
        <div
          className="w-full h-full rounded-[16px] rounded-bl-none bg-background 
              flex items-center justify-center flex-col gap-3 p-2"
        >
          <div className="flex items-center gap-4 w-full justify-between p-2 border rounded-cu">
            <div className="flex flex-col gap-2 p-0 md:pl-4">
              <h1 className="font-bold text-primary text-sm sm:text-md md:text-lg">
                About the group
              </h1>
              {/* group leader name */}
              <div className="flex gap-2">
                <h1 className="font-medium capitalize">group leader</h1>
                <span className="font-regular text-muted-foreground">
                  {group.leader.firstName} {group.leader.lastName}
                </span>
              </div>

              {/* the number of members in the group */}
              <div className="flex gap-2">
                <h1 className="font-medium capitalize">members number</h1>
                <span className="font-regular text-muted-foreground">
                  {group.members.length}
                </span>
              </div>
            </div>

            {/* the image of the group */}
            {theme === "dark" ? (
              <img
                src="/images/groups/info-dark.png"
                className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] rounded-cu"
              />
            ) : (
              <img
                src="/images/groups/info.png"
                className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] rounded-cu"
              />
            )}
          </div>

          {/* the list of the members  */}
          <CollaboratorsList collaborators={group.members} groupId={group.id}/>
        </div>
      </div>
      <div className="lg:col-span-1 col-span-1 lg:row-span-10 row-span-9 bg-secondary">
        <div
          className="w-full h-full rounded-l-[16px] bg-background
         flex items-center justify-center flex-col  gap-2"
        >
          <img src="/planet-icons/jupiter.png" className="w-6 h-6" />
          <img src="/planet-icons/perpule.png" className="w-6 h-6" />
          <img src="/planet-icons/mars.png" className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
