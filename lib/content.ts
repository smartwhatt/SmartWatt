import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import {
  mapMeta,
  mapHero,
  mapSignal,
  mapWork,
  mapExperience,
  mapEducation,
  mapContactMethod,
} from "@/lib/mappers";
import type { SiteContent } from "@/lib/types";

// Fallback content (mirrors the seed data from the migration)
export const FALLBACK_CONTENT: SiteContent = {
  meta: {
    name: "Smart Wattanapornmongkol",
    shortName: "SmartWatt",
    location: "Bangkok, TH",
    timezone: "UTC+7",
    available: true,
    copyrightYear: "2026",
  },
  hero: {
    indexNumber: "01",
    headlineLine1: "Building [thoughtful]",
    headlineLine2: "systems at the",
    headlineLine3: "{research} & {product} seam.",
    intro:
      "Engineering student at Chulalongkorn University. AI researcher at OpenThaiGPT Lab, backend lead at CU NEX. Interested in data-centric ML, infrastructure, and the boring work that makes systems actually ship.",
    currently:
      "Drafting an Interspeech 2026 paper on data-centric synthetic-data scaling. Leading the CU NEX backend team alongside Kasikorn Business-Technology Group.",
    openTo:
      "ML / backend internships · Summer 2027.\nResearch collaborations year-round.",
    stack:
      "Python · TypeScript · Rust\nPyTorch · FastAPI · Actix Web\nPostgreSQL · Docker · AWS / GCP",
  },
  signal: { caption: "three things shipping right now ↓" },
  work: [
    {
      id: "001",
      displayId: "001",
      title:
        "Audio-Conditioned Gain — synthetic data selection for low-resource ASR",
      venue: "Interspeech 2026 · in submission",
      year: "2026",
      kind: "research",
      link: "",
      thumbnail: "",
    },
    {
      id: "002",
      displayId: "002",
      title: "Direct matching between music & image for contextual analysis",
      venue: "IEEE ICCI 2024 · published",
      year: "2024",
      kind: "research",
      link: "https://doi.org/10.1109/ICCI60780.2024.10532575",
      thumbnail: "",
    },
    {
      id: "003",
      displayId: "003",
      title: "CU NEX election & attendance platform",
      venue: "KBTG · backend lead",
      year: "2025",
      kind: "engineering",
      link: "",
      thumbnail: "",
    },
    {
      id: "004",
      displayId: "004",
      title: "Whisper fine-tuning · low-resource Thai ASR",
      venue: "OpenThaiGPT Lab",
      year: "2025",
      kind: "research",
      link: "",
      thumbnail: "",
    },
    {
      id: "005",
      displayId: "005",
      title: "Internal CI/CD & code-review pipeline",
      venue: "CU NEX · platform work",
      year: "2025",
      kind: "engineering",
      link: "",
      thumbnail: "",
    },
    {
      id: "006",
      displayId: "006",
      title: "Earlier projects · personal work archive",
      venue: "GitHub · open source",
      year: "2021—",
      kind: "engineering",
      link: "https://github.com/smartwhatt",
      thumbnail: "",
    },
  ],
  experience: [
    {
      id: "e1",
      period: "2025 — Now",
      role: "Head of IT & Backend Lead",
      org: "CU NEX Club · with Kasikorn Business-Technology Group",
      description:
        "Architecting an election-management platform and the CU NEX attendance feature, used by university stakeholders. Established CI/CD pipelines, automated tests, and code-review culture across the backend team.",
    },
    {
      id: "e2",
      period: "2025 — 2026",
      role: "AI Researcher Intern · Speech & Multimodal",
      org: "OpenThaiGPT Lab · iApp Technology · Super AI Engineer SS5",
      description:
        "Led a data-centric study on synthetic speech selection for Thai ASR. Proposed Audio-Conditioned Gain (ACG) — a normalized metric for sample utility. Manuscript in preparation for Interspeech 2026.",
    },
    {
      id: "e3",
      period: "2024 — 2028",
      role: "B.Eng, Information & Communication Engineering",
      org: "Chulalongkorn University · International School of Engineering",
      description: "CGPA 3.90 / 4.00 · expected October 2028.",
    },
    {
      id: "e4",
      period: "2024",
      role: "Co-author · IEEE ICCI 2024",
      org: "Direct matching between music and image for contextual relationship analysis",
      description: "doi:10.1109/ICCI60780.2024.10532575",
    },
  ],
  education: [
    {
      id: "ed1",
      year: "2024",
      school: "Chulalongkorn University",
      description:
        "B.Eng, Information & Communication Engineering · International School of Engineering · CGPA 3.90/4.00 · Expected Oct 2028",
    },
    {
      id: "ed2",
      year: "2021",
      school: "Suankularb Wittayalai School",
      description: "Senior High · Eplus+ Program",
    },
    {
      id: "ed3",
      year: "2017",
      school: "Suankularb Wittayalai School",
      description: "Junior High · Eplus+ Program",
    },
    {
      id: "ed4",
      year: "2011",
      school: "Attaphiwat School",
      description: "Kindergarten Y3 — Primary School",
    },
    {
      id: "ed5",
      year: "2009",
      school: "Sunflower Trilingual School",
      description: "Kindergarten Y1—Y2",
    },
  ],
  contact: {
    intro:
      "Reach out about research collaborations, internships, freelance backend work, or anything you found here interesting. I read every message.",
    methods: [
      {
        id: "c1",
        label: "Email",
        value: "smartwattana@gmail.com",
        href: "mailto:smartwattana@gmail.com",
      },
      {
        id: "c2",
        label: "LinkedIn",
        value: "linkedin.com/in/smartwatt",
        href: "https://www.linkedin.com/in/smartwatt/",
      },
      {
        id: "c3",
        label: "GitHub",
        value: "github.com/smartwhatt",
        href: "https://github.com/smartwhatt",
      },
      {
        id: "c4",
        label: "Location",
        value: "Bangkok, Thailand · UTC+7",
        href: "",
      },
    ],
  },
};

