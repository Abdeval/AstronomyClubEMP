import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter  } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";


export default function ExploreCard() {
  return (
    <Card className="mt-2 relative z-40 shadow-sm shadow-primary/30 py-2 font-regular flex flex-col items-center bg-background/30 backdrop-blur rounded-[16px] h-[160px] w-[160px]">  
        <h1 className="capitalize font-semibold pt-1">what's new ?</h1>
        <CardContent className="">
            visit our website 
            <Link to={"/more"}> more</Link>
        </CardContent>
        <CardFooter>
            <Button className="capitalize">
                explore
                <ChevronRight className=""/>
            </Button>
        </CardFooter>
    </Card>
  )
}
