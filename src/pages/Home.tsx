import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import LoadingPage from '../components/LoadingPage';
import LoadingCard from '../components/LoadingCard';
import { SpaceData } from '../interface/SpaceData';


const ITEMS_PER_PAGE = 12;

const Home = () => {
    const [spaceData, setSpaceData] = useState<SpaceData[]>([]);
    const [filteredData, setFilteredData] = useState<SpaceData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(
                    'https://api.nasa.gov/planetary/apod?api_key=O03VgJ6FDZjxGUWYJiDeALlOaUITzf1oFCamjrXv&count=100'
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setSpaceData(data);
                setFilteredData(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let filtered = spaceData;

        if (searchTerm) {
            filtered = filtered.filter(
                item =>
                    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.explanation.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (startDate) {
            filtered = filtered.filter(item => item.date >= startDate);
        }

        if (endDate) {
            filtered = filtered.filter(item => item.date <= endDate);
        }

        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchTerm, startDate, endDate, spaceData]);


    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading && spaceData.length === 0) {
        return <LoadingPage />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <h2 className="text-2xl mb-4">Error Loading Data</h2>
                    <p className="text-red-400">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by title or description..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                        <label className="text-center text-gray-300" htmlFor="startDate">Start Date</label>
                        <input
                            id="startDate"
                            type="date"
                            className="bg-gray-800 rounded-lg px-4 py-2"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="text-center text-gray-300" htmlFor="endDate">End Date</label>
                        <input
                            id="endDate"
                            type="date"
                            className="bg-gray-800 rounded-lg px-4 py-2"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                        <LoadingCard key={index} />
                    ))
                ) : currentItems.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 py-8">
                        No results found for your search criteria
                    </div>
                ) : (
                    currentItems.map((item, index) => (
                        <div
                            key={item.date + index}
                            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
                            onClick={() => navigate(`/detail/${startIndex + index}`, { state: { item } })}
                        >
                            {item.media_type === 'image' ? (
                                <img
                                    src={item.url}
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                                    Video Content
                                </div>
                            )}
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                                <p className="text-gray-400">{item.date}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            {filteredData.length > ITEMS_PER_PAGE && (
                <div className="mt-8 flex justify-center items-center space-x-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="flex items-center space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(page => {
                                return page === 1 ||
                                    page === totalPages ||
                                    Math.abs(page - currentPage) <= 1;
                            })
                            .map((page, index, array) => (
                                <React.Fragment key={page}>
                                    {index > 0 && array[index - 1] !== page - 1 && (
                                        <span className="text-gray-400">...</span>
                                    )}
                                    <button
                                        onClick={() => handlePageChange(page)}
                                        className={`w-8 h-8 rounded-lg ${currentPage === page
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                </React.Fragment>
                            ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;