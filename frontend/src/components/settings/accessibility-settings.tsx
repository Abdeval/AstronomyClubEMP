
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function AccessibilitySettings() {
  const [textSize, setTextSize] = useState([100])
  const [highContrast, setHighContrast] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [colorBlindMode, setColorBlindMode] = useState("none")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Accessibility Settings</CardTitle>
          <CardDescription>Customize the app to make it more accessible for your needs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Text Size</h3>
              <p className="text-sm text-muted-foreground">Adjust the size of text throughout the application</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="text-size-slider">Text Size</Label>
                <span className="text-sm text-muted-foreground">{textSize[0]}%</span>
              </div>
              <Slider id="text-size-slider" min={75} max={150} step={5} value={textSize} onValueChange={setTextSize} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Smaller</span>
                <span>Default</span>
                <span>Larger</span>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-sm" style={{ fontSize: `${textSize[0]}%` }}>
                This is a preview of the text at {textSize[0]}% size.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Visual Preferences</h3>
              <p className="text-sm text-muted-foreground">Adjust visual settings for better accessibility</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="flex-1">
                  High Contrast Mode
                </Label>
                <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="reduce-motion" className="flex-1">
                  Reduce Motion
                </Label>
                <Switch id="reduce-motion" checked={reduceMotion} onCheckedChange={setReduceMotion} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Color Vision Deficiency</h3>
              <p className="text-sm text-muted-foreground">
                Adjust colors for different types of color vision deficiency
              </p>
            </div>
            <RadioGroup value={colorBlindMode} onValueChange={setColorBlindMode} className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="color-none" />
                <Label htmlFor="color-none">No adjustment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="protanopia" id="color-protanopia" />
                <Label htmlFor="color-protanopia">Protanopia (red-blind)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="deuteranopia" id="color-deuteranopia" />
                <Label htmlFor="color-deuteranopia">Deuteranopia (green-blind)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tritanopia" id="color-tritanopia" />
                <Label htmlFor="color-tritanopia">Tritanopia (blue-blind)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="achromatopsia" id="color-achromatopsia" />
                <Label htmlFor="color-achromatopsia">Achromatopsia (monochromacy)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Screen Reader Support</h3>
              <p className="text-sm text-muted-foreground">Configure options for screen reader compatibility</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="verbose-descriptions" className="flex-1">
                  Verbose Object Descriptions
                </Label>
                <Switch id="verbose-descriptions" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="announce-events" className="flex-1">
                  Announce Celestial Events
                </Label>
                <Switch id="announce-events" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reading-speed">Reading Speed</Label>
                <Select defaultValue="normal">
                  <SelectTrigger id="reading-speed">
                    <SelectValue placeholder="Select reading speed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slow">Slow</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="fast">Fast</SelectItem>
                    <SelectItem value="very-fast">Very Fast</SelectItem>
                  </SelectContent>
                </Select>
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

