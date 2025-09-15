
import { Poppins } from "next/font/google";
import "../globals.css";

import Footer from "../components/landing/Footer";
import Navbar from "../components/landing/Navbar";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});


export default  function LandingLayout({ children}) {
 
  return (
    <div className={poppins.variable}>
      
     <Navbar/>
      {children}
      <Footer/>
    </div>
  );
}



