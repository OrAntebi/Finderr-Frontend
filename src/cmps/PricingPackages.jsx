import { useState } from 'react'
import { Link } from 'react-router-dom'

import clockSvg from '../assets/img/clock-icon.svg'
import roundSvg from '../assets/img/round-icon.svg'
import checkSvg from '../assets/img/check-icon.svg'
import arrowSvg from '../assets/img/arrow-icon.svg'

export function PricingPackages({ gig }) {
    const [activeTab, setActiveTab] = useState('standard')
    const tabs = ['basic', 'standard', 'premium']
    const features = [
        'Script writing',
        '60 seconds running time',
        'Video editing',
        'Special effects',
        'Sound design & mixing'
    ]


    return (
        <section className="pricing-packages full main-container">
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
                    <span className="amount">₪584.64</span>
                    <p className="discount">Save up to 5% with <Link to="/login">Subscribe to Save</Link></p>
                </div>
                <p>4k Real and live stock footages from our library to make stunning ad</p>
                <div className="delivery-info flex">
                    <div className="delivery-time flex">
                        <span><img src={clockSvg} alt="" /></span>
                        <span>7-day delivery</span>
                    </div>
                    <div className="revisions flex">
                        <span><img src={roundSvg} alt="" /></span>
                        <span>3 Revisions</span>
                    </div>
                </div>
                <ul className="features-list">
                    {features.map((feature, idx) => (
                        <li key={idx}>
                            <span>
                                <img src={checkSvg} alt="check-icon" />
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <button className="continue-btn">Continue <span><img src={arrowSvg} alt="arrow-icon" /></span></button>
        </section>
    )
}