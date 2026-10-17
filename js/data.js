/* All trip content lives here. Times are local, as printed on the Distant Journeys paperwork. */
const TRIP = {
  title: "Janet & Stuart's Vietnam & Cambodia Adventure",
  departs: "2027-01-20T10:05:00Z",   // SQ301 departs Manchester 10:05 (UK = UTC in January)
  start: "2027-01-20",
  end: "2027-02-11",
  operator: "Distant Journeys",
  tour: "The Very Best of Vietnam & Cambodia"
};

const gmaps = q => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);

/* Stops shown on the map and in the Things to do page */
const STOPS = [
  { id: "hanoi",     n: 1, name: "Hanoi",           country: "Vietnam",  arrive: "21 Jan", depart: "24 Jan", nights: 3, lat: 21.0285, lng: 105.8542, tag: "Capital of Vietnam" },
  { id: "halong",    n: 2, name: "Ha Long & Lan Ha Bay", country: "Vietnam", arrive: "24 Jan", depart: "26 Jan", nights: 2, lat: 20.84, lng: 107.10, tag: "Two nights on the Au Co" },
  { id: "hoian",     n: 3, name: "Hoi An",          country: "Vietnam",  arrive: "26 Jan", depart: "29 Jan", nights: 3, lat: 15.8801, lng: 108.3380, tag: "Lantern-lit ancient town" },
  { id: "hue",       n: 4, name: "Hue",             country: "Vietnam",  arrive: "29 Jan", depart: "31 Jan", nights: 2, lat: 16.4637, lng: 107.5909, tag: "The imperial city" },
  { id: "hcmc",      n: 5, name: "Ho Chi Minh City",country: "Vietnam",  arrive: "31 Jan", depart: "2 Feb",  nights: 2, lat: 10.7769, lng: 106.7009, tag: "Saigon" },
  { id: "mekong",    n: 6, name: "Mekong River",    country: "Vietnam & Cambodia", arrive: "2 Feb", depart: "6 Feb", nights: 4, lat: 10.34, lng: 105.95, tag: "Four nights afloat" },
  { id: "phnompenh", n: 7, name: "Phnom Penh",      country: "Cambodia", arrive: "6 Feb",  depart: "7 Feb",  nights: 1, lat: 11.5564, lng: 104.9282, tag: "Royal capital" },
  { id: "siemreap",  n: 8, name: "Siem Reap",       country: "Cambodia", arrive: "7 Feb",  depart: "10 Feb", nights: 3, lat: 13.3671, lng: 103.8448, tag: "Gateway to Angkor" }
];

