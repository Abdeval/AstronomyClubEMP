
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SortAsc, SortDesc } from "lucide-react"
import type { Equipment, EquipmentStatus } from "@/lib/types"
import EquipmentCard from "./equipment-card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface EquipmentListProps {
  equipment: Equipment[]
  onUpdate: (equipment: Equipment) => void
  onDelete: (id: string) => void
}

export default function EquipmentList({ equipment, onUpdate, onDelete }: EquipmentListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<EquipmentStatus | "all">("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Filter equipment based on search query and status
  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Sort equipment by acquisition date
  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    const dateA = new Date(a.acquisitionDate).getTime()
    const dateB = new Date(b.acquisitionDate).getTime()
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select 
        value={statusFilter} onValueChange={(value) => setStatusFilter(value as EquipmentStatus | "all")}>
          <SelectTrigger className="w-[180px] bg-background/30" >
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="in-use">In Use</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="broken">Broken</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[180px]">
              {sortOrder === "asc" ? (
                <>
                  <SortAsc className="mr-2 h-4 w-4" />
                  Oldest First
                </>
              ) : (
                <>
                  <SortDesc className="mr-2 h-4 w-4" />
                  Newest First
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortOrder("asc")}>
              <SortAsc className="mr-2 h-4 w-4" />
              Oldest First
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOrder("desc")}>
              <SortDesc className="mr-2 h-4 w-4" />
              Newest First
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {sortedEquipment.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-muted/20">
          <h3 className="text-lg font-medium mb-2">No equipment found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilter !== "all"
              ? "No equipment matches your search criteria."
              : "Start by adding your first piece of equipment."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEquipment.map((item) => (
            <EquipmentCard key={item.id} equipment={item} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

