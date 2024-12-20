import { Skeleton } from "@/components/ui/skeleton";

export function OrderTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-8 w-[150px]" />
      </div>
      <div className="rounded-md border">
        <div className="border-b">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center p-4 gap-4"
            >
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-8 w-[100px]" />
      </div>
    </div>
  )
} 