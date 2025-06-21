import { useState } from 'react'
import creditCardsIcon from '../assets/img/credit-cards-icon.svg'
import paypalIcon from '../assets/img/paypal-icon.svg'

export function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState('card')

    return (
        <section className="checkout-page flex column">
            <h3 className="checkout-title">Payment Options</h3>

            <section className="checkout-options">

                <div className="checkout-option-wrapper flex column">

                    <label className={`checkout-option flex align-center ${paymentMethod === 'card' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            defaultChecked
                        />
                        <span className="radio-custom" />
                        <div className="credit-card-option flex">
                            <p>Credit & Debit Cards</p>
                            <img src={creditCardsIcon} alt="Credit Card Icons" />
                        </div>
                    </label>

                    {paymentMethod === 'card' && (
                        <section className="card-details">
                            <label>
                                <p>Card number</p>
                                <div className="input-wrapper">
                                    <span className="card-logo"></span>
                                    <input className="card-number-input" placeholder="1234 5678 9012 3456" />
                                    <span className="lock-icon"></span>
                                </div>
                            </label>

                            <label className="exp-cvv">
                                <label className="expiration-date">
                                    <p>Expiration date</p>
                                    <div className="input-wrapper">
                                        <input className="expiration-date-input" placeholder="MM / YY" />
                                    </div>
                                </label>

                                <label className="security-code">
                                    <p>Security code</p>
                                    <div className="input-wrapper">
                                        <input className="" placeholder="123" />
                                    </div>
                                </label>
                            </label>
                            
                            <section className="remember-payment-method flex align-center">
                                <input type="checkbox" defaultChecked />
                                <p>Remember for future payments</p>
                            </section>
                        </section>
                    )}

                </div>

                <div className="checkout-option-wrapper flex column">

                    <label className={`checkout-option flex align-center ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="payment"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={() => setPaymentMethod('paypal')}
                        />
                        <span className="radio-custom" />
                        <div className="paypal-option">
                            <img src={paypalIcon} alt="PayPal" />
                        </div>
                    </label>

                    {paymentMethod === 'paypal' && (
                        <section className="remember-payment-method flex align-center">
                            <input type="checkbox" defaultChecked />
                            <p>Remember for future payments</p>
                        </section>
                    )}

                </div>

            </section>
        </section>
    )
}
