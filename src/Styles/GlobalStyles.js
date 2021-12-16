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
		html {
				display: flex;
				justify-content: center;
		}
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;

export default GlobalStyles;