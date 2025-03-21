import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ObservationSettings() {
  const [location, setLocation] = useState({ lat: "34.0522", lng: "-118.2437" })
  const [useCurrentLocation, setUseCurrentLocation] = useState(true)
  const [magnitude, setMagnitude] = useState([6])
  const [telescope, setTelescope] = useState("default")
  const [autoTrack, setAutoTrack] = useState(true)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Observation Settings</CardTitle>
          <CardDescription>Configure your observation preferences and equipment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Location</h3>
              <p className="text-sm text-muted-foreground">
                Set your observation location for accurate sky positioning
              </p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <Label htmlFor="use-current-location" className="flex-1">
                Use device location
              </Label>
              <Switch id="use-current-location" checked={useCurrentLocation} onCheckedChange={setUseCurrentLocation} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  placeholder="Enter latitude"
                  value={location.lat}
                  onChange={(e) => setLocation({ ...location, lat: e.target.value })}
                  disabled={useCurrentLocation}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  placeholder="Enter longitude"
                  value={location.lng}
                  onChange={(e) => setLocation({ ...location, lng: e.target.value })}
                  disabled={useCurrentLocation}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Visibility Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure minimum visible magnitude and other visibility settings
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="magnitude-slider">Minimum Visible Magnitude</Label>
                  <span className="text-sm text-muted-foreground">{magnitude[0]}</span>
                </div>
                <Slider
                  id="magnitude-slider"
                  min={1}
                  max={10}
                  step={0.5}
                  value={magnitude}
                  onValueChange={setMagnitude}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Brighter (1)</span>
                  <span>Fainter (10)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Equipment</h3>
              <p className="text-sm text-muted-foreground">Configure your telescope and observation equipment</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="telescope">Telescope Profile</Label>
                <Select value={telescope} onValueChange={setTelescope}>
                  <SelectTrigger id="telescope">
                    <SelectValue placeholder="Select telescope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default (No Telescope)</SelectItem>
                    <SelectItem value="dobsonian8">8" Dobsonian</SelectItem>
                    <SelectItem value="refractor4">4" Refractor</SelectItem>
                    <SelectItem value="schmidt8">8" Schmidt-Cassegrain</SelectItem>
                    <SelectItem value="custom">Custom...</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-track" className="flex-1">
                  Auto-track celestial objects
                </Label>
                <Switch id="auto-track" checked={autoTrack} onCheckedChange={setAutoTrack} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Light Pollution</h3>
              <p className="text-sm text-muted-foreground">
                Set your local light pollution level for accurate visibility predictions
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="light-pollution">Bortle Scale Rating</Label>
              <Select defaultValue="4">
                <SelectTrigger id="light-pollution">
                  <SelectValue placeholder="Select light pollution level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Class 1 - Excellent dark-sky site</SelectItem>
                  <SelectItem value="2">Class 2 - Typical truly dark site</SelectItem>
                  <SelectItem value="3">Class 3 - Rural sky</SelectItem>
                  <SelectItem value="4">Class 4 - Rural/suburban transition</SelectItem>
                  <SelectItem value="5">Class 5 - Suburban sky</SelectItem>
                  <SelectItem value="6">Class 6 - Bright suburban sky</SelectItem>
                  <SelectItem value="7">Class 7 - Suburban/urban transition</SelectItem>
                  <SelectItem value="8">Class 8 - City sky</SelectItem>
                  <SelectItem value="9">Class 9 - Inner city sky</SelectItem>
                </SelectContent>
              </Select>
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

