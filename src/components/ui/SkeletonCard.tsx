export default function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <div className="h-2 w-full skeleton rounded-none" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-5 w-24 skeleton rounded-full" />
          <div className="h-5 w-12 skeleton rounded-full" />
        </div>
        <div className="h-5 w-3/4 skeleton rounded-lg" />
        <div className="h-3.5 w-1/2 skeleton rounded-lg" />
        <div className="h-3 w-full skeleton rounded-full mt-4" />
        <div className="h-3 w-2/3 skeleton rounded-lg" />
      </div>
    </div>
  );
}
