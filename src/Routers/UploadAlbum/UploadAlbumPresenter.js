const UploadAlbumPresenter = ({
	onChangeThumnail,
	onChangeAblumImages,
	titleInput,
	descriptionInput,
	onSubmitAlbum,
	btnRef
}) => {
	return (
		<form onSubmit={onSubmitAlbum}>
			<div>
				<input onChange={onChangeThumnail} type="file" required />
				<input {...titleInput} type="text" placeholder="Title" required />
			</div>
			<input {...descriptionInput} type="text" placeholder="Description" required />
			<input onChange={onChangeAblumImages} type="file" multiple={true} required />
			<input ref={btnRef} type="submit" value="Make an New Album" />
		</form>
	);
};

export default UploadAlbumPresenter;