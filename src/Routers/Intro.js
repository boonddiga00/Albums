import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	height: 90vh;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	padding-top: 25%;
`;

const Logo = styled.h1`
	font-size: 24px;
	font-weihgt: 900;
`;

const Button = styled.button`
	all: unset;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 120px;
	height: 45px;
	background-color: #c4c4c4;
	color: white;
`;

const Description = styled.p`
	font-size: 13px;
	margin: 40px 0;
	width: 285px;
	text-align: center;
`;

const LoginButton = styled(Button)`
	margin-bottom: 10px;
`;

const JoinButton = styled(Button)`
	background-color: #757575;
`;

const Intro = () => {
	return (
		<Wrapper>
			<Logo>Albums</Logo>
			<Description>
				Create your albums to memorize your Descriptionecial moment and share with others
			</Description>
			<Link to="/login">
				<LoginButton>Login</LoginButton>
			</Link>
			<Link to="/join">
				<JoinButton>Join Now</JoinButton>
			</Link>
		</Wrapper>
	);
};

export default Intro;