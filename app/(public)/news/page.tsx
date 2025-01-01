import NewsCardPagination from '@/components/news/NewsCardPagination'
import React from 'react'

const NewsPage = () => {
  return (
    <div className='min-h-screen'>
        <div className='mx-auto w-full px-4 pt-20 rounded-xl overflow-hidden  max-w-7xl'>
            <NewsCardPagination />
        </div>
        
        {/* TODO : implment the news card copmonent 
        and the pagination and display the news */}

    </div>
  )
}

export default NewsPage