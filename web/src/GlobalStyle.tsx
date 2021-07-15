import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
	--green-light: #EAFFF7;
	--green-dark: #53E3AC;
	--blue-light:#DFEAFF;
	--blue-dark: #518BF8;
	--black: #393C3B;
	--gray: #AFAFAF;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  div {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  //noinspection CssNoGenericFontName
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: var(--black);
  }

  h3 {
    display: block;
    font-weight: bold;
    font-size: 32px;
    line-height: 44px;
    margin: 0;
  }
`;

export default GlobalStyle;
