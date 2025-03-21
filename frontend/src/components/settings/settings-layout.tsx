
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Settings, User, Bell, Eye, Database, Accessibility } from "lucide-react"
import DisplaySettings from "./display-settings"
import ObservationSettings from "./observation-settings"
import NotificationSettings from "./notification-settings"
import AccountSettings from "./account-settings"
import DataSettings from "./data-settings"
import AccessibilitySettings from "./accessibility-settings"
// import { Button } from "@/components/ui/button"

export default function SettingsLayout() {
  const [activeTab, setActiveTab] = useState("display")
//   const navigate = useNavigation();

  return (
    <div className="container mx-auto py-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-6 font-regular">
        <Tabs
          defaultValue="display"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full space-y-6"
          orientation="vertical"
        >
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <Card className="p-4 md:w-64 flex-shrink-0">
              <TabsList className="flex flex-col items-start h-auto bg-transparent space-y-1">
                <TabsTrigger value="display" className="w-full justify-start px-2 py-1.5 h-9">
                  <Eye className="h-4 w-4 mr-2" />
                  Display
                </TabsTrigger>
                <TabsTrigger value="observation" className="w-full justify-start px-2 py-1.5 h-9">
                  <Settings className="h-4 w-4 mr-2" />
                  Observation
                </TabsTrigger>
                <TabsTrigger value="notifications" className="w-full justify-start px-2 py-1.5 h-9">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="account" className="w-full justify-start px-2 py-1.5 h-9">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="data" className="w-full justify-start px-2 py-1.5 h-9">
                  <Database className="h-4 w-4 mr-2" />
                  Data Management
                </TabsTrigger>
                <TabsTrigger value="accessibility" className="w-full justify-start px-2 py-1.5 h-9">
                  <Accessibility className="h-4 w-4 mr-2" />
                  Accessibility
                </TabsTrigger>
              </TabsList>
            </Card>

            <div className="flex-1">
              <TabsContent value="display" className="m-0">
                <DisplaySettings />
              </TabsContent>
              <TabsContent value="observation" className="m-0">
                <ObservationSettings />
              </TabsContent>
              <TabsContent value="notifications" className="m-0">
                <NotificationSettings />
              </TabsContent>
              <TabsContent value="account" className="m-0">
                <AccountSettings />
              </TabsContent>
              <TabsContent value="data" className="m-0">
                <DataSettings />
              </TabsContent>
              <TabsContent value="accessibility" className="m-0">
                <AccessibilitySettings />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