const HOTELS = [
  { id: "panpacific", stop: "hanoi", name: "Pan Pacific Hanoi", city: "Hanoi, Vietnam", arrive: "21 Jan 2027", depart: "24 Jan 2027", nights: 3, room: "Tour Room",
    address: "1 Thanh Niên Road, Ba Đình, Hà Nội 100000, Vietnam", phone: "+84 24 3823 8888",
    web: "https://www.panpacific.com/en/hotels-and-resorts/pp-hanoi.html", lat: 21.0467, lng: 105.8383,
    blurb: "Offering views of the West Lake, Truc Bach Lake and Red River, the Pan Pacific is an oasis of calm in a busy city, with contemporary rooms and modern Vietnamese design. Ming Restaurant serves authentic dim sum, Pacifica offers international cuisines, The Pastry Corner has homemade cakes, and The Summit Bar has panoramic city views." },
  { id: "auco", stop: "halong", name: "Au Co", kind: "Cruise", city: "Ha Long Bay & Lan Ha Bay, Vietnam", arrive: "24 Jan 2027", depart: "26 Jan 2027", nights: 2, room: "Tour Room",
    address: "Boards at Ha Long Bay – your Tour Manager will confirm the pick-up point", phone: "",
    web: "https://aucocruises.com/", lat: 20.84, lng: 107.10,
    blurb: "A stylish, first-class vessel sailing both Ha Long Bay and Lan Ha Bay. Your all-inclusive two-night cruise covers all meals, a welcome drink, all land excursions and selected on-board experiences such as Tai Chi on the sun deck and a Vietnamese cooking class." },
  { id: "belmarina", stop: "hoian", name: "Bel Marina Hoi An Resort", city: "Hoi An, Vietnam", arrive: "26 Jan 2027", depart: "29 Jan 2027", nights: 3, room: "Tour Room",
    address: "127 Nguyễn Phúc Tần, Cẩm Phô, Hội An, Quảng Nam, Vietnam", phone: "+84 235 3938 888",
    web: "https://www.belmarinahoian.com/", lat: 15.8767, lng: 108.3427,
    blurb: "In Cam Pho district on the banks of the Thu Bon River, a short stroll from Ha My Beach and the city centre. A blend of European and Asian style, with modern rooms (balconies or patios, parquet floors, air-conditioning), a large pool with swim-up bar, and Vietnamese and international dining." },
  { id: "eldora", stop: "hue", name: "Eldora Hotel", city: "Hue, Vietnam", arrive: "29 Jan 2027", depart: "31 Jan 2027", nights: 2, room: "Tour Room",
    address: "60 Bến Nghé, Phú Hội, Huế, Thành phố Huế, Vietnam", phone: "+84 234 3866 666",
    web: "http://www.eldorahotel.com/", lat: 16.4666, lng: 107.5913,
    blurb: "A boutique hotel in the heart of Hue, a short walk from the Citadel, Trang Tien Bridge and Dong Ba market. A distinctive French atmosphere with Renaissance touches, an indoor pool with sun terrace, the Eldora Restaurant and the Skyline Bar for a nightcap over the city." },
  { id: "liberty", stop: "hcmc", name: "Liberty Central Saigon Riverside Hotel", city: "Ho Chi Minh City, Vietnam", arrive: "31 Jan 2027", depart: "2 Feb 2027", nights: 2, room: "Tour Room",
    address: "17 Tôn Đức Thắng, Bến Nghé, Quận 1, Hồ Chí Minh, Vietnam", phone: "+84 28 3827 1717",
    web: "https://www.libertycentralsaigonriverside.com/en/", lat: 10.7733, lng: 106.7066,
    blurb: "Centrally located with spectacular views of the Saigon River. An infinity pool beside the rooftop Vertical Sky Bar, a spa and fitness centre, Central Restaurant overlooking the waterfront and The Bistro for craft beers and light bites." },
  { id: "mekongnav", stop: "mekong", name: "Mekong Navigator", kind: "Cruise", city: "Mekong River, Vietnam → Cambodia", arrive: "2 Feb 2027", depart: "6 Feb 2027", nights: 4, room: "Signature Suite",
    address: "Embarks at My Tho, Vietnam; disembarks at Phnom Penh, Cambodia", phone: "",
    web: "https://www.distantjourneys.co.uk/ships/mekong-navigator/", lat: 10.36, lng: 106.36,
    blurb: "A teak-styled river vessel customised for the Mekong's flowing waters. Four nights in a comfortable suite with a welcome reception, dinner in the Le Marché Dining Room, and all meals plus selected on-board drinks included, with daily excursions ashore." },
  { id: "palacegate", stop: "phnompenh", name: "Palace Gate Hotel & Resort", city: "Phnom Penh, Cambodia", arrive: "6 Feb 2027", depart: "7 Feb 2027", nights: 1, room: "Tour Room",
    address: "#44 Sothearos Blvd, Chey Chumneas, Daun Penh, Phnom Penh, Cambodia", phone: "+855 23 900 011",
    web: "https://palacegatepp.com/", lat: 11.5640, lng: 104.9290,
    blurb: "In the heart of Phnom Penh beside the Royal Palace, with views of the Tonle Sap River. Built around a lovingly restored French colonial villa, now home to the fine-dining Mealea restaurant (French and Khmer cuisine). Rooms are in traditional Angkorian style, and the pool is a great place to relax." },
  { id: "borei", stop: "siemreap", name: "Borei Angkor Resort & Spa", city: "Siem Reap, Cambodia", arrive: "7 Feb 2027", depart: "10 Feb 2027", nights: 3, room: "Tour Room",
    address: "0369 NR6, Krong Siem Reap 17252, Cambodia", phone: "+855 15 430 222",
    web: "https://www.boreiangkor.com/", lat: 13.3846, lng: 103.8886,
    blurb: "Set in manicured gardens just minutes from Siem Reap's attractions. Spacious rooms with private balconies, classic Cambodian architecture with wood, silks and Khmer crafts, an outdoor pool, Ox Club for contemporary European dishes and all-day dining at Bakan Restaurant." }
];

const AIRPORTS = {
  MAN: { name: "Manchester Airport", city: "Manchester", country: "United Kingdom" },
  SIN: { name: "Singapore Changi Airport", city: "Singapore", country: "Singapore" },
  HAN: { name: "Hanoi Noi Bai International Airport", city: "Hanoi", country: "Vietnam" },
  REP: { name: "Siem Reap Angkor International Airport", city: "Siem Reap", country: "Cambodia" }
};

const FLIGHTS = [
  { n: 1, no: "SQ301", num: "301", leg: "Outbound", from: "MAN", to: "SIN", checkin: "07:05", dep: "20 Jan 2027", depT: "10:05", arr: "21 Jan 2027", arrT: "07:15", dur: "13h 10m", cls: "Economy", note: "Overnight flight – arrives the next morning, 8 hours ahead of the UK." },
  { n: 2, no: "SQ192", num: "192", leg: "Connection", from: "SIN", to: "HAN", checkin: "06:05", dep: "21 Jan 2027", depT: "09:05", arr: "21 Jan 2027", arrT: "11:30", dur: "3h 25m", cls: "Economy", note: "Transit in Singapore is under 2 hours – a tight connection, so head straight to the departure gate. Your Tour Manager meets you in Hanoi." },
  { n: 3, no: "SQ165", num: "165", leg: "Return", from: "REP", to: "SIN", checkin: "13:45", dep: "10 Feb 2027", depT: "16:45", arr: "10 Feb 2027", arrT: "20:10", dur: "2h 25m", cls: "Economy", note: "Followed by a 6-hour layover in Singapore – Changi has showers, a rooftop pool, gardens and a free movie theatre." },
  { n: 4, no: "SQ302", num: "302", leg: "Return", from: "SIN", to: "MAN", checkin: "23:10", dep: "11 Feb 2027", depT: "02:10", arr: "11 Feb 2027", arrT: "08:35", dur: "14h 25m", cls: "Economy", note: "Overnight flight home, landing in Manchester on the morning of day 23." }
];

