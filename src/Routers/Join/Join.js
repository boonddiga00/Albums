import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUser } from 'fbase/functions/authFunctions';
import { setUserById } from 'fbase/functions/userFunctions';

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

const Join = () => {
	const {
		register,
		handleSubmit,
		formState: { erorrs },
		setError,
	} = useForm();
	const history = useHistory();
	const onSubmit = async (data) => {
		const { email, username, password, password1 } = data;
		if (password !== password1) {
			setError('password1', { message: 'Passwords do not match.' }, { shouldFocus: true });
			return;
		}
		try {
			const { uid } = await createUser(email, password);
			await setUserById(uid, {
				uid,
				username,
				email,
				photoURL: null,
				albums: [],
			});
			history.push(`/user/${uid}`);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Wrapper>
			<MainForm onSubmit={handleSubmit(onSubmit)}>
				<Logo>Albums</Logo>
				<Description>
					Create your albums to memorize your Descriptionecial moment and share with others
				</Description>
				<StyledInput
					{...register('email', { required: 'Email is required' })}
					type="email"
					placeholder="Email"
				/>
				<StyledInput
					{...register('username', { required: 'Username is required' })}
					type="text"
					placeholder="Username"
				/>
				<StyledInput
					{...register('password', { required: 'Password is required' })}
					type="password"
					placeholder="Password"
				/>
				<StyledInput
					{...register('password1', { required: 'Please check your password.' })}
					type="password"
					placeholder="Password Verification"
				/>
				<Button>Sign Up</Button>
			</MainForm>
			<AskForLogin>
				<Question>Already have an account?</Question>
				<LoginLink to="/login">Sign in now!</LoginLink>
			</AskForLogin>
		</Wrapper>
	);
};
export default Join;