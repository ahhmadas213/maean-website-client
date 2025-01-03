"use client";

import React, { useState } from 'react';
import NewsCardPagination from '@/components/news/NewsCardPagination';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // For navigation
import { newsItems } from '@/lib/data';
import { NewsItemProps } from '@/types';

// Reusable NewsCard Component
const NewsCard = ({ news }: { news: NewsItemProps }) => {
  const router = useRouter();

  const handleClick = () => {
    const encodedTitle = encodeURIComponent(news.title); // Encode the title for the URL
    router.push(`/news/${encodedTitle}`); // Navigate using the encoded title
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gradient-to-br from-primary_blue/10 to-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden cursor-pointer"
    >
      <div className="relative h-48">
        <Image
          src={news.images![0]}
          alt={news.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-primary_blue">{news.title}</h3>
        <p className="text-slate-600">{news.description}</p>
      </div>
    </div>
  );
};

const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Display 6 items per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  // Get the news items for the current page
  const currentNewsItems = newsItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary_blue/10">
      <div className="mx-auto w-full px-4 pt-20 rounded-xl overflow-hidden container">
        <NewsCardPagination />
      </div>

      {/* News List Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold  mb-8 text-primary_blue">الأخبار</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentNewsItems.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-4">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-primary_blue text-white px-4 py-2 rounded-lg hover:bg-primary_blue/90 transition-all disabled:opacity-50"
          >
            السابق
          </Button>
          <span className="text-lg font-semibold text-primary_blue">
            الصفحة {currentPage} من {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-primary_blue text-white px-4 py-2 rounded-lg hover:bg-primary_blue/90 transition-all disabled:opacity-50"
          >
            التالي
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;