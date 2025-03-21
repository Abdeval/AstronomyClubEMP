import AstronomyCalendar from "@/components/calendar/astronomy-calendar";

export default function CalendarPage() {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Astronomy Calendar</h1>
      <AstronomyCalendar />
    </div>
  );
}
