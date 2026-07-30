export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];

export const localeMeta: Record<Locale, { label: string; nativeLabel: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", nativeLabel: "English", dir: "ltr" },
  ar: { label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
};

interface TitleDescription {
  title: string;
  description: string;
}

export interface Dictionary {
  nav: {
    features: string;
    howItWorks: string;
    included: string;
    pricing: string;
    login: string;
    getStarted: string;
  };
  common: {
    loading: string;
    viewAll: string;
    seeDetails: string;
    approve: string;
    rollback: string;
    cancel: string;
    save: string;
    continue: string;
    back: string;
    searchPlaceholder: string;
    active: string;
    building: string;
    failed: string;
    queued: string;
  };
  status: {
    active: string;
    building: string;
    failed: string;
    queued: string;
    ready: string;
    canceled: string;
    idle: string;
    aiWorking: string;
    needsApproval: string;
    pending: string;
    error: string;
  };
  sidebar: {
    stores: string;
    domains: string;
    resourceUsage: string;
    billing: string;
    notifications: string;
    settings: string;
    profile: string;
  };
  storeSidebar: {
    allStores: string;
    overview: string;
    orders: string;
    aiWorkspace: string;
    builder: string;
    deployments: string;
    domains: string;
    team: string;
    settings: string;
    wishlist: string;
    reviews: string;
    coupons: string;
    inventory: string;
    referral: string;
    loyalty: string;
    giftCards: string;
    bundles: string;
    analytics: string;
    seo: string;
    newsletter: string;
    blog: string;
    faq: string;
  };
  topbar: {
    switchStore: string;
    myProfile: string;
    logOut: string;
  };
  aiWorkspace: {
    overview: string;
    history: string;
    deployments: string;
    rollback: string;
    preview: string;
    deploy: string;
    published: string;
    newChat: string;
    recent: string;
    workingOn: string;
    inputPlaceholder: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
  dashboardStores: {
    title: string;
    active: string;
    createStore: string;
    totalStores: string;
    activeDeployments: string;
    combinedRevenue: string;
    monthlyRevenue: string;
    visitors: string;
    lastDeployment: string;
    openDashboard: string;
    website: string;
  };
  dashboardDomains: {
    title: string;
    subtitle: string;
    storeSubtitle: string;
    totalDomains: string;
    active: string;
    needsAttention: string;
    manage: string;
    secure: string;
    securing: string;
    verify: string;
    remove: string;
    primary: string;
    renew: string;
    waitingForDns: string;
    dnsRecordsToAdd: string;
    dnsRecords: string;
    connectPlaceholder: string;
    connect: string;
    buyDomain: string;
    emptyState: string;
    renews: string;
  };
  dashboardResourceUsage: {
    title: string;
    subtitle: string;
    cpu: string;
    memory: string;
    storage: string;
    bandwidth: string;
    aiCredits: string;
    deployments: string;
    thisMonth: string;
    perMonth: string;
    creditUsageTitle: string;
    creditUsageSubtitle: string;
  };
  dashboardBilling: {
    title: string;
    subtitle: string;
    currentPlan: string;
    changePlan: string;
    paymentMethod: string;
    update: string;
    invoices: string;
    aiCreditsCard: string;
    buyExtraCredits: string;
    planUsage: string;
    stores: string;
    customDomains: string;
    support: string;
  };
  marketing: {
    hero: {
      headingLine1: string;
      headingBold: string;
      headingRest: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
      statLabels: { storesCreated: string; timeToLive: string; uptime: string };
      mockup: {
        userMessage: string;
        aiMessage1: string;
        aiMessage2: string;
        featuresTurnedOn: string;
        publishing: string;
        live: string;
        almostReady: string;
        newFeatureBanner: string;
        shop: string;
        collections: string;
        journal: string;
        previewLive: string;
        buildingPreview: string;
      };
    };
    logoCloud: {
      eyebrow: string;
      title: string;
    };
    features: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: TitleDescription[];
    };
    howItWorks: {
      eyebrow: string;
      title: string;
      subtitle: string;
      steps: TitleDescription[];
    };
    included: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: TitleDescription[];
    };
    ai: {
      eyebrow: string;
      title: string;
      subtitle: string;
      capabilities: { label: string; detail: string }[];
    };
    deployment: {
      eyebrow: string;
      title: string;
      subtitle: string;
      panelTitle: string;
      bullets: TitleDescription[];
      feed: { message: string; time: string }[];
      envProduction: string;
      envPreview: string;
    };
    commerceEngine: {
      eyebrow: string;
      title: string;
      subtitle: string;
      capabilities: string[];
    };
    testimonials: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: { quote: string; role: string }[];
    };
    pricingTeaser: {
      eyebrow: string;
      title: string;
      subtitle: string;
      compareLink: string;
    };
    pricingPage: {
      subtitle: string;
      disclaimer: string;
      compareEyebrow: string;
      compareTitle: string;
      planColumnLabel: string;
      popularLabel: string;
      priceRowLabel: string;
      perMonthSuffix: string;
    };
    pricingPlans: Record<string, { name: string; description: string; cta: string; highlights: string[] }>;
    pricingCard: {
      mostPopular: string;
      perMonth: string;
      creditsLabel: string;
      includedSuffix: string;
      unlimitedNote: string;
      extraCostPrefix: string;
      extraCostMiddle: string;
      extraCostSuffix: string;
    };
    faq: {
      eyebrow: string;
      title: string;
      items: { question: string; answer: string }[];
    };
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
    footer: {
      tagline: string;
      columns: { title: string; links: string[] }[];
      copyright: string;
      statusLabel: string;
    };
  };
}

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      features: "Features",
      howItWorks: "How it works",
      included: "What's included",
      pricing: "Pricing",
      login: "Sign in",
      getStarted: "Start building",
    },
    common: {
      loading: "Loading",
      viewAll: "View all",
      seeDetails: "See details",
      approve: "Approve",
      rollback: "Rollback",
      cancel: "Cancel",
      save: "Save changes",
      continue: "Continue",
      back: "Back",
      searchPlaceholder: "Search…",
      active: "Active",
      building: "Building",
      failed: "Failed",
      queued: "Queued",
    },
    status: {
      active: "Active",
      building: "Building",
      failed: "Failed",
      queued: "Queued",
      ready: "Ready",
      canceled: "Canceled",
      idle: "Idle",
      aiWorking: "AI working",
      needsApproval: "Needs approval",
      pending: "Pending",
      error: "Error",
    },
    sidebar: {
      stores: "Stores",
      domains: "Domains",
      resourceUsage: "Resource Usage",
      billing: "Billing",
      notifications: "Notifications",
      settings: "Settings",
      profile: "Profile",
    },
    storeSidebar: {
      allStores: "All stores",
      overview: "Overview",
      orders: "Orders",
      deployments: "Deployments",
      domains: "Domains",
      aiWorkspace: "AI Workspace",
      builder: "Builder",
      team: "Team",
      settings: "Settings",
      wishlist: "Wishlist",
      reviews: "Reviews",
      coupons: "Coupons",
      inventory: "Inventory",
      referral: "Referral",
      loyalty: "Loyalty",
      giftCards: "Gift Cards",
      bundles: "Bundles",
      analytics: "Analytics",
      seo: "SEO",
      newsletter: "Newsletter",
      blog: "Blog",
      faq: "FAQ",
    },
    topbar: {
      switchStore: "Switch store",
      myProfile: "Profile",
      logOut: "Log out",
    },
    aiWorkspace: {
      overview: "Overview",
      history: "History",
      deployments: "Deployments",
      rollback: "Rollback",
      preview: "Preview",
      deploy: "Deploy",
      published: "Published",
      newChat: "New chat",
      recent: "Recent",
      workingOn: "Working on {store}",
      inputPlaceholder: "Describe a change to your store…",
      emptyTitle: "What should we change on {store}?",
      emptySubtitle: "Describe it in plain language, I'll handle the rest.",
    },
    dashboardStores: {
      title: "Stores",
      active: "active",
      createStore: "Create Store",
      totalStores: "Total stores",
      activeDeployments: "Active deployments",
      combinedRevenue: "Combined monthly revenue",
      monthlyRevenue: "Monthly revenue",
      visitors: "Visitors",
      lastDeployment: "Last deployment",
      openDashboard: "Open Dashboard",
      website: "Website",
    },
    dashboardDomains: {
      title: "Domains",
      subtitle: "Every custom domain connected across your stores, in one place.",
      storeSubtitle: "Connect a domain you already own, or buy a new one and have it ready in minutes.",
      totalDomains: "Total domains",
      active: "Active",
      needsAttention: "Needs attention",
      manage: "Manage",
      secure: "Secure",
      securing: "Securing…",
      verify: "Verify",
      remove: "Remove",
      primary: "Primary",
      renew: "Renew",
      waitingForDns: "Waiting for DNS configuration. Add the records below at your domain provider, then click Verify. Changes can take up to 48 hours to propagate.",
      dnsRecordsToAdd: "DNS records to add",
      dnsRecords: "DNS records",
      connectPlaceholder: "Add a domain you already own (yourbrand.com)",
      connect: "Connect",
      buyDomain: "Buy a domain",
      emptyState: "No custom domains connected yet.",
      renews: "Renews",
    },
    dashboardResourceUsage: {
      title: "Resource Usage",
      subtitle: "Usage against your Professional plan, shared across all of your stores. Limits reset every billing cycle.",
      cpu: "CPU",
      memory: "Memory",
      storage: "Storage",
      bandwidth: "Bandwidth",
      aiCredits: "AI credits",
      deployments: "Deployments",
      thisMonth: "this month",
      perMonth: "/ month",
      creditUsageTitle: "AI credit usage",
      creditUsageSubtitle: "Cumulative over the last 14 days",
    },
    dashboardBilling: {
      title: "Billing",
      subtitle: "Manage your subscription, payment method, and usage.",
      currentPlan: "Current plan",
      changePlan: "Change plan",
      paymentMethod: "Payment method",
      update: "Update",
      invoices: "Invoices",
      aiCreditsCard: "AI credits",
      buyExtraCredits: "Buy extra AI credits",
      planUsage: "Plan usage",
      stores: "Stores",
      customDomains: "Custom domains",
      support: "Support",
    },
    marketing: {
      hero: {
        headingLine1: "Describe your store.",
        headingBold: "Basalt",
        headingRest: "builds the rest.",
        subtitle:
          "Basalt turns a business idea into a fully working online store: branded, translated, and live on your own domain. No code. No developers to hire. Just tell it what you're building, and start selling.",
        ctaPrimary: "Start building free",
        ctaSecondary: "See the AI Workspace",
        statLabels: {
          storesCreated: "Stores created",
          timeToLive: "Time to go live",
          uptime: "Platform uptime",
        },
        mockup: {
          userMessage: "Create a minimal perfume store called Lumière. Black and gold. Add wishlist and reviews.",
          aiMessage1: "Got it, setting up your store now.",
          aiMessage2: "Turned on Wishlist and Reviews, and applied your black and gold branding.",
          featuresTurnedOn: "3 features turned on",
          publishing: "Publishing your preview at lumiere.buildonbasalt.com",
          live: "Live",
          almostReady: "Almost ready",
          newFeatureBanner: "New: wishlist & reviews are live",
          shop: "Shop",
          collections: "Collections",
          journal: "Journal",
          previewLive: "Preview live",
          buildingPreview: "Building preview",
        },
      },
      logoCloud: {
        eyebrow: "Under the hood",
        title: "Running on the same technology the best product teams trust",
      },
      features: {
        eyebrow: "Platform",
        title: "Everything a modern online store needs. Nothing you have to build.",
        subtitle:
          "Basalt handles the parts that used to take a team of engineers weeks, so you can spend that time on the business itself.",
        items: [
          {
            title: "AI Workspace",
            description:
              "Describe a change in plain language. Basalt plans it, configures it, and shows you a live preview before anything ships.",
          },
          {
            title: "Built on a proven foundation",
            description:
              "Every store is built on the same battle-tested foundation, configured for your business, not built from scratch.",
          },
          {
            title: "One-click publishing",
            description:
              "Every change gets a private preview first. Approve it and it goes live instantly, or roll it back in seconds if you change your mind.",
          },
          {
            title: "Global by default",
            description:
              "Launch in English and Arabic with full right-to-left support built in, not bolted on after launch.",
          },
          {
            title: "Real-time business analytics",
            description:
              "Revenue, traffic, and conversion tracked automatically and visualized the moment your store goes live.",
          },
          {
            title: "Secure & reliable",
            description:
              "Every store runs in its own secure, private environment. Your data is never shared with another business, and it's built to handle real growth.",
          },
        ],
      },
      howItWorks: {
        eyebrow: "Process",
        title: "From idea to a live store in four steps",
        subtitle:
          "No technical setup, no waiting on a developer, nothing to configure yourself. Basalt handles all of it for you.",
        steps: [
          {
            title: "Describe your business",
            description:
              "Name it, describe what you sell, upload a logo. Basalt reads your brief the way a strategist would.",
          },
          {
            title: "AI configures your store",
            description:
              "Basalt reads your brief and sets up your store: turning on the right features, applying your brand, and writing your first pages.",
          },
          {
            title: "Preview & approve",
            description:
              "A live preview appears automatically. Walk through it, ask for changes, approve when it feels right.",
          },
          {
            title: "Live for your customers",
            description:
              "One click and your preview goes live, on your own domain, secure and backed up from day one.",
          },
        ],
      },
      included: {
        eyebrow: "What's included",
        title: "Everything a store needs. Nothing for you to run.",
        subtitle:
          "This is what you'd normally hire a developer and an agency to handle. With Basalt, it just comes with your store.",
        items: [
          {
            title: "Hosting & security, handled",
            description:
              "Your store runs on secure, always-on infrastructure. No servers to manage, no certificates to renew. It's simply taken care of.",
          },
          {
            title: "New features, automatically",
            description:
              "Every improvement we ship reaches your store on its own. You never install an update or wait on a developer.",
          },
          {
            title: "Roll back anything, instantly",
            description:
              "Every change is saved as its own version. If something isn't right, roll back to how it was in a single click.",
          },
          {
            title: "Preview before it's live",
            description:
              "Every change is shown to you privately first, so you can check it looks right before your customers ever see it.",
          },
          {
            title: "Ready for your busiest day",
            description: "Whether it's 10 visitors or 10,000, your store keeps running smoothly. Nothing for you to plan for.",
          },
          {
            title: "Minutes, not months",
            description: "What used to take weeks of development now takes minutes, and there's no team to manage afterward.",
          },
        ],
      },
      ai: {
        eyebrow: "Powered by AI",
        title: "Your store, built and run by AI.",
        subtitle:
          "Just describe what you want. Basalt's AI sets up your pages, turns on the right features, and keeps everything looking and running the way you'd expect. No prompts to learn, nothing to configure yourself.",
        capabilities: [
          { label: "Understands plain language", detail: "Describe what you want the way you'd explain it to a person." },
          { label: "Builds real, working pages", detail: "Not a mockup or a demo. A store that's actually ready to sell." },
          { label: "Matches your brand automatically", detail: "Your colors, your fonts, your voice, applied everywhere." },
          { label: "Shows you before it goes live", detail: "Every change previews privately first. You approve, it publishes." },
        ],
      },
      deployment: {
        eyebrow: "Deployments",
        title: "Update your store with the confidence of a team behind you.",
        subtitle:
          "Every change gets a private preview first. Approve it to publish, or roll it back in one click if you change your mind.",
        panelTitle: "Deployments",
        bullets: [
          {
            title: "A preview for every change",
            description: "Nothing goes live for your customers without a preview you can check first.",
          },
          {
            title: "One-click publish or roll back",
            description: "Publish the exact version you previewed, or roll back to an earlier version instantly.",
          },
          {
            title: "A complete history",
            description: "Every change is logged with a timestamp, so you always know what changed and when.",
          },
        ],
        feed: [
          { message: "Enabled Loyalty program", time: "2m ago" },
          { message: "Updated checkout copy (Arabic)", time: "1h ago" },
          { message: "Updated brand colors", time: "3h ago" },
          { message: "Updated bundle pricing", time: "6h ago" },
        ],
        envProduction: "Production",
        envPreview: "Preview",
      },
      commerceEngine: {
        eyebrow: "Commerce Engine",
        title: "One engine. Every commerce building block your store will ever need.",
        subtitle:
          "These aren't add-ons bolted on later. They're built into the Commerce Template, ready to enable the moment your store needs them.",
        capabilities: [
          "Catalog & variants",
          "Cart & checkout",
          "Payments & currencies",
          "Inventory tracking",
          "Promotions & coupons",
          "Reviews & ratings",
          "Wishlist",
          "Multi-currency conversion",
          "Order management",
          "Shipping & fulfillment",
        ],
      },
      testimonials: {
        eyebrow: "Customers",
        title: "Built for founders who don't have an engineering team yet",
        subtitle: "A handful of the businesses running their store on Basalt today.",
        items: [
          {
            quote:
              "We described the brand in four sentences. Forty minutes later we had a live store that looked like we'd hired an agency.",
            role: "Founder, Lumière Parfums",
          },
          {
            quote:
              "The AI never touched our checkout. It just turned on the features we needed. That's exactly the kind of restraint we wanted from a tool like this.",
            role: "Co-founder, Northfield Furniture Co.",
          },
          {
            quote: "Rollback saved us during launch week. One click back to the last good version, no panic, no scrambling.",
            role: "Operator, Cove Cosmetics",
          },
        ],
      },
      pricingTeaser: {
        eyebrow: "Pricing",
        title: "Simple pricing that scales with your stores",
        subtitle: "Start free and pay a small fee per order, or move to a flat monthly plan with zero transaction fees.",
        compareLink: "Compare all plan details",
      },
      pricingPage: {
        subtitle:
          "Start free and only pay a small fee per order, or move to a flat monthly plan with zero transaction fees. Adjust your AI credits anytime.",
        disclaimer: "Extra AI credits are billed at $4 per 50 credits, on top of what's included in your plan.",
        compareEyebrow: "Compare plans",
        compareTitle: "Every detail, side by side",
        planColumnLabel: "Plan",
        popularLabel: "Popular",
        priceRowLabel: "Price",
        perMonthSuffix: "/ month",
      },
      pricingPlans: {
        free: {
          name: "Free",
          description: "Zero commitment. Pay only a small fee per order.",
          cta: "Start for free",
          highlights: [
            "1 store, hosting included",
            "No custom domain",
            "1% per order (0.5% after $5,000/mo)",
            "Add AI credits anytime",
          ],
        },
        starter: {
          name: "Starter",
          description: "For a single store ready for its own domain.",
          cta: "Start building",
          highlights: ["1 store", "Custom domain included", "200 AI credits / month", "0% transaction fees"],
        },
        professional: {
          name: "Professional",
          description: "For growing catalogs and multi-store operators.",
          cta: "Start building",
          highlights: ["5 stores", "1,000 AI credits / month", "1 free domain / year", "0% transaction fees"],
        },
        agency: {
          name: "Agency",
          description: "For agencies and teams launching stores at scale.",
          cta: "Start building",
          highlights: ["25 stores", "Unlimited AI credits", "3 free domains / year", "0% transaction fees"],
        },
      },
      pricingCard: {
        mostPopular: "Most popular",
        perMonth: "/ month",
        creditsLabel: "AI credits / month",
        includedSuffix: "included",
        unlimitedNote: " · unlimited, never billed extra",
        extraCostPrefix: " · +$",
        extraCostMiddle: " for ",
        extraCostSuffix: " extra",
      },
      faq: {
        eyebrow: "FAQ",
        title: "Questions we hear most",
        items: [
          {
            question: "Do I need to know how to code?",
            answer:
              "No. You describe your store in plain language: business type, brand, the features you want. Basalt sets everything up for you. You never see or touch any code.",
          },
          {
            question: "What exactly does the AI build?",
            answer:
              "In almost every case, nothing from scratch. The AI turns on the features you need, applies your brand, and reuses building blocks that are already tested and proven. It only creates something new when nothing else can do the job, and even then, it's reviewed before it goes live.",
          },
          {
            question: "Can I connect my own domain?",
            answer:
              "Yes. Connect a domain you already own or buy one directly through Basalt. Security certificates and renewals are handled automatically, so there's nothing for you to set up.",
          },
          {
            question: "What happens if I run out of AI credits?",
            answer:
              "Your store keeps running normally. AI credits only govern how many new AI-driven changes you can request. Add more credits anytime from Billing, or upgrade your plan for a higher monthly allowance.",
          },
          {
            question: "Is my store separate from other businesses on Basalt?",
            answer: "Yes, completely. Your data, your customers, and your orders are never shared or mixed with another business.",
          },
          {
            question: "Can I roll back a change I made?",
            answer: "Yes. Every version of your store is saved. Roll back to how things were before in a single click, with no downtime.",
          },
          {
            question: "Do you support Arabic and right-to-left layouts?",
            answer:
              "Yes. English and Arabic are supported everywhere in the platform and in your storefront, with full right-to-left support built in from day one, not added on afterward.",
          },
        ],
      },
      cta: {
        title: "Your store is a conversation away.",
        subtitle: "Start free. No credit card required to see your first store deployed.",
        button: "Start building free",
      },
      footer: {
        tagline:
          "Describe your store. Basalt sets it up, publishes it, and keeps it running, so you can focus on the business, not the build.",
        columns: [
          { title: "Product", links: ["Features", "How it works", "What's included", "Pricing", "Changelog"] },
          { title: "Platform", links: ["AI Workspace", "Deployments", "Commerce Engine", "Status"] },
          { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
          { title: "Legal", links: ["Privacy", "Terms", "Security"] },
        ],
        copyright: "© {year} Basalt Labs, Inc. All rights reserved.",
        statusLabel: "All systems operational",
      },
    },
  },
  ar: {
    nav: {
      features: "المزايا",
      howItWorks: "كيف يعمل",
      included: "ما يشمله",
      pricing: "الأسعار",
      login: "تسجيل الدخول",
      getStarted: "ابدأ الآن",
    },
    common: {
      loading: "جارٍ التحميل",
      viewAll: "عرض الكل",
      seeDetails: "عرض التفاصيل",
      approve: "الموافقة",
      rollback: "التراجع",
      cancel: "إلغاء",
      save: "حفظ التغييرات",
      continue: "متابعة",
      back: "رجوع",
      searchPlaceholder: "بحث…",
      active: "نشط",
      building: "قيد البناء",
      failed: "فشل",
      queued: "في الانتظار",
    },
    status: {
      active: "نشط",
      building: "قيد البناء",
      failed: "فشل",
      queued: "في الانتظار",
      ready: "جاهز",
      canceled: "أُلغي",
      idle: "خامل",
      aiWorking: "الذكاء الاصطناعي يعمل",
      needsApproval: "يحتاج موافقة",
      pending: "قيد الانتظار",
      error: "خطأ",
    },
    sidebar: {
      stores: "المتاجر",
      domains: "النطاقات",
      resourceUsage: "استخدام الموارد",
      billing: "الفوترة",
      notifications: "الإشعارات",
      settings: "الإعدادات",
      profile: "الملف الشخصي",
    },
    storeSidebar: {
      allStores: "كل المتاجر",
      overview: "نظرة عامة",
      orders: "الطلبات",
      deployments: "عمليات النشر",
      domains: "النطاقات",
      aiWorkspace: "مساحة الذكاء الاصطناعي",
      builder: "المُنشئ",
      team: "الفريق",
      settings: "الإعدادات",
      wishlist: "المفضلة",
      reviews: "التقييمات",
      coupons: "الكوبونات",
      inventory: "المخزون",
      referral: "الإحالة",
      loyalty: "الولاء",
      giftCards: "بطاقات الهدايا",
      bundles: "الحزم",
      analytics: "التحليلات",
      seo: "السيو",
      newsletter: "النشرة البريدية",
      blog: "المدونة",
      faq: "الأسئلة الشائعة",
    },
    topbar: {
      switchStore: "تبديل المتجر",
      myProfile: "الملف الشخصي",
      logOut: "تسجيل الخروج",
    },
    aiWorkspace: {
      overview: "نظرة عامة",
      history: "السجل",
      deployments: "عمليات النشر",
      rollback: "تراجع",
      preview: "معاينة",
      deploy: "نشر",
      published: "تم النشر",
      newChat: "محادثة جديدة",
      recent: "الأخيرة",
      workingOn: "يعمل على {store}",
      inputPlaceholder: "صف تغييرًا لمتجرك…",
      emptyTitle: "ما الذي نغيّره في {store}؟",
      emptySubtitle: "صفه بلغة بسيطة، وسأتولى الباقي.",
    },
    dashboardStores: {
      title: "المتاجر",
      active: "نشط",
      createStore: "إنشاء متجر",
      totalStores: "إجمالي المتاجر",
      activeDeployments: "عمليات النشر النشطة",
      combinedRevenue: "إجمالي الإيرادات الشهرية",
      monthlyRevenue: "الإيرادات الشهرية",
      visitors: "الزوار",
      lastDeployment: "آخر نشر",
      openDashboard: "فتح لوحة التحكم",
      website: "الموقع",
    },
    dashboardDomains: {
      title: "النطاقات",
      subtitle: "كل نطاق مخصص متصل عبر متاجرك، في مكان واحد.",
      storeSubtitle: "اربط نطاقًا تملكه بالفعل، أو اشترِ نطاقًا جديدًا وجهّزه خلال دقائق.",
      totalDomains: "إجمالي النطاقات",
      active: "نشط",
      needsAttention: "يحتاج إلى انتباه",
      manage: "إدارة",
      secure: "آمن",
      securing: "جارٍ التأمين…",
      verify: "تحقق",
      remove: "إزالة",
      primary: "أساسي",
      renew: "تجديد",
      waitingForDns:
        "بانتظار إعداد سجلات DNS. أضف السجلات أدناه لدى مزود النطاق الخاص بك، ثم اضغط تحقق. قد تستغرق التغييرات حتى 48 ساعة لتنتشر.",
      dnsRecordsToAdd: "سجلات DNS المطلوب إضافتها",
      dnsRecords: "سجلات DNS",
      connectPlaceholder: "أضف نطاقًا تملكه بالفعل (yourbrand.com)",
      connect: "ربط",
      buyDomain: "شراء نطاق",
      emptyState: "لا توجد نطاقات مخصصة متصلة بعد.",
      renews: "يتجدد",
    },
    dashboardResourceUsage: {
      title: "استخدام الموارد",
      subtitle: "الاستخدام مقابل خطة Professional، مشترك بين جميع متاجرك. تُعاد الحدود كل دورة فوترة.",
      cpu: "المعالج",
      memory: "الذاكرة",
      storage: "التخزين",
      bandwidth: "النطاق الترددي",
      aiCredits: "رصيد الذكاء الاصطناعي",
      deployments: "عمليات النشر",
      thisMonth: "هذا الشهر",
      perMonth: "/ شهريًا",
      creditUsageTitle: "استخدام رصيد الذكاء الاصطناعي",
      creditUsageSubtitle: "تراكمي خلال آخر 14 يومًا",
    },
    dashboardBilling: {
      title: "الفوترة",
      subtitle: "أدر اشتراكك وطريقة الدفع والاستخدام.",
      currentPlan: "الخطة الحالية",
      changePlan: "تغيير الخطة",
      paymentMethod: "طريقة الدفع",
      update: "تحديث",
      invoices: "الفواتير",
      aiCreditsCard: "رصيد الذكاء الاصطناعي",
      buyExtraCredits: "شراء رصيد ذكاء اصطناعي إضافي",
      planUsage: "استخدام الخطة",
      stores: "المتاجر",
      customDomains: "النطاقات المخصصة",
      support: "الدعم",
    },
    marketing: {
      hero: {
        headingLine1: "صف متجرك.",
        headingBold: "بيسالت",
        headingRest: "يبني الباقي.",
        subtitle:
          "يحوّل بيسالت فكرة عملك إلى متجر إلكتروني متكامل: بهوية بصرية، بلغتين، ومباشر على نطاقك الخاص. بلا برمجة، وبلا حاجة لتوظيف مطورين. فقط أخبره بما تبنيه، وابدأ البيع.",
        ctaPrimary: "ابدأ البناء مجانًا",
        ctaSecondary: "استكشف مساحة الذكاء الاصطناعي",
        statLabels: {
          storesCreated: "متجر تم إنشاؤه",
          timeToLive: "الوقت حتى الانطلاق",
          uptime: "نسبة تشغيل المنصة",
        },
        mockup: {
          userMessage: "أنشئ متجر عطور بسيط اسمه Lumière. بالأسود والذهبي. وأضف المفضلة والتقييمات.",
          aiMessage1: "تم، جارٍ إعداد متجرك الآن.",
          aiMessage2: "تم تفعيل المفضلة والتقييمات، وتطبيق هويتك بالأسود والذهبي.",
          featuresTurnedOn: "تم تفعيل 3 مزايا",
          publishing: "جارٍ نشر معاينتك على lumiere.buildonbasalt.com",
          live: "مباشر",
          almostReady: "على وشك الجاهزية",
          newFeatureBanner: "جديد: المفضلة والتقييمات مفعّلة الآن",
          shop: "المتجر",
          collections: "المجموعات",
          journal: "المدونة",
          previewLive: "المعاينة مباشرة",
          buildingPreview: "جارٍ إعداد المعاينة",
        },
      },
      logoCloud: {
        eyebrow: "خلف الكواليس",
        title: "يعمل بنفس التقنية التي تثق بها أفضل فرق المنتجات",
      },
      features: {
        eyebrow: "المنصة",
        title: "كل ما يحتاجه متجر إلكتروني حديث. ولا شيء عليك بناؤه.",
        subtitle: "يتولى بيسالت الأجزاء التي كانت تستغرق من فريق مهندسين أسابيع، لتتفرغ أنت لعملك.",
        items: [
          {
            title: "مساحة الذكاء الاصطناعي",
            description: "صف التغيير الذي تريده بلغة بسيطة. يخطط له بيسالت وينفذه ويريك معاينة مباشرة قبل نشره.",
          },
          {
            title: "مبني على أساس مُثبت",
            description: "كل متجر يُبنى على نفس الأساس المُختبر، ويُهيّأ خصيصًا لعملك، لا يُبنى من الصفر.",
          },
          {
            title: "نشر بنقرة واحدة",
            description: "كل تغيير يحصل أولًا على معاينة خاصة. وافق عليه لينشر فورًا، أو تراجع عنه خلال ثوانٍ إذا غيّرت رأيك.",
          },
          {
            title: "عالمي بطبيعته",
            description: "أطلق متجرك بالإنجليزية والعربية بدعم كامل للكتابة من اليمين إلى اليسار، مدمج منذ البداية لا مضافًا لاحقًا.",
          },
          {
            title: "تحليلات أعمال فورية",
            description: "الإيرادات والزيارات ومعدل التحويل تُرصد تلقائيًا وتُعرض بصريًا لحظة انطلاق متجرك.",
          },
          {
            title: "آمن وموثوق",
            description: "كل متجر يعمل في بيئته الخاصة والآمنة. بياناتك لا تُشارك أبدًا مع عمل آخر، وهو مصمم لتحمّل نمو حقيقي.",
          },
        ],
      },
      howItWorks: {
        eyebrow: "العملية",
        title: "من الفكرة إلى متجر مباشر في أربع خطوات",
        subtitle: "بلا إعداد تقني، وبلا انتظار مطوّر، ولا شيء عليك ضبطه بنفسك. يتولى بيسالت كل ذلك نيابة عنك.",
        steps: [
          {
            title: "صف عملك",
            description: "سمِّه، وصف ما تبيعه، وارفع شعارك. يقرأ بيسالت موجزك كما يفعل استراتيجي محترف.",
          },
          {
            title: "الذكاء الاصطناعي يُعدّ متجرك",
            description: "يقرأ بيسالت موجزك ويُعدّ متجرك: يفعّل المزايا المناسبة، ويطبّق هويتك، ويكتب صفحاتك الأولى.",
          },
          {
            title: "معاينة وموافقة",
            description: "تظهر معاينة مباشرة تلقائيًا. تصفّحها، اطلب تعديلات، ووافق عندما تشعر أنها جاهزة.",
          },
          {
            title: "مباشر لعملائك",
            description: "نقرة واحدة وتصبح معاينتك مباشرة، على نطاقك الخاص، آمنة ومحفوظة منذ اليوم الأول.",
          },
        ],
      },
      included: {
        eyebrow: "ما يشمله",
        title: "كل ما يحتاجه المتجر. ولا شيء عليك تشغيله.",
        subtitle: "هذا ما كنت لتستعين فيه عادة بمطوّر ووكالة. مع بيسالت، يأتي ببساطة مع متجرك.",
        items: [
          {
            title: "الاستضافة والأمان، مكفولان",
            description: "يعمل متجرك على بنية تحتية آمنة ومتاحة دومًا. لا خوادم لإدارتها، ولا شهادات لتجديدها. الأمر ببساطة مُتكفَّل به.",
          },
          {
            title: "مزايا جديدة، تلقائيًا",
            description: "كل تحسين نُطلقه يصل إلى متجرك من تلقاء نفسه. لن تُثبّت تحديثًا أو تنتظر مطوّرًا أبدًا.",
          },
          {
            title: "تراجع عن أي شيء، فورًا",
            description: "كل تغيير يُحفظ كنسخة مستقلة. إن لم يكن الأمر كما تريد، تراجع إلى ما كان عليه بنقرة واحدة.",
          },
          {
            title: "معاينة قبل النشر",
            description: "كل تغيير يُعرض عليك بشكل خاص أولًا، لتتأكد من أنه صحيح قبل أن يراه عملاؤك.",
          },
          {
            title: "جاهز ليومك الأكثر ازدحامًا",
            description: "سواء كانوا 10 زوار أو 10,000، يستمر متجرك بالعمل بسلاسة. لا شيء عليك التخطيط له.",
          },
          {
            title: "دقائق، لا أشهر",
            description: "ما كان يستغرق أسابيع من التطوير أصبح يستغرق دقائق، دون فريق لإدارته لاحقًا.",
          },
        ],
      },
      ai: {
        eyebrow: "بدعم الذكاء الاصطناعي",
        title: "متجرك، يُبنى ويُدار بالذكاء الاصطناعي.",
        subtitle:
          "فقط صف ما تريده. يُعدّ ذكاء بيسالت الاصطناعي صفحاتك، ويفعّل المزايا المناسبة، ويحافظ على كل شيء يعمل ويبدو كما تتوقع. لا أوامر لتتعلمها، ولا شيء عليك ضبطه بنفسك.",
        capabilities: [
          { label: "يفهم اللغة البسيطة", detail: "صف ما تريده بنفس الطريقة التي تشرحها لشخص آخر." },
          { label: "يبني صفحات حقيقية وفعّالة", detail: "ليست نموذجًا أو عرضًا تجريبيًا. متجر جاهز فعليًا للبيع." },
          { label: "يطابق هويتك تلقائيًا", detail: "ألوانك، خطوطك، وأسلوبك، مطبّقة في كل مكان." },
          { label: "يريك النتيجة قبل النشر", detail: "كل تغيير يُعاين بشكل خاص أولًا. أنت توافق، وهو ينشر." },
        ],
      },
      deployment: {
        eyebrow: "عمليات النشر",
        title: "حدّث متجرك بثقة فريق يقف خلفك.",
        subtitle: "كل تغيير يحصل أولًا على معاينة خاصة. وافق عليه لنشره، أو تراجع عنه بنقرة واحدة إذا غيّرت رأيك.",
        panelTitle: "عمليات النشر",
        bullets: [
          {
            title: "معاينة لكل تغيير",
            description: "لا شيء ينشر لعملائك دون معاينة يمكنك التحقق منها أولًا.",
          },
          {
            title: "نشر أو تراجع بنقرة واحدة",
            description: "انشر النسخة التي عاينتها بالضبط، أو تراجع إلى نسخة سابقة فورًا.",
          },
          {
            title: "سجل كامل",
            description: "كل تغيير يُسجَّل بتوقيته، لتعرف دائمًا ماذا تغيّر ومتى.",
          },
        ],
        feed: [
          { message: "تم تفعيل برنامج الولاء", time: "قبل دقيقتين" },
          { message: "تحديث نص صفحة الدفع (بالعربية)", time: "قبل ساعة" },
          { message: "تحديث ألوان الهوية", time: "قبل 3 ساعات" },
          { message: "تحديث أسعار الحزم", time: "قبل 6 ساعات" },
        ],
        envProduction: "الإنتاج",
        envPreview: "المعاينة",
      },
      commerceEngine: {
        eyebrow: "محرك التجارة",
        title: "محرك واحد. كل لبنة تجارة سيحتاجها متجرك على الإطلاق.",
        subtitle: "هذه ليست إضافات تُركّب لاحقًا. إنها مبنية داخل قالب التجارة، وجاهزة للتفعيل لحظة احتياج متجرك لها.",
        capabilities: [
          "الكتالوج والمتغيرات",
          "السلة والدفع",
          "المدفوعات والعملات",
          "تتبع المخزون",
          "العروض والكوبونات",
          "التقييمات والمراجعات",
          "المفضلة",
          "تحويل العملات الفوري",
          "إدارة الطلبات",
          "الشحن والتنفيذ",
        ],
      },
      testimonials: {
        eyebrow: "العملاء",
        title: "صُمم لمؤسسين ليس لديهم فريق هندسي بعد",
        subtitle: "بعض من الأعمال التي تدير متجرها على بيسالت اليوم.",
        items: [
          {
            quote: "وصفنا الهوية في أربع جمل. وبعد أربعين دقيقة كان لدينا متجر مباشر يبدو وكأننا استعنّا بوكالة متخصصة.",
            role: "المؤسسة، Lumière Parfums",
          },
          {
            quote:
              "لم يلمس الذكاء الاصطناعي صفحة الدفع لدينا أبدًا. فقط فعّل المزايا التي احتجناها. هذا بالضبط نوع الانضباط الذي أردناه من أداة كهذه.",
            role: "المؤسس المشارك، Northfield Furniture Co.",
          },
          {
            quote: "التراجع أنقذنا خلال أسبوع الإطلاق. نقرة واحدة للعودة لآخر نسخة جيدة، دون ذعر أو تخبط.",
            role: "المشغّلة، Cove Cosmetics",
          },
        ],
      },
      pricingTeaser: {
        eyebrow: "الأسعار",
        title: "أسعار بسيطة تنمو مع متاجرك",
        subtitle: "ابدأ مجانًا وادفع رسمًا بسيطًا لكل طلب، أو انتقل لخطة شهرية ثابتة بلا أي رسوم على المعاملات.",
        compareLink: "قارن تفاصيل كل الخطط",
      },
      pricingPage: {
        subtitle:
          "ابدأ مجانًا وادفع فقط رسمًا بسيطًا لكل طلب، أو انتقل لخطة شهرية ثابتة بلا أي رسوم على المعاملات. عدّل رصيد الذكاء الاصطناعي في أي وقت.",
        disclaimer: "يُحتسب رصيد الذكاء الاصطناعي الإضافي بسعر 4$ لكل 50 رصيدًا، فوق ما هو مُضمَّن في خطتك.",
        compareEyebrow: "قارن الخطط",
        compareTitle: "كل التفاصيل، جنبًا إلى جنب",
        planColumnLabel: "الخطة",
        popularLabel: "الأكثر شيوعًا",
        priceRowLabel: "السعر",
        perMonthSuffix: "/ شهريًا",
      },
      pricingPlans: {
        free: {
          name: "مجانية",
          description: "بلا التزام. ادفع فقط رسمًا بسيطًا لكل طلب.",
          cta: "ابدأ مجانًا",
          highlights: [
            "متجر واحد، مع استضافة مجانية",
            "بلا نطاق مخصص",
            "1% لكل طلب (0.5% بعد 5,000$/شهر)",
            "أضف رصيد الذكاء الاصطناعي في أي وقت",
          ],
        },
        starter: {
          name: "البداية",
          description: "لمتجر واحد جاهز لنطاقه الخاص.",
          cta: "ابدأ البناء",
          highlights: ["متجر واحد", "نطاق مخصص مُضمَّن", "200 رصيد ذكاء اصطناعي شهريًا", "0% رسوم على المعاملات"],
        },
        professional: {
          name: "احترافية",
          description: "للكتالوجات المتنامية ومشغّلي المتاجر المتعددة.",
          cta: "ابدأ البناء",
          highlights: ["5 متاجر", "1,000 رصيد ذكاء اصطناعي شهريًا", "نطاق مجاني واحد سنويًا", "0% رسوم على المعاملات"],
        },
        agency: {
          name: "الوكالات",
          description: "للوكالات والفرق التي تطلق متاجر على نطاق واسع.",
          cta: "ابدأ البناء",
          highlights: ["25 متجرًا", "رصيد ذكاء اصطناعي غير محدود", "3 نطاقات مجانية سنويًا", "0% رسوم على المعاملات"],
        },
      },
      pricingCard: {
        mostPopular: "الأكثر شيوعًا",
        perMonth: "/ شهريًا",
        creditsLabel: "رصيد الذكاء الاصطناعي / شهريًا",
        includedSuffix: "مُضمَّن",
        unlimitedNote: " · غير محدود، لا يُحتسب إضافيًا أبدًا",
        extraCostPrefix: " · ‎+$",
        extraCostMiddle: " مقابل ",
        extraCostSuffix: " إضافية",
      },
      faq: {
        eyebrow: "الأسئلة الشائعة",
        title: "الأسئلة الأكثر شيوعًا",
        items: [
          {
            question: "هل أحتاج لمعرفة البرمجة؟",
            answer:
              "لا. تصف متجرك بلغة بسيطة: نوع العمل، الهوية، والمزايا التي تريدها. يتولى بيسالت إعداد كل شيء نيابة عنك. لن ترى أو تلمس أي كود برمجي.",
          },
          {
            question: "ما الذي يبنيه الذكاء الاصطناعي بالضبط؟",
            answer:
              "في أغلب الأحيان، لا شيء من الصفر. يفعّل الذكاء الاصطناعي المزايا التي تحتاجها، ويطبّق هويتك، ويعيد استخدام لبنات مُختبرة ومُثبتة مسبقًا. لا يُنشئ شيئًا جديدًا إلا حين لا يقوم أي شيء آخر بالمهمة، وحتى حينها، تتم مراجعته قبل النشر.",
          },
          {
            question: "هل يمكنني ربط نطاقي الخاص؟",
            answer:
              "نعم. اربط نطاقًا تملكه بالفعل أو اشترِ واحدًا مباشرة عبر بيسالت. تُدار شهادات الأمان وتجديدها تلقائيًا، فلا شيء عليك إعداده.",
          },
          {
            question: "ماذا يحدث إذا نفد رصيد الذكاء الاصطناعي لديّ؟",
            answer:
              "يستمر متجرك بالعمل بشكل طبيعي. يحدد رصيد الذكاء الاصطناعي فقط عدد التغييرات الجديدة التي يمكنك طلبها به. أضف المزيد من الرصيد في أي وقت من الفوترة، أو رقّي خطتك للحصول على حصة شهرية أكبر.",
          },
          {
            question: "هل متجري منفصل تمامًا عن باقي الأعمال على بيسالت؟",
            answer: "نعم، تمامًا. بياناتك وعملاؤك وطلباتك لا تُشارك أو تُخلط أبدًا مع عمل آخر.",
          },
          {
            question: "هل يمكنني التراجع عن تغيير قمت به؟",
            answer: "نعم. تُحفظ كل نسخة من متجرك. تراجع إلى ما كان عليه الوضع سابقًا بنقرة واحدة، دون أي توقف.",
          },
          {
            question: "هل تدعمون العربية والتخطيط من اليمين إلى اليسار؟",
            answer:
              "نعم. الإنجليزية والعربية مدعومتان في كل مكان بالمنصة وفي متجرك، مع دعم كامل للكتابة من اليمين إلى اليسار مدمج منذ اليوم الأول، لا مضافًا لاحقًا.",
          },
        ],
      },
      cta: {
        title: "متجرك على بُعد محادثة واحدة.",
        subtitle: "ابدأ مجانًا. لا حاجة لبطاقة ائتمان لرؤية أول متجر لك مباشرًا.",
        button: "ابدأ البناء مجانًا",
      },
      footer: {
        tagline: "صف متجرك. يُعده بيسالت وينشره ويبقيه يعمل، لتتفرغ أنت لعملك لا لبنائه.",
        columns: [
          { title: "المنتج", links: ["المزايا", "كيف يعمل", "ما يشمله", "الأسعار", "سجل التحديثات"] },
          { title: "المنصة", links: ["مساحة الذكاء الاصطناعي", "عمليات النشر", "محرك التجارة", "الحالة"] },
          { title: "الشركة", links: ["من نحن", "الوظائف", "المدونة", "تواصل معنا"] },
          { title: "قانوني", links: ["الخصوصية", "الشروط", "الأمان"] },
        ],
        copyright: "© {year} Basalt Labs, Inc. جميع الحقوق محفوظة.",
        statusLabel: "جميع الأنظمة تعمل بشكل طبيعي",
      },
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
