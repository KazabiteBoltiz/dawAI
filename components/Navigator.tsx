"use client";

import { IoHome, IoCube, IoPerson, IoAddCircle, IoCalendar } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "/", icon: IoHome },
  { name: "Planner", href: "/planner", icon: IoCalendar },
  { name: "Market", href: "/market", icon: IoAddCircle },
  { name: "Cart", href: "/booked", icon: IoCube },
  { name: "Profile", href: "/profile", icon: IoPerson },
];

export function Navigator() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.name}
              asChild
              variant="link"
              className={cn(
                "white-1 flex-1 flex flex-col items-center justify-center h-full rounded-none",
                isActive || "bg-white-15",
              )}
            >
              <Link href={item.href}>
                <item.icon className="h-full w-full" />
                <span className="text-s mt-1">{item.name}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}