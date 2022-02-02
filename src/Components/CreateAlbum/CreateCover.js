import styled from 'styled-components';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const Wrapper = styled.main`
	position: relative;
	width: 100%;
	height: 90vh;
	display: felx;
	justify-content: center;
	align-items: center;
`;
const NextButton = styled.button`
	position: absolute;
	right: 50px;
	top: 0px;
`;

const ColorBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 460px;
	height: 460px;
	background-color: #a0c6ff;
`;
const ImageBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 400px;
	height: 400px;
	background-color: #ffffff;
`;
const InvisibleInput = styled.input`
	display: none;
`;

const CreateCover = () => {
	const inputRef = useRef();
	const onClickThumnailButton = () => {
		inputRef.current.click();
	};
	return (
		<Wrapper>
			<form>
				<InvisibleInput ref={inputRef} type="file" multiple accept="image/*" />
			</form>
			<Link to="/create/content">
				<NextButton>Next</NextButton>
			</Link>
			<ColorBox>
				<ImageBox>
					<button onClick={onClickThumnailButton}>Choose Your Thumnail</button>
				</ImageBox>
			</ColorBox>
		</Wrapper>
	);
};

export default CreateCover;