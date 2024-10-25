import React from 'react';

const LoadingCard = () => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-700"></div>
            <div className="p-4">
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            </div>
        </div>
    );
};

export default LoadingCard;