const INTERNAL_FLIGHTS = [
  { when: "26 Jan", route: "Hanoi → Da Nang", note: "Then coach to Hoi An." },
  { when: "31 Jan", route: "Hue (Phu Bai) → Ho Chi Minh City", note: "Morning flight after breakfast." },
  { when: "7 Feb",  route: "Phnom Penh → Siem Reap", note: "Early flight after breakfast." }
];

const DAYS = [
  { d: 1,  date: "Wed 20 Jan", stop: "Departure", title: "Depart the UK", text: "Fly with Singapore Airlines from Manchester (SQ301) on the overnight flight to Singapore.", meals: "In-flight meals" },
  { d: 2,  date: "Thu 21 Jan", stop: "Hanoi", title: "Arrive in Hanoi", text: "Connect in Singapore to Hanoi (SQ192). Transfer to the Pan Pacific. Early evening welcome drink with your Tour Manager and fellow travellers.", meals: "In-flight meals and drinks" },
  { d: 3,  date: "Fri 22 Jan", stop: "Hanoi", title: "Hanoi city tour", text: "Ethnology Museum, Ho Chi Minh Mausoleum, One Pillar Pagoda, the Temple of Literature and a cyclo ride through the Old Quarter. Evening water puppet show.", meals: "Breakfast, lunch" },
  { d: 4,  date: "Sat 23 Jan", stop: "Hanoi", title: "Hanoi freedom day", text: "A day at your own pace – or join a cookery class, or the optional Ha Long Bay on Land excursion to Ninh Binh.", meals: "Breakfast" },
  { d: 5,  date: "Sun 24 Jan", stop: "Ha Long Bay", title: "Ha Long Bay – board the Au Co", text: "Drive to Ha Long Bay and board the Au Co for a two-night cruise among limestone islands. Sunset on deck.", meals: "Breakfast, lunch, dinner" },
  { d: 6,  date: "Mon 25 Jan", stop: "Ha Long Bay", title: "Lan Ha & Ha Long Bays", text: "Tai Chi on the sun deck, cruise through Lan Ha Bay, kayak or cycle to Viet Hai village and explore Cat Ba National Park.", meals: "Breakfast, lunch, dinner" },
  { d: 7,  date: "Tue 26 Jan", stop: "Hoi An", title: "Ha Long Bay → Hoi An", text: "Sung Sot (Surprise) Cave, then back to Hanoi and a flight to Da Nang. Drive over to the Bel Marina Hoi An Resort.", meals: "Breakfast" },
  { d: 8,  date: "Wed 27 Jan", stop: "Hoi An", title: "Walking tour of Hoi An", text: "UNESCO Old Town: Chua Ong Pagoda, Phuc Kien Assembly Hall, Tan Ky House and the Japanese Bridge.", meals: "Breakfast, lunch" },
  { d: 9,  date: "Thu 28 Jan", stop: "Hoi An", title: "Hoi An freedom day", text: "Relax by the pool, or go further – optional lantern making, a cookery class, or the ruins of My Son (recommended).", meals: "Breakfast" },
  { d: 10, date: "Fri 29 Jan", stop: "Hue", title: "Over the Hai Van Pass to Hue", text: "A spectacular coastal drive over the Hai Van Pass, with a visit to the Thien Mu Pagoda and a cruise back along the Perfume River.", meals: "Breakfast, lunch" },
  { d: 11, date: "Sat 30 Jan", stop: "Hue", title: "Hue's Imperial Citadel", text: "The Citadel, modelled on Beijing's Forbidden City, then the former residence of Princess Ngoc Son. Afternoon free – paper-flower making at Thanh Tien village is recommended.", meals: "Breakfast, lunch" },
  { d: 12, date: "Sun 31 Jan", stop: "Ho Chi Minh City", title: "Fly to Ho Chi Minh City", text: "Flight south. See the Central Post Office, Saigon Opera House and Dong Khoi Street, then check in to the Liberty Central Saigon Riverside.", meals: "Breakfast" },
  { d: 13, date: "Mon 1 Feb", stop: "Ho Chi Minh City", title: "Cu Chi Tunnels & Saigon", text: "The Cu Chi Tunnels in the morning; after lunch the War Remnants Museum and the Reunification Palace.", meals: "Breakfast, lunch" },
  { d: 14, date: "Tue 2 Feb", stop: "Mekong River", title: "Board the Mekong Navigator", text: "Travel to My Tho and board the Mekong Navigator. Welcome reception, meet the crew, and dinner in Le Marché.", meals: "Breakfast, lunch, dinner + drinks" },
  { d: 15, date: "Wed 3 Feb", stop: "Mekong River", title: "Cai Be & Sa Dec", text: "Sampans through the Mekong Delta canals, a traditional farming village and the old town of Sa Dec – home of the novel 'The Lover'.", meals: "Breakfast, lunch, dinner + drinks" },
  { d: 16, date: "Thu 4 Feb", stop: "Mekong River", title: "My An Hung & Gieng Island", text: "Cottage industries, a mango farm, boat-building yard and a village by motorised rickshaw on Cu Lao Gieng island.", meals: "Breakfast, lunch, dinner + drinks" },
  { d: 17, date: "Fri 5 Feb", stop: "Mekong River", title: "Sailing to the border", text: "A relaxing day on the sundeck as the river widens, with cooking demonstrations and talks on board, then immigration formalities at the Vietnam/Cambodia border.", meals: "Breakfast, lunch, dinner + drinks" },
  { d: 18, date: "Sat 6 Feb", stop: "Phnom Penh", title: "Phnom Penh", text: "Disembark in Phnom Penh. Visit the Royal Palace and Silver Pagoda, and reflect at Tuol Sleng and the Killing Fields of Choeung Ek. Overnight at the Palace Gate. (Tết – Lunar New Year's Day.)", meals: "Breakfast, lunch" },
  { d: 19, date: "Sun 7 Feb", stop: "Siem Reap", title: "Fly to Siem Reap", text: "Fly to Siem Reap, then an evening to settle in at the Borei Angkor Resort & Spa.", meals: "Breakfast" },
  { d: 20, date: "Mon 8 Feb", stop: "Siem Reap", title: "Angkor Wat & Ta Prohm", text: "Angkor Wat, Angkor Thom's Bayon and its smiling faces, the Terrace of the Elephants and the jungle-wrapped Ta Prohm.", meals: "Breakfast" },
  { d: 21, date: "Tue 9 Feb", stop: "Siem Reap", title: "Siem Reap freedom day", text: "Your day: sunrise at Angkor Wat (optional), a village visit, the Phare circus or simply the pool.", meals: "Breakfast" },
  { d: 22, date: "Wed 10 Feb", stop: "Departure", title: "Depart Siem Reap", text: "Last-minute souvenir shopping before the flight via Singapore (SQ165, then SQ302 after a 6-hour layover).", meals: "Breakfast, in-flight meals" },
  { d: 23, date: "Thu 11 Feb", stop: "Home", title: "Arrive in the UK", text: "Land in Manchester at 08:35 after 23 amazing days.", meals: "In-flight meals" }
];

