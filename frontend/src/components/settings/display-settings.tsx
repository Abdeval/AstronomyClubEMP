
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Theme, useTheme } from "@/context/theme-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DisplaySettings() {
  const { theme, setTheme } = useTheme()
  const [units, setUnits] = useState("metric")
  const [timeFormat, setTimeFormat] = useState("24h")
  const [coordinateSystem, setCoordinateSystem] = useState("equatorial")
  const [showConstellations, setShowConstellations] = useState(true)
  const [showGridlines, setShowGridlines] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [chartStyle, setChartStyle] = useState("modern")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>Customize how astronomical data is displayed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Theme</h3>
              <p className="text-sm text-muted-foreground">Choose your preferred theme for the application</p>
            </div>
            <RadioGroup
              defaultValue={theme}
              onValueChange={(value: Theme) => setTheme(value)}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem value="light" id="light" className="peer sr-only" />
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="rounded-md border border-border p-2 bg-background mb-3 w-full h-20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-center font-medium">Light</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="rounded-md border border-border p-2 bg-black mb-3 w-full h-20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-center font-medium">Dark</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="system" id="system" className="peer sr-only" />
                <Label
                  htmlFor="system"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="rounded-md border border-border p-2 mb-3 w-full h-20 flex items-center justify-center bg-gradient-to-r from-background to-black">
                    <div className="w-8 h-8 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-center font-medium">System</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Units & Format</h3>
              <p className="text-sm text-muted-foreground">Set your preferred measurement units and time format</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="units">Measurement Units</Label>
                <Select value={units} onValueChange={setUnits}>
                  <SelectTrigger id="units">
                    <SelectValue placeholder="Select units" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric (km, °C)</SelectItem>
                    <SelectItem value="imperial">Imperial (mi, °F)</SelectItem>
                    <SelectItem value="astronomical">Astronomical (AU, ly)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time-format">Time Format</Label>
                <Select value={timeFormat} onValueChange={setTimeFormat}>
                  <SelectTrigger id="time-format">
                    <SelectValue placeholder="Select time format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24-hour</SelectItem>
                    <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Coordinate System</h3>
              <p className="text-sm text-muted-foreground">Choose your preferred astronomical coordinate system</p>
            </div>
            <Select value={coordinateSystem} onValueChange={setCoordinateSystem}>
              <SelectTrigger id="coordinate-system">
                <SelectValue placeholder="Select coordinate system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equatorial">Equatorial (RA/Dec)</SelectItem>
                <SelectItem value="horizontal">Horizontal (Alt/Az)</SelectItem>
                <SelectItem value="ecliptic">Ecliptic</SelectItem>
                <SelectItem value="galactic">Galactic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Sky Map Display</h3>
              <p className="text-sm text-muted-foreground">Configure what elements are shown on sky maps</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-constellations" className="flex-1">
                  Show constellation lines
                </Label>
                <Switch id="show-constellations" checked={showConstellations} onCheckedChange={setShowConstellations} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-gridlines" className="flex-1">
                  Show coordinate grid lines
                </Label>
                <Switch id="show-gridlines" checked={showGridlines} onCheckedChange={setShowGridlines} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-labels" className="flex-1">
                  Show object labels
                </Label>
                <Switch id="show-labels" checked={showLabels} onCheckedChange={setShowLabels} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Chart Style</h3>
              <p className="text-sm text-muted-foreground">Choose the visual style for charts and graphs</p>
            </div>
            <Tabs value={chartStyle} onValueChange={setChartStyle} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="modern">Modern</TabsTrigger>
                <TabsTrigger value="classic">Classic</TabsTrigger>
                <TabsTrigger value="minimal">Minimal</TabsTrigger>
              </TabsList>
              <TabsContent value="modern" className="mt-4">
                <div className="h-32 rounded-md bg-muted flex items-center justify-center">
                  <div className="w-3/4 h-16 bg-primary/20 rounded-md relative">
                    <div className="absolute bottom-0 left-0 w-1/4 h-8 bg-primary rounded-bl-md"></div>
                    <div className="absolute bottom-0 left-1/4 w-1/4 h-12 bg-primary/80 rounded-none"></div>
                    <div className="absolute bottom-0 left-2/4 w-1/4 h-6 bg-primary/60 rounded-none"></div>
                    <div className="absolute bottom-0 left-3/4 w-1/4 h-10 bg-primary/40 rounded-br-md"></div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="classic" className="mt-4">
                <div className="h-32 rounded-md bg-muted flex items-center justify-center">
                  <div className="w-3/4 h-16 bg-secondary/20 rounded-md relative">
                    <div className="absolute bottom-0 left-0 w-1/4 h-8 bg-secondary rounded-bl-md"></div>
                    <div className="absolute bottom-0 left-1/4 w-1/4 h-12 bg-secondary/80 rounded-none"></div>
                    <div className="absolute bottom-0 left-2/4 w-1/4 h-6 bg-secondary/60 rounded-none"></div>
                    <div className="absolute bottom-0 left-3/4 w-1/4 h-10 bg-secondary/40 rounded-br-md"></div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="minimal" className="mt-4">
                <div className="h-32 rounded-md bg-muted flex items-center justify-center">
                  <div className="w-3/4 h-16 bg-background rounded-md relative border border-border">
                    <div className="absolute bottom-0 left-0 w-1/4 h-8 bg-foreground/20 rounded-bl-md"></div>
                    <div className="absolute bottom-0 left-1/4 w-1/4 h-12 bg-foreground/30 rounded-none"></div>
                    <div className="absolute bottom-0 left-2/4 w-1/4 h-6 bg-foreground/20 rounded-none"></div>
                    <div className="absolute bottom-0 left-3/4 w-1/4 h-10 bg-foreground/10 rounded-br-md"></div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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

