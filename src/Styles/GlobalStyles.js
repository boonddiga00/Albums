import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle` 
    ${reset}
    a{
        all: unset;
				cursor: pointer;
    }
    *{
        box-sizing: border-box;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				flex-direction: column;
				align-items: center;
    }
		#root {
				width: 1512px;
				display: flex;
				flex-direction: column;
				align-items: center;
		}
`;

export default GlobalStyles;