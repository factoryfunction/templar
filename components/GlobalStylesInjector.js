import { createGlobalStyle } from 'styled-components'

const GlobalStylesInjector = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Space+Mono:400,400i,700,700i|Work+Sans:200,300,400,500,600,700,800&display=swap');

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
    }

    :root {
        /* Accent colors for light or dark theme. */
        --highlight: #ff8906;
        --secondary: #f25f4c;
        --tertiary: #e53170;

        /* Dark theme. */
        --night-white: #fffffe;
        --night-black: #0f0e17;
        --night-gray: #a7a9be;

        --day-gray: #ececed;
        /* --gray: #e9e9ea; */

        --backgroundColor: #eff0f3;
        --headingColor: #0d0d0d;

        --boxShadow0: 0 1px 2px rgba(0, 0, 0, 0.125), 0 2px 4px rgba(0, 0, 0, 0.125), 0 4px 8px rgba(0, 0, 0, 0.125),
    0 8px 16px rgba(0, 0, 0, 0.125);

        --paneTransform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
    skew(0deg, 0deg);

        --mainFont: 'Work Sans', sans-serif;
        --monoFont: 'Space Mono', monospace;

        --dark0: #12011D;
        --white: #fff;
        --mainPurple: #7416ca;
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

    .PowerSelect__Option {
        padding-left: 12px;
        font-size: 14px;
        letter-spacing: 0.5px;
        font-family: var(--mainFont);
    }
`

export default GlobalStylesInjector
