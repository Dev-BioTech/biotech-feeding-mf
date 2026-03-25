import React from 'react';

export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-[8px] ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

export function SkeletonList({ count = 3, className = '' }) {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`h-28 w-full ${className}`}>
           <Skeleton className="w-full h-full rounded-[12px]" />
        </div>
      ))}
    </div>
  );
}
