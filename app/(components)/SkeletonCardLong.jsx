import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCardLong() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[100px] w-[600px] rounded-xl" />
      <Skeleton className="h-[200px] w-[600px] rounded-xl" />
      <Skeleton className="h-[250px] w-[600px] rounded-xl" />
    </div>
  );
}
