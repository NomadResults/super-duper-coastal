const cdn = (url) =>
    `https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_${url}`;

export const CATEGORIES = [
    {
        slug: 'hardscaping',
        label: 'Hardscaping',
        cover: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69f8d6dbca15d8ddc42ec72c.jpg'),
        photos: [
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69f8d6dbca15d8ddc42ec72c.jpg'), title: 'Stone Patio & Retaining Wall' },
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69f8ddee273a62411d7daad8.jpeg'), title: 'Custom Hardscape Design' },
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0052d38dd61887f9f95b.png'), title: 'Outdoor Living & Stonework' },
        ],
    },
    {
        slug: 'landscaping',
        label: 'Landscaping',
        cover: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0051becb53a735f918f1.png'),
        photos: [
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0051becb53a735f918f1.png'), title: 'Coastal Landscape Design' },
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0052d38dd61887f9f956.png'), title: 'Native Plant Landscaping' },
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0e853637549c491b7780.png'), title: 'Full Property Landscape Build' },
        ],
    },
    {
        slug: 'outdoor-kitchens',
        label: 'Outdoor Kitchens',
        cover: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0c11becb53a735fc5fd2.png'),
        photos: [
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0c11becb53a735fc5fe0.png'), title: 'Full Outdoor Kitchen Build' },
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0c11becb53a735fc5fd2.png'), title: 'Custom Outdoor Kitchen & Bar' },
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0c11a7386fa30896c875.png'), title: 'Pergola & Outdoor Kitchen' },
        ],
    },
    {
        slug: 'turf',
        label: 'Artificial Turf',
        cover: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa01e696effa7019112a00.jpg'),
        photos: [
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa01e696effa7019112a00.jpg'), title: 'Premium Synthetic Turf Install' },
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa01e798d76f73a11f7d73.jpeg'), title: 'Backyard Turf Transformation' },
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa01e696effa70191129fe.jpeg'), title: 'Artificial Turf & Stone Border' },
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa01e6a7386fa30893eaff.jpeg'), title: 'Low-Maintenance Turf Install' },
        ],
    },
    {
        slug: 'lighting',
        label: 'Outdoor Lighting',
        cover: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0b407167fd9a35845675.png'),
        photos: [
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0b407167fd9a35845675.png'), title: 'Architectural Lighting System' },
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0b40becb53a735fc2440.png'), title: 'Landscape Uplighting Design' },
            { img: cdn('https://assets.cdn.filesafe.space/PLx0none5wN20wsNi0Gz/media/69fa0b40becb53a735fc2447.png'), title: 'Evening Pathway Lighting' },
        ],
    },
];
