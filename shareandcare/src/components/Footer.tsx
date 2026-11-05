import Link from "next/link";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.026 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

const socials = [
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer className="border-t bg-emerald-950 text-emerald-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-emerald-500/20">
              <Heart className="size-5 fill-emerald-400 text-emerald-400" />
            </span>
            <span className="text-lg font-bold">ShareAndCare</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-emerald-100/70">
            A community platform to organise and join clothes drives,
            plantation days, cleanups and more. Small acts, shared together.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full bg-emerald-900 transition-colors hover:bg-emerald-500"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-emerald-100/70">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/events" className="hover:text-white">Upcoming Events</Link></li>
            <li><Link href="/events/create" className="hover:text-white">Create Event</Link></li>
            <li><Link href="/events/joined" className="hover:text-white">Joined Events</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-emerald-100/70">
            <li className="flex items-center gap-2"><MapPin className="size-4" /> Khulna, Bangladesh</li>
            <li className="flex items-center gap-2"><Mail className="size-4" /> hello@shareandcare.com</li>
            <li className="flex items-center gap-2"><Phone className="size-4" /> +880 1700-000000</li>
          </ul>
        </div>
      </div>

     <div className="border-t border-emerald-900 py-5 text-center text-xs text-emerald-100/60">
  © 2026 ShareAndCare. All rights reserved.
</div>
    </footer>
  );
}