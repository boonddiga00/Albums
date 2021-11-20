import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, Provider } from 'recact-redux';
import reducer from 'Store/Reducers/rootReducer';
import App from 'Components/App';

const store = createStore(reducer);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);