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
  const newsColumnData = await (await axios.get('http://localhost:5074/api/News/GetTopArticles')).data;

  return (
    <main className="container min-h-screen flex-row justify-between m-auto pt-24 grid grid-cols-8 gap-4">
      <div className="flex-col col-span-6">
        <NewsCarousel />
        <NewsCardList />
      </div>
      <div className="col-span-2">
        <NewsColumn news={newsColumnData} />
      </div>
    </main>
  );
}
