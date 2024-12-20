// app/admin/news/page.tsx
// import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News Management',
  description: 'Manage news articles',
};

// async function getNews() {
//   const res = await fetch(`${process.env.API_URL}/news`, {
//     cache: 'no-store'
//   });
//   return res.json();
// }

export default async function NewsPage() {
  // const news = await getNews();

  return (
    // <div>
    //   <div className="sm:flex sm:items-center mb-6">
    //     <div className="sm:flex-auto">
    //       <h1 className="text-2xl font-semibold text-gray-900">News Management</h1>
    //     </div>
    //     <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
    //       <Link
    //         href="/admin/news/create"
    //         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    //       >
    //         Create News
    //       </Link>
    //     </div>
    //   </div>

    //   <div className="bg-white shadow overflow-hidden sm:rounded-md">
    //     <ul className="divide-y divide-gray-200">
    //       {news.map((item: any) => (
    //         <li key={item.id}>
    //           <div className="px-4 py-4 sm:px-6">
    //             <div className="flex items-center justify-between">
    //               <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
    //               <div className="flex space-x-2">
    //                 <Link
    //                   href={`/admin/news/edit/${item.id}`}
    //                   className="text-blue-600 hover:text-blue-800"
    //                 >
    //                   Edit
    //                 </Link>
    //               </div>
    //             </div>
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
    <>
    <div className='container mx-auto text-3xl text-center flex items-center justify-center'>
      this is a news page
    </div>
    </>
  );
}