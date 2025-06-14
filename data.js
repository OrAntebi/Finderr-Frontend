const dd = [
    /* ───────────── Finance ───────────── */
    {
        _id: "fin101",
        title: "I will do bookkeeping, balance sheet, profit and loss",
        price: 140,
        createdAt: 1699008053052,
        packages: {
            basic: { title: "Starter", packPrice: 140, packDaysToMake: 4, desc: "Income statement + balance sheet", features: ["PDF report"] },
            standard: { title: "Growth", packPrice: 220, packDaysToMake: 6, desc: "Full 3-statement model", features: ["Excel model", "Cash-flow"] },
            premium: { title: "Investor", packPrice: 320, packDaysToMake: 8, desc: "Audit-ready pack", features: ["Notes", "Ratio analysis", "Revisions"] }
        },
        owner: {
            _id: "finU1",
            fullname: "Faz",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749816324/fded8627-1182-4aba-89f0-a2d5ad624e36_ph0moq.webp",
            level: 2,
            rate: 4.9
        },
        daysToMake: 4,
        description: "Hi, Faz is here. I have around 8 years of practical experience in the field of Financial Accounting, Management Accounting and Financial Reporting As per International Accounting and Financial Reporting Standard. Handled thousands of assignments including accounting & reporting, book keeping, internal auditing as per related laws at different levels. I am Top Rated Seller on Fiverr and serving my clients as per best of my skills. My first priority is clients satisfaction and i am 100% sure you will like my work.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749816332/do-all-financial-accounting-tasks_y4ydwy.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749816345/do-all-financial-accounting-tasks_iqohyz.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749816342/do-all-financial-accounting-tasks_d7fmao.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749816351/do-all-financial-accounting-tasks_sewxlb.webp"
        ],
        category: "finance",
        tags: ["Financial Statements", "Accounting", "Bookkeeping"],
        likedByUsers: []
    },
    {
        _id: "fin102",
        title: "I will prepare balance sheet, profit and loss and financial projections",
        price: 180,
        createdAt: 1699009053052,
        packages: {
            basic: { title: "Lite", packPrice: 180, packDaysToMake: 3, desc: "Revenue & expense forecast", features: ["1 scenario"] },
            standard: { title: "Plus", packPrice: 260, packDaysToMake: 5, desc: "3-statement linked model", features: ["3 scenarios", "Charts"] },
            premium: { title: "Pro", packPrice: 380, packDaysToMake: 7, desc: "Investor deck ready", features: ["DCF valuation", "Sensitivity"] }
        },
        owner: {
            _id: "finU2",
            fullname: "Yahya T",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749816752/7ecc9949-1acb-4aff-996c-db109cca205e_zsi6gk.webp",
            level: 1,
            rate: 4.8
        },
        daysToMake: 3,
        description: "My name is Yahya, I am a Chartered Accountant (Finalist) and a Professional Accountant at PwC with more than 5+ years working experience. I have advanced level data analysis skills with strong knowledge base and practical exposure of International Financial Reporting Standards, US GAAP & International Standards on Auditing. So by combining all these skills I can complete any task relating to Accounting, Finance, MS Excel & administrative nature etc, professionally and timely. Professionalism, innovation and creativity are my attributes. Client satisfaction is always my 1st priority.",
        imgUrls: ["https://res.cloudinary.com/dhxnsowkl/image/upload/v1749816774/prepare-financial-statements-and-do-financial-consulting_gjhm6v.webp"],
        category: "finance",
        tags: ["Financial Modelling", "Valuation", "Startup Finance"],
        likedByUsers: []
    },
    {
        _id: "fin103",
        title: "I will prepare financial statements, profit and loss, balance sheet ,income statement",
        price: 95,
        createdAt: 1699010053052,
        packages: {
            basic: { title: "1 Account", packPrice: 95, packDaysToMake: 2, desc: "Up to 250 transactions", features: ["QuickBooks"] },
            standard: { title: "2 Accounts", packPrice: 160, packDaysToMake: 3, desc: "Up to 500 transactions", features: ["QuickBooks", "Report"] },
            premium: { title: "Multi", packPrice: 240, packDaysToMake: 4, desc: "Unlimited transactions", features: ["QuickBooks", "Xero", "Report"] }
        },
        owner: {
            _id: "finU3",
            fullname: "Abdul R",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749816826/df92e126-6724-44c5-ba27-fbcfabf7f814_jnxjkk.webp",
            level: 1,
            rate: 5
        },
        daysToMake: 2,
        description: "Welcome! My name is Abdulrafy, a certified professional accountant in Pakistan with 7 years of experience. I specialize in preparing financial statements, bookkeeping, business plan development, and financial performance analysis. I value honesty and building good working relationships with my clients. My goal is to exceed your expectations by providing top-notch services tailored to your specific needs.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749816848/prepared-profit-and-loss-balance-sheet-and-financial-analysis_sct5mv.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749816849/Income_Statement_wnzvzf_hiledp.jpg",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749816871/BS_and_CF_1__a48jpi_sbdvfn.jpg"
        ],
        category: "finance",
        tags: ["Bookkeeping", "Bank Reconciliation"],
        likedByUsers: []
    },
    {
        _id: "fin104",
        title: "I will audit financial CPA US, accountant, review financial statement, CPA letter sign",
        price: 110,
        createdAt: 1699011053052,
        packages: {
            basic: { title: "Snapshot", packPrice: 110, packDaysToMake: 2, desc: "Risk & return metrics", features: ["PDF summary"] },
            standard: { title: "Deep", packPrice: 180, packDaysToMake: 4, desc: "Asset allocation plan", features: ["Excel", "Recommendations"] },
            premium: { title: "Premium", packPrice: 260, packDaysToMake: 5, desc: "Ongoing quarterly review", features: ["Follow-up call"] }
        },
        owner: {
            _id: "finU4",
            fullname: "Brenn K",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749816911/68d21140-75bb-4db9-a43e-1ceb05768073_s1x6no.webp",
            level: 2,
            rate: 4.7
        },
        daysToMake: 2,
        description: "Hope you enjoyed your visit to my profile. Hi there, my name is Brenn, I am a Business and Nonprofit Fundraising specialist, and I am ready to help you. From business registration, nonprofit registration services, grant & Government contract research, proposal writing, capability statement services, business plans, resume, Resume services to fundraising strategies, I am here to help you. In this capacity, I firmly believe that with my help, your chances at success will rise significantly. Together, we can bring your ideas to life. Reach out to me today!",
        imgUrls: ["https://res.cloudinary.com/dhxnsowkl/image/upload/v1749816930/audit-financial-cpa-us-accountant-review-financial-statement-cpa-letter-sign_h6nfpw.webp"],
        category: "finance",
        tags: ["Portfolio Analysis", "Investment Advice"],
        likedByUsers: []
    },
    {
        _id: "fin105",
        title: "I will prepare financial statements, balance sheet, profit and loss, cash flows",
        price: 60,
        createdAt: 1699012053052,
        packages: {
            basic: { title: "Budget", packPrice: 60, packDaysToMake: 2, desc: "Monthly template", features: ["Spending tracker"] },
            standard: { title: "Planner", packPrice: 90, packDaysToMake: 3, desc: "Annual forecast", features: ["Debt payoff plan"] },
            premium: { title: "Coach", packPrice: 150, packDaysToMake: 5, desc: "1-on-1 session", features: ["Saving goals", "Follow-up"] }
        },
        owner: {
            _id: "finU5",
            fullname: "Md Al Amin",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749817000/be989b90-b868-49e5-8548-cbd2fd69431c_vqvjod.webp",
            level: 1,
            rate: 4.8
        },
        daysToMake: 2,
        description: "Greetings ! This is Al amin. I am a tech-savvy accountant and certified bookkeeper serving in the marketplace for over 10 years . My services are tailored to help Small & Medium businesses for automation and optimizing their cost & operational efficiency. My specializations : ✓ full service bookkeeping ✓ Accounts clean-up & catch up ✓ Bank reconciliation ✓ Financial reporting ✓ Financial analysis Software expertise: ✓QuickBooks online ✓XERO ✓WAVE ✓Zohobooks ✓Sage ✓Excel I guarantee: ✓100% accuracy ✓on time report delivery ✓prompt & easy communication ✓competitive price",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749817040/financial-statements-balance-sheet-profit-and-loss-cash-flows-income-statement_seuejl.jpg",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749817036/financial-statements-balance-sheet-profit-and-loss-cash-flows-income-statement_xhzza9.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749817050/Profit_Loss-Brevity_Branding_vwwf2a_u8z7vd.jpg",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749817048/Domicile_Property_Ltd_-_Balance_Sheet_jbbngw_cofdfd.jpg"
        ],
        category: "finance",
        tags: ["Budgeting", "Personal Finance"],
        likedByUsers: []
    },

    /* ───────────── AI Services ───────────── */
    {
        _id: "ai201",
        title: "I will develop ai mobile app or website ai saas app ai chatbot ai software with chatgpt",
        price: 250,
        createdAt: 1699008053052,
        packages: {
            basic: { title: "FAQ Bot", packPrice: 250, packDaysToMake: 4, desc: "Website embed", features: ["OpenAI API", "1 data source"] },
            standard: { title: "Support Bot", packPrice: 450, packDaysToMake: 6, desc: "CRM integration", features: ["3 data sources", "Brand tone"] },
            premium: { title: "AI Assistant", packPrice: 700, packDaysToMake: 9, desc: "Advanced RAG + analytics", features: ["Vector DB", "Dashboard"] }
        },
        owner: {
            _id: "aiU1",
            fullname: "Mominul H",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818012/ffa0e6c4-6ba9-4ec2-9823-9aad3cc21f57_i7yvf2.webp",
            level: 2,
            rate: 4.9
        },
        daysToMake: 4,
        description: "Are you looking for an expert AI Mobile App Developer to build or tweak your AI app with cutting-edge GPT technology? Your search ends here! I'm Mominul Haque, a professional senior AI Developer with years of experience in AI application development using OpenAI's GPT-4 to build innovative and powerful custom AI Mobile Apps using Machine Learning, Data Science, and Statistical Solutions.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818078/create-responsive-wordpress-ecommerce-website-using-woocommerce_vtjaxt.jpg",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818116/Web_Application_Setup_Instructions_e5hpum_yozmot.jpg",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818133/develop-custom-ai-web-apps-mobile-apps-and-software-solutions_pcxy46.webp"
        ],
        category: "ai-services",
        tags: ["Chatbots", "OpenAI", "RAG"],
        likedByUsers: []
    },
    {
        _id: "ai202",
        title: "I will develop chatgpt ai mobile app or website ai saas app ai chatbot ai software",
        price: 65,
        createdAt: 1699009053052,
        packages: {
            basic: { title: "3 Images", packPrice: 65, packDaysToMake: 2, desc: "Commercial license", features: ["Upscale"] },
            standard: { title: "10 Images", packPrice: 120, packDaysToMake: 3, desc: "Multiple concepts", features: ["Prompt sheet"] },
            premium: { title: "20 Images", packPrice: 200, packDaysToMake: 5, desc: "Full campaign set", features: ["PSD files", "Variations"] }
        },
        owner: {
            _id: "aiU2",
            fullname: "Shovon",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818182/fec8ab8b-89e3-4c0d-88b7-aa07d4c1596b_mkefmp.webp",
            level: 1,
            rate: 4.8
        },
        daysToMake: 2,
        description: "I will develop chatgpt ai mobile app or website ai saas app ai chatbot ai software",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818245/develop-ai-chatgpt-app-ai-saas-app-application-ai-chatbot-llm-ai-software_zkp8aw.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818247/I_will_develop_ai_chatgpt_mobile_app_or_website_ai_saas_app_ai_chatbot_ai_software_cgk91w_ftlb5m.jpg"
        ],
        category: "ai-services",
        tags: ["AI Image Generation", "MidJourney", "DALLE"],
        likedByUsers: []
    },
    {
        _id: "ai203",
        title: "I will develop chatgpt ai mobile app or ai website, ai saas app ai chatbot, ai software",
        price: 600,
        createdAt: 1699010053052,
        packages: {
            basic: { title: "Mini", packPrice: 600, packDaysToMake: 5, desc: "Up to 50 MB data", features: ["Hyper-parameters", "Eval report"] },
            standard: { title: "Pro", packPrice: 900, packDaysToMake: 7, desc: "Up to 200 MB data", features: ["LoRA", "TensorBoard"] },
            premium: { title: "Enterprise", packPrice: 1500, packDaysToMake: 12, desc: "1 GB data + deployment", features: ["GPU training", "Docker image"] }
        },
        owner: {
            _id: "aiU3",
            fullname: "Maudud",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818376/7c595ecb-4abb-486a-abc7-5054c0151a8e_ienjge.webp",
            level: 2,
            rate: 5
        },
        daysToMake: 5,
        description: "Are you looking for an experienced AI Developer to enhance your AI mobile app, AI website, AI SaaS App, and AI chatbot with cutting-edge ChatGPT technology? Congratulations, you've come to the right place. Hello, My name is Maudud.I am a dedicated AI developer specializing in OpenAI's GPT-4 to build innovative and powerful AI websites, custom AI, AI mobile apps, machine learning models, data science insights, and advanced statistical applications.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818330/develop-chatgpt-ai-mobile-app-or-ai-website-ai-saas-app-ai-chatbot-ai-software_xauctr.jpg"
        ],
        category: "ai-services",
        tags: ["Model Fine-Tuning", "TensorFlow", "PyTorch"],
        likedByUsers: []
    },
    {
        _id: "ai204",
        title: "I will build custom ai agents for your business",
        price: 90,
        createdAt: 1699011053052,
        packages: {
            basic: { title: "1k rows", packPrice: 90, packDaysToMake: 3, desc: "CSV/JSON output", features: ["Bounding boxes"] },
            standard: { title: "5k rows", packPrice: 380, packDaysToMake: 5, desc: "Multi-class labels", features: ["Quality audit"] },
            premium: { title: "10k rows", packPrice: 700, packDaysToMake: 7, desc: "Complex annotation", features: ["NER", "Relations"] }
        },
        owner: {
            _id: "aiU4",
            fullname: "Fendi",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818441/ba2c8312-3fab-4281-b618-69c3cfce40e2_w8gfm4.webp",
            level: 1,
            rate: 4.7
        },
        daysToMake: 3,
        description: "Transform Your Business with AI-Driven Automation Are you seeking to enhance efficiency, reduce manual tasks, and integrate intelligent automation into your operations? I specialize in creating custom AI-powered automation solutions tailored to your unique business requirements.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818439/build-custom-ai-agents-for-your-business-ed72_siyvoq.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818458/build-custom-ai-agents-for-your-business-ed72_f4x2v8.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818460/build-custom-ai-agents-for-your-business-ed72_wmvbgd.webp"
        ],
        category: "ai-services",
        tags: ["Data Labelling", "Annotation", "Computer Vision"],
        likedByUsers: []
    },
    {
        _id: "ai205",
        title: "I will build ai agents for automation to boost your business",
        price: 75,
        createdAt: 1699012053052,
        packages: {
            basic: { title: "Macro", packPrice: 75, packDaysToMake: 2, desc: "GPT formulas", features: ["1 sheet"] },
            standard: { title: "Suite", packPrice: 130, packDaysToMake: 4, desc: "Multi-sheet", features: ["Power Query", "Docs"] },
            premium: { title: "Full BI", packPrice: 220, packDaysToMake: 6, desc: "Power BI + GPT", features: ["Dashboard", "Training"] }
        },
        owner: {
            _id: "aiU5",
            fullname: "Fiday",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818510/d2b9df67-6b55-401c-985d-5cbe92cb6b00_fvo6wf.webp",
            level: 1,
            rate: 4.9
        },
        daysToMake: 2,
        description: "Are you looking to automate your business processes and enhance productivity? Look no further! I am Fiday, an experienced AI developer with over 4 years in the field. I specialize in creating AI-powered agents that streamline your workflow, reduce manual tasks, and boost your business performance. With my expertise in chatbot AI development, web development (WordPress, Shopify, Full-Stack), and automation tools, I'll create custom AI agents tailored to your unique needs. These intelligent agents can handle customer inquiries, automate repetitive tasks, improve lead generation, and much more saving you time and resources while providing better customer service.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818546/build-ai-agents-for-automation-to-boost-your-business_mal4vu.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818549/build-ai-agents-for-automation-to-boost-your-business_xti1iq.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818551/build-ai-agents-for-automation-to-boost-your-business_ufqlik.webp"
        ],
        category: "ai-services",
        tags: ["Automation", "Excel GPT", "Power BI"],
        likedByUsers: []
    },

    /* ───────────── Personal Growth ───────────── */
    {
        _id: "pg301",
        title: "I will give a personal tarot card reading on video in 24h",
        price: 45,
        createdAt: 1699008053052,
        packages: {
            basic: { title: "Starter", packPrice: 45, packDaysToMake: 1, desc: "Email action plan", features: ["One check-in"] },
            standard: { title: "Plus", packPrice: 90, packDaysToMake: 30, desc: "Daily accountability", features: ["Chat support"] },
            premium: { title: "VIP", packPrice: 160, packDaysToMake: 30, desc: "Voice coaching", features: ["Weekly calls"] }
        },
        owner: {
            _id: "pgU1",
            fullname: "Christoph",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818718/b4e0cd55-c788-4191-b9d3-008c08b20c23_edbzkk.webp",
            level: 2,
            rate: 4.9
        },
        daysToMake: 1,
        description: "I will guide you toward your optimal life path! All are welcome. I'm Christoph, an Intuitive Reader and Certified Life Coach, dedicated to helping you achieve your goals and manifest your dreams. With strong intuition developed from a young age, I'll support you in navigating life's challenges with clarity and purpose. My services include personalized life coaching for creating positive change and growth, intuitive Tarot, Rune, Palm, and Psychic readings that provide clarity, guidance, and insight, plus Negative Energy Removal to release blockages, restore balance, and help you move forward with confidence and ease",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818744/give-a-personal-and-intuitive-tarot-reading-in-24-hours_pfrflk.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818750/give-a-personal-and-intuitive-tarot-reading-in-24-hours_e0wslo.jpg",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818753/give-a-personal-and-intuitive-tarot-reading-in-24-hours_vc7b0s.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818755/Christoph_PDF_1_zgvpkw_kmahjh.jpg"
        ],
        category: "personal-growth",
        tags: ["Productivity", "Life Coaching"],
        likedByUsers: []
    },
    {
        _id: "pg302",
        title: "I will provide career coaching and reverse recruiting",
        price: 30,
        createdAt: 1699009053052,
        packages: {
            basic: { title: "Quick Calm", packPrice: 30, packDaysToMake: 1, desc: "10-min routine", features: ["PDF guide"] },
            standard: { title: "Deep Calm", packPrice: 60, packDaysToMake: 2, desc: "20-min routine", features: ["Audio tracks"] },
            premium: { title: "Zen Path", packPrice: 110, packDaysToMake: 3, desc: "40-min routine", features: ["Live session"] }
        },
        owner: {
            _id: "pgU2",
            fullname: "Karen R",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818832/f3e2c6fc-b390-4cf4-948f-4f90a86e3c43_rtq5hi.webp",
            level: 1,
            rate: 4.8
        },
        daysToMake: 1,
        description: "I'm Karen Roziner, a Career Development Expert and Coach trusted by over 3,000 clients. I believe everyone deserves an equal opportunity to reach their full potential. Together with my business partner, global recruiter Francesca Trapani, I lead a boutique career development firm with a team of experienced HR professionals. We provide expert resume writing, LinkedIn optimization, reverse recruiting, and career coaching to help you achieve your career aspirations. We've worked across every industry, profession, and seniority level. Now, it's your turn. Let's make it happen; Message me!",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818843/provide-career-coaching-and-reverse-recruiting_imyj2h.webp"
        ],
        category: "personal-growth",
        tags: ["Meditation", "Mindfulness"],
        likedByUsers: []
    },
    {
        _id: "pg303",
        title: "I will coach you to career success",
        price: 70,
        createdAt: 1699010053052,
        packages: {
            basic: { title: "Clarity", packPrice: 70, packDaysToMake: 2, desc: "Resume review + advice", features: ["PDF"] },
            standard: { title: "Focus", packPrice: 120, packDaysToMake: 3, desc: "1-hr Zoom coaching", features: ["Action plan"] },
            premium: { title: "Breakthrough", packPrice: 200, packDaysToMake: 5, desc: "3 coaching calls", features: ["Ongoing support"] }
        },
        owner: {
            _id: "pgU3",
            fullname: "Will Bryant",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818895/b2d807a8-bbd9-49bc-a1be-527e24d2bf12_ct0u7h.webp",
            level: 2,
            rate: 4.9
        },
        daysToMake: 2,
        description: "I love working with businesses that are small, growing, established & at the idea stage! I've held Director, VP & C-Level roles in Technology and Startup Businesses including Fresha, Amex, Quandoo, Cake Technologies & Wells Fargo as well as multiple Board Advisory roles. I've worked around the world, built startups, been acquired & experienced multiple fundraises. I help entrepreneurs & professionals on Fiverr to push through ambiguous situations, plan, position, transition, problem solve, grow efficiently & ultimately get to the next level.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818937/improve-or-change-career_lg9hdg.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818949/improve-or-change-career_io1wjy.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818952/improve-or-change-career_grzuna.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749818955/improve-or-change-career_zotke1.webp"
        ],
        category: "personal-growth",
        tags: ["Career Coaching", "Goal Setting"],
        likedByUsers: []
    },

    /* ───────────── Consulting ───────────── */
    {
        _id: "con401",
        title: "Our agency will prepare marketing strategy plan for execution",
        price: 200,
        createdAt: 1699008053052,
        packages: {
            basic: { title: "Review", packPrice: 200, packDaysToMake: 3, desc: "PDF audit", features: ["1 revision"] },
            standard: { title: "Action", packPrice: 350, packDaysToMake: 5, desc: "Roadmap", features: ["Call", "2 revisions"] },
            premium: { title: "Scale", packPrice: 600, packDaysToMake: 7, desc: "Growth plan", features: ["3 calls", "Investor deck"] }
        },
        owner: {
            _id: "conU1",
            fullname: "Nidhi",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819100/a277df4c-5f05-4fe2-87ef-b3a3b7302f58_xnafob.jpg",
            level: 2,
            rate: 4.9
        },
        daysToMake: 3,
        description: "I am Nidhi. Drawing from my journey in marketing, where I've had the opportunity to collaborate with over 1700 companies, I'm excited to share my insights and assist you in exploring and excelling in the digital world.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819097/prepare-marketing-plan-and-stunning-content_mfd6vy.webp"
        ],
        category: "consulting",
        tags: ["Business Model", "SaaS", "Growth Strategy"],
        likedByUsers: []
    },
    {
        _id: "con402",
        title: "I will create buyer persona and market research for your business",
        price: 90,
        createdAt: 1699009053052,
        packages: {
            basic: { title: "Email Q&A", packPrice: 90, packDaysToMake: 2, desc: "Pricing tips", features: ["Template"] },
            standard: { title: "1-hr Call", packPrice: 140, packDaysToMake: 3, desc: "Live coaching", features: ["Recording"] },
            premium: { title: "Package", packPrice: 220, packDaysToMake: 4, desc: "Rate sheet + call", features: ["Follow-up"] }
        },
        owner: {
            _id: "conU2",
            fullname: "Mary Arbelaez",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819157/d0013783-edce-4be6-8774-d67df485cc23_dpmvyf.webp",
            level: 1,
            rate: 4.8
        },
        daysToMake: 2,
        description: "Hi, I'm Mary, a Brand Strategist and Market Researcher with 7+ years of experience turning audience data into marketing direction. I help businesses move beyond guesswork and define who they're truly speaking to and how to reach them with purpose. Struggling to connect with your audience? I build buyer personas through market research and brand strategy to improve targeting, enhance customer experience, and drive smarter business decisions.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819170/create-ideal-buyer-persona-for-your-business_marlqt.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819167/create-ideal-buyer-persona-for-your-business_ew6skb.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819173/create-ideal-buyer-persona-for-your-business_i3pazs.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819176/Buyer_persona_for_jewelry_pkoqnk_qoztok.jpg"
        ],
        category: "consulting",
        tags: ["Freelance Coaching", "Pricing"],
        likedByUsers: []
    },
    {
        _id: "con403",
        title: "I will consult you on your brand strategy and branding",
        price: 250,
        createdAt: 1699010053052,
        packages: {
            basic: { title: "Mini", packPrice: 250, packDaysToMake: 5, desc: "5 interviews", features: ["Summary"] },
            standard: { title: "Standard", packPrice: 400, packDaysToMake: 8, desc: "10 interviews", features: ["Transcripts", "Insights"] },
            premium: { title: "Full", packPrice: 650, packDaysToMake: 12, desc: "20 interviews", features: ["Video clips", "Deck"] }
        },
        owner: {
            _id: "conU3",
            fullname: "Omar S",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819291/b1e207ba-ac3c-408e-b9c2-719820991bc3_cq6wki.webp",
            level: 2,
            rate: 4.9
        },
        daysToMake: 5,
        description: "You're juggling everything in your business but your brand strategy is still unclear. You're developing your product. Planning your marketing. Your to-do list keeps growing, but your brand strategy and messaging still are not clear. You're making big decisions but none of it feels certain. How should I communicate? Who is the right audience? What makes me stand out? And with your launch deadline getting closer, the pressure is building.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819294/consult-you-on-your-brand-strategy-and-branding_oqixww.jpg"
        ],
        category: "consulting",
        tags: ["Market Research", "Customer Interviews"],
        likedByUsers: []
    },

    /* ───────────── Data ───────────── */
    {
        _id: "data501",
        title: "I will do data science, nvivo, nlp, ai, ml, and gpt, using python",
        price: 150,
        createdAt: 1699008053052,
        packages: {
            basic: { title: "1 Dashboard", packPrice: 150, packDaysToMake: 3, desc: "1 data source", features: ["Publish to web"] },
            standard: { title: "3 Dashboards", packPrice: 280, packDaysToMake: 5, desc: "Up to 3 sources", features: ["DAX measures"] },
            premium: { title: "Suite", packPrice: 450, packDaysToMake: 7, desc: "Full report", features: ["Row-level security", "Training"] }
        },
        owner: {
            _id: "dataU1",
            fullname: "Faisal Mehmood",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819398/917FE849-93D7-4552-811F-B5E5ADD8EC5A_f6lhbi.webp",
            level: 2,
            rate: 5
        },
        daysToMake: 3,
        description: "I am a Data Science expert and an experienced developer, I work on both quantitative/qualitative analysis, such as Nvivo, and artificial intelligence and machine learning projects such as NLP tasks, and speaker transcription/diarization. I have expertise in TensorFlow, pandas, Scikit-learn, and Keras, using Python. I analyze data in various analytical tools such as SAS/Tableau/PowerBI/Minitab/SPSS/R-studio/Eviews, and research writing for the obtained results.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819410/psd-to-html-expert_seaist.jpg",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819407/psd-to-html-expert_may2l7.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819413/psd-to-html-expert_rkmqwl.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819418/Analysis_of_YouTube_videos_and_Google_Ads_During_the_month_of_August_lfuuzy_aymq5b.jpg"
        ],
        category: "data",
        tags: ["Power BI", "Data Visualisation"],
        likedByUsers: []
    },
    {
        _id: "data502",
        title: "I will provide expert solutions to python machine learning projects",
        price: 60,
        createdAt: 1699009053052,
        packages: {
            basic: { title: "Up to 1k rows", packPrice: 60, packDaysToMake: 2, desc: "Static pages", features: ["CSV", "Python script"] },
            standard: { title: "Up to 5k", packPrice: 110, packDaysToMake: 3, desc: "JavaScript sites", features: ["JSON", "Pagination"] },
            premium: { title: "10k+", packPrice: 200, packDaysToMake: 5, desc: "Complex auth", features: ["API", "Scheduler"] }
        },
        owner: {
            _id: "dataU2",
            fullname: "Maaz",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819475/47e6da7c-6d53-4e3c-9484-64c2b20faf3e_iprmno.webp",
            level: 1,
            rate: 4.8
        },
        daysToMake: 2,
        description: "Hi, I'm Maaz. With over 5 years of experience in machine learning and Drone Design and Development, I specialize in developing custom ML models for drone applications, including real-time aerial image processing, object detection, and autonomous navigation systems. My expertise also extends to advanced data analytics and predictive modeling, enabling actionable insights across diverse domains.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819489/provide-expert-solutions-to-python-machine-learning-projects_gg21gx.jpg",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819493/provide-expert-solutions-to-python-machine-learning-projects_szxlch.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819486/provide-expert-solutions-to-python-machine-learning-projects_ymqwfk.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819496/provide-expert-solutions-to-python-machine-learning-projects_xx6dow.webp"
        ],
        category: "data",
        tags: ["Web Scraping", "Data Mining"],
        likedByUsers: []
    },
    {
        _id: "data503",
        title: "I will do classification analysis with python and machine learning",
        price: 50,
        createdAt: 1699010053052,
        packages: {
            basic: { title: "Quick", packPrice: 50, packDaysToMake: 1, desc: "Up to 5k rows", features: ["Duplicates removal"] },
            standard: { title: "Pro", packPrice: 90, packDaysToMake: 2, desc: "Up to 25k", features: ["Null handling", "Logs"] },
            premium: { title: "Big", packPrice: 150, packDaysToMake: 3, desc: "50k+", features: ["Schema design"] }
        },
        owner: {
            _id: "dataU3",
            fullname: "Salman Khan",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819560/faa558b2-ef74-400e-9479-2b45c9dfec35_j2e40e.webp",
            level: 2,
            rate: 5
        },
        daysToMake: 1,
        description: "I hold a master's degree in data science, complemented by 3 years of practical experience in the field. My expertise lies in Generative AI, Machine Learning, and Data Analytics, which I have honed through hands-on work with structured, text, and image datasets. Over the past year, I've served as a Data Scientist in esteemed organizations, where I've applied my skills to various projects and consistently delivered impactful results.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819563/do-classification-analysis-with-python-and-machine-learning_z1bofy.jpg",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819566/do-classification-analysis-with-python-and-machine-learning_e6z5pi.webp"
        ],
        category: "data",
        tags: ["Data Cleaning", "ETL"],
        likedByUsers: []
    },
    {
        _id: "data504",
        title: "I will do text classification, nlp topic modeling, text analysis",
        price: 85,
        createdAt: 1699011053052,
        packages: {
            basic: { title: "1 query", packPrice: 85, packDaysToMake: 1, desc: "Join & filter", features: ["MySQL"] },
            standard: { title: "3 queries", packPrice: 140, packDaysToMake: 2, desc: "Aggregations", features: ["PostgreSQL"] },
            premium: { title: "Full set", packPrice: 220, packDaysToMake: 3, desc: "Procedure/CTE", features: ["MS-SQL", "Docs"] }
        },
        owner: {
            _id: "dataU4",
            fullname: "Ghyaas K",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819620/99e95277-284e-4c52-ada9-b3c96cbb56af_cejcec.webp",
            level: 1,
            rate: 4.7
        },
        daysToMake: 1,
        description: "Welcome to my Fiverr profile! I'm a certified Data Scientist and Machine Learning Engineer with a Master's in Data Science and a Bachelor's in Software Engineering. I specialize in Data Cleaning, EDA, Visualization, Machine Learning, and Large Language Models. My services include Data and Text Preprocessing, AI Chatbots, and Data Analysis. Let's discuss your project before placing an order. Proficient in R, Python, Excel, TensorFlow, and Keras. Let's bring your data projects to life!",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819623/do-text-analysis-pre-processing-and-nlp_mb3jox.jpg",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819626/Instagram_Reach_analysis_ghyaas_-_Jupyter_Notebook_ytt7yi_ibh3ao.jpg"
        ],
        category: "data",
        tags: ["SQL", "Database", "Optimization"],
        likedByUsers: []
    },

    /* ───────────── Photography ───────────── */
    {
        _id: "photo601",
        title: "I will shoot premium product photography or lifestyle photos",
        price: 25,
        createdAt: 1699008053052,
        packages: {
            basic: { title: "1 Photo", packPrice: 25, packDaysToMake: 1, desc: "Skin retouch", features: ["Blemish removal"] },
            standard: { title: "5 Photos", packPrice: 90, packDaysToMake: 2, desc: "Color grade", features: ["Dodge & burn"] },
            premium: { title: "10 Photos", packPrice: 160, packDaysToMake: 3, desc: "Full edit", features: ["Background cleanup"] }
        },
        owner: {
            _id: "photoU1",
            fullname: "Katy M",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819707/5421f693-a074-49dd-a499-1886db56f9a5_tn5bok.webp",
            level: 2,
            rate: 5
        },
        daysToMake: 1,
        description: "Looking for high-quality, professional photography that makes your product shine? Youre in the right place!",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819707/5421f693-a074-49dd-a499-1886db56f9a5_tn5bok.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819720/shoot-professional-product-photography-lifestyle-photo_sbp8zx.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819724/shoot-professional-product-photography-lifestyle-photo_xto0nb.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819727/shoot-professional-product-photography-lifestyle-photo_fkrush.webp"
        ],
        category: "photography",
        tags: ["Photo Retouching", "Color Grading"],
        likedByUsers: []
    },
    {
        _id: "photo602",
        title: "I will do your product photography in eu",
        price: 180,
        createdAt: 1699009053052,
        packages: {
            basic: { title: "5 Images", packPrice: 180, packDaysToMake: 5, desc: "White background", features: ["RAW"] },
            standard: { title: "10 Images", packPrice: 300, packDaysToMake: 7, desc: "Styled props", features: ["PSD"] },
            premium: { title: "20 Images", packPrice: 520, packDaysToMake: 10, desc: "Lifestyle scene", features: ["Location"] }
        },
        owner: {
            _id: "photoU2",
            fullname: "Jakob M",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819810/b0ea5653-d660-4ded-aca0-8681990f9fc8_vp39sq.webp",
            level: 1,
            rate: 4.8
        },
        daysToMake: 5,
        description: "I'm Jákob, a Fiverr certified Pro seller and professional e-commerce product photographer specializing in high-quality packshot and lifestyle images. With a focus on showcasing your products in the best possible light, my Fiverr Pro certification stands as a testament to my expertise, quality of work, and dedication to delivering exceptional service. Let's bring your products to life with images that capture attention and drive sales.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819819/staged-product-still-photography_ybkbul.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819816/staged-product-still-photography_xahmkn.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819822/staged-product-still-photography_wi6adt.webp"
        ],
        category: "photography",
        tags: ["Product Photography", "Studio"],
        likedByUsers: []
    },
    {
        _id: "photo603",
        title: "I will be your surprise proposal photographer in NYC",
        price: 40,
        createdAt: 1699010053052,
        packages: {
            basic: { title: "Standard", packPrice: 40, packDaysToMake: 2, desc: "Minor damage", features: ["Digital file"] },
            standard: { title: "Advanced", packPrice: 70, packDaysToMake: 3, desc: "Medium damage", features: ["Colorise"] },
            premium: { title: "Premium", packPrice: 120, packDaysToMake: 4, desc: "Severe damage", features: ["Print ready"] }
        },
        owner: {
            _id: "photoU3",
            fullname: "Muccitas",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819910/8501b4d2-0001-4c2e-9dab-119808e4f53a_csvkzf.webp",
            level: 2,
            rate: 4.9
        },
        daysToMake: 2,
        description: "Hey there, I'm Mucci, and I'm so glad you are here! Chances are, you found me because you're trying to plan the perfect surprise for your soon-to-be fiancé, and you need a New York proposal photographer who will capture that beautiful moment when they say YES! Planning a surprise proposal in New York may seem challenging, but with my help, you can fully immerse yourself in the moment with complete confidence that I will capture every extraordinary moment of the experience. We will cater the moment and location to suit your unique taste. How will we plan this? Read about the process and some testimonials here: allthefeels.club/nyc-surprise-proposal-photographer This is a safe, inclusive, collaborative space where your unique love story is celebrated. So, let's make some magic together!",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819926/be-your-surprise-proposal-photographer-in-nyc_rnweoo.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819919/be-your-surprise-proposal-photographer-in-nyc_iygaiv.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749819922/be-your-surprise-proposal-photographer-in-nyc_nsboti.webp"
        ],
        category: "photography",
        tags: ["Photo Restoration", "Colorisation"],
        likedByUsers: []
    },
    {
        _id: "photo604",
        title: "I will be your proposal photographer and videographer",
        price: 60,
        createdAt: 1699011053052,
        packages: {
            basic: { title: "20 Pages", packPrice: 60, packDaysToMake: 3, desc: "Digital PDF", features: ["Cover design"] },
            standard: { title: "40 Pages", packPrice: 110, packDaysToMake: 4, desc: "Print ready", features: ["Layout", "CMYK"] },
            premium: { title: "Hardcover", packPrice: 180, packDaysToMake: 6, desc: "Printed book", features: ["Shipping"] }
        },
        owner: {
            _id: "photoU4",
            fullname: "Alvin T",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749820016/19dc03d7-8060-48e0-9442-6b260df9e122_v52g0e.webp",
            level: 1,
            rate: 4.7
        },
        daysToMake: 3,
        description: "Are you planning a romantic trip to the City of Love to pop the big question or celebrate your engagement or proposal? Let me help you preserve this unforgettable moment with a stunning photoshoot that captures the magic of your love against the breathtaking backdrop of Paris. Imagine strolling hand-in-hand along the Seine, with the Eiffel Tower glistening in the distance, or sharing a tender kiss in the charming cobblestone streets of Montmartre. Whether it's a surprise proposal or a celebration of your engagement, I specialize in creating timeless images that reflect your unique love story.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749820042/photograph-and-video-your-wedding-proposal-in-paris_vnkpwz.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749820045/photograph-and-video-your-wedding-proposal-in-paris_qrjgjx.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749820038/photograph-and-video-your-wedding-proposal-in-paris_pw7e0m.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749820034/photograph-and-video-your-wedding-proposal-in-paris_vpwrh3.webp"
        ],
        category: "photography",
        tags: ["Album Design", "Print Design"],
        likedByUsers: []
    },
    {
        _id: "photo605",
        title: "I will do photoshoot for portrait photography outside in toronto",
        price: 90,
        createdAt: 1699012053052,
        packages: {
            basic: { title: "1 Pose", packPrice: 90, packDaysToMake: 2, desc: "Virtual shoot", features: ["Retouch"] },
            standard: { title: "3 Poses", packPrice: 150, packDaysToMake: 3, desc: "Multiple outfits", features: ["Retouch", "Color grade"] },
            premium: { title: "5 Poses", packPrice: 220, packDaysToMake: 4, desc: "Studio quality", features: ["Background swap"] }
        },
        owner: {
            _id: "photoU5",
            fullname: "Katsuhiro K",
            imgUrl: "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749820125/d3529073-ce13-460a-9be6-44dae8c286c0_smbt2s.webp",
            level: 2,
            rate: 4.8
        },
        daysToMake: 2,
        description: "I'm mainly a portrait photographer in Toronto and have over 6 years of experience in photography. I can take a photo outside where is flexible with any location you choose for the photo shoot.",
        imgUrls: [
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749820115/shoot-portrait-photography-in-toronto_dgzogz.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749820132/shoot-portrait-photography-in-toronto_ycidux.webp",
            "https://res.cloudinary.com/dhxnsowkl/image/upload/v1749820129/shoot-portrait-photography-in-toronto_lmyrfl.webp"
        ],
        category: "photography",
        tags: ["Headshots", "Portrait Photography"],
        likedByUsers: []
    }
]