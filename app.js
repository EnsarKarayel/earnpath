const routes = [
  {
    id: "customer-support",
    name: "Müşteri destek temsilcisi",
    short: "Telefon, chat veya WhatsApp üzerinden müşteri taleplerini yönetme.",
    incomeWindow: "7-21 gün",
    prep: "Orta",
    base: 72,
    modes: ["remote", "hybrid", "any"],
    devices: ["computer", "both", "phone"],
    skills: ["communication", "computer"],
    languages: ["enA2", "enB1", "ar", "de", "ru"],
    education: ["highschool", "student", "degree"],
    facts: ["Chat desteği", "Vardiya olabilir", "CV etkili"],
    gaps: ["Temel CRM kullanımı", "Net yazışma dili", "Şikayet karşılama"],
    jobs: ["Çağrı merkezi", "E-ticaret destek", "Turizm danışma"]
  },
  {
    id: "ecommerce-ops",
    name: "E-ticaret operasyon asistanı",
    short: "Ürün girişi, sipariş takibi, Excel ve pazar yeri panel işleri.",
    incomeWindow: "14-30 gün",
    prep: "Orta",
    base: 70,
    modes: ["hybrid", "onsite", "remote", "any"],
    devices: ["computer", "both"],
    skills: ["computer", "sales"],
    languages: ["tr", "enA2", "enB1"],
    education: ["highschool", "student", "degree"],
    facts: ["Excel", "Pazar yeri", "Ofis/hibrit"],
    gaps: ["Excel filtre ve tablo", "Ürün açıklaması", "Sipariş takip disiplini"],
    jobs: ["Pazar yeri asistanı", "Ürün giriş elemanı", "Operasyon destek"]
  },
  {
    id: "field-sales",
    name: "Saha satış ve marka temsilcisi",
    short: "Mağaza, stant veya saha ziyaretleriyle hızlı primli gelir.",
    incomeWindow: "3-14 gün",
    prep: "Düşük",
    base: 68,
    modes: ["onsite", "any"],
    devices: ["phone", "both", "computer"],
    skills: ["communication", "sales", "field"],
    languages: ["tr", "ar", "ru"],
    education: ["middle", "highschool", "student", "degree", "none"],
    facts: ["Prim", "Saha", "Hızlı başlangıç"],
    gaps: ["Kısa satış konuşması", "Günlük hedef takibi", "Temel ürün anlatımı"],
    jobs: ["Marka temsilcisi", "Stant görevlisi", "Saha satış"]
  },
  {
    id: "micro-logistics",
    name: "Mikro lojistik ve kurye",
    short: "Paket, market veya yerel teslimat işlerinde hızlı gelir.",
    incomeWindow: "1-10 gün",
    prep: "Düşük",
    base: 66,
    modes: ["onsite", "any"],
    devices: ["phone", "both"],
    skills: ["field"],
    languages: ["tr"],
    education: ["middle", "highschool", "student", "degree", "none"],
    facts: ["Hızlı nakit", "Saha", "Esnek saat"],
    gaps: ["Rota takibi", "Müşteri iletişimi", "Günlük masraf hesabı"],
    jobs: ["Paket teslimat", "Market hazırlama", "Depo destek"]
  },
  {
    id: "office-assistant",
    name: "Ön muhasebe ve ofis asistanı",
    short: "Fatura, evrak, randevu ve temel tablo takibi.",
    incomeWindow: "21-45 gün",
    prep: "Yüksek",
    base: 62,
    modes: ["onsite", "hybrid", "any"],
    devices: ["computer", "both"],
    skills: ["computer", "communication"],
    languages: ["tr", "enA2", "enB1"],
    education: ["highschool", "student", "degree"],
    facts: ["Excel", "Evrak", "Düzen"],
    gaps: ["Excel formülleri", "E-fatura mantığı", "Takvim yönetimi"],
    jobs: ["Ofis asistanı", "Ön muhasebe destek", "Sekreterya"]
  },
  {
    id: "content-ops",
    name: "Sosyal medya içerik operatörü",
    short: "Kısa içerik, ürün görseli, metin ve paylaşım takvimi.",
    incomeWindow: "14-45 gün",
    prep: "Orta",
    base: 60,
    modes: ["remote", "hybrid", "any"],
    devices: ["computer", "both", "phone"],
    skills: ["design", "computer", "sales"],
    languages: ["tr", "enA2", "enB1"],
    education: ["highschool", "student", "degree"],
    facts: ["Portfolyo", "Kısa video", "Freelance"],
    gaps: ["Canva düzeni", "Kısa metin yazımı", "Örnek portfolyo"],
    jobs: ["İçerik asistanı", "Sosyal medya destek", "Ürün metni yazarı"]
  },
  {
    id: "repair-apprentice",
    name: "Teknik servis çıraklığı",
    short: "Telefon, bilgisayar, beyaz eşya veya elektrik destek işi.",
    incomeWindow: "21-60 gün",
    prep: "Orta",
    base: 58,
    modes: ["onsite", "any"],
    devices: ["phone", "both", "computer"],
    skills: ["repair", "field"],
    languages: ["tr"],
    education: ["middle", "highschool", "student", "degree", "none"],
    facts: ["Usta yanında", "Saha", "Uzun vadeli"],
    gaps: ["Güvenlik kuralları", "Parça tanıma", "Servis notu tutma"],
    jobs: ["Servis çırağı", "Teknik destek", "Montaj yardımcısı"]
  },
  {
    id: "care-support",
    name: "Bakım ve refakat desteği",
    short: "Yaşlı, çocuk, hasta refakati veya günlük ev destek işleri.",
    incomeWindow: "3-14 gün",
    prep: "Düşük",
    base: 56,
    modes: ["onsite", "any"],
    devices: ["phone", "both"],
    skills: ["care", "communication"],
    languages: ["tr", "ar", "ru"],
    education: ["middle", "highschool", "student", "degree", "none"],
    facts: ["Güven", "Referans", "Yerel"],
    gaps: ["Referans metni", "Saatlik ücret hesabı", "Güvenli ilan seçimi"],
    jobs: ["Refakatçi", "Ev destek", "Çocuk bakım yardımcısı"]
  },
  {
    id: "food-service",
    name: "Kafe ve hızlı servis ekibi",
    short: "Servis, kasa, paket hazırlama ve vardiyalı işletme işleri.",
    incomeWindow: "3-14 gün",
    prep: "Düşük",
    base: 55,
    modes: ["onsite", "any"],
    devices: ["phone", "both"],
    skills: ["food", "communication", "field"],
    languages: ["tr", "enA2", "ar", "ru"],
    education: ["middle", "highschool", "student", "degree", "none"],
    facts: ["Vardiya", "Bahşiş olabilir", "Hızlı başlangıç"],
    gaps: ["Hijyen kuralları", "Kasa iletişimi", "Yoğun saat temposu"],
    jobs: ["Barista yardımcısı", "Servis elemanı", "Paket hazırlama"]
  }
];

