import { cn } from "../utils/cn";

export default function Card({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col h-full overflow-hidden rounded-2xl border border-[#3f2b27]/10 bg-slate-100 shadow-sm text-[#3f2b27]",
        className,
      )}
    >
      {children}
    </div>
  );
}
