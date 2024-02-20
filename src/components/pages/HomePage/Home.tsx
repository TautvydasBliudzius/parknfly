import React from "react";
import Header from "../../Header/Header";
import Reservation from "../../Reservation/Reservation";
import HowToFind from "../../HowToFind/HowToFind";
import Footer from "../../Footer/Footer";
import HowToUse from "../../HowToUse/HowToUse";



const Home: React.FC = () => {
    return (
        <div id="home">
            <>
                <Header />
                <Reservation />
                <HowToFind />
                <HowToUse />
                <Footer />
            </>
        </div>
    );
}

export default Home;
