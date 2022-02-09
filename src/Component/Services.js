import React from 'react'
import ServicesBanner from './ServicesBanner';
import ServicesContent from './ServicesContent';

const Services = () => {
    return (
        <div className="services">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <ServicesBanner/>
                    </div>
                    <div className="col-md-6">
                        <ServicesContent/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
