import { useSelector } from "react-redux"
import { getRandomDemoUser } from "../services/util.service"
import { useRef } from "react"


export function UserDetails() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const userInfo = useRef(getRandomDemoUser()).current

    return (
        <article className="user-details flex column">

            <section className="card user-card flex column">

                <div className="user-img flex align-center justify-center">
                    <img src={loggedInUser.imgUrl} alt="user image" />
                </div>

                <div className="user-info flex column align-center justify-center">
                    <h3 className="fullname">{loggedInUser.fullname}</h3>
                    <p className="username">@{loggedInUser.username}</p>
                </div>

                <div className="user-stats flex column ">
                    <span className="flex align-center justify-between">
                        <label className="from">
                            <i className="fa-solid fa-location-dot"></i>
                            <span>From</span>
                        </label>
                        <b>{userInfo.from}</b>
                    </span>
                    <span className="member-since flex align-center justify-between">
                        <label className="member-since-label">
                            <i className="fa-solid fa-user"></i>
                            <span>Member Since</span>
                        </label>
                        <b>{userInfo.memberSince}</b>
                    </span>
                    <span className="avg-response-time flex align-center justify-between">
                        <label className="avg-response-time-label">
                            <i className="fa-regular fa-clock"></i>
                            <span>Avg. Response Time</span>
                        </label>
                        <b>{userInfo.avgResponseTime}</b>
                    </span>
                    <span className="last-delivery flex align-center justify-between">
                        <label className="last-delivery-label">
                            <i className="fa-solid fa-paper-plane"></i>
                            <span>Last Delivery</span>
                        </label>
                        <b>{userInfo.lastDelivery}</b>
                    </span>
                </div>
            </section>

            <section className="card desc-card flex column align-start">

                <div className="description flex column">
                    <h3 className="title">Description</h3>
                    <p className="text">{userInfo.description}</p>
                </div>

                <div className="languages flex column">
                    <h3 className="title">Languages</h3>
                    <ul className="languages-list clean-list">
                        {userInfo.languages.map(({ language, proficiency }, idx) => (
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
                        {userInfo.skills.map((skill, idx) => (
                            <li key={idx} className="skill">{skill}</li>
                        ))}
                    </ul>
                </div>

                <div className="education flex column">
                    <h3 className="title">Education</h3>
                    <p className="edu-title">{userInfo.education.title}</p>
                    <p className="edu-subtitle">{userInfo.education.subtitle}</p>
                </div>

            </section>

        </article>
    )
}