const citySignals = {
  İstanbul: ["E-ticaret", "Çağrı merkezi", "Turizm", "Lojistik"],
  Ankara: ["Kamu çevresi", "Ofis", "Çağrı merkezi", "Eğitim"],
  İzmir: ["Turizm", "E-ticaret", "Hizmet", "Lojistik"],
  Bursa: ["Üretim", "Servis", "Lojistik", "Ofis"],
  Antalya: ["Turizm", "Dil bilen personel", "Servis", "Satış"],
  Gaziantep: ["Gıda", "Üretim", "Saha satış", "Lojistik"],
  Konya: ["Üretim", "Teknik servis", "Gıda", "Ofis"],
  Online: ["Uzaktan destek", "İçerik", "Veri girişi", "Mikro görev"]
};

const form = document.querySelector("#profileForm");
const routeList = document.querySelector("#routeList");
const timeline = document.querySelector("#timeline");
const bestRouteName = document.querySelector("#bestRouteName");
const incomeWindow = document.querySelector("#incomeWindow");
const prepScore = document.querySelector("#prepScore");
const profileTag = document.querySelector("#profileTag");
const jobBoard = document.querySelector("#jobBoard");
const applicationMessage = document.querySelector("#applicationMessage");
const candidateName = document.querySelector("#candidateName");
const experienceInput = document.querySelector("#experienceInput");
const cvOutput = document.querySelector("#cvOutput");
const businessMetrics = document.querySelector("#businessMetrics");
const toast = document.querySelector("#toast");

let currentPlan = null;

