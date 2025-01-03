"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { ReportProps } from '@/types';

// Mock data for reports and achievements
const reportsData = [
  {
    id: 1,
    title: "تقرير الأداء السنوي 2023",
    description: "تقرير شامل عن إنجازاتنا وأدائنا خلال العام 2023.",
    imageUrl: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1920&h=600",
    link: "/reports/annual-report-2023",
  },
  {
    id: 2,
    title: "إنجازات مشروع التشجير",
    description: "تفاصيل عن إنجازاتنا في مشروع التشجير الوطني.",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&h=600",
    link: "/reports/tree-planting-achievements",
  },
  {
    id: 3,
    title: "تقرير التوعية الصحية",
    description: "تقرير عن حملات التوعية الصحية التي قمنا بها.",
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1920&h=600",
    link: "/reports/health-awareness-report",
  },
  {
    id: 4,
    title: "إنجازات برنامج التعليم",
    description: "تفاصيل عن إنجازاتنا في برنامج التعليم الإلكتروني.",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&h=600",
    link: "/reports/education-program-achievements",
  },
];

// Reusable ReportCard Component
const ReportCard = ({ report }: { report: ReportProps }) => {
  return (
    <a href={report.downloadLink} className="block">
      <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-transform">
        <div className="relative h-48">
          <Image
            src={`${report.imageUrl}`}
            alt={report.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-primary_blue">{report.title}</h3>
          <p className="text-slate-600">{report.description}</p>
        </div>
      </div>
    </a>
  );
};

const ReportsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Display 4 items per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(reportsData.length / itemsPerPage);

  // Get the reports for the current page
  const currentReports = reportsData.slice(
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
    <div className="min-h-screen  bg-gradient-to-b from-white to-primary_blue/10">
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold  mb-8 text-primary_blue">التقارير والإنجازات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentReports.map((report) => (
            <div
              key={report.id}
              className={`${report.id % 2 === 0 ? 'md:col-span-2' : 'md:col-span-1'}`} // Masonry grid layout
            >
              <ReportCard report={report} />
            </div>
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

export default ReportsPage;