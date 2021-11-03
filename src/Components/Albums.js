const Albums = ({ user: { albums } }) => {
	return albums ? (
		<div>
			<h1>Albums</h1>
			{albums.map(({ thumnail, albumImages, description, title }) => (
				<div>
					<img src={thumnail} alt="Thumnail" title="Thumnail" width="200px" height="200px" />
					<div>
						{albumImages.map((albumImage, index) => (
							<img
								key={index}
								src={albumImage}
								alt="Album"
								title="Album"
								width="200px"
								height="200px"
							/>
						))}
					</div>
					<h1>{title}</h1>
					<h2>{description}</h2>
				</div>
			))}
		</div>
	) : (
		<>
			<h1>Albums</h1>
			<h3>We can't Find anything...</h3>
		</>
	);
};

export default Albums;