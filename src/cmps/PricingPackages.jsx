import { useState } from 'react'

export function PricingPackages({ gig }) {
    const [activeTab, setActiveTab] = useState('standard')
    const tabs = ['basic', 'standard', 'premium']

    return (
        <section className="pricing-packages">
            <nav role="tablist">
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
                    <p className="discount">Save up to 5% with <a href="#">Subscribe to Save</a></p>
                </div>
            </div>
        </section>
    )
}