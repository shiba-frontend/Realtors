import React from 'react'

const WhychooseUs = () => {
    return (
        <div className="whychoose" style={{background: "url(./images/whychoose_bg.png)"}}>
            <div className="container">
                <div className="whychoose_top">
                    <h2><span>Why choose us</span></h2>
                    <div className="clr"></div>
                    <p>The real estate sector has also fallen prey to the turmoil during the pandemic like many other sectors. 2021 has altered our perspective of interacting with the world.</p>
                </div>
                <div className="whychoose_bottom">
                    <div className="whychoose_bottom_l">
                        <span>05</span>
                        <b>Year Of  Experiences</b>
                    </div>
                    <div className="whychoose_bottom_r">
                        <ul>
                            <li><img src="./images/whychoose_icon1.png" alt="whychoose_icon1"/>Quality Assurance<span>REALTOR</span></li>
                            <li><img src="./images/whychoose_icon2.png" alt="whychoose_icon2"/>Customer Satisfaction <span>REALTOR</span></li>
                            <li><img src="./images/whychoose_icon3.png" alt="whychoose_icon3"/>BUY AND SELL EASILY <span>REALTOR</span></li>
                        </ul>
                    </div>
                    <div className="clr"></div>
                </div>
            </div>
        </div>
    )
}

export default WhychooseUs
