import { Skeleton } from "@heroui/react";

export default function ShopLoading() {
  return (
    <div className="container-shell pb-16 pt-10 sm:pt-16">
      <Skeleton className="h-12 w-56 rounded-xl bg-mist sm:h-14 sm:w-72" />
      <div className="mt-6 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-11 w-24 rounded-full bg-mist" />
        ))}
      </div>
      <Skeleton className="mt-8 h-4 w-24 rounded-xl bg-mist" />
      <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-9 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-[4/5] w-full rounded-[22px] bg-mist" />
            <Skeleton className="mt-3 h-4 w-3/4 rounded-xl bg-mist" />
            <Skeleton className="mt-2 h-4 w-14 rounded-xl bg-mist" />
          </div>
        ))}
      </div>
    </div>
  );
}