function getProfile() {
  const data = new FormData(form);
  return {
    city: data.get("city"),
    education: data.get("education"),
    device: data.get("device"),
    time: data.get("time"),
    urgency: data.get("urgency"),
    skills: data.getAll("skills"),
    language: data.get("language"),
    mode: data.get("mode"),
    constraints: data.get("constraints")?.trim() || ""
  };
}

function scoreRoute(route, profile) {
  let score = route.base;

  if (route.devices.includes(profile.device)) score += 12;
  if (route.modes.includes(profile.mode)) score += 10;
  if (route.education.includes(profile.education)) score += 8;
  if (route.languages.includes(profile.language)) score += 6;

  profile.skills.forEach((skill) => {
    if (route.skills.includes(skill)) score += 8;
  });

  if (profile.urgency === "now" && route.incomeWindow.includes("1-10")) score += 16;
  if (profile.urgency === "now" && route.incomeWindow.includes("3-14")) score += 13;
  if (profile.urgency === "month" && !route.incomeWindow.includes("60")) score += 9;
  if (profile.urgency === "quarter" && route.prep !== "Düşük") score += 8;

  if (profile.time === "2" && route.prep === "Yüksek") score -= 10;
  if (profile.time === "6" && route.prep !== "Düşük") score += 6;
  if (profile.mode === "remote" && !route.modes.includes("remote")) score -= 20;
  if (profile.device === "phone" && !route.devices.includes("phone")) score -= 16;

  const constraintText = profile.constraints.toLocaleLowerCase("tr");
  if (constraintText.includes("ehliyet yok") && route.id === "micro-logistics") score -= 14;
  if (constraintText.includes("çocuk") && route.modes.includes("remote")) score += 6;
  if (constraintText.includes("akşam") && ["customer-support", "food-service", "micro-logistics"].includes(route.id)) score += 6;

  return Math.max(0, Math.min(99, score));
}

