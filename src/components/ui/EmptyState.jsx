import React from 'react';

const DefaultWheatIcon = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 2v20M8.5 4.5l3.5 3.5M15.5 4.5L12 8M8.5 9.5l3.5 3.5M15.5 9.5L12 13M8.5 14.5l3.5 3.5M15.5 14.5L12 18" />
  </svg>
);

export function EmptyState({ 
  title = "Aún no hay registros de alimentación", 
  description, 
  actionLabel = "+ Registrar primera alimentación", 
  onAction, 
  icon: Icon = DefaultWheatIcon
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-[12px] shadow-sm border border-gray-100 border-dashed w-full min-h-[300px]">
      <div className="h-24 w-24 rounded-full bg-farm-green-50 flex items-center justify-center mb-6 shadow-inner">
        <Icon className="w-12 h-12 text-farm-green-600" />
      </div>
      <h3 className="text-xl font-bold font-roboto text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 font-inter max-w-sm mb-6 text-sm md:text-base">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="min-w-[44px] min-h-[44px] px-8 py-3 mt-4 bg-farm-green-600 text-white rounded-[8px] font-bold font-inter shadow-lg shadow-farm-green-200 hover:bg-farm-green-700 focus:outline-none focus:ring-2 focus:ring-farm-green-500 focus:ring-offset-2 transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center text-lg"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
