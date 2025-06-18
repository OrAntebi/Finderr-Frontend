import { useState } from 'react'
import { Link } from 'react-router-dom'

export function PricingPackages({ gig, screenWidth, icons, onContinueClick, selectedPackage, onSelectPackage }) {
    const activeTab = selectedPackage
    const setActiveTab = onSelectPackage

    const { packages } = gig
    const tabs = ['basic', 'standard', 'premium']
    const currentPackage = packages[activeTab]

    return (
        <section className={`gig-package-section${screenWidth < 964 ? ' full main-container' : ''}`}>
            {screenWidth >= 964 && <div className="like-and-share flex align-center">
                <div className="collect-wrapper flex align-center justify-center">
                    <div className="like-wrapper flex align-center justify-center">
                        <button><span><img src={icons.hamburger} alt="hamburger-icon" /></span></button>
                        <button><span><img src={icons.heart} alt="heart-icon" /></span></button>
                    </div>
                    <span className="collect-count">38</span>
                </div>
                <button className="share-dots"><img src={icons.share} alt="share-icon" /></button>
                <button className="share-dots"><img src={icons.dots} alt="dots-icon" /></button>
            </div>}
            <div className={`pricing-packages ${screenWidth < 964 ? ' full main-container' : ''}`}>
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
                            <span><img src={icons.clock} alt="" /></span>
                            <span>{currentPackage.packDaysToMake}-day delivery</span>
                        </div>
                        <div className="revisions flex">
                            <span><img src={icons.round} alt="" /></span>
                            <span>
                                {activeTab === 'premium' ? 'Unlimited Revisions' :
                                    activeTab === 'standard' ? '3 Revisions' :
                                        '1 Revision'}
                            </span>
                        </div>
                    </div>

                    <ul className="features-list">
                        {packages.premium.features?.map((feature, idx) => {
                            const isIncluded = currentPackage.features?.includes(feature)
                            return (
                                <li key={idx}>
                                    <span>
                                        <svg fill={isIncluded ? "#222325" : "#dadbdd"} width="16" height="16" viewBox="0 0 11 9">
                                            <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
                                        </svg>
                                        {feature}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <button className="continue-btn" onClick={onContinueClick}>
                    Continue <span><img src={icons.arrow} alt="arrow-icon" /></span>
                </button>
            </div>
        </section>
    )
}