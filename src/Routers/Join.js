import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { useInput } from 'Hooks';
import { setUserByIdOnFirebase } from 'fbase/firestoreFunctions';
import { authService } from 'fbase/firebaseInstance';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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
	const [inputEmail, onChangeInputEmail] = useInput('');
	const [username, onChangeUsername] = useInput('');
	const [password, onChangePassword] = useInput('');
	const history = useHistory();
	const onSubmitJoin = async (event) => {
		event.preventDefault();
		const {
			user: { uid, email, photoURL },
		} = await createUserWithEmailAndPassword(authService, inputEmail, password);
		try {
			await setUserByIdOnFirebase(uid, {
				uid,
				username,
				email,
				photoURL,
				albums: [],
			});
		} catch (error) {
			console.error('Error adding document: ', error);
		}
		history.push(`/user/${uid}`);
	};
	return (
		<Wrapper>
			<MainForm onSubmit={onSubmitJoin}>
				<Logo>Albums</Logo>
				<Description>
					Create your albums to memorize your Descriptionecial moment and share with others
				</Description>
				<StyledInput
					type="email"
					placeholder="Email"
					value={inputEmail}
					onChange={onChangeInputEmail}
				/>
				<StyledInput
					type="text"
					placeholder="Username"
					value={username}
					onChange={onChangeUsername}
				/>
				<StyledInput
					type="password"
					placeholder="Password"
					value={password}
					onChange={onChangePassword}
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