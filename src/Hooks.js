import { useState } from 'react';

export const useInput = (initailValue) => {
	const [value, setValue] = useState(initailValue);
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setValue(value);
	};
	return [value, onChange];
};

export const useOnChangeFiles = () => {
	const [data, setData] = useState([]);
	const onChangeFiles = (event) => {
		const {
			target: { files },
		} = event;
		setData(files);
	};
	return [data, onChangeFiles];
};

export const useOnChangeFile = () => {
	const [data, setData] = useState([]);
	const onChangeFiles = (event) => {
		const {
			target: { files },
		} = event;
		setData(files[0]);
	};
	return [data, onChangeFiles];
};