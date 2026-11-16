import { Skeleton } from "@heroui/react";

export default function ProductLoading() {
  return (
    <div className="container-shell pt-6 sm:pt-10">
      <div className="grid gap-10 md:grid-cols-[1.1fr_.9fr] md:gap-12 lg:gap-16">
        <Skeleton className="aspect-[4/5] w-full rounded-2xl bg-soft" />
        <div>
          <Skeleton className="h-4 w-16 rounded-xl bg-soft" />
          <Skeleton className="mt-3 h-10 w-4/5 rounded-xl bg-soft" />
          <Skeleton className="mt-4 h-5 w-24 rounded-xl bg-soft" />
          <Skeleton className="mt-6 h-4 w-full rounded-xl bg-soft" />
          <Skeleton className="mt-2 h-4 w-3/4 rounded-xl bg-soft" />
          <Skeleton className="mt-8 size-9 rounded-full bg-soft" />
          <Skeleton className="mt-7 h-11 w-2/3 rounded-full bg-soft" />
          <Skeleton className="mt-8 h-12 w-full rounded-full bg-soft" />
        </div>
      </div>
    </div>
  );
}
