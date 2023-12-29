"use client"

import { Carousel } from '@trendyol-js/react-carousel';
import NewsCard from './NewsCard';
import { Button, Image } from '@nextui-org/react';
import Flicking from '@egjs/react-flicking';
import { useState, useEffect } from 'react';

export default function NewsCarousel() {
	return (<div />)
	/*
	const [news, setNews] = useState([]);
	const [page, setPage] = useState(1);
	const fetchMoreNews = async () => {
		// Yeni haberleri çekmek için bir API isteği yapın
		try {
			const response = await fetch(`/api/News/GetAllNews/${page}`, {
				next: {
					revalidate: 60,
					tags: ["news"],
				},
			}); // Sayfa numarasını API'ye gönderin
			const data = await response.json();
			//@ts-ignore-next-line
			setNews([...news, ...data]); // Mevcut haber listesine yeni verileri ekleyin
			setPage(page + 1); // Sayfa numarasını bir sonraki sayfa için güncelleyin
		} catch (error) {
			console.error("Haberleri getirirken hata oluştu:", error);
		}
	};

	useEffect(() => {
		// Sayfa yüklendiğinde veya belirli bir koşula göre haberleri yükleme
		fetchMoreNews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Bu etkileşim sadece bir kez çalışacak şekilde yapılandırıldı, isteğe bağlı olarak koşula göre güncellenebilir

	return (

		<Flicking renderOnlyVisible={true} className='min-w-48 min-h-96'>
			{news.map((newsData, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div className="flicking-panel" key={index}>
					<Image
						src={newsData.articleImageURL}
						alt={newsData.articleTitle}
						width="100%"
						height="100%"
						className="w-full object-cover aspect-video"
					/>
				</div>
			))}
		</Flicking>

	)
	*/
}