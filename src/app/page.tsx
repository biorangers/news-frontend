import NewsCarousel from '@/components/Carousel';
import NewsCardList from '@/components/NewsCardList'
import NewsColumn from '@/components/NewsColumn';
import axios from 'axios';


export default async function Home() {
  const newsColumnData = await (await axios.get('http://localhost:5074/api/News/GetTopArticles')).data;

  return (
    <main className="container min-h-screen flex-row justify-between m-auto pt-24 grid grid-cols-8 gap-4">
      <div className="flex-col col-span-6">
        <NewsCarousel />
        <NewsCardList url={`/api/News/GetAllNews/`} />
      </div>
      <div className="col-span-2">
        <NewsColumn news={newsColumnData} />
      </div>
    </main>
  );
}