/* Things to do. 'inc' = included in the tour (from the brochure), 'rec' = brochure recommendation (optional), 'free' = ideas for free time */
const THINGS = {
  hanoi: { intro: "Vietnam's capital is an immediate assault on the senses – scooters, street food, French colonial boulevards and lakes. Three nights, with a guided day and a free day.",
    items: [
      { t: "inc", name: "Ethnology Museum", text: "A unique insight into the 54 ethnic groups of Vietnam.", q: "Vietnam Museum of Ethnology Hanoi" },
      { t: "inc", name: "Ho Chi Minh Mausoleum & One Pillar Pagoda", text: "The final resting place of 'Uncle Ho', and the 11th-century pagoda built on a single pillar.", q: "Ho Chi Minh Mausoleum Hanoi" },
      { t: "inc", name: "Temple of Literature", text: "Vietnam's first university, founded in 1070 – one of the most atmospheric spots in the city.", q: "Temple of Literature Hanoi" },
      { t: "inc", name: "Old Quarter cyclo ride", text: "Cruise the 36 guild streets in a cyclo, each historically named after the trade sold there.", q: "Hanoi Old Quarter" },
      { t: "inc", name: "Water puppet show", text: "A centuries-old Vietnamese art form performed on water.", q: "Thang Long Water Puppet Theatre Hanoi" },
      { t: "rec", name: "Cookery class", text: "Learn the fundamentals of Vietnamese cuisine in a hands-on class.", q: "Vietnamese cooking class Hanoi" },
      { t: "rec", name: "Ha Long Bay on Land (Ninh Binh)", text: "Optional day trip to Trang An and Tam Coc – limestone karsts and rice paddies.", q: "Trang An Ninh Binh" },
      { t: "free", name: "Hoan Kiem Lake & Ngoc Son Temple", text: "A stroll around the lake at dawn is when Hanoi comes alive – tai chi, badminton and joggers.", q: "Hoan Kiem Lake Hanoi" },
      { t: "free", name: "Egg coffee at Cafe Giang", text: "Hanoi's signature rich, creamy egg coffee – invented here in the 1940s.", q: "Cafe Giang egg coffee Hanoi" },
      { t: "free", name: "Bún chả Hương Liên", text: "Grilled pork with noodles – the lunch that Obama and Bourdain shared.", q: "Bun Cha Huong Lien Hanoi" },
      { t: "free", name: "Hoa Lo Prison Museum", text: "The 'Hanoi Hilton' – a sobering and fascinating look at colonial and wartime history.", q: "Hoa Lo Prison Hanoi" },
      { t: "free", name: "Tran Quoc Pagoda", text: "Vietnam's oldest Buddhist temple, on an islet in West Lake, close to your hotel.", q: "Tran Quoc Pagoda Hanoi" }
    ] },
  halong: { intro: "Two nights aboard the Au Co among thousands of emerald limestone islands – a UNESCO World Heritage site and the quieter, wilder Lan Ha Bay.",
    items: [
      { t: "inc", name: "Cruise Ha Long Bay", text: "Sail among the limestone karsts on your first-class cruiser; sunset on deck.", q: "Ha Long Bay" },
      { t: "inc", name: "Tai Chi on the sun deck", text: "Start the day with a gentle lesson at sunrise.", q: "Ha Long Bay sunrise" },
      { t: "inc", name: "Lan Ha Bay & Cat Ba National Park", text: "Kayaking, cycling to Viet Hai village and a trek through the national park.", q: "Cat Ba National Park" },
      { t: "inc", name: "Cooking class on board", text: "Learn to make fresh spring rolls and Vietnamese dishes.", q: "Lan Ha Bay" },
      { t: "inc", name: "Sung Sot (Surprise) Cave", text: "The largest cave in Ha Long Bay, a hall of stalactites and stalagmites – on your last morning.", q: "Sung Sot Cave Ha Long" },
      { t: "free", name: "Titov Island viewpoint", text: "A short climb rewards you with the classic panorama of the bay.", q: "Titov Island Ha Long Bay" }
    ] },
  hoian: { intro: "A beautifully preserved trading port with lantern-lit streets, tailors, riverside cafes and beaches nearby. Three nights with a walking tour and a free day.",
    items: [
      { t: "inc", name: "Walking tour of the Old Town", text: "UNESCO-listed: Chua Ong Pagoda, Phuc Kien Assembly Hall, Tan Ky House and the Japanese Covered Bridge.", q: "Hoi An Ancient Town" },
      { t: "inc", name: "Japanese Covered Bridge", text: "The 17th-century bridge and emblem of the town.", q: "Japanese Covered Bridge Hoi An" },
      { t: "rec", name: "My Son temples", text: "The Cham-kingdom ruins in the jungle – best early in the morning.", q: "My Son Sanctuary" },
      { t: "rec", name: "Lantern making", text: "Make your own silk lantern in an optional workshop.", q: "lantern making class Hoi An" },
      { t: "free", name: "Bánh mì Phượng", text: "The sandwich Anthony Bourdain called 'a symphony in a sandwich'.", q: "Banh Mi Phuong Hoi An" },
      { t: "free", name: "Cao lầu & white rose dumplings", text: "Two Hoi An specialities you won't find anywhere else – try cao lầu noodles by the market.", q: "Cao Lau Hoi An" },
      { t: "free", name: "An Bang Beach", text: "A relaxed beach 15 minutes from town, with seafood shacks and sunset cocktails.", q: "An Bang Beach Hoi An" },
      { t: "free", name: "Tailor-made clothes", text: "Hoi An is famous for tailors – allow 24–48 hours for fittings, so go on day 1.", q: "tailor Hoi An" },
      { t: "free", name: "Cam Thanh coconut village", text: "Ride a round basket boat through the water-coconut palms.", q: "Cam Thanh Coconut Village" },
      { t: "free", name: "Night market & lantern boats", text: "In the evening, the riverfront glows with lanterns – take a candle boat on the Thu Bon.", q: "Hoi An Night Market" }
    ] },
  hue: { intro: "The old imperial capital of Vietnam, on the Perfume River, famed for its Citadel, royal tombs and refined cuisine.",
    items: [
      { t: "inc", name: "Hai Van Pass", text: "A spectacular drive over the 'Pass of the Ocean Clouds' on the way from Hoi An.", q: "Hai Van Pass" },
      { t: "inc", name: "Thien Mu Pagoda & Perfume River", text: "The seven-storey pagoda, then a boat back along the river.", q: "Thien Mu Pagoda Hue" },
      { t: "inc", name: "Imperial Citadel", text: "UNESCO World Heritage Site modelled on the Forbidden City in Beijing.", q: "Imperial City Hue" },
      { t: "inc", name: "Princess Ngoc Son's residence", text: "The dazzling former home of the princess.", q: "Hue Princess Ngoc Son residence" },
      { t: "rec", name: "Thanh Tien paper-flower village", text: "Learn the 300-year-old craft of paper flower making.", q: "Thanh Tien Paper Flower Village" },
      { t: "free", name: "Dong Ba Market", text: "Hue's biggest market – conical hats, sweets and Hue specialities.", q: "Dong Ba Market Hue" },
      { t: "free", name: "Bún bò Huế", text: "The spicy beef noodle soup that put Hue on the foodie map.", q: "bun bo Hue" },
      { t: "free", name: "Tomb of Khai Dinh", text: "The most ornate of the royal tombs – a mosaic of porcelain and glass.", q: "Khai Dinh Tomb Hue" },
      { t: "free", name: "Trang Tien Bridge by night", text: "The Eiffel-designed bridge lights up in changing colours; it's a short walk from the Eldora.", q: "Trang Tien Bridge Hue" }
    ] },
  hcmc: { intro: "Saigon is fast, modern and endlessly energetic, with a heart of French colonial grandeur. Two nights, just before Lunar New Year.",
    items: [
      { t: "inc", name: "Central Post Office", text: "A perfectly preserved French colonial building designed by Gustave Eiffel.", q: "Saigon Central Post Office" },
      { t: "inc", name: "Dong Khoi Street & Saigon Opera House", text: "A stroll down the old Rue Catinat to the delicately featured Opera House.", q: "Saigon Opera House" },
      { t: "inc", name: "Cu Chi Tunnels", text: "A vast 250 km underground network used by the Viet Cong.", q: "Cu Chi Tunnels" },
      { t: "inc", name: "War Remnants Museum", text: "Thought-provoking insight into the war in Vietnam and its human impact.", q: "War Remnants Museum Ho Chi Minh City" },
      { t: "inc", name: "Reunification Palace", text: "Former stronghold of the South Vietnamese government.", q: "Reunification Palace Ho Chi Minh City" },
      { t: "free", name: "Tết flower street – Nguyen Hue", text: "In the days before Tết the main walking street turns into a giant flower display (usually opens late January) – lovely at night.", q: "Nguyen Hue Walking Street" },
      { t: "free", name: "Notre-Dame Cathedral Basilica", text: "A red-brick cathedral next to the Post Office.", q: "Notre-Dame Cathedral Basilica of Saigon" },
      { t: "free", name: "Ben Thanh Market", text: "The bustling old market for souvenirs, coffee and snacks (expect it to be busy before Tết).", q: "Ben Thanh Market" },
      { t: "free", name: "Rooftop views", text: "Cocktails at the Vertical Sky Bar on the roof of your hotel overlooking the Saigon River.", q: "Liberty Central Saigon Riverside Hotel" },
      { t: "free", name: "Phở & cà phê sữa đá", text: "Start the day like a local with a bowl of phở and iced condensed-milk coffee.", q: "Pho Hoa Pasteur Ho Chi Minh City" }
    ] },
  mekong: { intro: "Four nights on the Mekong Navigator, gliding from the Mekong Delta in Vietnam into Cambodia, with daily excursions ashore. All meals and selected drinks are included on board.",
    items: [
      { t: "inc", name: "Embark at My Tho", text: "Welcome reception, meet the crew, dinner in Le Marché.", q: "My Tho Vietnam" },
      { t: "inc", name: "Cai Be floating market & sampans", text: "Explore the canals by wooden sampan and meet local villagers.", q: "Cai Be floating market" },
      { t: "inc", name: "Sa Dec", text: "Home of the Huynh Thuy Le house, inspiration for the novel 'The Lover' – and a flower-growing town.", q: "Huynh Thuy Le House Sa Dec" },
      { t: "inc", name: "My An Hung & Cu Lao Gieng", text: "Rice noodle and handicraft villages, a mango farm and a boat-building yard by rickshaw.", q: "Cu Lao Gieng island" },
      { t: "inc", name: "Life on board", text: "Cooking demos, spring-roll classes, sundeck talks and traditional Cambodian clothing day.", q: "Mekong Navigator cruise" },
      { t: "inc", name: "Border crossing", text: "Immigration formalities are handled for you as you pass from Vietnam into Cambodia.", q: "Vinh Xuong Kaam Samnor border" },
      { t: "free", name: "Sundeck sunsets", text: "Bring binoculars – you'll pass fishing boats, floating farms and temples along the banks.", q: "Mekong River" }
    ] },
  phnompenh: { intro: "Cambodia's riverside capital, a mix of grand French architecture, glittering Khmer palaces and powerful, moving history.",
    items: [
      { t: "inc", name: "Royal Palace & Silver Pagoda", text: "The official residence of Cambodia's King Norodom Sihamoni, with the Silver Pagoda's floor of 5,000 silver tiles and a diamond-encrusted Buddha.", q: "Royal Palace Phnom Penh" },
      { t: "inc", name: "Tuol Sleng Genocide Museum (S-21)", text: "The former high school turned prison under the Khmer Rouge – a sombre but important visit.", q: "Tuol Sleng Genocide Museum" },
      { t: "inc", name: "Killing Fields of Choeung Ek", text: "A memorial and tribute to the 17,000 who were killed here.", q: "Choeung Ek Genocidal Center" },
      { t: "free", name: "Riverside promenade", text: "Walk the Sisowath Quay at dusk – cafes and the Royal Palace lit up.", q: "Sisowath Quay Phnom Penh" },
      { t: "free", name: "Central Market (Psar Thmei)", text: "An Art Deco domed market – silver, silks and street food.", q: "Central Market Phnom Penh" },
      { t: "free", name: "Wat Phnom", text: "The hilltop temple which gave the city its name.", q: "Wat Phnom" },
      { t: "free", name: "Dinner at Mealea", text: "Fine French and Khmer cuisine in the restored colonial villa at your hotel.", q: "Mealea Restaurant Palace Gate Phnom Penh" }
    ] },
  siemreap: { intro: "The gateway to the temples of Angkor – the largest religious monument in the world. Three nights, one fully guided day, one free day.",
    items: [
      { t: "inc", name: "Angkor Wat", text: "Cambodia's national symbol and the world's largest religious monument; its five towers feature on the national flag.", q: "Angkor Wat" },
      { t: "inc", name: "Angkor Thom & the Bayon", text: "The walled enclosure of the last great Khmer capital with 54 towers bearing serene smiling faces.", q: "Bayon Temple" },
      { t: "inc", name: "Terrace of the Elephants & Leper King", text: "Carved terraces along the royal parade ground.", q: "Terrace of the Elephants" },
      { t: "inc", name: "Ta Prohm", text: "The 'Tomb Raider' temple, wrapped in the roots of giant trees.", q: "Ta Prohm" },
      { t: "rec", name: "Visit a local village", text: "Spend time with the community and try your hand at traditional crafts.", q: "Siem Reap village visit" },
      { t: "rec", name: "Sunrise at Angkor Wat", text: "Optional. Get up around 5am for the classic reflection shot (extra cost).", q: "Angkor Wat sunrise" },
      { t: "rec", name: "Phare, the Cambodian Circus", text: "An uplifting evening show supporting arts education for young Cambodians.", q: "Phare The Cambodian Circus Siem Reap" },
      { t: "free", name: "Pub Street & Old Market", text: "Souvenirs, silk, cocktails and Khmer food. Try fish amok – steamed fish curry in banana leaf.", q: "Pub Street Siem Reap" },
      { t: "free", name: "Banteay Srei", text: "The 'Citadel of Women', carved in delicate pink sandstone, about 30 minutes north of town.", q: "Banteay Srei" },
      { t: "free", name: "Apsara dance dinner", text: "Classical Khmer dance with a buffet or set menu – a popular evening out.", q: "Apsara dance dinner Siem Reap" }
    ] }
};

