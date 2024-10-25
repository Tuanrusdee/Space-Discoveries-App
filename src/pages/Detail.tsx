import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SpaceData } from '../interface/SpaceData';

const DetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { item } = location.state as { item: SpaceData };

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-blue-400 mb-6 hover:text-blue-300"
            >
                <ArrowLeft size={20} />
                Back to Home
            </button>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
                {item.media_type === 'image' ? (
                    <img
                        src={item.url}
                        alt={item.title}
                        className="w-full max-h-[600px] object-cover"
                    />
                ) : (
                    <div className="w-full h-[600px] bg-gray-700 flex items-center justify-center">
                        Video Content
                    </div>
                )}
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
                    <p className="text-gray-400 mb-4">{item.date}</p>
                    <p className="text-gray-300 leading-relaxed">{item.explanation}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;