
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Download, Upload, Trash2 } from "lucide-react"

export default function DataSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Manage your data, storage, and synchronization settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Storage Usage</h3>
              <p className="text-sm text-muted-foreground">Manage your app storage and cached data</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used Storage</span>
                <span>245 MB / 1 GB</span>
              </div>
              <Progress value={24.5} className="h-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Download Data</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>Import Data</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-4 w-4" />
                <span>Clear Cache</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Data Sources</h3>
              <p className="text-sm text-muted-foreground">Configure which astronomical data sources to use</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="nasa-data" className="flex-1">
                  NASA Astronomy Picture of the Day
                </Label>
                <Switch id="nasa-data" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="esa-data" className="flex-1">
                  European Space Agency Data
                </Label>
                <Switch id="esa-data" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="minor-planet-data" className="flex-1">
                  Minor Planet Center Data
                </Label>
                <Switch id="minor-planet-data" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="community-data" className="flex-1">
                  Community Contributed Data
                </Label>
                <Switch id="community-data" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Offline Access</h3>
              <p className="text-sm text-muted-foreground">Configure which data to store for offline use</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="offline-data">Offline Data Level</Label>
              <Select defaultValue="essential">
                <SelectTrigger id="offline-data">
                  <SelectValue placeholder="Select offline data level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal (Star data only)</SelectItem>
                  <SelectItem value="essential">Essential (Stars, planets, major objects)</SelectItem>
                  <SelectItem value="standard">Standard (All solar system objects)</SelectItem>
                  <SelectItem value="complete">Complete (All catalog data)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="auto-update" className="flex-1">
                Auto-update offline data when on Wi-Fi
              </Label>
              <Switch id="auto-update" defaultChecked />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Data Privacy</h3>
              <p className="text-sm text-muted-foreground">Manage how your data is used and shared</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="share-location" className="flex-1">
                  Share anonymous location data for sky conditions
                </Label>
                <Switch id="share-location" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="share-observations" className="flex-1">
                  Share observation reports with community
                </Label>
                <Switch id="share-observations" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics" className="flex-1">
                  Allow anonymous usage analytics
                </Label>
                <Switch id="analytics" defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

