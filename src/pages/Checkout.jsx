import { useEffect, useRef, useState } from 'react'
import { IMaskInput } from 'react-imask'
import { useScreenSize } from '../customHooks/useScreenSize'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useNavigate, useParams } from 'react-router'
import { Loader } from '../cmps/Loader'
import { loadGig } from '../store/gig/gig.actions'
import { orderService } from '../services/order/index'
import { gigService } from '../services/gig'
import { genRandomCardNumber, genRandomCvv, genRandomExpiration, getRandomIntInclusive } from '../services/util.service'
import paypalIcon from '../assets/img/paypal-icon.svg'
import checkIcon from '../assets/img/check-icon.svg'
import checkIcon3 from '../assets/img/check-icon-3.svg'
import creditCardsIcon from '../assets/img/credit-cards-icon.svg'
import creditCardIcon from '../assets/img/credit-card-icon.svg'
import lockIcon from '../assets/img/lock-icon.svg'
import infoIcon from '../assets/img/info-icon.svg'


export function Checkout() {

    const user = useSelector(storeState => storeState.userModule.user)
    const gig = useSelector(storeState => storeState.gigModule.gig)
    const { gigId, packageType } = useParams()
    const packageDetails = gig?.packages[packageType]

    const [paymentMethod, setPaymentMethod] = useState('card')
    const screenWidth = useScreenSize()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    const randCard = useRef(genRandomCardNumber()).current;
    const randExp = useRef(genRandomExpiration()).current;
    const randCvv = useRef(genRandomCvv()).current;

    const serviceFee = useRef(getRandomIntInclusive(5, 15)).current;
    const VAT = useRef(getRandomIntInclusive(20, 35)).current;
    const totalPrice = packageDetails?.packPrice + serviceFee + VAT

    useEffect(() => {
        setIsLoading(true)
        loadGig(gigId)
            .finally(() => setIsLoading(false))
    }, [gigId])

    async function onPurchaseOrder() {

        try {
            const categoryLabel = gigService.getCategoryList(gig.category)

            const order = {
                buyer: {
                    _id: user._id,
                    fullname: user.fullname,
                    imgUrl: user.imgUrl
                },
                seller: {
                    _id: gig?.owner._id,
                    fullname: gig?.owner.fullname,
                    imgUrl: gig?.owner.imgUrl
                },
                gig: {
                    _id: gig._id,
                    title: gig.title,
                    imgUrl: gig.imgUrls?.[0],
                    category: gig.category,
                    categoryLabel,
                    price: gig?.packages['basic']?.packPrice,
                    createdAt: gig.createdAt
                },
                status: 'pending',
                packageName: packageDetails.title,
                totalPrice,
                daysToMake: packageDetails.packDaysToMake,
                createdAt: Date.now()
            }

            await orderService.save(order)
            showSuccessMsg('Purchased service successfully!')
            navigate(`/user/${gigId}/orders`)
        } catch (err) {
            console.error('Cannot save order', err)
            showErrorMsg('Failed to complete the purchase')
        }
    }

    if (isLoading || !gig) return <Loader />

    return (
        <section className="checkout-page">

            <article className="payment-options">
                <p className="checkout-title">Payment Options</p>

                <div className="checkout-option-wrapper credit-card flex column">

                    <label className={`checkout-option flex align-center ${paymentMethod === 'card' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                        />

                        <span className="radio-custom" />

                        <div className="credit-card-option flex">
                            <p>Credit & Debit Cards</p>
                            <img src={screenWidth < 664 ? creditCardIcon : creditCardsIcon} alt="Credit Card Icon" />
                        </div>
                    </label>

                    {paymentMethod === 'card' && (
                        <section className="card-details-wrapper">
                            <section className="card-details">
                                <label className="card-number">
                                    <p className="card-number-title">Card number</p>

                                    <div className="input-wrapper flex align-center justify-between">
                                        <span className="card-logo"></span>

                                        <IMaskInput
                                            mask="0000 0000 0000 0000"
                                            unmask={false}
                                            placeholder="1234 5678 9012 3456"
                                            value={randCard}
                                            className="input card-number-input"
                                            inputMode="numeric"
                                        />

                                        <span className="lock-icon"></span>
                                    </div>
                                </label>

                                <label className="exp-cvv-wrapper flex">

                                    <label className="expiration-date">
                                        <p className="expiration-date-title">Expiration date</p>

                                        <IMaskInput
                                            mask="00 / 00"
                                            blocks={{
                                                MM: { mask: IMask.MaskedRange, from: 1, to: 12 },
                                                YY: { mask: IMask.MaskedRange, from: 0, to: 99 }
                                            }}
                                            placeholder="MM / YY"
                                            value={randExp}
                                            className="input expiration-date-input"
                                            inputMode="numeric"
                                        />
                                    </label>

                                    <label className="security-code">
                                        <p className="security-code-title">Security code</p>

                                        <IMaskInput
                                            mask="000"
                                            placeholder="123"
                                            value={randCvv}
                                            className="input security-code-input"
                                            inputMode="numeric"
                                        />
                                    </label>
                                </label>

                                <label className="cardholder-name">
                                    <p className="cardholder-title">Cardholder's name</p>

                                    <IMaskInput
                                        mask={/^[A-Za-z ]*$/}
                                        value={user.fullname}
                                        placeholder="John Smith"
                                        className="input cardholder-name-input"
                                    />
                                </label>

                                <label className="card-display-name">
                                    <p className="card-display-name-title">
                                        Card display name
                                        <span className="optioal">(Optional)</span>
                                    </p>

                                    <IMaskInput
                                        mask={/^[A-Za-z ]*$/}
                                        placeholder="Marketing card"
                                        className="input card-display-name-input"
                                    />
                                </label>

                                <label className="save-card-field flex align-center">
                                    <input type="checkbox" defaultChecked />
                                    <span className="checkbox-custom">
                                        <img src={checkIcon} alt="check" />
                                    </span>
                                    <p>Save this card for future payments</p>
                                </label>
                            </section>
                        </section>
                    )}

                </div>

                <div className="checkout-option-wrapper paypal flex column">

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
                        <label className="remember-payment-method flex align-center">
                            <input type="checkbox" defaultChecked />
                            <span className="checkbox-custom">
                                <img src={checkIcon} alt="check" />
                            </span>
                            <p>Remember for future payments</p>
                        </label>
                    )}

                </div>

            </article>

            <article className="summary-container">
                <section className="order-details-container">

                    <header className="order-details-header flex">
                        <img className="order-image" src={gig.imgUrls[0]} alt="order image" />
                        <p className="order-title">{gig.title}</p>
                    </header>

                    <section className="order-details-general flex align-center justify-between">
                        <span className="order-details-general-title">{packageType}</span>
                        <span className="order-details-general-price">${packageDetails?.packPrice}</span>
                    </section>

                    <ul className="order-details-items-container">
                        {packageDetails.features.map((feature, idx) => (
                            <li key={idx} className="feature flex align-center">
                                <img src={checkIcon3} alt="check" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                </section>

                <section className="summary">

                    <section className="summary-table">

                        <span className="table-row fee-row flex align-center justify-between">
                            <span>Service fee</span>
                            <span>${serviceFee}</span>
                        </span>

                        <span className="table-row tax-row flex align-center justify-between">
                            <span>VAT</span>
                            <span>${VAT}</span>
                        </span>

                    </section>

                    <section className="summary-footer">
                        <span className="table-row total-price flex align-center justify-between">
                            <span>Total</span>
                            <span>${totalPrice}</span>
                        </span>

                        <span className="table-row delivery-date flex align-center justify-between">
                            <span>Total delivery time</span>
                            <span>{packageDetails.packDaysToMake} days</span>
                        </span>

                        <span className="gig-terms-agreement-disclaimer">
                            <p>By clicking the button, you agree to Finderr's&nbsp;
                                <span className="link">Terms of Service</span>
                                &nbsp;and&nbsp;
                                <span className="link">Payment Terms</span>
                            </p>
                        </span>
                    </section>

                    <section className="pay-button-component">
                        <button className="pay-button" onClick={onPurchaseOrder}>Confirm & Pay</button>

                        <span className="secure-payment flex align-center justify-center">
                            <img src={lockIcon} alt="lock-icon" />
                            SSL Secure Payment
                        </span>
                    </section>

                    <section className="currency-section">
                        {`You will be charged $${totalPrice}. Total amount includes currency conversion fees.`}
                    </section>

                </section>

                <section className="trader-disclaimer flex">
                    <img src={infoIcon} alt="info" />
                    <span>This is a private seller, so EU consumer protection laws may not apply.</span>
                </section>

            </article>

        </section>
    )
}
