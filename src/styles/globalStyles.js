// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Poppins:100,300,400,700");
 *{
   margin: 0;
   padding: 0;
   box-sizing: border-box;
 }
 ::-webkit-scrollbar {
   /* display: none; */
 }
 body {
   font-family: "Poppins", sans-serif;
   font-size: 100%;
 }
 .btn {
  text-transform: none;
 }
 @media print {
   @page {
     size: A4 portrait;
     margin: 23px;
   }
 }
`;

export default GlobalStyle;
