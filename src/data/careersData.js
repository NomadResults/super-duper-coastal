// ─────────────────────────────────────────────────────────────
// Careers content — edit this file to add/remove/update roles.
// Set a role's `open: false` to hide it without deleting it.
// The evergreen "general application" is always shown at the end.
// ─────────────────────────────────────────────────────────────

export const WHY_WORK_HERE = [
    {
        icon: 'CalendarCheck',
        title: 'Year-Round Work',
        body: "Steady, full-time work across the Coastal Bend — we build through every season, so you're not laid off when it cools down.",
    },
    {
        icon: 'TrendingUp',
        title: 'Real Growth Path',
        body: 'Crew members move up to lead positions. We promote from within and invest in the people who show up and take pride in the work.',
    },
    {
        icon: 'Award',
        title: 'Work You\'re Proud Of',
        body: 'High-end hardscape and design-build projects — the kind of craftsmanship you can point to and say you built that.',
    },
    {
        icon: 'HandHeart',
        title: 'Treated Like a Pro',
        body: 'Fair pay, good equipment, and a crew that respects each other. We run organized jobsites, not chaos.',
    },
];

// type: 'Full-Time' | 'Seasonal' | 'Part-Time'
export const ROLES = [
    {
        slug: 'crew-member',
        title: 'Landscape & Hardscape Crew Member',
        type: 'Full-Time',
        location: 'Corpus Christi & Coastal Bend, TX',
        pay: '$00–$00/hr DOE', // TODO: replace with your real range, e.g. "$16–$22/hr DOE"
        open: true,
        summary:
            'Hands-on installation of stone patios, retaining walls, plantings, turf, and outdoor living features on residential design-build projects.',
        responsibilities: [
            'Install pavers, stone, retaining walls, plantings, and turf to spec',
            'Prep sites — grading, base work, drainage, and layout',
            'Operate hand tools and small equipment safely',
            'Keep jobsites clean, organized, and safe',
            'Represent the company professionally on client properties',
        ],
        requirements: [
            'Reliable transportation to our shop / jobsites',
            'Able to do physical outdoor work in South Texas weather',
            'Dependable, on-time, and a team player',
            'Landscaping or construction experience a plus (not required — we train)',
        ],
    },
    {
        slug: 'crew-leader',
        title: 'Crew Leader / Foreman',
        type: 'Full-Time',
        location: 'Corpus Christi & Coastal Bend, TX',
        pay: '$00–$00/hr DOE', // TODO: replace with your real range, e.g. "$25–$32/hr DOE"
        open: true,
        summary:
            'Lead a crew day-to-day on hardscape and landscape installs — own the quality, pace, and safety of the jobsite from start to finish.',
        responsibilities: [
            'Run daily operations on the jobsite and manage a small crew',
            'Read plans and translate them into precise, high-quality installs',
            'Coordinate materials, timelines, and client communication on site',
            'Enforce safety and quality standards',
            'Train and develop crew members',
        ],
        requirements: [
            'Valid driver\'s license and clean driving record',
            '3+ years hardscape / landscape or construction experience',
            'Proven ability to lead a crew and hit deadlines',
            'Strong knowledge of hardscape installation and site prep',
            'Bilingual (English/Spanish) a plus',
        ],
    },
];

// Shown as the catch-all card + selectable in the form
export const GENERAL_APPLICATION = {
    slug: 'general',
    title: 'Don\'t see your role? Apply anyway.',
    summary:
        "We're always looking for hardworking, reliable people who take pride in their craft. Tell us what you do and we'll reach out when there's a fit.",
};

// ─────────────────────────────────────────────────────────────
// TRUST / LEGITIMACY CONTENT — fill these in with real specifics.
// Concrete, verifiable facts are what make a stranger trust you
// enough to apply (and show up).
// ─────────────────────────────────────────────────────────────

// Short proof bar shown near the top of the page.
// TODO: edit to match reality — remove any you can't truthfully claim.
export const PROOF_POINTS = [
    'Licensed & Insured',
    'Weekly Pay',
    'Trucks & Tools Provided',
    'Paid Training',
    '10+ Years in the Coastal Bend', // TODO: use your real number
];

// The real person applicants can reach with questions. Big legitimacy signal.
// TODO: replace with a real name + the number you want applicants texting.
export const HIRING_CONTACT = {
    name: 'REPLACE — Hiring Manager Name',
    phone: '(361) 316-5251',
    phoneHref: '+13613165251',
};

// Employee quotes. TODO: swap for real quotes + first names/roles.
// Set to [] to hide the section entirely until you have real ones.
export const TESTIMONIALS = [
    // { quote: 'Best crew I\'ve worked with. Steady hours and they actually train you.', name: 'Marcos', role: 'Crew Leader, 3 yrs' },
    // { quote: 'Started with no experience — now I run my own crew.', name: 'Devin', role: 'Foreman, 2 yrs' },
];