function generatePlan() {
  const profile = getProfile();
  const ranked = routes
    .map((route) => ({ ...route, score: scoreRoute(route, profile) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  currentPlan = {
    profile,
    ranked,
    best: ranked[0],
    timeline: buildTimeline(ranked[0], profile),
    jobs: buildJobs(ranked[0], profile),
    message: buildApplicationMessage(ranked[0], profile)
  };

  localStorage.setItem("earnPathProfile", JSON.stringify(profile));
  renderAll();
}

function buildTimeline(route, profile) {
  const cityNeeds = citySignals[profile.city] || citySignals.Online;
  const firstTarget = profile.urgency === "now" ? "günde 5 başvuru" : "günde 2 kaliteli başvuru";

  return [
    {
      period: "Gün 1",
      title: "Tek hedef seç",
      body: `${route.name} için tek sayfalık CV, kısa WhatsApp metni ve 3 örnek ilan kelimesi hazırla. Şehir sinyalleri: ${cityNeeds.join(", ")}.`
    },
    {
      period: "Gün 2-3",
      title: "Eksik beceriyi kapat",
      body: `${route.gaps.slice(0, 2).join(" ve ")} üstüne 2 kısa ders bitir. Her ders sonunda bir ekran görüntüsü ya da mini çıktı kaydet.`
    },
    {
      period: "Gün 4-7",
      title: "İlk başvuru turu",
      body: `${firstTarget} temposuyla yerel ilan siteleri, LinkedIn, Kariyer.net, belediye kurs/istihdam noktaları ve işletme WhatsApp hatlarına başvur.`
    },
    {
      period: "Gün 8-14",
      title: "Görüşme ve deneme",
      body: `Gelen cevapları takip et, aynı gün dönüş yap, uygun işlerde deneme günü iste. Cevap gelmeyen ilanlar için ikinci mesaj gönder.`
    },
    {
      period: "Gün 15-30",
      title: "Geliri sabitle",
      body: `En hızlı dönüş yapan iş tipine odaklan. Haftalık hedef: 25 başvuru, 5 görüşme, 1 deneme veya freelance teklif.`
    }
  ];
}

function buildJobs(route, profile) {
  const sourceMap = profile.city === "Online"
    ? ["LinkedIn", "Bionluk", "Upwork", "Remote ilanlar"]
    : ["İŞKUR", "Kariyer.net", "LinkedIn", "Yerel işletmeler"];

  return route.jobs.map((job, index) => ({
    title: job,
    source: sourceMap[index % sourceMap.length],
    fit: index === 0 ? "Bugün" : index === 1 ? "Bu hafta" : "30 gün",
    note: `${profile.city} için ${route.facts[index % route.facts.length].toLocaleLowerCase("tr")} odaklı arama.`
  }));
}

function buildApplicationMessage(route, profile) {
  const city = profile.city === "Online" ? "online çalışmaya" : `${profile.city} içinde çalışmaya`;
  const timeText = profile.time === "2" ? "günde 1-2 saat düzenli hazırlık yapabiliyorum" : profile.time === "4" ? "günde 3-4 saat ayırabiliyorum" : "tam zamanlı tempoya hızlı adapte olabilirim";
  const skillText = profile.skills.length ? profile.skills.map(skillLabel).join(", ") : "öğrenmeye açıklık";

  return `Merhaba,\n\n${route.name} pozisyonu için başvurmak istiyorum. ${city} uygunum. Güçlü olduğum alanlar: ${skillText}. ${timeText}.\n\nBu alanda hızlı başlamak için ${route.gaps[0]} ve ${route.gaps[1]} konularına çalışıyorum. Kısa bir görüşme veya deneme görevi için uygun olduğumu belirtmek isterim.\n\nTeşekkürler.`;
}

function renderAll() {
  const { profile, ranked, best } = currentPlan;

  bestRouteName.textContent = best.name;
  incomeWindow.textContent = best.incomeWindow;
  prepScore.textContent = best.prep;
  profileTag.textContent = `${profile.city} · ${educationLabel(profile.education)} · ${timeLabel(profile.time)}`;

  renderRoutes(ranked);
  renderTimeline(currentPlan.timeline);
  renderJobs(currentPlan.jobs);
  applicationMessage.value = currentPlan.message;
  renderCv();
  renderBusinessMetrics(best);
}

function renderRoutes(ranked) {
  routeList.innerHTML = ranked
    .map((route, index) => `
      <article class="route-card ${index === 0 ? "is-best" : ""}">
        <div class="route-rank">
          <span class="rank-chip">#${index + 1}</span>
          <span class="match-chip">%${route.score} uyum</span>
        </div>
        <h3>${route.name}</h3>
        <p>${route.short}</p>
        <ul class="route-facts">
          <li>${route.incomeWindow}</li>
          <li>${route.prep} hazırlık</li>
          ${route.facts.map((fact) => `<li>${fact}</li>`).join("")}
        </ul>
      </article>
    `)
    .join("");
}

function renderTimeline(items) {
  timeline.innerHTML = items
    .map((item) => `
      <li>
        <time>${item.period}</time>
        <div>
          <strong>${item.title}</strong>
          <span>${item.body}</span>
        </div>
      </li>
    `)
    .join("");
}

function renderJobs(jobs) {
  jobBoard.innerHTML = jobs
    .map((job) => `
      <article class="job-card">
        <header>
          <h3>${job.title}</h3>
          <span class="job-chip">${job.fit}</span>
        </header>
        <p>${job.note}</p>
        <ul class="job-facts">
          <li>${job.source}</li>
          <li>Başvuru mesajı hazır</li>
        </ul>
      </article>
    `)
    .join("");
}

function renderCv() {
  if (!currentPlan) return;

  const name = candidateName.value.trim() || "Ad Soyad";
  const experience = experienceInput.value.trim() || "Müşteri iletişimi, düzenli takip ve hızlı öğrenme becerisi";
  const route = currentPlan.best;
  const profile = currentPlan.profile;

  cvOutput.textContent = `${name}\n${route.name} adayı\n\nÖzet\n${profile.city} için ${route.name.toLocaleLowerCase("tr")} alanında hızlı başlangıç hedefleyen, ${profile.skills.map(skillLabel).join(", ") || "öğrenmeye açık"} yönleri güçlü aday.\n\nDeneyim\n${experience}\n\nÖne çıkan beceriler\n- ${route.gaps[0]}\n- ${route.gaps[1]}\n- ${route.gaps[2]}\n\nUygun çalışma biçimi\n${modeLabel(profile.mode)} · ${timeLabel(profile.time)} hazırlık temposu`;
}

function renderBusinessMetrics(best) {
  const metrics = [
    ["%8-12", "Ücretsiz analizden ücretli pakete hedef dönüşüm"],
    ["399 TL", "İlk satılabilir paket fiyatı"],
    ["10 gün", "İlk kullanıcıdan ilk gelire hedef süre"],
    [best.incomeWindow, "Kullanıcıya vaat edilen ilk sonuç penceresi"]
  ];

  businessMetrics.innerHTML = metrics
    .map(([value, label]) => `
      <div class="metric">
        <strong>${value}</strong>
        <p>${label}</p>
      </div>
    `)
    .join("");
}

function skillLabel(value) {
  return {
    communication: "insan iletişimi",
    computer: "bilgisayar işleri",
    sales: "satış",
    field: "saha işi",
    design: "içerik/tasarım",
    repair: "teknik işler",
    care: "bakım desteği",
    food: "gıda/servis"
  }[value] || value;
}

function educationLabel(value) {
  return {
    highschool: "lise",
    student: "öğrenci",
    degree: "üniversite",
    middle: "ortaokul",
    none: "diploma yok"
  }[value] || value;
}

function modeLabel(value) {
  return {
    any: "fark etmez",
    remote: "evden/online",
    onsite: "yerinde",
    hybrid: "hibrit"
  }[value] || value;
}

function timeLabel(value) {
  return {
    2: "1-2 saat",
    4: "3-4 saat",
    6: "5+ saat"
  }[value] || value;
}

function copyText(text, successMessage) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast(successMessage)).catch(() => fallbackCopy(text, successMessage));
    return;
  }

  fallbackCopy(text, successMessage);
}

