import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { TimerIcon as TimeIcon } from "lucide-react"

export default function NotificationSettings() {
  const [enableNotifications, setEnableNotifications] = useState(true)
  const [notifyEvents, setNotifyEvents] = useState(true)
  const [notifyISS, setNotifyISS] = useState(true)
  const [notifyMeteorShowers, setNotifyMeteorShowers] = useState(true)
  const [notifyPlanets, setNotifyPlanets] = useState(false)
  const [notifyUpdates, setNotifyUpdates] = useState(true)
  const [advanceNotice, setAdvanceNotice] = useState("1day")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure when and how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enable-notifications" className="text-base">
                Enable Notifications
              </Label>
              <p className="text-sm text-muted-foreground">Receive notifications about astronomical events</p>
            </div>
            <Switch id="enable-notifications" checked={enableNotifications} onCheckedChange={setEnableNotifications} />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Notification Types</h3>
              <p className="text-sm text-muted-foreground">
                Select which types of events you want to be notified about
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notify-events"
                  checked={notifyEvents}
                  onCheckedChange={(checked) => setNotifyEvents(checked as boolean)}
                  disabled={!enableNotifications}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="notify-events"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Astronomical Events
                  </Label>
                  <p className="text-sm text-muted-foreground">Eclipses, conjunctions, oppositions</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notify-iss"
                  checked={notifyISS}
                  onCheckedChange={(checked) => setNotifyISS(checked as boolean)}
                  disabled={!enableNotifications}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="notify-iss"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ISS Passes
                  </Label>
                  <p className="text-sm text-muted-foreground">International Space Station visible passes</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notify-meteor-showers"
                  checked={notifyMeteorShowers}
                  onCheckedChange={(checked) => setNotifyMeteorShowers(checked as boolean)}
                  disabled={!enableNotifications}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="notify-meteor-showers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Meteor Showers
                  </Label>
                  <p className="text-sm text-muted-foreground">Peak times for major meteor showers</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notify-planets"
                  checked={notifyPlanets}
                  onCheckedChange={(checked) => setNotifyPlanets(checked as boolean)}
                  disabled={!enableNotifications}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="notify-planets"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Planet Visibility
                  </Label>
                  <p className="text-sm text-muted-foreground">Best times to observe planets</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notify-updates"
                  checked={notifyUpdates}
                  onCheckedChange={(checked) => setNotifyUpdates(checked as boolean)}
                  disabled={!enableNotifications}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="notify-updates"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    App Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">New features and important updates</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Notification Timing</h3>
              <p className="text-sm text-muted-foreground">Configure when you receive notifications before events</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="advance-notice">Advance Notice</Label>
              <Select value={advanceNotice} onValueChange={setAdvanceNotice} disabled={!enableNotifications}>
                <SelectTrigger id="advance-notice" className="w-full">
                  <SelectValue placeholder="Select advance notice time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1hour">1 hour before</SelectItem>
                  <SelectItem value="3hours">3 hours before</SelectItem>
                  <SelectItem value="12hours">12 hours before</SelectItem>
                  <SelectItem value="1day">1 day before</SelectItem>
                  <SelectItem value="3days">3 days before</SelectItem>
                  <SelectItem value="1week">1 week before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Quiet Hours</h3>
              <p className="text-sm text-muted-foreground">Set times when you don't want to receive notifications</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TimeIcon className="h-4 w-4 text-muted-foreground" />
                <span>10:00 PM - 7:00 AM</span>
              </div>
              <Button variant="outline" size="sm" disabled={!enableNotifications}>
                Change
              </Button>
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

