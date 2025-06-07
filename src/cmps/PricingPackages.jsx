import { useState } from 'react'
import { Link } from 'react-router-dom'
import checkIcon from '../assets/img/check-icon.svg'

export function PricingPackages({ gig }) {
    const [activeTab, setActiveTab] = useState('standard')
    const tabs = ['basic', 'standard', 'premium']

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
                    <span className="delivery-time">📅 7-day delivery</span>
                    <span className="revisions">🔄 Unlimited Revisions</span>
                </div>
            </div>
        </section>
    )
}