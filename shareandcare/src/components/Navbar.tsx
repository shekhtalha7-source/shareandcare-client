"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarCheck,
  CalendarCog,
  LogOut,
  Menu,
  PlusCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
];

const userLinks = [
  { href: "/events/create", label: "Create Event", icon: PlusCircle },
  { href: "/events/manage", label: "Manage Events", icon: CalendarCog },
  { href: "/events/joined", label: "Joined Events", icon: CalendarCheck },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  async function handleLogout() {
    await authClient.signOut();
    setSheetOpen(false);
    router.push("/");
    router.refresh();
  }

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors hover:text-emerald-500 ${
      pathname === href ? "text-emerald-500" : "text-muted-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: logo */}
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Center: desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: theme + auth + mobile menu */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isPending ? (
            <div className="size-9 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                title={user.name}
                aria-label={user.name}
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <Avatar className="size-9">
                  <AvatarImage src={user.image || undefined} alt={user.name} />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                {userLinks.map(({ href, label, icon: Icon }) => (
                  <DropdownMenuItem
                    key={href}
                    className="cursor-pointer"
                    onClick={() => router.push(href)}
                  >
                    <Icon className="mr-2 size-4" />
                    {label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants(),
                "bg-emerald-500 text-white hover:bg-emerald-600"
              )}
            >
              Login
            </Link>
          )}

          {/* Mobile menu */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "md:hidden"
              )}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={linkClass(l.href)}
                    onClick={() => setSheetOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                {user &&
                  userLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={linkClass(l.href)}
                      onClick={() => setSheetOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                {user && (
                  <button
                    onClick={handleLogout}
                    className="text-left text-sm font-medium text-red-500"
                  >
                    Logout
                  </button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}