(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ICONS = {
    overview: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    stay: '<path d="M3 20V8l9-5 9 5v12"/><path d="M9 20v-6h6v6M3 20h18"/>',
    flights: '<path d="M2 14l20-8-5 14-4-6-6-1z"/><path d="m13 14 4-8"/>',
    do: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    phrases: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    pin: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    speaker: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
    radar: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 12l6-6"/>'
  };
  const icon = (n, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]}</svg>`;

  const PAGES = [
    { id: "overview", label: "Overview", short: "Home" },
    { id: "map", label: "Map & Route", short: "Map" },
    { id: "stay", label: "Accommodation", short: "Stay" },
    { id: "flights", label: "Flights", short: "Flights" },
    { id: "do", label: "Things to do", short: "Explore" },
    { id: "phrases", label: "Phrases", short: "Phrases" }
  ];

  const stopById = id => STOPS.find(s => s.id === id);
  const hotelsFor = id => HOTELS.filter(h => h.stop === id);

  /* ---------- navigation ---------- */
  $("#tabs").innerHTML = PAGES.map(p => `<a href="#${p.id}" data-nav="${p.id}">${p.label}</a>`).join("");
  $("#bottom-nav").innerHTML = PAGES.map(p => `<a href="#${p.id}" data-nav="${p.id}">${icon(p.id)}<span>${p.short}</span></a>`).join("");

  const built = {};
  function route() {
    const [pageId, sub] = (location.hash.replace("#", "") || "overview").split("/");
    const id = PAGES.some(p => p.id === pageId) ? pageId : "overview";
    $$(".page").forEach(s => (s.hidden = s.dataset.page !== id));
    $$("[data-nav]").forEach(a => { if (a.dataset.nav === id) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    if (!built[id]) { builders[id](); built[id] = true; }
    if (id === "map") { initMap(); setTimeout(() => { map.invalidateSize(); if (sub) focusStop(sub); else if (!map._framed) { showRegion(true); map._framed = true; } }, 60); }
    if (id === "do" && sub) setTimeout(() => { const el = $("#do-" + sub); el && el.scrollIntoView({ behavior: "smooth" }); }, 60);
    else window.scrollTo({ top: 0 });
    const names = Object.fromEntries(PAGES.map(p => [p.id, p.label]));
    document.title = (id === "overview" ? "" : names[id] + " · ") + "Vietnam & Cambodia 2027";
  }

  /* ---------- overview ---------- */
  function buildOverview() {
    const el = $("#page-overview");
    el.innerHTML = `
      <div class="hero">
        <p class="eyebrow">${esc(TRIP.tour)}</p>
        <h1>${esc(TRIP.title)}</h1>
        <p>Twenty-three days from the lanterns of Hoi An and the limestone seascapes of Ha Long Bay to the Mekong and the temples of Angkor Wat – 20 January to 11 February 2027.</p>
        <div id="countdown"></div>
      </div>
      <div class="facts">
        <div class="card fact"><b>23</b><span>days</span></div>
        <div class="card fact"><b>2</b><span>countries</span></div>
        <div class="card fact"><b>8</b><span>places to stay</span></div>
        <div class="card fact"><b>2</b><span>cruises</span></div>
        <div class="card fact"><b>4</b><span>Singapore Airlines flights</span></div>
      </div>
      <ol class="route">
        ${STOPS.map(s => `<li><a href="#map/${s.id}"><em>${s.nights} night${s.nights > 1 ? "s" : ""}</em><strong>${esc(s.name)}</strong><small>${s.arrive} – ${s.depart}</small></a></li>`).join("")}
      </ol>

      <div class="section-title"><h2>Day by day</h2><span class="lede" style="margin:0">As described in the brochure – the Tour Manager may tweak the order on the day.</span></div>
      <ol class="timeline" id="timeline">
        ${DAYS.map(d => `
          <li class="day card" data-day="${d.d}" data-date="${dayISO(d.d)}">
            <div class="day-top"><span class="day-n">Day ${d.d}</span><span class="day-date">${d.date}</span><span class="pill day-stop ${/Mekong|Ha Long/.test(d.stop) ? "jade" : /Phnom|Siem/.test(d.stop) ? "red" : ""}">${d.stop}</span></div>
            <h3>${esc(d.title)}</h3>
            <p>${esc(d.text)}</p>
            <span class="meals">${esc(d.meals)}</span>
          </li>`).join("")}
      </ol>

      <div class="ornament" aria-hidden="true"></div>
      <div class="section-title"><h2>Good to know</h2></div>
      <div class="grid">${GOOD_TO_KNOW.map(g => `<div class="card know"><h3>${esc(g.h)}</h3><p>${esc(g.p)}</p></div>`).join("")}</div>`;
    tickCountdown();
    setInterval(tickCountdown, 1000 * 30);
  }
  function dayISO(n) { const d = new Date(Date.UTC(2027, 0, 20 + n - 1)); return d.toISOString().slice(0, 10); }
  function tickCountdown() {
    const box = $("#countdown"); if (!box) return;
    const now = new Date(), t0 = new Date(TRIP.departs), t1 = new Date("2027-02-11T09:00:00Z");
    const diff = t0 - now;
    if (diff > 0) {
      const d = Math.floor(diff / 864e5), h = Math.floor(diff % 864e5 / 36e5), m = Math.floor(diff % 36e5 / 6e4);
      box.innerHTML = `<div class="countdown"><div><b>${d}</b><span>days</span></div><div><b>${h}</b><span>hours</span></div><div><b>${m}</b><span>mins</span></div></div>`;
    } else if (now < t1) {
      box.innerHTML = `<p class="countdown-msg">Bon voyage – you're on your way! ✈</p>`;
    } else box.innerHTML = `<p class="countdown-msg">Welcome home – what a trip.</p>`;
    const today = now.toISOString().slice(0, 10);
    $$(".day").forEach(d => d.classList.toggle("today", d.dataset.date === today));
  }

  /* ---------- map ---------- */
  let map = null;
  const markers = {};
  const ll = (a, b) => [a, b];
  function initMap() {
    if (map) return;
    if (typeof L === "undefined") { $("#map").innerHTML = '<p style="padding:24px">The map needs an internet connection to load.</p>'; map = { invalidateSize() {}, flyTo() {} }; return; }
    map = L.map("map", { scrollWheelZoom: false, zoomControl: true, worldCopyJump: false });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    map.on("focus", () => map.scrollWheelZoom.enable());
    map.on("blur", () => map.scrollWheelZoom.disable());

    const P = {
      MAN: [53.3537, -2.275], SIN: [1.3644, 103.9915], HAN: [21.2212, 105.8072],
      hanoi: [21.0285, 105.8542], halong: [20.84, 107.10], danang: [16.0439, 108.1994], hoian: [15.8801, 108.338],
      hai: [16.2, 108.13], hue: [16.4637, 107.5909], hueAir: [16.4015, 107.7026], hcmc: [10.7769, 106.7009], mytho: [10.36, 106.36],
      caibe: [10.34, 105.95], sadec: [10.29, 105.76], tanchau: [10.80, 105.24], pp: [11.5564, 104.9282],
      rep: [13.4107, 103.8128], sr: [13.3671, 103.8448]
    };
    const line = (pts, o) => L.polyline(pts, Object.assign({ weight: 3.5, opacity: .9, lineCap: "round" }, o)).addTo(map);
    const road = { color: "#9a1c1f" }, air = { color: "#b48a35", weight: 2.4, dashArray: "7 9" }, river = { color: "#2c7a8c", weight: 4, dashArray: "1 8" };
    // flights
    line([P.MAN, P.SIN], air); line([P.SIN, P.HAN], air);
    line([P.hanoi, P.danang], air); line([P.hueAir, P.hcmc], air); line([P.pp, P.sr], air);
    line([P.sr, P.SIN], air);
    // road
    line([P.hanoi, P.halong], road); line([P.danang, P.hoian], road); line([P.hoian, P.hai, P.hue], road); line([P.hcmc, P.mytho], road);
    // cruises
    line([P.mytho, P.caibe, P.sadec, P.tanchau, P.pp], river);
    line([P.halong, [20.76, 107.07], [20.80, 107.15]], river);

    // numbered stops
    STOPS.forEach(s => {
      const cls = s.id === "mekong" || s.id === "halong" ? "jade" : "";
      const html = `<div class="pin ${cls}"><span>${s.n}</span></div>`;
      const m = L.marker([s.lat, s.lng], { icon: L.divIcon({ html, className: "", iconSize: [34, 34], iconAnchor: [8, 34], popupAnchor: [9, -34] }), zIndexOffset: 1000, title: s.name }).addTo(map);
      const hs = hotelsFor(s.id).map(h => `<a href="${h.web}" target="_blank" rel="noopener">${esc(h.name)}</a>`).join("<br>");
      m.bindPopup(`<div class="pop"><h4>${s.n}. ${esc(s.name)}</h4><small>${s.arrive} → ${s.depart} · ${s.nights} night${s.nights > 1 ? "s" : ""}</small>${hs}<br><a href="#do/${s.id}">Things to do →</a></div>`);
      markers[s.id] = m;
    });
    // airports
    [["Manchester (MAN)", P.MAN], ["Singapore Changi (SIN)", P.SIN], ["Hanoi Noi Bai (HAN)", P.HAN], ["Siem Reap (REP)", P.rep]].forEach(([n, p]) =>
      L.marker(p, { icon: L.divIcon({ html: '<div class="air-dot"></div>', className: "", iconSize: [14, 14] }), title: n }).bindPopup(`<div class="pop"><h4>${n}</h4><small>Airport</small></div>`).addTo(map));
    // highlights
    [["Cu Chi Tunnels", 11.1424, 106.4617], ["Angkor Wat", 13.4125, 103.867], ["My Son", 15.7640, 108.1240], ["Hai Van Pass", 16.2, 108.13], ["Sa Dec", 10.29, 105.76], ["Cai Be", 10.34, 105.95], ["Choeung Ek & Tuol Sleng", 11.4846, 104.9022]]
      .forEach(([n, a, b]) => L.marker([a, b], { icon: L.divIcon({ html: '<div class="hl-dot"></div>', className: "", iconSize: [12, 12] }) }).bindTooltip(n, { direction: "top" }).addTo(map));

    $("#map-region").addEventListener("click", showRegion);
    $("#map-world").addEventListener("click", () => map.flyToBounds([P.MAN, P.SIN, P.hanoi], { padding: [30, 30], duration: 1.2 }));
    showRegion(true);
  }
  function showRegion(instant) {
    const b = L.latLngBounds([[9.8, 102.9], [21.6, 108.0]]);
    instant === true ? map.fitBounds(b, { padding: [10, 10] }) : map.flyToBounds(b, { padding: [10, 10], duration: 1 });
  }
  function focusStop(id) { const s = stopById(id), m = markers[id]; if (s && m && map.flyTo) { map.flyTo([s.lat, s.lng], 9, { duration: .9 }); setTimeout(() => m.openPopup(), 900); } }
  function buildMap() {
    $("#stop-strip").innerHTML = STOPS.map(s => `<button type="button" class="card stop-card" data-stop="${s.id}"><b><span class="num">${s.n}</span>${esc(s.name)}</b><small>${s.arrive} – ${s.depart} · ${esc(s.tag)}</small></button>`).join("");
    $("#stop-strip").addEventListener("click", e => { const b = e.target.closest("[data-stop]"); if (b) { $("#map").scrollIntoView({ behavior: "smooth", block: "center" }); focusStop(b.dataset.stop); } });
  }

  /* ---------- accommodation ---------- */
  function buildStay() {
    $("#page-stay").innerHTML = `
      <div class="page-head"><p class="eyebrow">Where you'll sleep</p><h1>Accommodation</h1>
        <p class="lede">Eight stays across 22 nights – six hotels and two cruises. Tap a name to visit the hotel's own website, or use the buttons to get directions or call.</p></div>
      <p class="note"><strong>Tip:</strong> Rooms are booked through the Distant Journeys group booking, and your Tour Manager will guide you at each check-in. Keep the hotel's name and address handy (screenshot this page) in case a taxi driver needs it.</p>
      <div class="grid">${HOTELS.map((h, i) => {
        const q = h.kind === "Cruise" ? h.name + " cruise" : h.name + " " + h.address;
        return `<article class="card hotel" id="stay-${h.id}">
          <div class="hotel-top"><span class="pill ${h.kind ? "jade" : ""}">${h.kind || "Hotel"} · Stay ${i + 1} of ${HOTELS.length}</span>
            <h3><a href="${h.web}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit">${esc(h.name)}</a></h3><div class="city">${esc(h.city)}</div></div>
          <div class="hotel-body">
            <div class="dates"><div><span>Arrive</span><b>${h.arrive.replace(" 2027", "")}</b></div><div><span>Depart</span><b>${h.depart.replace(" 2027", "")}</b></div><div><span>Nights</span><b>${h.nights}</b></div></div>
            <dl><dt>Room</dt><dd>${esc(h.room)}</dd>
              <dt>${h.kind ? "Boarding" : "Address"}</dt><dd>${esc(h.address)}</dd>
              ${h.phone ? `<dt>Phone</dt><dd><a href="tel:${h.phone.replace(/\s/g, "")}">${h.phone}</a></dd>` : ""}</dl>
            <p class="blurb">${esc(h.blurb)}</p>
            <div class="actions">
              <a class="btn primary" href="${h.web}" target="_blank" rel="noopener">${icon("globe")}Website</a>
              <a class="btn" href="${gmaps(q)}" target="_blank" rel="noopener">${icon("pin")}Map</a>
              ${h.phone ? `<a class="btn" href="tel:${h.phone.replace(/\s/g, "")}">${icon("phone")}Call</a>` : ""}
            </div></div></article>`;
      }).join("")}</div>`;
  }

  /* ---------- flights ---------- */
  function buildFlights() {
    const card = f => {
      const a = AIRPORTS[f.from], b = AIRPORTS[f.to];
      return `<article class="card flight"><div class="flight-main">
        <div class="flight-head"><span class="pill">Flight ${f.n}</span><span class="flight-no">${f.no.replace("SQ", "SQ ")}</span><span class="pill red">${f.leg}</span><span class="pill jade">Singapore Airlines · ${f.cls}</span></div>
        <div class="legs">
          <div><div class="code">${f.from}</div><div class="apt">${esc(a.name)}</div><div class="tm">${f.depT}</div><div class="dt">${f.dep}</div></div>
          <div class="line-mid"><div class="rail"></div>${f.dur}</div>
          <div class="to"><div class="code">${f.to}</div><div class="apt">${esc(b.name)}</div><div class="tm">${f.arrT}</div><div class="dt">${f.arr}</div></div>
        </div>
        <div class="flight-meta"><span>Check-in opens: <b>${f.checkin}</b></span><span>Class: <b>${f.cls}</b></span>
          <a href="https://www.flightaware.com/live/flight/SIA${f.num}" target="_blank" rel="noopener">Live flight status →</a></div>
        <p class="flight-note">${esc(f.note)}</p></div>
        <div class="flight-stub"><small>Departs</small><b>${f.depT}</b><small>${f.dep.replace(" 2027", "")}</small></div></article>`;
    };
    $("#page-flights").innerHTML = `
      <div class="page-head"><p class="eyebrow">Getting there &amp; back</p><h1>Flights</h1>
        <p class="lede">Four international flights with Singapore Airlines, all Economy. Times are local to each airport. Janet &amp; Stuart: check you have your e-tickets and seat selections via <a href="https://www.singaporeair.com/en_UK/gb/home#/manage-booking" target="_blank" rel="noopener">Manage Booking</a> on the Singapore Airlines site.</p></div>
      <div class="section-title" style="margin-top:8px"><h2>Outbound</h2><span class="pill">20 – 21 Jan 2027</span></div>
      ${card(FLIGHTS[0])}
      <div class="layover"><span>Transit at Changi · 1h 50m</span></div>
      ${card(FLIGHTS[1])}
      <div class="section-title"><h2>Return</h2><span class="pill">10 – 11 Feb 2027</span></div>
      ${card(FLIGHTS[2])}
      <div class="layover"><span>Layover at Changi · 6h 00m</span></div>
      ${card(FLIGHTS[3])}
      <div class="section-title"><h2>Flights within the tour</h2></div>
      <div class="card internal"><ul>${INTERNAL_FLIGHTS.map(f => `<li><b>${f.when}</b><div><strong>${f.route}</strong><small>${f.note}</small></div></li>`).join("")}</ul></div>
      <p class="note" style="margin-top:16px">These flights are arranged by Distant Journeys and included in the holiday price. Flight times aren't on your documents – your Tour Manager will confirm them nearer the day.</p>`;
  }

  /* ---------- things to do ---------- */
  function buildDo() {
    const typeLabel = { inc: ["Included", "jade"], rec: ["We recommend", ""], free: ["Free-time idea", "red"] };
    $("#page-do").innerHTML = `
      <div class="page-head"><p class="eyebrow">Explore</p><h1>Things to do</h1>
        <p class="lede">What's planned on the tour at each stop, plus some ideas for the free time in between. Every card has a Google Maps link.</p></div>
      <div class="legend-row"><span><span class="pill jade">Included</span> in the holiday</span><span><span class="pill">We recommend</span> brochure suggestion, may cost extra</span><span><span class="pill red">Free-time idea</span> our extra suggestions</span></div>
      <div class="subnav" role="tablist">${STOPS.map(s => `<a class="chip" href="#do/${s.id}">${s.n}. ${esc(s.name)}</a>`).join("")}</div>
      ${STOPS.map(s => {
        const t = THINGS[s.id];
        return `<section class="stop-sec" id="do-${s.id}">
          <header><h2><span class="num">${s.n}</span>${esc(s.name)}</h2><small>${s.arrive} – ${s.depart} · ${s.nights} night${s.nights > 1 ? "s" : ""}</small></header>
          <p class="lede">${esc(t.intro)}</p>
          <div class="grid">${t.items.map(i => `<div class="card thing"><span class="pill ${typeLabel[i.t][1]}" style="align-self:flex-start">${typeLabel[i.t][0]}</span><h4>${esc(i.name)}</h4><p>${esc(i.text)}</p>
            <a class="map-link" href="${gmaps(i.q)}" target="_blank" rel="noopener">View on Google Maps →</a></div>`).join("")}</div></section>`;
      }).join("")}`;
  }

  /* ---------- phrases + speech ---------- */
  let lang = "vi", cat = -1, query = "", rate = 0.9, playingBtn = null;
  const synth = "speechSynthesis" in window ? window.speechSynthesis : null;
  function voiceFor(code) {
    if (!synth) return null;
    const pre = code.slice(0, 2).toLowerCase();
    return synth.getVoices().find(v => v.lang.toLowerCase().replace("_", "-").startsWith(pre)) || null;
  }
  function voiceStatus() {
    const el = $("#voice-status"); if (!el) return;
    const L = PHRASES[lang], v = voiceFor(L.lang);
    el.className = "voice-status " + (v ? "ok" : (synth && synth.getVoices().length ? "no" : ""));
    el.innerHTML = `<i></i>${!synth ? "This browser can't read aloud – use the pronunciation guide." : v ? `${L.name} voice ready (${esc(v.name)})` : synth.getVoices().length ? `No ${L.name} voice on this device – follow the pronunciation guide in green.` : "Checking for voices…"}`;
  }
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 4200); }
  function speak(text, code, btn) {
    if (!synth) return toast("Read-aloud isn't supported in this browser. Use the pronunciation guide.");
    synth.cancel();
    if (playingBtn) playingBtn.classList.remove("playing");
    const v = voiceFor(code);
    if (!v && code === "km-KH") return toast("No Khmer voice is installed on this device. Follow the green pronunciation guide instead – or try Chrome on Android / a Windows PC.");
    const u = new SpeechSynthesisUtterance(text);
    u.lang = code; if (v) u.voice = v; u.rate = rate;
    u.onend = u.onerror = () => btn.classList.remove("playing");
    btn.classList.add("playing"); playingBtn = btn;
    synth.speak(u);
    if (!v) toast(`No ${PHRASES[lang].name} voice found – the sound may be approximate. Use the pronunciation guide.`);
  }
  function renderPhrases() {
    const L = PHRASES[lang];
    const q = query.trim().toLowerCase();
    const list = L.list.filter(p => (cat < 0 || p.c === cat) && (!q || (p.en + p.loc + p.pr).toLowerCase().includes(q)));
    let html = "", last = -1;
    list.forEach(p => {
      if (cat < 0 && p.c !== last) { html += `<div class="cat-title">${L.cats[p.c]}</div>`; last = p.c; }
      html += `<div class="card phrase"><div><div class="en">${esc(p.en)}</div><div class="loc ${lang}" lang="${L.lang}">${esc(p.loc)}</div><div class="pr">${esc(p.pr)}</div></div>
        <button class="say" type="button" data-say="${L.list.indexOf(p)}" aria-label="Play: ${esc(p.en)}">${icon("speaker")}</button></div>`;
    });
    $("#phrase-list").innerHTML = html || '<p class="lede">No phrases match your search.</p>';
    $("#cat-chips").innerHTML = [`<button type="button" class="chip" aria-pressed="${cat < 0}" data-cat="-1">All</button>`].concat(L.cats.map((c, i) => `<button type="button" class="chip" aria-pressed="${cat === i}" data-cat="${i}">${c}</button>`)).join("");
    $("#lang-intro").textContent = L.intro;
    $$(".langtabs button").forEach(b => b.setAttribute("aria-selected", b.dataset.lang === lang));
    voiceStatus();
  }
  function buildPhrases() {
    $("#page-phrases").innerHTML = `
      <div class="page-head"><p class="eyebrow">Speak a little</p><h1>Common phrases</h1>
        <p class="lede" id="lang-intro"></p></div>
      <div class="tools">
        <div class="langtabs" role="tablist" aria-label="Language">
          <button type="button" role="tab" data-lang="vi" aria-selected="true">🇻🇳 Vietnamese</button>
          <button type="button" role="tab" data-lang="km" aria-selected="false">🇰🇭 Khmer</button>
        </div>
        <input type="search" id="phrase-search" placeholder="Search phrases…" aria-label="Search phrases">
        <label class="voice-status" style="gap:6px">Speed
          <select id="rate" aria-label="Speech speed" style="font:inherit;padding:6px 8px;border-radius:8px;border:1px solid var(--line);background:var(--paper)">
            <option value="0.65">Slow</option><option value="0.9" selected>Normal</option><option value="1.1">Fast</option></select></label>
      </div>
      <div class="tools" id="cat-chips"></div>
      <p id="voice-status" class="voice-status"></p>
      <div class="grid" id="phrase-list"></div>`;
    $(".langtabs").addEventListener("click", e => { const b = e.target.closest("[data-lang]"); if (b) { lang = b.dataset.lang; cat = -1; if (synth) synth.cancel(); renderPhrases(); } });
    $("#cat-chips").addEventListener("click", e => { const b = e.target.closest("[data-cat]"); if (b) { cat = +b.dataset.cat; renderPhrases(); } });
    $("#phrase-search").addEventListener("input", e => { query = e.target.value; renderPhrases(); });
    $("#rate").addEventListener("change", e => (rate = +e.target.value));
    $("#phrase-list").addEventListener("click", e => { const b = e.target.closest("[data-say]"); if (b) { const p = PHRASES[lang].list[+b.dataset.say]; speak(p.loc, PHRASES[lang].lang, b); } });
    if (synth) synth.addEventListener("voiceschanged", voiceStatus);
    renderPhrases();
  }

  const builders = { overview: buildOverview, map: buildMap, stay: buildStay, flights: buildFlights, do: buildDo, phrases: buildPhrases };
  window.addEventListener("hashchange", route);
  route();
})();
