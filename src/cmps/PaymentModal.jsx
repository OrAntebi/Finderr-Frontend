import { icons } from '../assets/icons/icons'

export function PaymentModal({ isModalOpen, onCloseModal, selectedPack, gig, onPurchaseOrder, getRevisionText }) {
    return (
        <div className={`modal-payment flex column ${isModalOpen ? 'modal-open' : ''}`}>
            <div className={`modal-payment flex column modal-open`}>
                <div className="modal-title flex align-center justify-between">
                    <span>Order options</span>
                    <button className="close-modal-btn" onClick={onCloseModal}>
                        <img src={icons.close} alt="close-icon" />
                    </button>
                </div>
                <div className="modal-details-container">
                    <div className="modal-description flex column">
                        <li>
                            <div className="package-and-price flex justify-between">
                                <p className="current-package">{selectedPack.packageNameCapitalized}</p>
                                <p className="amount">${selectedPack.packPrice}</p>
                            </div>
                            <div className="gig-description-text">
                                <span>{selectedPack.packageNameCapitalized} </span>
                                <span>{gig.title}</span>
                            </div>
                        </li>
                    </div>
                    <div className="modal-price">
                        <div className="price-container flex column">
                            <span>${selectedPack.packPrice}</span>
                            <span>Single order</span>
                        </div>
                        <ul className="modal-delivery-info flex column">
                            <div className="package-type flex align-center">
                                <span className="package flex align-center">
                                    <img src={icons.package} alt="package-icon" />
                                </span>
                                <span>{selectedPack.packageNameCapitalized} package</span>
                            </div>
                            <div className="delivery-time flex align-center">
                                <span><img src={icons.clock} alt="clock-icon" /></span>
                                <span>{selectedPack.packDaysToMake}-day delivery</span>
                            </div>
                            <div className="revisions flex align-center">
                                <span><img src={icons.round} alt="round-icon" /></span>
                                <span>{getRevisionText()}</span>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="continue-btn flex align-center justify-center"
                        onClick={onPurchaseOrder}
                    >
                        <span>Continue</span>
                        <span>(${selectedPack.packPrice})</span>
                    </button>
                    <div className="flex align-center justify-center">
                        <span>You won't be charged yet</span>
                    </div>
                </div>
            </div>
        </div>
    )
}