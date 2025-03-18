import CollaboratorsList from "@/components/collaborators/collaborators-list";

export default function Collaborators() {
  return (
    <div
      className="grid lg:grid-rows-11 lg:grid-cols-11 grid-rows-10 grid-cols-10
         bg-background rounded-none relative w-full min-h-full"
    >
      {/* hello */}
      <div className="grid col-span-1 row-span-1 bg-secondary rounded-br-[16px] items-center justify-center">
        <img className="md:w-[40px] md:h-[40px] w-[30px] h-[30px]" src="/images/groups/rover.png" />
      </div>
      <div className="lg:col-span-10 col-span-9 lg:row-span-11 row-span-10 bg-secondary">
        <div
          className="w-full h-full rounded-[16px] rounded-bl-none bg-background 
              flex items-center justify-center flex-col gap-3 p-2"
        >
         
          <div className="flex items-center gap-4 w-full justify-between p-2 border rounded-cu">
            <div className="flex flex-col gap-2 p-0 md:pl-4">
              <h1 className="font-bold text-primary text-sm sm:text-md md:text-lg">About the group</h1>
              {/* group leader name */}
              <div className="flex gap-2">
                <h1 className="font-medium capitalize">group leader</h1>
                <span className="font-regular text-muted-foreground">
                  abdelatif
                </span>
              </div>

              {/* the number of members in the group */}
             <div className="flex gap-2">
               <h1 className="font-medium capitalize">members number</h1>
               <span className="font-regular text-muted-foreground">
                3
              </span>
             </div>
            </div>

            {/* the image of the group */}
            <img src="/images/groups/web.jpg" className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[200px] md:h-[200px] rounded-cu"/>
          </div>

          {/* the list of the members  */}
          <CollaboratorsList />
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
