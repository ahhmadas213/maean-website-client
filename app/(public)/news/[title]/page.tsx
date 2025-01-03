"use client";

import { useParams } from 'next/navigation';
import { newsItems } from '@/lib/data'; // Import the newsItems data
import Image from 'next/image';

const IndividualNewsPage = () => {
  const { title } = useParams(); // Get the `title` from the URL
  const decodedTitle = typeof title === 'string' ? decodeURIComponent(title) : null; // Decode the title or use a default value
  const news = newsItems.find((item) => item.title === decodedTitle); // Find the news item by title

  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary_blue/10">
      <div className="container mx-auto px-4 py-20">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <Image
              src={news.images![0]}
              alt={news.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-primary_blue mb-4">{news.title}</h1>
            <p className="text-slate-600 mb-6">{news.description}</p>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: news.content! }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualNewsPage;