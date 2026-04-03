import React from 'react';

const Skeleton = ({ className, count = 1 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className={`animate-pulse bg-zinc-200 rounded-lg ${className}`}></div>
      ))}
    </>
  );
};

export const TableSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-12 w-full" count={5} />
  </div>
);

export const KpiSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Skeleton className="h-40 w-full" count={3} />
  </div>
);

export default Skeleton;
