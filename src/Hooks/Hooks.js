import { useState } from 'react';

export const useInput = (initailValue) => {
	const [value, setValue] = useState(initailValue);
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setValue(value);
	};
	return { value, onChange };
};