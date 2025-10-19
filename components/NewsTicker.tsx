import React, { useRef } from 'react';
import { ChevronRightIcon } from './icons';

const NewsTicker: React.FC = () => {
  const topics = [
    'Louvre robbery',
    'US-Venezuela tensions',
    "The truth behind your clothing's label",
    "'6-7' meme",
    'Tracking your kids on your phone',
    'Shredding stereotypes',
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleTopicClick = (e: React.MouseEvent, topic: string) => {
    e.preventDefault();
    alert(`Navigating to stories about: ${topic}`);
  }

  return (
    <div className="border-t border-gray-200">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-10">
                <div 
                    ref={scrollContainerRef} 
                    className="flex items-center space-x-4 overflow-x-auto whitespace-nowrap scrollbar-hide"
                >
                    {topics.map((topic, index) => (
                        <React.Fragment key={topic}>
                        <a href="#" onClick={(e) => handleTopicClick(e, topic)} className="text-sm hover:underline flex-shrink-0">
                            {topic}
                        </a>
                        {index < topics.length - 1 && <span className="text-gray-300">|</span>}
                        </React.Fragment>
                    ))}
                </div>
                <button 
                    onClick={handleScroll} 
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors flex-shrink-0 ml-4"
                    aria-label="Scroll topics right"
                >
                    <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                </button>
            </div>
        </div>
    </div>
  );
};

export default NewsTicker;
