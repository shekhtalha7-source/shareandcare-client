import { Heart } from "lucide-react";

export default function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span className="flex size-9 items-center justify-center rounded-full bg-emerald-500/15">
        <Heart className="size-5 fill-emerald-500 text-emerald-500" />
      </span>
      <span className="text-lg font-bold tracking-tight">ShareAndCare</span>
    </span>
  );
}