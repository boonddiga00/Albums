import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const LoginPresenter = ({ onSubmit, register, errors }) => {
	const emailRegister = register('email', {
		required: 'Email is required',
		pattern: {
			value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			message: 'Not in email format',
		},
	});
	const passwordRegister = register('password', { required: 'Password is required' });
	return (
		<Wrapper>
			<MainForm onSubmit={onSubmit}>
				<Logo>
					<Link to="/">Albums</Link>
				</Logo>
				<Description>
					Create your albums to memorize your Descriptionecial moment and share with others
				</Description>
				<StyledInput {...emailRegister} type="text" placeholder="Email" />
				<ErrorMessage>{errors?.email?.message}</ErrorMessage>
				<StyledInput {...passwordRegister} type="password" placeholder="Password" />
				<ErrorMessage>{errors?.password?.message}</ErrorMessage>
				<Button>Login</Button>
				<ErrorMessage>{errors?.extraError?.message}</ErrorMessage>
			</MainForm>
			<AskForJoin>
				<Question>Don't have an account?</Question>
				<JoinLink to="/join">Sign up now!</JoinLink>
			</AskForJoin>
		</Wrapper>
	);
};

export default LoginPresenter;