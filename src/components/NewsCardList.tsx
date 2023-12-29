"use client";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Chip,
	Image,
	Spinner,
} from "@nextui-org/react";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsCard from "./NewsCard";

export default function NewsCardList() {
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
		<InfiniteScroll
			dataLength={news.length}
			next={fetchMoreNews}
			hasMore={true}
			loader={<Spinner />}
			className="gap-2 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
		>
			{news?.map((item: any, index: any) => (
				<NewsCard news={item} key={index} />
			))}
		</InfiniteScroll>
	);
}
