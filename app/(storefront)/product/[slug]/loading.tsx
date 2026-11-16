import { Skeleton } from "@heroui/react";

export default function ProductLoading() {
  return (
    <div className="container-shell md:pt-10">
      <div className="grid gap-10 md:grid-cols-[1.1fr_.9fr] md:gap-12 lg:gap-16">
        <Skeleton className="-mx-5 aspect-square rounded-none bg-mist sm:-mx-8 md:mx-0 md:rounded-[28px]" />
        <div>
          <Skeleton className="h-4 w-16 rounded-xl bg-mist" />
          <Skeleton className="mt-3 h-10 w-4/5 rounded-xl bg-mist" />
          <Skeleton className="mt-4 h-5 w-24 rounded-xl bg-mist" />
          <Skeleton className="mt-6 h-4 w-full rounded-xl bg-mist" />
          <Skeleton className="mt-2 h-4 w-3/4 rounded-xl bg-mist" />
          <Skeleton className="mt-8 size-9 rounded-full bg-mist" />
          <Skeleton className="mt-7 h-11 w-2/3 rounded-full bg-mist" />
          <Skeleton className="mt-8 h-12 w-full rounded-full bg-mist" />
        </div>
      </div>
    </div>
  );
}