function fallbackCopy(text, successMessage) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  showToast(successMessage);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function exportPlan() {
  if (!currentPlan) return;

  const { profile, best, ranked } = currentPlan;
  const content = [
    "EarnPath",
    "",
    `Şehir: ${profile.city}`,
    `Öncelikli rota: ${best.name}`,
    `İlk gelir penceresi: ${best.incomeWindow}`,
    "",
    "En iyi 3 yol:",
    ...ranked.map((route, index) => `${index + 1}. ${route.name} - %${route.score} uyum - ${route.incomeWindow}`),
    "",
    "30 günlük plan:",
    ...currentPlan.timeline.map((item) => `${item.period}: ${item.title} - ${item.body}`),
    "",
    "Başvuru mesajı:",
    currentPlan.message
  ].join("\n");

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "earnpath-plan.txt";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Plan indirildi");
}

function restoreProfile() {
  const saved = localStorage.getItem("earnPathProfile");
  if (!saved) return;

  try {
    const profile = JSON.parse(saved);
    Object.entries(profile).forEach(([key, value]) => {
      if (key === "skills") {
        form.querySelectorAll(`[name="skills"]`).forEach((input) => {
          input.checked = value.includes(input.value);
        });
        return;
      }

      const field = form.elements[key];
      if (!field) return;
      field.value = value;
    });
  } catch {
    localStorage.removeItem("earnPathProfile");
  }
}

function resetProfile() {
  localStorage.removeItem("earnPathProfile");
  form.reset();
  form.querySelector('[name="skills"][value="communication"]').checked = true;
  form.querySelector('[name="skills"][value="computer"]').checked = true;
  candidateName.value = "";
  experienceInput.value = "";
  generatePlan();
  showToast("Profil sıfırlandı");
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("is-active"));
    document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("is-active"));
    tab.classList.add("is-active");
    document.querySelector(`#${tab.dataset.tab}Panel`).classList.add("is-active");
  });
});

form.addEventListener("input", generatePlan);
candidateName.addEventListener("input", renderCv);
experienceInput.addEventListener("input", renderCv);

document.querySelector("#copyPlanButton").addEventListener("click", () => {
  const text = currentPlan.timeline.map((item) => `${item.period}: ${item.title}\n${item.body}`).join("\n\n");
  copyText(text, "Plan kopyalandı");
});

document.querySelector("#copyMessageButton").addEventListener("click", () => {
  copyText(applicationMessage.value, "Mesaj kopyalandı");
});

document.querySelector("#copyCvButton").addEventListener("click", () => {
  copyText(cvOutput.textContent, "CV özeti kopyalandı");
});

document.querySelector("#exportButton").addEventListener("click", exportPlan);
document.querySelector("#printButton").addEventListener("click", () => window.print());
document.querySelector("#resetButton").addEventListener("click", resetProfile);

restoreProfile();
generatePlan();
