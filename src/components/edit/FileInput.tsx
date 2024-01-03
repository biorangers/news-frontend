import React, { useState } from 'react';
import { Button, CircularProgress, Input } from '@nextui-org/react'
import axios from 'axios';
const App = ({ uploadedFile, setUploadedFile }: any) => {
	const [file, setFile] = useState() as any;
	const [uploadProgress, setUploadProgress] = useState(0);


	function handleChange(event: any) {
		setFile(event.target.files[0]);
	}

	function handleSubmit(event: any) {
		event.preventDefault();
		const url = '/api/images/upload';
		const data = new FormData(event.target as HTMLFormElement);
		const allData = Object.fromEntries(data.entries()) as RegisterFormEntry

		const config = {
			headers: {
				'content-type': 'multipart/form-data',
				'type': 'image/webp'
			},

			onUploadProgress: function (progressEvent: any) {
				const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				setUploadProgress(percentCompleted);
			}
		};
		// make a POST request with the form data file=@__8aailBZk-9eggHQw_j_g.webp;type=image/webp
		axios.post(url, allData, config)
			.then((res) => {
				setUploadProgress(0);
				setUploadedFile(res.data.fileName);
			})
			.catch((err) => console.log(err));


	}

	return (
		<form onSubmit={handleSubmit} className="max-w-lg grid grid-cols-3 gap-2">
			<Button variant="bordered" className='col-span-2'>
				<Input
					name="file"
					variant="bordered"
					type="file"
					className="max-w-lg opacity-0 absolute"
					onChange={(e) => setFile(handleChange(e))}
				/>
				Resim seç {file?.name}
			</Button>

			<Button type="submit" variant='bordered' className='col-span-1'>
				{(uploadProgress === 0) ? 'Yükle' : <CircularProgress value={uploadProgress} />}
			</Button>

		</form>
	);
}

export default App;