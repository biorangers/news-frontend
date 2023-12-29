import React from "react";
export default async function Page() {

	return (// redirect to ana sayfa
		<div className="container p-2 mt-2 prose max-w-[900px] prose-stone dark:prose-invert text-neutral-300 flex flex-col justify-center mx-auto">
			<h1>404</h1>
			<p>Aradığınız sayfa bulunamadı.</p>
		</div>
	);
}