// Fetch all content from Supabase. Falls back gracefully on error.
// Wrapped in React cache() so multiple Server Components in the same render
// (e.g. layout generateMetadata + page) share a single DB round-trip.
export const fetchContent = cache(
  async function fetchContent(): Promise<SiteContent> {
    try {
      const supabase = await createClient();

      const [
        { data: metaRows },
        { data: heroRows },
        { data: signalRows },
        { data: workRows },
        { data: expRows },
        { data: eduRows },
        { data: contactMetaRows },
        { data: contactMethodRows },
      ] = await Promise.all([
        supabase.from("site_meta").select("*").limit(1),
        supabase.from("site_hero").select("*").limit(1),
        supabase.from("site_signal").select("*").limit(1),
        supabase.from("work_items").select("*").order("sort_order"),
        supabase.from("experience_items").select("*").order("sort_order"),
        supabase.from("education_items").select("*").order("sort_order"),
        supabase.from("contact_meta").select("*").limit(1),
        supabase.from("contact_methods").select("*").order("sort_order"),
      ]);

      return {
        meta: metaRows?.[0] ? mapMeta(metaRows[0]) : FALLBACK_CONTENT.meta,
        hero: heroRows?.[0] ? mapHero(heroRows[0]) : FALLBACK_CONTENT.hero,
        signal: signalRows?.[0]
          ? mapSignal(signalRows[0])
          : FALLBACK_CONTENT.signal,
        work: workRows?.map(mapWork) ?? FALLBACK_CONTENT.work,
        experience: expRows?.map(mapExperience) ?? FALLBACK_CONTENT.experience,
        education: eduRows?.map(mapEducation) ?? FALLBACK_CONTENT.education,
        contact: {
          intro: contactMetaRows?.[0]?.intro ?? FALLBACK_CONTENT.contact.intro,
          methods:
            contactMethodRows?.map(mapContactMethod) ??
            FALLBACK_CONTENT.contact.methods,
        },
      };
    } catch {
      return FALLBACK_CONTENT;
    }
  },
);
