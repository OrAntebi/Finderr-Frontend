import { useRef } from 'react'
import UserAvatar from './UserAvatar'

export function UserDetails({ user, onChangeImg }) {
    const fileInputRef = useRef()

    function onAvatarClick() {
        fileInputRef.current.click()
    }


    const { fullname, username, from, memberSince, avgResponseTime,
        lastDelivery, description, languages, skills, education } = user

    return (
        <article className="user-details flex column">

            <section className="card user-card flex column">

                <div className="user-img flex align-center justify-center">
                    <UserAvatar user={user} size={{ width: 150, height: 150 }} dot="variant" fontSize="4rem" onAvatarClick={onAvatarClick} />
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={ev => onChangeImg(ev)}
                    />
                </div>

                <div className="user-info flex column align-center justify-center">
                    <h3 className="fullname">{fullname}</h3>
                    <p className="username">@{username}</p>
                </div>

                <div className="user-stats flex column ">
                    <span className="flex align-center justify-between">
                        <label className="from">
                            <i className="fa-solid fa-location-dot"></i>
                            <span>From</span>
                        </label>
                        <b>{from}</b>
                    </span>
                    <span className="member-since flex align-center justify-between">
                        <label className="member-since-label">
                            <i className="fa-solid fa-user"></i>
                            <span>Member Since</span>
                        </label>
                        <b>{memberSince}</b>
                    </span>
                    <span className="avg-response-time flex align-center justify-between">
                        <label className="avg-response-time-label">
                            <i className="fa-regular fa-clock"></i>
                            <span>Avg. Response Time</span>
                        </label>
                        <b>{avgResponseTime}</b>
                    </span>
                    <span className="last-delivery flex align-center justify-between">
                        <label className="last-delivery-label">
                            <i className="fa-solid fa-paper-plane"></i>
                            <span>Last Delivery</span>
                        </label>
                        <b>{lastDelivery}</b>
                    </span>
                </div>
            </section>

            <section className="card desc-card flex column align-start">

                <div className="description flex column">
                    <h3 className="title">Description</h3>
                    <p className="text">{description}</p>
                </div>

                <div className="languages flex column">
                    <h3 className="title">Languages</h3>
                    <ul className="languages-list clean-list">
                        {languages.map(({ language, proficiency }, idx) => (
                            <li key={idx} className="language">
                                {language} - <span>{proficiency}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="linked-accounts flex column">
                    <h3 className="title">Linked Accounts</h3>
                    <ul className="linked-accounts-list clean-list">
                        <li className="flex align-center">
                            <i className="fa-brands fa-facebook"></i>
                            <a href="https://www.facebook.com" className="facebook link">facebook</a>
                        </li>
                        <li className="flex align-center">
                            <i className="fa-brands fa-google"></i>
                            <a href="https://www.google.com" className="google link">google</a>
                        </li>
                        <li className="flex align-center">
                            <i className="fa-brands fa-dribbble"></i>
                            <a href="https://www.dribbble.com" className="dribbble link">dribbble</a>
                        </li>
                        <li className="flex align-center">
                            <i className="fa-brands fa-github"></i>
                            <a href="https://www.github.com" className="github link">github</a>
                        </li>
                        <li className="flex align-center">
                            <i className="fa-brands fa-linkedin"></i>
                            <a href="https://www.linkedin.com" className="linkedin link">linkedin</a>
                        </li>
                    </ul>
                </div>

                <div className="skills flex column">
                    <h3 className="title">Skills</h3>
                    <ul className="skills-list clean-list flex align-center">
                        {skills.map((skill, idx) => (
                            <li key={idx} className="skill">{skill}</li>
                        ))}
                    </ul>
                </div>

                <div className="education flex column">
                    <h3 className="title">Education</h3>
                    <p className="edu-title">{education.title}</p>
                    <p className="edu-subtitle">{education.subtitle}</p>
                </div>

            </section>

        </article>
    )
}