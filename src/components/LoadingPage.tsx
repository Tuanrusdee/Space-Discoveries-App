import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const LoadingPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-4">
            <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    );
};

export default LoadingPage;