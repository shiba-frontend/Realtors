import React from 'react'
import Banner from './Banner';
import Services from './Services';
import OurVideo from './OurVideo';
import Realtor from '../Realtor/Realtor';
import Testimonial from './Testimonial';
import BecomeRealtor from './BecomeRealtor';
import WhychooseUs from './WhychooseUs';

 const Home = () => {
    return (
        <React.Fragment>
            <Banner/>
            <Services/>
            {/* <OurVideo/>*/}
            <Realtor/>
            <BecomeRealtor/>
            <WhychooseUs/>
            <Testimonial/>
        </React.Fragment>
    )
}


export default Home;

