import { useState } from 'react';
import { useInput } from 'Hooks';

const UploadAlbum = () => {
	const [albumImage, setAlbumImage] = useState([]);
	const { value: title, onChange: onChangeTitle } = useInput('');
	const { value: description, onChange: onChangeDescription } = useInput('');
	const onChangeFile = (event) => {
		const {
			target: { files },
		} = event;
		setAlbumImage(files);
	};
	const onSubmit = (event) => {
		event.preventDefault();
	};
	return (
		<form onSubmit={onSubmit}>
			<div>
				<input type="file" />
				<input value={title} onChange={onChangeTitle} type="text" placeholder="title" />
			</div>
			<input
				value={description}
				onChange={onChangeDescription}
				type="text"
				placeholder="description"
			/>
			<input onChange={onChangeFile} type="file" multiple={true} />
			<input type="submit" value="Make an New Album" />
		</form>
	);
};
export default UploadAlbum;