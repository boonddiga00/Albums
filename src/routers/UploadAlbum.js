const UploadAlbum = () => {
	return (
		<form>
			<input type="file" />
			<input type="text" placeholder="title" />
			<input type="text" placeholder="description" />
			<input type="submit" value="Make an New Album" />
		</form>
	);
};

export default UploadAlbum;