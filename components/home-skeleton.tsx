import { Skeleton } from "@/components/ui/skeleton";
import RetroPortfolio from "@/app/retro/page";


export default function PortfolioSkeleton() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section Skeleton */}
      <section className="py-20 min-h-screen">
        <div className="grid md:grid-cols-[350px_1fr] gap-8">
          <div className="bg-zinc-900/60 rounded-xl p-6 border border-zinc-800 h-fit">
            <div className="flex flex-col items-center text-center">
              <Skeleton className="h-[150px] w-[150px] rounded-full" />
              <Skeleton className="h-8 w-40 mt-4" />
              <Skeleton className="h-4 w-32 mt-2 mb-4" />

              <div className="space-y-3 w-full">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>

              <div className="flex flex-wrap gap-2 my-4 justify-center">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded-full" />
                ))}
              </div>

              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <Skeleton className="h-12 w-3/4 mb-2" />
              <Skeleton className="h-12 w-1/2 mb-2" />
              <Skeleton className="h-12 w-2/3 mb-6" />
              <Skeleton className="h-5 w-full max-w-2xl" />
              <Skeleton className="h-5 w-full max-w-2xl mt-2" />
              <Skeleton className="h-10 w-32 mt-8" />
            </div>

            <div className="bg-zinc-900/60 rounded-2xl p-8 border border-zinc-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other sections skeletons */}
      {["about", "projects", "certifications", "contact"].map((section) => (
        <section key={section} className="py-20">
          <Skeleton className="h-10 w-48 mb-8" />
          <Skeleton className="h-5 w-full max-w-3xl mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        </section>
      ))}
      {/* <RetroPortfolio /> */}
    </div>
  );
}