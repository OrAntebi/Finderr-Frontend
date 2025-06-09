import { useState } from 'react'
import { Link } from 'react-router-dom'

import clockSvg from '../assets/img/clock-icon.svg'
import roundSvg from '../assets/img/round-icon.svg'
import checkSvg from '../assets/img/check-icon.svg'
import arrowSvg from '../assets/img/arrow-icon.svg'

export function PricingPackages({ gig, screenWidth }) {
    const [activeTab, setActiveTab] = useState('standard')
    const features = [
        'Script writing',
        '60 seconds running time',
        'Video editing',
        'Special effects',
        'Sound design & mixing'
    ]

    const packages = {
        basic: {
            price: gig.price || '₪284.64',
            discount: 'Save up to 2% with',
            description: '2k stock footages from our library to make basic ad',
            deliveryTime: '4-day delivery',
            revisions: '1 Revision',
            featuresCount: 1
        },
        standard: {
            price: gig?.price * 2 || '₪584.64',
            discount: 'Save up to 5% with',
            description: '4k Real and live stock footages from our library to make stunning ad',
            deliveryTime: '6-day delivery',
            revisions: '3 Revisions',
            featuresCount: 3
        },
        premium: {
            price: gig?.price * 3 || '₪984.64',
            discount: 'Save up to 10% with',
            description: '8k Premium stock footages and custom shots to make exceptional ad',
            deliveryTime: '10-day delivery',
            revisions: 'Unlimited Revisions',
            featuresCount: 5
        }
    }

    const tabs = ['basic', 'standard', 'premium']
    const currentPackage = packages[activeTab]
    const currentFeatures = features.slice(0, currentPackage.featuresCount)

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
                    <span className="amount">{currentPackage.price}$</span>
                    <p className="discount">{currentPackage.discount}<Link to="/login"> Subscribe to Save</Link></p>
                </div>
                <p>{currentPackage.description}</p>
                <div className="delivery-info flex">
                    <div className="delivery-time flex">
                        <span><img src={clockSvg} alt="" /></span>
                        <span>{currentPackage.deliveryTime}</span>
                    </div>
                    <div className="revisions flex">
                        <span><img src={roundSvg} alt="" /></span>
                        <span>{currentPackage.revisions}</span>
                    </div>
                </div>
                <ul className="features-list">
                    {currentFeatures.map((feature, idx) => (
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