export default function DashboardLoading() {
  return (
    <div className="flex animate-pulse flex-col gap-6" aria-busy="true" aria-label="Loading">
      <div className="h-9 w-56 rounded-md bg-canvas" />
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-20 rounded-lg bg-canvas" />
        ))}
      </div>
    </div>
  );
}
