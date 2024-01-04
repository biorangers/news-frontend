"use client"

import axios from "axios"
import { useEffect } from "react"

export default function Viewer({ articleId }: any) {
	useEffect(() => {
		axios.put(`/api/NewsOperation/UpdateArticleView/${articleId}`)
	}, [articleId])
	return (
		<div></div>
	)
}