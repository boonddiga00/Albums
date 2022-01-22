import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
	height: 90vh;
`;

const MainForm = styled.form`
	display: flex;
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

const AskForLogin = styled.div`
	margin-top: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Question = styled.p`
	font-size: 12px;
	margin-bottom: 25px;
`;
const LoginLink = styled(Link)`
	font-size: 14px;
	font-weight: 600;
	text-decoration: underline;
`;

const JoinPresenter = ({ onSubmit, register, errors }) => {
	const emailRegister = register('email', {
		required: 'Email is required',
		pattern: {
			value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			message: 'Not in email format',
		},
	});
	const usernameRegister = register('username', { required: 'Username is required' });
	const passwordRegister = register('password', { required: 'Password is required' });
	const password1Register = register('password1', { required: 'Please check your password.' });
	return (
		<Wrapper>
			<MainForm onSubmit={onSubmit}>
				<Logo>Albums</Logo>
				<Description>
					Create your albums to memorize your Descriptionecial moment and share with others
				</Description>
				<StyledInput {...emailRegister} type="text" placeholder="Email" />
				<span>{errors?.email?.message}</span>
				<StyledInput {...usernameRegister} type="text" placeholder="Username" />
				<span>{errors?.username?.message}</span>
				<StyledInput {...passwordRegister} type="password" placeholder="Password" />
				<span>{errors?.password?.message}</span>
				<StyledInput {...password1Register} type="password" placeholder="Password Verification" />
				<span>{errors?.password1?.message}</span>
				<span>{errors?.extraError?.message}</span>
				<Button>Sign Up</Button>
			</MainForm>
			<AskForLogin>
				<Question>Already have an account?</Question>
				<LoginLink to="/login">Sign in now!</LoginLink>
			</AskForLogin>
		</Wrapper>
	);
};

export default JoinPresenter;