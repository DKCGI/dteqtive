import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'Icons Social Media 8';
  src: url('../static/fonts/smIcons.ttf') format('truetype');
}
body::-webkit-scrollbar {
    width: 1rem;
  }

  //scroll bar start
  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: #fff;
  }

  body::-webkit-scrollbar-track {
    background: #392E3D;
  }

  body::-webkit-scrollbar-thumb {
    background-color: #fff ;
    background: #fff;;
  }

  // scroll bar end
.iconFont{
    font-family:'Icons Social Media 8';
    font-size:2rem;
    position:relative;
    top:.1rem;
}
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:"Courier Prime", "OCR A Extended", monospace;
}
html{
    height:100%;
    font-size:22px;
    width:100%;
}
@media screen and ( max-width: 1000px ){
    html{
        font-size:16px;
    }
}
body{
    min-height:100vh;
    height:100%;
    width:100%;
    position:absolute;
}
    h1{
        text-align:center;
        font-size:3rem;
        color:#fff;
    }
`;

export default GlobalStyles;
