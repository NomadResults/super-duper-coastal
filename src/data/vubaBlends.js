// Official Vuba blend swatch imagery, served from Vuba's own CDN
// (vuba-stone.com, Americas collection) — dealer marketing assets.
// `width=800` keeps tiles crisp on retina without shipping 2000px files.
const swatch = (file) => `https://vuba-stone.com/cdn/shop/files/${file}&width=800`;

export const VUBA_BLENDS = [
    { name: 'Alaskan Tundra',  img: swatch('Alaskan_Tundra_Blend_14.jpg?v=1748517398') },
    { name: 'Arc de Triomphe', img: swatch('ArcdeTriomphe.jpg?v=1738573438') },
    { name: 'Big Sur',         img: swatch('BigSur.jpg?v=1738573469') },
    { name: 'Breckenridge',    img: swatch('Breckenridge_f8a3c9c7-67eb-44d6-aa8c-2b9349b2163e.jpg?v=1738573490') },
    { name: 'Caño Cristales',  img: swatch('CanoCristales.jpg?v=1738573512') },
    { name: 'China Town',      img: swatch('ChineTown_2.png?v=1777313057') },
    { name: 'Coral Springs',   img: swatch('Coral_Springs_1.png?v=1748518015') },
    { name: 'Ellis Island',    img: swatch('EllisIsland.jpg?v=1738573448') },
    { name: 'Idaho Falls',     img: swatch('Idaho_Falls_1.png?v=1748518518') },
    { name: 'Ipanema Beach',   img: swatch('IpanemaBeach_33e848c2-5ab9-40f9-97fd-a09500befe27.jpg?v=1738573334') },
    { name: 'Juneau',          img: swatch('Juneau_2.png?v=1748519907') },
    { name: 'Kaimu Beach',     img: swatch('KaimuBeach_2.png?v=1748520000') },
    { name: 'Key West',        img: swatch('Keywest_1.png?v=1777313121') },
    { name: 'Lake Tahoe',      img: swatch('LakeTahoe.jpg?v=1738573396') },
    { name: 'Manhattan',       img: swatch('Manhattan_4f8d833e-8fde-4f4d-b4de-b5953f6dac18.jpg?v=1738573532') },
    { name: 'Milano Marble',   img: swatch('MilanoMarble_a1935bf6-7774-4c79-91bc-ccf564f9dc07.jpg?v=1738573595') },
    { name: 'Monticello',      img: swatch('Monticello.jpg?v=1738573428') },
    { name: 'Monument Valley', img: swatch('MonumentValley.jpg?v=1738573459') },
    { name: 'Nevada',          img: swatch('Nevada_1.png?v=1748520360') },
    { name: 'Palazzo',         img: swatch('Palazzo_05778205-57a6-48e4-a7be-8d2f030b1311.jpg?v=1738573584') },
    { name: 'Pont du Gard',    img: swatch('PontduGard.jpg?v=1738573351') },
    { name: 'Poseidon',        img: swatch('Poseidon_b4daa220-16bf-4598-9d14-163e0a2eb543.jpg?v=1738573363') },
    { name: 'Rio Grande',      img: swatch('RioGrande.jpg?v=1738573543') },
    { name: 'Rio Medina',      img: swatch('RioMedina.jpg?v=1738573374') },
    { name: 'Santa Monica',    img: swatch('SantaMonica_1.png?v=1748520873') },
    { name: 'Santo Domingo',   img: swatch('Santo_Domingo_1.png?v=1748520933') },
    { name: 'Savannah',        img: swatch('Savannah_1.png?v=1748521006') },
    { name: 'Sistine Chapel',  img: swatch('SistineChapel_eaf07e6b-d55b-4781-ba16-81230b6c438a.jpg?v=1738573500') },
    { name: 'Tennessee',       img: swatch('Tennesse_2.png?v=1777313011') },
    { name: 'The Burj',        img: swatch('TheBurj.jpg?v=1738573418') },
    { name: 'Tuscan',          img: swatch('tuscan_068e2909-4ab4-4fb1-92d0-5b9b4171c91d.png?v=1738573385') },
    { name: 'Versailles',      img: swatch('Versailles.jpg?v=1738573553') },
];
