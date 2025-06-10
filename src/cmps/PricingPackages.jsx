import { useState } from 'react'
import { Link } from 'react-router-dom'

import clockSvg from '../assets/img/clock-icon.svg'
import roundSvg from '../assets/img/round-icon.svg'
import checkSvg from '../assets/img/check-icon.svg'
import arrowSvg from '../assets/img/arrow-icon.svg'

export function PricingPackages({ gig, screenWidth }) {
    const [activeTab, setActiveTab] = useState('standard')
    
    const { packages } = gig
    const tabs = ['basic', 'standard', 'premium']
    const currentPackage = packages[activeTab]

    return (
        <section className={`pricing-packages${screenWidth < 964 ? ' full main-container' : ''}`}>
            <nav role="tablist" className="full">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        role="tab"
                        aria-selected={activeTab === tab}
                        className={activeTab === tab ? 'active' : ''}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </nav>
            
            <div className="pricing-card">
                <div className="price flex column">
                    <span className="amount">${currentPackage.packPrice}</span>
                    <p className="discount">
                        Save up to {activeTab === 'basic' ? '2%' : activeTab === 'standard' ? '5%' : '10%'} with
                        <Link to="/login"> Subscribe to Save</Link>
                    </p>
                </div>
                
                <p>{currentPackage.desc}</p>
                
                <div className="delivery-info flex">
                    <div className="delivery-time flex">
                        <span><img src={clockSvg} alt="" /></span>
                        <span>{currentPackage.packDaysToMake}-day delivery</span>
                    </div>
                    <div className="revisions flex">
                        <span><img src={roundSvg} alt="" /></span>
                        <span>
                            {activeTab === 'premium' ? 'Unlimited Revisions' : 
                             activeTab === 'standard' ? '3 Revisions' : 
                             '1 Revision'}
                        </span>
                    </div>
                </div>
                
                <ul className="features-list">
                    {currentPackage.features && currentPackage.features.map((feature, idx) => (
                        <li key={idx}>
                            <span>
                                <img src={checkSvg} alt="check-icon" />
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            
            <button className="continue-btn">
                Continue <span><img src={arrowSvg} alt="arrow-icon" /></span>
            </button>
        </section>
    )
}