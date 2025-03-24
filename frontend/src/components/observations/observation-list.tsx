import { useState, useEffect } from "react"
import { Link, useNavigation } from "react-router-dom";
import { format } from "date-fns"
import { Calendar, Filter, MapPin, Plus, Search, SortAsc, SortDesc, User, Telescope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getObservations } from "@/lib/data"
import ObservationCard from "./observation-card"
import CreateObservationDialog from "./create-observation-dialog"
import type { Observation } from "@/lib/types";

export default function ObservationsList() {
//   const router = useNavigation()
  const [observations, setObservations] = useState<Observation[]>([])
  const [filteredObservations, setFilteredObservations] = useState<Observation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [viewType, setViewType] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const data = await getObservations()
        setObservations(data)
        setFilteredObservations(data)
      } catch (error) {
        console.error("Failed to fetch observations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchObservations()
  }, [])

  useEffect(() => {
    // Filter observations based on search query
    const filtered = observations.filter(
      (obs) =>
        obs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (obs.details && obs.details.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (obs.location && obs.location.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    // Sort observations by date
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

    setFilteredObservations(sorted)
  }, [observations, searchQuery, sortOrder])

  const handleCreateObservation = (newObservation: Observation) => {
    setObservations([newObservation, ...observations])
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-1 gap-2 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search observations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOrder("desc")}>
                <SortDesc className="mr-2 h-4 w-4" />
                Newest first
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("asc")}>
                <SortAsc className="mr-2 h-4 w-4" />
                Oldest first
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Tabs defaultValue="grid" className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid" onClick={() => setViewType("grid")}>
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" onClick={() => setViewType("list")}>
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Observation
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video bg-muted">
                <Skeleton className="h-full w-full" />
              </div>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredObservations.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-muted/20">
          <Telescope className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No observations found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery
              ? "No observations match your search criteria."
              : "Start by creating your first astronomical observation."}
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Observation
          </Button>
        </div>
      ) : viewType === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredObservations.map((observation) => (
            <ObservationCard key={observation.id} observation={observation} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredObservations.map((observation) => (
            <Card key={observation.id} className="overflow-hidden">
              <div className="p-4 flex gap-4">
                {observation.images && observation.images.length > 0 ? (
                  <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={observation.images[0].url || "/placeholder.svg"}
                      alt={observation.title}
                      className="object-cover h-full w-full"
                    />
                  </div>
                ) : (
                  <div className="h-24 w-24 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <Telescope className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <Link to={`/members/observations/${observation.id}`} className="hover:underline">
                    <h3 className="text-lg font-semibold mb-1">{observation.title}</h3>
                  </Link>
                  {observation.details && (
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{observation.details}</p>
                  )}
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(new Date(observation.date), "PPP")}
                    </div>
                    {observation.location && (
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {observation.location}
                      </div>
                    )}
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {observation.user.firstName}
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={observation.user.image || ""} alt={observation.user.firstName} />
                    <AvatarFallback>{observation?.user?.firstName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CreateObservationDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateObservation={handleCreateObservation}
      />
    </div>
  )
}

