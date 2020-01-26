import { createGlobalStyle } from "styled-components";

const GlobalStylesInjector = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Space+Mono:400,400i,700,700i|Work+Sans:200,300,400,500,600,700,800&display=swap');

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    :root {
        --mainFont: 'Work Sans', sans-serif;
        --monoFont: 'Space Mono', monospace;

        --dark0: #12011D;

        --white: #fff;

        --editorBackgroundColor: #F4F4F4;
        --whiteBorderColor: #D8CFDE;

        --mainTextColor: #12011D;
        --subTextColor: #695F6F;
    }

    body {
        font-family: var(--mainFont);
    }

    h1, h2, h3, h4 {
        font-family: var(--monoFont);
    }
`;

export default GlobalStylesInjector;
