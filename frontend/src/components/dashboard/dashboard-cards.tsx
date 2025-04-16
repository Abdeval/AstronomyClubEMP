import { useState, useEffect, act } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  UserPlus,
  Telescope,
  Calendar,
  FileText,
  Moon,
  Star,
  ArrowRight,
  TrendingUp,
  Clock,
} from "lucide-react";
import { format, addDays } from "date-fns";
import BarChartComponent from "../charts/bar-chart";
import { useDashboard } from "@/hooks";
import { Link } from "react-router-dom";

export function DashboardCards() {
  const [moonPhase, setMoonPhase] = useState<number>(0.75); // 0 = new moon, 0.5 = full moon, 1 = new moon
  const {
    totalMembers,
    isTotalMembersLoading,
    activeGroup,
    isActiveGroupLoding,
    isLatestArticlesLoding,
    latestArticles,
  } = useDashboard();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // const article0 = latestArticles.articles[0];
  // const article1 = latestArticles.articles.length > 1 ? latestArticles.articles[1] : null;
  console.log(latestArticles);
  // Get moon phase name based on value
  const getMoonPhaseName = (phase: number): string => {
    if (phase < 0.05 || phase > 0.95) return "New Moon";
    if (phase < 0.25) return "Waxing Crescent";
    if (phase < 0.3) return "First Quarter";
    if (phase < 0.45) return "Waxing Gibbous";
    if (phase < 0.55) return "Full Moon";
    if (phase < 0.7) return "Waning Gibbous";
    if (phase < 0.8) return "Last Quarter";
    return "Waning Crescent";
  };

  // Get moon phase icon based on value
  const getMoonPhaseIcon = (phase: number): string => {
    if (phase < 0.05 || phase > 0.95) return "🌑";
    if (phase < 0.25) return "🌒";
    if (phase < 0.3) return "🌓";
    if (phase < 0.45) return "🌔";
    if (phase < 0.55) return "🌕";
    if (phase < 0.7) return "🌖";
    if (phase < 0.8) return "🌗";
    return "🌘";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Members Card */}
      <Card className="rounded-[16px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isTotalMembersLoading ? "..." : totalMembers.total}
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
            <UserPlus className="h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">
              +{isTotalMembersLoading ? "..." : totalMembers.new12members}
            </span>
            <span>new this month</span>
          </div>
          <Progress
            value={isTotalMembersLoading ? 0 : 75}
            className="h-2 mt-4 bg-primary"
          />
          <p className="text-xs text-muted-foreground mt-2">
            75% towards yearly goal
          </p>
        </CardContent>
      </Card>

      {/* Most Active Group Card */}
      {isActiveGroupLoding ? (
        <p>loading...</p>
      ) : (
        <Card className="rounded-[16px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Most Active Group
            </CardTitle>
            <Telescope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={activeGroup.image} alt="group" />
                <AvatarFallback>{activeGroup.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-lg font-semibold">{activeGroup.name}</div>
                <div className="text-sm text-muted-foreground">
                  {activeGroup.members.length}
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span>Activity</span>
                <span className="font-medium">Very High</span>
              </div>
              <Progress
                value={isLoading ? 0 : 92}
                className="h-1 bg-green-500"
              />
              <div className="flex justify-between text-xs">
                <span>Events this month</span>
                <span className="font-medium">8</span>
              </div>
              <Progress
                value={isLoading ? 0 : 80}
                className="h-1 bg-blue-500"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Link to={`/members/groups`}>
              <Button variant="ghost" className="w-full" size="sm">
                <span>View Group</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}

      {/* Upcoming Events Card */}
      <Card className="rounded-[16px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              <div className="h-[120px] flex items-center justify-center">
                <div className="animate-pulse h-4 w-32 bg-muted rounded"></div>
              </div>
            ) : (
              <>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Meteor Shower Watch</div>
                    <div className="text-sm text-muted-foreground">
                      {format(addDays(new Date(), 3), "MMM d")} • 9:00 PM
                    </div>
                    <Badge variant="outline" className="mt-1">
                      12 attending
                    </Badge>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Telescope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Saturn Observation</div>
                    <div className="text-sm text-muted-foreground">
                      {format(addDays(new Date(), 5), "MMM d")} • 10:30 PM
                    </div>
                    <Badge variant="outline" className="mt-1">
                      8 attending
                    </Badge>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full" size="sm">
            <span>View All Events</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      {/* New Articles Card */}
      <Card className="rounded-[16px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            New Articles This Month
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLatestArticlesLoding ? "..." : latestArticles.length}
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">+40%</span>
            <span>from last month</span>
          </div>
          <div className="mt-4 space-y-3">
            {isLatestArticlesLoding ? (
              <div className="h-[80px] flex items-center justify-center">
                <div className="animate-pulse h-4 w-32 bg-muted rounded"></div>
              </div>
            ) : (
              <>
                {latestArticles.articles.map((article: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span>{article.title}</span>
                    <Badge variant="secondary" className="text-xs">
                      New
                    </Badge>
                  </div>
                ))}
              </>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Link to={"/members/articles"}>
            <Button variant="ghost" className="w-full" size="sm">
              <span>View All Articles</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* current Moon Phase Card */}
      <Card className="rounded-[16px]">
        {" "}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Current Moon Phase
          </CardTitle>
          <Moon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="text-4xl mb-2">
              {isLoading ? "..." : getMoonPhaseIcon(moonPhase)}
            </div>
            <div className="text-xl font-bold">
              {isLoading ? "..." : getMoonPhaseName(moonPhase)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {isLoading ? "..." : format(new Date(), "MMMM d, yyyy")}
            </div>
            <div className="w-full mt-4">
              <div className="flex justify-between text-xs mb-2">
                <span>New Moon</span>
                <span>Full Moon</span>
                <span>New Moon</span>
              </div>
              <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-primary rounded-full"
                  style={{ width: `${moonPhase * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full" size="sm">
            <span>View Moon Calendar</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      {/* Next Celestial Event Card */}
      <Card className="rounded-[16px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Next Celestial Event
          </CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[120px] flex items-center justify-center">
              <div className="animate-pulse h-4 w-32 bg-muted rounded"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold">Perseid Meteor Shower</div>
                <Badge>High Visibility</Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {format(addDays(new Date(), 14), "MMMM d")} -{" "}
                  {format(addDays(new Date(), 16), "MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Peak: 2:00 AM - 4:00 AM</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Up to 100 meteors per hour at peak. Best viewed from dark
                locations away from city lights.
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full" size="sm">
            <span>Set Reminder</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      {/* planets sizes */}
      <BarChartComponent />
    </div>
  );
}
