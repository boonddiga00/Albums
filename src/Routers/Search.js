import { useInput } from 'Hooks';
import { dbService } from 'fbase/firebaseInstance';
import { getDocs, collection, query, where } from 'firebase/firestore';

const Search = () => {
	const [queryText, onChangeQueryText] = useInput('');
	const onSubmit = async (event) => {
		event.preventDefault();
	};
	return (
		<>
			<h1>Search</h1>
			<form onSubmit={onSubmit}>
				<input type="text" value={queryText} onChange={onChangeQueryText} />
				<input type="submit" value="Search" />
			</form>
		</>
	);
};

export default Search;