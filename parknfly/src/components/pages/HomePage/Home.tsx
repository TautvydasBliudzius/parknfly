import React from "react";
import Header from "../../Header/Header";
import Reservation from "../../Reservation/Reservation";
import HowToFind from "../../HowToFind/HowToFind";
import Contacts from "../../Contacts/Contacts";
import Footer from "../../Footer/Footer";



const Home: React.FC = () => {
    return (
        <div id="home">
            <>
                <Header />
                <Reservation />
                <HowToFind />
                <Contacts />
                <Footer />
            </>
        </div>
    );
}

export default Home;
