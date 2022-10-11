// libraries
import React from 'react';

// UI components
import HeroImage from '../components/HeroImage';
import Navbar from '../components/Navbar';


class Home extends React.Component {

    render() {
        return (
            <div>
                {/* navbar */}
                <Navbar />

                {/* hero image */}
                <HeroImage />
            </div>
        )
    }
}

export default Home;