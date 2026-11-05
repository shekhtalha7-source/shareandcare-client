import { CalendarPlus, HeartHandshake, MapPinned, ShieldCheck } from "lucide-react";

const features = [
  { icon: CalendarPlus, title: "Create in minutes", text: "Set up a drive with a title, place and date, and invite your neighbours." },
  { icon: HeartHandshake, title: "Join in one click", text: "Found something near you? Join instantly and see it in your list." },
  { icon: MapPinned, title: "Find local events", text: "Search by title or filter by type: cleanup, plantation, donation and more." },
  { icon: ShieldCheck, title: "Safe and private", text: "Only you can edit or delete the events you created." },
];

export default function Features() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Why ShareAndCare</h2>
          <p className="mt-2 text-muted-foreground">
            Everything you need to do good together, in one place.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}