/* Local phrases. 'sp' is what gets spoken (native script gives the best voice quality). */
const PHRASES = {
  vi: { name: "Vietnamese", native: "Tiếng Việt", lang: "vi-VN", intro: "Vietnamese is tonal – a rising or falling voice changes the meaning. Don't worry: a smile and a try goes a long way. Northern (Hanoi) and southern (Saigon) accents differ a little.",
    cats: ["Essentials", "Getting around", "Eating & drinking", "Shopping", "Help"],
    list: [
      { c: 0, en: "Hello", loc: "Xin chào", pr: "sin chow" },
      { c: 0, en: "Good morning", loc: "Chào buổi sáng", pr: "chow bwoy sang" },
      { c: 0, en: "Goodbye", loc: "Tạm biệt", pr: "tahm byet" },
      { c: 0, en: "Thank you", loc: "Cảm ơn", pr: "gahm uhn" },
      { c: 0, en: "Thank you very much", loc: "Cảm ơn rất nhiều", pr: "gahm uhn ruht nyew" },
      { c: 0, en: "Yes (polite)", loc: "Vâng", pr: "vuhng (south: yah)" },
      { c: 0, en: "No", loc: "Không", pr: "khohm" },
      { c: 0, en: "Excuse me / Sorry", loc: "Xin lỗi", pr: "sin loy" },
      { c: 0, en: "My name is …", loc: "Tên tôi là", pr: "ten toy lah" },
      { c: 0, en: "Nice to meet you", loc: "Rất vui được gặp bạn", pr: "ruht vooy duhk gap ban" },
      { c: 0, en: "I don't understand", loc: "Tôi không hiểu", pr: "toy khohm hyew" },
      { c: 0, en: "Do you speak English?", loc: "Bạn nói tiếng Anh không?", pr: "ban noy tyeng ang khohm" },
      { c: 1, en: "Where is the toilet?", loc: "Nhà vệ sinh ở đâu?", pr: "nyah veh sin uh dow" },
      { c: 1, en: "Turn left", loc: "Rẽ trái", pr: "reh chai" },
      { c: 1, en: "Turn right", loc: "Rẽ phải", pr: "reh fai" },
      { c: 1, en: "Go straight", loc: "Đi thẳng", pr: "dee tang" },
      { c: 1, en: "Hotel", loc: "Khách sạn", pr: "khach sahn" },
      { c: 1, en: "Airport", loc: "Sân bay", pr: "suhn bai" },
      { c: 2, en: "Delicious!", loc: "Ngon quá!", pr: "ngon gwah" },
      { c: 2, en: "Cheers!", loc: "Một, hai, ba, dô!", pr: "moht, hai, bah, yoh" },
      { c: 2, en: "Water", loc: "Nước", pr: "nuhk" },
      { c: 2, en: "Coffee", loc: "Cà phê", pr: "kah feh" },
      { c: 2, en: "I'm vegetarian", loc: "Tôi ăn chay", pr: "toy an chai" },
      { c: 2, en: "Not spicy, please", loc: "Không cay", pr: "khohm kai" },
      { c: 2, en: "The bill, please", loc: "Tính tiền", pr: "tin tyen" },
      { c: 3, en: "How much is it?", loc: "Cái này bao nhiêu tiền?", pr: "kai nay bow nyew tyen" },
      { c: 3, en: "Too expensive", loc: "Đắt quá", pr: "dat gwah" },
      { c: 3, en: "Can you reduce the price?", loc: "Bớt được không?", pr: "but duhk khohm" },
      { c: 3, en: "Beautiful", loc: "Đẹp quá", pr: "dep gwah" },
      { c: 3, en: "Happy New Year (Tết)", loc: "Chúc mừng năm mới", pr: "chook moong nam moy" },
      { c: 4, en: "Help!", loc: "Cứu tôi với!", pr: "kyoo toy vuhy" },
      { c: 4, en: "I need a doctor", loc: "Tôi cần bác sĩ", pr: "toy kuhn bahk see" },
      { c: 4, en: "Hospital", loc: "Bệnh viện", pr: "ben vyen" },
      { c: 4, en: "Police", loc: "Công an", pr: "kohng ahn" }
    ] },
  km: { name: "Khmer", native: "ភាសាខ្មែរ", lang: "km-KH", intro: "Khmer is the language of Cambodia. Men end polite sentences with 'baat', women with 'chaas'. The Khmer greeting 'Sua sdei' is often accompanied by a 'sampeah' – palms pressed together, raised to the chest, with a slight bow. Janet and Stuart's polite 'yes' differ – Stuart: baat, Janet: chaas.",
    cats: ["Essentials", "Getting around", "Eating & drinking", "Shopping", "Help"],
    list: [
      { c: 0, en: "Hello", loc: "សួស្តី", pr: "suo-sdei" },
      { c: 0, en: "Good morning", loc: "អរុណសួស្តី", pr: "a-run suo-sdei" },
      { c: 0, en: "How are you?", loc: "សុខសប្បាយទេ?", pr: "sok sa-baay te" },
      { c: 0, en: "Goodbye", loc: "លាហើយ", pr: "lia haeuy" },
      { c: 0, en: "Thank you", loc: "អរគុណ", pr: "aw-kun" },
      { c: 0, en: "Thank you very much", loc: "អរគុណច្រើន", pr: "aw-kun chraeun" },
      { c: 0, en: "Yes (said by a man)", loc: "បាទ", pr: "baat" },
      { c: 0, en: "Yes (said by a woman)", loc: "ចាស", pr: "chaas" },
      { c: 0, en: "No", loc: "ទេ", pr: "te" },
      { c: 0, en: "Excuse me / Sorry", loc: "សុំទោស", pr: "som toh" },
      { c: 0, en: "Please", loc: "សូម", pr: "som" },
      { c: 0, en: "My name is …", loc: "ខ្ញុំឈ្មោះ", pr: "k'nyom ch'moo-ah" },
      { c: 0, en: "I don't understand", loc: "ខ្ញុំមិនយល់ទេ", pr: "k'nyom min yul te" },
      { c: 0, en: "Do you speak English?", loc: "អ្នកចេះនិយាយភាសាអង់គ្លេសទេ?", pr: "neak chess ni-yeay pia-sa ang-kles te" },
      { c: 1, en: "Where is the toilet?", loc: "បង្គន់នៅឯណា?", pr: "bong-kon nov ae na" },
      { c: 1, en: "Turn left", loc: "ឆ្វេង", pr: "chveng" },
      { c: 1, en: "Turn right", loc: "ស្តាំ", pr: "sdam" },
      { c: 1, en: "Straight ahead", loc: "ត្រង់", pr: "trong" },
      { c: 2, en: "Delicious!", loc: "ឆ្ងាញ់", pr: "ch'ngainh" },
      { c: 2, en: "Cheers!", loc: "ជយោ", pr: "chai-yo" },
      { c: 2, en: "Water", loc: "ទឹក", pr: "teuk" },
      { c: 2, en: "The bill, please", loc: "គិតលុយ", pr: "kit luy" },
      { c: 3, en: "How much is it?", loc: "ថ្លៃប៉ុន្មាន?", pr: "t'lai pon-maan" },
      { c: 3, en: "Too expensive", loc: "ថ្លៃពេក", pr: "t'lai peak" },
      { c: 3, en: "Beautiful", loc: "ស្អាត", pr: "sa-at" },
      { c: 3, en: "One, two, three, four, five", loc: "មួយ ពីរ បី បួន ប្រាំ", pr: "muoy, pi, bei, buon, pram" },
      { c: 4, en: "Help!", loc: "ជួយផង!", pr: "chuoy phong" }
    ] }
};

