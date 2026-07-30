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
//
// `datePosted` (YYYY-MM-DD) feeds the JobPosting structured data that Google for
// Jobs reads. Keep it truthful — bump it when you genuinely re-open or refresh a
// role, not on every deploy. Roles are treated as evergreen (no expiry date),
// which is why there's no `validThrough`.
//
// `payMin` / `payMax` are hourly USD and are the single source for BOTH the pay
// line on the page and `baseSalary` in the JobPosting schema — don't hardcode a
// pay string anywhere else or the two will drift. Set either to null to hide pay
// entirely (the page omits the line, the schema omits baseSalary) rather than
// publishing a number you can't stand behind.
// Ranges confirmed by the owner 2026-07-30, split from his stated $18–$32 band.
export const ROLES = [
    {
        slug: 'crew-member',
        title: 'Landscape & Hardscape Crew Member',
        type: 'Full-Time',
        location: 'Corpus Christi & Coastal Bend, TX',
        payMin: 18,
        payMax: 24,
        datePosted: '2026-07-19',
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
        payMin: 24,
        payMax: 32,
        datePosted: '2026-07-19',
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
// All five confirmed by the owner 2026-07-29. Do not add a claim here without
// checking it first — this bar is the page's credibility, and applicants who
// find out a promise was inflated don't come back.
//
// Deliberately NOT claimed: trucks (not provided yet — crew supply their own
// transportation), and training is provided but UNPAID, so it can't be called
// "Paid Training".
export const PROOF_POINTS = [
    'Licensed & Insured',
    'Weekly Pay',
    'Tools Provided',
    'Training Provided',
    '3+ Years in the Coastal Bend',
];

// Number applicants can text with questions. Intentionally no name attached —
// applicants are told "someone from the team" will reach out rather than being
// pointed at a specific person.
export const HIRING_CONTACT = {
    name: null,
    phone: '(361) 316-5251',
    phoneHref: '+13613165251',
};

// Employee quotes. TODO: swap for real quotes + first names/roles.
// Set to [] to hide the section entirely until you have real ones.
export const TESTIMONIALS = [
    // { quote: 'Best crew I\'ve worked with. Steady hours and they actually train you.', name: 'Marcos', role: 'Crew Leader, 3 yrs' },
    // { quote: 'Started with no experience — now I run my own crew.', name: 'Devin', role: 'Foreman, 2 yrs' },
];
