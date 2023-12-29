import NewsCarousel from '@/components/Carousel';
import NewsCardList from '@/components/NewsCardList'
import NewsColumn from '@/components/NewsColumn';
import axios from 'axios';

/*
async function getData() {
  const res = await fetch('http://localhost:5074/api/News/GetAllNews/1', {
    next: {
      revalidate: 60,
      tags: ['news'],
    },
  })
  const list = res.json();

  return list;
}
*/


export default async function Home() {
  return (
    <main className="container min-h-screen flex-row justify-between m-auto pt-24 grid grid-cols-5 gap-4">
      <div className="flex-col col-span-4">
        <NewsCarousel />
        <NewsCardList />
      </div>
      <div className="">
        <NewsColumn />
      </div>
    </main>
  );
}