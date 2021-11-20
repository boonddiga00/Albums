import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	background-color: red;
`

const Intro = () => {
	return (
		<Container>
			<h1>Albums</h1>
			<p>Create your albums to memorize your special moment and share with others</p>
			<div>
				<Link to="/join">Join Now</Link>
			</div>
			<div>
				<Link to="/login">Login Now</Link>
			</div>
		</Container>
	);
};

export default Intro;