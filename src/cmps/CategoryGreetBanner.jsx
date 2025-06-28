import { gigService } from "../services/gig"

const subheadingMap = {
    "graphics-design": "Get stunning visuals from top designers. Logos, branding, and more – all in one place.",
    "digital-marketing": "Boost your reach with expert marketers. SEO, ads, social media, and beyond.",
    "writing-translation": "Find skilled writers and translators to tell your story with clarity and impact.",
    "video-animation": "Bring your ideas to life with professional video editing and eye-catching animation.",
    "music-audio": "From voice-overs to custom beats – explore audio services that sound amazing.",
    "programming-tech": "Hire developers to build, fix, and launch your next digital product with confidence.",
    "business": "Take your business further with expert services – plans, consulting, and virtual assistants.",
    "lifestyle": "Explore personalized services that add value to your day-to-day life.",
    "data": "Transform raw data into smart decisions with analytics, dashboards, and more.",
    "photography": "Enhance your brand with high-quality images, editing, and professional photo services.",
    "ai-services": "Discover AI-powered solutions – from image generation to smart automation.",
    "personal-growth": "Grow your skills, mindset, or productivity with expert personal coaching services.",
    "finance": "Find expert help for budgeting, investing, taxes, and more."
}

export function CategoryGreetBanner({ user, filter }) {
    const { txt = '', category } = filter
    const categoryTitle = gigService.getCategoryTitleFromPath(category)
    const subheading = subheadingMap[category]
    const isValidCategory = !!subheading
    let mainHeading = ''

    if (txt) {
        return (
            <section className="category-greet-banner">
                <h1>
                    <span style={{ fontWeight: 400 }}>Results for&nbsp;</span>
                    {txt}
                </h1>
            </section>
        )
    }

    if (category && isValidCategory) {
        mainHeading = categoryTitle
    } else if (user?.fullname) {
        mainHeading = `Welcome, ${user.fullname}!`
    } else {
        mainHeading = 'Find top freelancers for any need'
    }

    return (
        <section className="category-greet-banner">
            <h1 className="main-heading">{mainHeading}</h1>

            <p className="sub-heading">
                {isValidCategory
                    ? subheading
                    : `Explore a wide range of digital services – from design and development to writing,
          marketing, and video editing. Find talented freelancers to bring your ideas to life.`}
            </p>
        </section>
    )
}