/* Practical notes shown on the Overview page */
const GOOD_TO_KNOW = [
  { h: "Time difference", p: "Vietnam and Cambodia are 7 hours ahead of the UK in January (Singapore is 8 ahead)." },
  { h: "Money", p: "Vietnamese đồng (VND) and Cambodian riel (KHR). In Cambodia US dollars are widely used for most things, with riel as change. Carry some small notes for tips and markets." },
  { h: "Weather in January/February", p: "Hanoi & Ha Long: cool and misty, around 12–20°C – bring a light jacket. Hoi An & Hue: mild and can be showery (15–24°C). Saigon, Mekong & Cambodia: hot and dry, around 30–34°C." },
  { h: "Tết – Lunar New Year (6 Feb)", p: "Vietnam's biggest holiday falls on Saturday 6 February 2027, the day you reach Phnom Penh. Expect flower markets and festive decorations in Ho Chi Minh City, and some shops and restaurants closed over the Tết break." },
  { h: "Passports & visas", p: "Check the latest entry rules for both Vietnam and Cambodia at GOV.UK foreign travel advice before you travel; Distant Journeys will also send guidance. Passports need at least 6 months' validity." },
  { h: "Plugs & health", p: "Sockets are mainly two-pin (Type A/C) – bring a universal adaptor. Drink bottled water, and check with your GP or travel clinic about vaccinations well before departure." }
];
