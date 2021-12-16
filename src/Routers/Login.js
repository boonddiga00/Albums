import styled from 'styled-components';
import { useState } from 'react';
import { useInput } from 'Hooks';
import { useHistory, Link } from 'react-router-dom';
import { authService } from 'fbase/firebaseInstance';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Wrapper = styled.div`
	height: 90vh;
`;

const MainForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
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
	margin-top: 60px;
`;

const Description = styled.p`
	font-size: 13px;
	margin: 40px 0;
	width: 285px;
	text-align: center;
`;
const StyledInput = styled.input`
	all: unset;
	width: 350px;
	height: 40px;
	border-bottom: 1px solid black;
	padding: 7px 5px;
	::placeholder {
		color: black;
		font-size: 14px;
	}
`;

const AskForJoin = styled.div`
	margin-top: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Question = styled.p`
	font-size: 12px;
	margin-bottom: 25px;
`;
const JoinLink = styled(Link)`
	font-size: 14px;
	font-weight: 600;
	text-decoration: underline;
`;

const ErrorMessage = styled.span`
	color: #e70000;
	font-size: 12px;
	margin-top: 20px;
`;

const Login = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const [email, onChangeEmail] = useInput('');
	const [password, onChangePassword] = useInput('');
	const history = useHistory();
	const onSubmitLogin = async (event) => {
		event.preventDefault();
		try {
			await signInWithEmailAndPassword(authService, email, password);
			history.push('/');
		} catch (error) {
			console.dir(error);
			switch (error.code) {
				case 'auth/wrong-password':
					setErrorMessage('Wrong Password.');
					break;
				case 'auth/invalid-email':
					setErrorMessage('Invalid Email.');
					break;
				case 'auth/user-not-found':
					setErrorMessage("We can't find your email.");
					break;
				case 'auth/too-many-requests':
					setErrorMessage('Access to this account has been temporarily disabled');
					break;
				default:
					setErrorMessage('Something went wrong.. please try again.');
			}
		}
	};
	return (
		<Wrapper>
			<MainForm onSubmit={onSubmitLogin}>
				<Logo>
					<Link to="/">Albums</Link>
				</Logo>
				<Description>
					Create your albums to memorize your Descriptionecial moment and share with others
				</Description>
				<StyledInput type="text" placeholder="Email" value={email} onChange={onChangeEmail} />
				<StyledInput
					type="password"
					placeholder="Password"
					value={password}
					onChange={onChangePassword}
				/>
				<Button>Login</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			</MainForm>
			<AskForJoin>
				<Question>Don't have an account?</Question>
				<JoinLink to="/join">Sign up now!</JoinLink>
			</AskForJoin>
		</Wrapper>
	);
};

export default Login;