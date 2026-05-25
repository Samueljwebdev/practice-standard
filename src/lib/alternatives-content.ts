export interface AlternativeContent {
  slug: string
  competitor: string
  metaTitle: string
  metaDescription: string
  headline: string
  subheadline: string
  competitorSummary: string
  painPoints: { heading: string; body: string }[]
  comparison: { feature: string; competitor: string; tps: string }[]
  faq: { q: string; a: string }[]
  cta: string
}

export const ALTERNATIVES: Record<string, AlternativeContent> = {

  "indeed": {
    slug: "indeed",
    competitor: "Indeed",
    metaTitle: "Indeed Alternative for Healthcare Jobs UK | The Practice Standard",
    metaDescription: "Looking for an Indeed alternative for private healthcare hiring? The Practice Standard reaches registered clinical professionals only — no unqualified flood, no £700/month spend.",
    headline: "There's a better alternative to Indeed for healthcare hiring.",
    subheadline: "Indeed reaches everyone. That's the problem. The Practice Standard reaches registered, regulated professionals actively looking for private practice roles — and nothing else.",
    competitorSummary: "Indeed is the world's largest job board with over 77% of UK job seeker market share. For general hiring it has reach. For regulated private healthcare hiring, that reach works against you — every clinical role attracts hundreds of unqualified applicants, and the cost of meaningful visibility has increased sharply.",
    painPoints: [
      {
        heading: "£700+ per month for one listing",
        body: "Since July 2025, Indeed requires a minimum sponsored budget of £25 per day per job. A single listing with meaningful visibility now costs over £700 per month — with no guarantee of quality applicants.",
      },
      {
        heading: "\"Virtually all applications from completely unqualified individuals\"",
        body: "That's a direct quote from an Indeed employer on Trustpilot. Industry data shows 68% of Indeed applicants fail initial screening for healthcare roles. Practices spend hours reviewing CVs from people with no clinical background.",
      },
      {
        heading: "No credential verification",
        body: "Anyone can apply to any clinical role on Indeed. There is no check that a candidate claiming to be a registered nurse, optometrist, or veterinary surgeon is actually registered with their professional body.",
      },
      {
        heading: "NHS-dominated candidate pool",
        body: "Healthcare professionals on Indeed are predominantly looking for NHS roles. Private practice vacancies get buried under NHS band progressions, and candidates who find you often aren't interested in private practice at all.",
      },
    ],
    comparison: [
      { feature: "Cost per listing", competitor: "£700+/month (sponsored)", tps: "£149 +VAT per listing" },
      { feature: "Candidate verification", competitor: "None — self-declared", tps: "Registered professionals only" },
      { feature: "Private practice focus", competitor: "No — all sectors", tps: "Yes — exclusively" },
      { feature: "Disciplines covered", competitor: "All sectors mixed", tps: "88 regulated healthcare professions" },
      { feature: "Candidate quality", competitor: "68% fail initial screening", tps: "Registered, active job seekers" },
      { feature: "NHS candidate noise", competitor: "Heavy — NHS-dominated", tps: "None — private practice only" },
    ],
    faq: [
      {
        q: "Is The Practice Standard cheaper than Indeed for healthcare hiring?",
        a: "Significantly. A single listing on The Practice Standard is £149 +VAT for 30 days. Indeed's minimum sponsored budget is now £25/day per job — that's £700+ per month for one listing, with no quality guarantee. Practice Pro at £249/month covers unlimited listings across all disciplines.",
      },
      {
        q: "Can I get better candidate quality than Indeed?",
        a: "Yes. Every professional on The Practice Standard is registered with their relevant regulatory body — NMC, RCVS, GOC, GDC, HCPC. Candidates who apply have specifically searched for private practice roles, not NHS positions.",
      },
      {
        q: "What types of roles can I post?",
        a: "Any regulated private healthcare role — veterinary, optometry, aesthetics, physiotherapy, private GP, dental, and more. 88 professions covered across all 12 UK regions.",
      },
      {
        q: "Do I need a contract or subscription?",
        a: "No contract needed. Pay per listing at £149 +VAT for occasional hiring. Or Practice Pro at £249/month for unlimited listings if you hire regularly.",
      },
    ],
    cta: "Post your first role for £149 — no Indeed budget required.",
  },

  "recruitment-agency": {
    slug: "recruitment-agency",
    competitor: "Healthcare Recruitment Agencies",
    metaTitle: "Healthcare Recruitment Agency Alternative UK | The Practice Standard",
    metaDescription: "Skip the 15–25% agency fee. Post private healthcare jobs from £149 on The Practice Standard — the self-serve job board for regulated UK private practices.",
    headline: "Why pay an agency £8,000 when you can post for £149?",
    subheadline: "Healthcare recruitment agencies charge 15–25% of first-year salary for every placement. The Practice Standard gives you direct access to the same registered professionals — without the markup or the relationship dependency.",
    competitorSummary: "Healthcare recruitment agencies — including specialist firms for dental, veterinary, aesthetics, and physiotherapy — remain the default hiring route for many private practices. They offer convenience and a personal service, but at a significant cost. A single £45k placement typically costs £6,750–£11,250 in agency fees.",
    painPoints: [
      {
        heading: "15–25% of salary on every placement",
        body: "A single aesthetic nurse hire at £45k costs £6,750–£11,250 in agency fees. For a practice making multiple hires per year, this becomes the second-largest staffing cost after salaries themselves.",
      },
      {
        heading: "No direct candidate relationship",
        body: "Agency hiring puts a consultant between you and the candidate. You see a shortlist, not the full pool. You rely on the agency's judgement about fit rather than your own. If the relationship breaks down, so does your pipeline.",
      },
      {
        heading: "Slow, process-heavy, not self-serve",
        body: "Briefing calls, shortlist turnarounds, interview scheduling through a third party. Agency hiring takes weeks even for urgent roles. There's no instant posting, no dashboard, no direct applicant access.",
      },
      {
        heading: "Repeat fees on every hire",
        body: "Agency fees don't compound — you pay them again for every placement, every time. There's no volume discount for loyalty, no subscription model. The more you hire, the more you pay.",
      },
    ],
    comparison: [
      { feature: "Cost per hire", competitor: "£6,750–£11,250 (15–25%)", tps: "£149 +VAT per listing" },
      { feature: "Unlimited hiring", competitor: "No — fee per placement", tps: "Yes — Practice Pro £249/mo" },
      { feature: "Direct candidate access", competitor: "No — via consultant", tps: "Yes — direct applications" },
      { feature: "Speed to post", competitor: "Days (briefing + shortlist)", tps: "Minutes" },
      { feature: "Control over selection", competitor: "Limited — agency filters", tps: "Full — you see all applicants" },
      { feature: "Multi-discipline coverage", competitor: "Usually one discipline", tps: "All 88 professions" },
    ],
    faq: [
      {
        q: "Can a self-serve job board really replace a recruitment agency?",
        a: "For most private practice hiring, yes. Recruitment agencies add value in executive search and highly specialist placements — but for clinical roles where candidates are already actively job-seeking, a targeted self-serve board reaches the same pool at a fraction of the cost.",
      },
      {
        q: "What if I need to hire urgently?",
        a: "Posting on The Practice Standard takes minutes. Your listing goes live immediately on payment and is visible to registered professionals in your discipline and region the same day.",
      },
      {
        q: "How does Practice Pro compare to agency costs?",
        a: "Practice Pro is £249/month for unlimited listings across all disciplines. A single agency placement typically costs more than a full year of Practice Pro. Most practices break even on their first successful hire.",
      },
      {
        q: "Are the candidates as good as what an agency would send?",
        a: "Every candidate on The Practice Standard is registered with their professional body — the same pool agencies draw from, minus the consultant's filter. You see all applicants and make your own judgement.",
      },
    ],
    cta: "Post your first role for £149 — no agency fee required.",
  },

  "nhs-jobs": {
    slug: "nhs-jobs",
    competitor: "NHS Jobs",
    metaTitle: "NHS Jobs Alternative for Private Practices UK | The Practice Standard",
    metaDescription: "Private practices can't post on NHS Jobs — and the candidates there want NHS careers, not private practice. The Practice Standard is built for private healthcare hiring.",
    headline: "NHS Jobs isn't for private practices. We are.",
    subheadline: "NHS Jobs is the NHS's internal recruitment system. Private practices can't post there — and even if they could, the candidates are looking for NHS band progressions, not private practice careers.",
    competitorSummary: "NHS Jobs (jobs.nhs.uk) is the official recruitment platform for NHS trusts and CQC-registered NHS organisations, managed by NHS Business Services Authority. It is free for NHS organisations and handles over 30,000 active NHS listings at any time. It is not accessible to private practices and is not designed for private practice hiring.",
    painPoints: [
      {
        heading: "Private practices cannot post on NHS Jobs",
        body: "NHS Jobs requires NHS employer registration through NHS Business Services Authority. Independent private practices — clinics, vet surgeries, aesthetics centres, private GP practices — are not eligible. It is simply not an option.",
      },
      {
        heading: "The candidates want NHS careers",
        body: "Professionals searching NHS Jobs are specifically looking for NHS pay bands, NHS pension, Agenda for Change terms, and NHS career progression. They are not your candidate. Reaching them wastes your time and theirs.",
      },
      {
        heading: "Built for large NHS organisations, not nimble private practices",
        body: "NHS Jobs is a heavy, process-driven application system designed for NHS trusts with HR departments and compliance teams. The application flow, job description templates, and candidate tracking are all built for NHS scale — not for a 5-person private clinic posting their first role.",
      },
    ],
    comparison: [
      { feature: "Private practice posting", competitor: "Not available", tps: "Yes — built for it" },
      { feature: "Cost", competitor: "Free (NHS only)", tps: "£149 +VAT per listing" },
      { feature: "Candidate intent", competitor: "NHS career seekers", tps: "Private practice seekers" },
      { feature: "Disciplines", competitor: "NHS roles only", tps: "88 regulated private professions" },
      { feature: "Self-serve posting", competitor: "No — NHS HR process", tps: "Yes — live in minutes" },
      { feature: "UK regions", competitor: "NHS trust geography", tps: "All 12 UK regions" },
    ],
    faq: [
      {
        q: "Can a private practice post on NHS Jobs at all?",
        a: "No. NHS Jobs requires registration as an NHS employer through NHS Business Services Authority. Independent private practices — including private GP clinics, dental practices, aesthetic clinics, and veterinary surgeries — are not eligible to post.",
      },
      {
        q: "Are there healthcare professionals looking for private practice roles specifically?",
        a: "Yes — and that's the gap The Practice Standard fills. Many registered nurses, vets, optometrists, and allied health professionals actively want to move out of the NHS into private practice. They're not on NHS Jobs looking for that role — they're on platforms built for private practice.",
      },
      {
        q: "What's the difference between NHS and private practice candidates?",
        a: "NHS candidates are typically seeking NHS pay bands, NHS pension, and structured NHS career progression. Private practice candidates want independent clinical environments, higher earning potential, and freedom from NHS bureaucracy. The two pools have different motivations and rarely overlap.",
      },
    ],
    cta: "Post your private practice role — from £149.",
  },

  "reed": {
    slug: "reed",
    competitor: "Reed",
    metaTitle: "Reed Alternative for Healthcare Jobs UK | The Practice Standard",
    metaDescription: "Looking for a Reed alternative for private healthcare hiring? The Practice Standard is built specifically for regulated private practices — better quality, lower cost.",
    headline: "Reed sends 26 million candidates. Most of them are wrong for you.",
    subheadline: "Reed's scale is its selling point — and its weakness. 26 million registered candidates across every sector means your clinical role competes with everything from barista to barrister. The Practice Standard reaches only registered healthcare professionals looking for private practice work.",
    competitorSummary: "Reed.co.uk is the UK's largest native job board with 26 million registered candidates and 70,000 new CVs uploaded weekly. It covers every sector and role type. Reed Healthcare is a separate recruitment agency division — not the same as the Reed.co.uk job board. For private healthcare practices, Reed's scale creates noise rather than value.",
    painPoints: [
      {
        heading: "No healthcare filtering or credential verification",
        body: "Reed's 26 million candidates include everyone. There's no mechanism to verify that someone applying to a clinical role is actually registered with their professional body. Practices report receiving applications from entirely unrelated sectors.",
      },
      {
        heading: "Pricing that escalates quickly",
        body: "Reed's headline price of £89 +VAT per listing is for minimal visibility. Useful placement costs £199–£799 +VAT. A monthly subscription at £100+ unlocks CV access but the database is not healthcare-filtered.",
      },
      {
        heading: "Reed Healthcare is an agency, not the board",
        body: "Reed Healthcare (the recruitment agency) and Reed.co.uk (the job board) are separate products. If you've dealt with Reed as a recruiter, the job board experience is completely different — and the agency's 15–25% placement fees still apply.",
      },
      {
        heading: "NHS-heavy candidate pool",
        body: "Healthcare professionals on Reed are predominantly searching for NHS or general employment roles. Private practice vacancies sit alongside NHS band roles with no distinction, reducing candidate quality for private practices specifically.",
      },
    ],
    comparison: [
      { feature: "Cost per listing", competitor: "£89–£799 +VAT", tps: "£149 +VAT per listing" },
      { feature: "Candidate verification", competitor: "None", tps: "Registered professionals only" },
      { feature: "Private practice focus", competitor: "No — all sectors", tps: "Yes — exclusively" },
      { feature: "Disciplines covered", competitor: "All sectors", tps: "88 regulated healthcare professions" },
      { feature: "Candidate pool", competitor: "26M, unfiltered", tps: "Private practice seekers only" },
      { feature: "Multi-discipline private hiring", competitor: "No specialist support", tps: "Yes — all disciplines in one place" },
    ],
    faq: [
      {
        q: "Is The Practice Standard cheaper than Reed?",
        a: "At the level of visibility that matters, yes. Reed's basic listing at £89 +VAT delivers minimal reach. Meaningful placement on Reed costs £199–£799 +VAT. The Practice Standard is £149 +VAT with full placement across all relevant profession and region pages.",
      },
      {
        q: "What about Reed Healthcare — is that different?",
        a: "Yes. Reed Healthcare is a recruitment agency (separate from Reed.co.uk) that charges placement fees of 15–25% of salary. The Practice Standard is a self-serve job board at £149 per listing — no agency involvement, no placement fee.",
      },
      {
        q: "Can I post multiple disciplines on The Practice Standard?",
        a: "Yes — all 88 regulated private healthcare professions in one platform. A mixed practice posting dental, aesthetics, and physiotherapy roles can manage everything from one dashboard.",
      },
    ],
    cta: "Post your first role for £149 — private practice only.",
  },

  "bdj-jobs": {
    slug: "bdj-jobs",
    competitor: "BDJ Jobs",
    metaTitle: "BDJ Jobs Alternative for Dental Practices UK | The Practice Standard",
    metaDescription: "BDJ Jobs costs up to £790 +VAT per listing. The Practice Standard is £149 +VAT — and covers every role in your practice, not just dental.",
    headline: "BDJ Jobs charges up to £790 per listing. We charge £149.",
    subheadline: "BDJ Jobs is the BDA's official dental job board and a trusted platform — but at up to £790 +VAT per listing, it's one of the most expensive specialist boards in the UK. The Practice Standard covers dental and every other discipline in your practice, for less.",
    competitorSummary: "BDJ Jobs (bdjjobs.com) is the British Dental Association's official recruitment platform, backed by the British Dental Journal. It's well-regarded within dentistry and reaches around 18,000 monthly visitors. Pricing for non-BDA members ranges from £155 to £790 +VAT per listing depending on role type.",
    painPoints: [
      {
        heading: "£430–£790 +VAT per listing for non-BDA members",
        body: "A single 30-day Essential listing for a dentist or associate on BDJ Jobs costs £490 +VAT for non-members, and £430 +VAT with BDA membership. Premium and Promoted listings reach £690–£790 +VAT. For a practice hiring regularly, these costs accumulate rapidly.",
      },
      {
        heading: "Dental only — no support for mixed practices",
        body: "Dental practices increasingly operate alongside aesthetics, facial medicine, and allied health services. BDJ Jobs cannot help you hire an aesthetic practitioner, practice manager, or treatment coordinator outside the dental context. Every non-dental role needs a different platform.",
      },
      {
        heading: "NHS and private mixed — no private-only filter",
        body: "BDJ Jobs lists both NHS and private dental roles without distinction. Candidates cannot filter for private practice specifically, meaning your private role competes with NHS listings in the same search results.",
      },
    ],
    comparison: [
      { feature: "Cost per listing", competitor: "£430–£790 +VAT", tps: "£149 +VAT" },
      { feature: "Disciplines covered", competitor: "Dental only", tps: "All 88 — including all dental professions" },
      { feature: "Private practice filter", competitor: "No — NHS + private mixed", tps: "Yes — private practice only" },
      { feature: "BDA membership required for best price", competitor: "Yes", tps: "No" },
      { feature: "Unlimited listings", competitor: "Pay per listing only", tps: "Practice Pro — £249/month unlimited" },
      { feature: "Non-dental roles", competitor: "Not supported", tps: "All disciplines in one dashboard" },
    ],
    faq: [
      {
        q: "Is The Practice Standard a good BDJ Jobs alternative for dental practices?",
        a: "Yes — especially for private dental practices. The Practice Standard covers all dental professions (general dentist, associate dentist, dental hygienist, dental nurse, treatment coordinator, practice manager and more) at £149 +VAT per listing, versus £430–£790 +VAT on BDJ Jobs.",
      },
      {
        q: "Does The Practice Standard cover dental roles specifically?",
        a: "Yes. The Practice Standard covers all regulated dental professions — dentists, orthodontists, dental hygienists, dental therapists, dental nurses, and dental practice managers — as well as every other regulated private healthcare profession.",
      },
      {
        q: "What if my practice offers dental plus aesthetics or facial medicine?",
        a: "The Practice Standard is the only job board that covers both. Post your dental associate role and your aesthetic practitioner role from the same dashboard, at the same price.",
      },
    ],
    cta: "Post your dental role from £149 — no BDA membership required.",
  },

  "vet-times-jobs": {
    slug: "vet-times-jobs",
    competitor: "Vet Times Jobs",
    metaTitle: "Vet Times Jobs Alternative for Veterinary Practices UK | The Practice Standard",
    metaDescription: "Vet Times Jobs charges £595 +VAT per listing. The Practice Standard is £149 +VAT — self-serve, instant, and covers every role in your practice.",
    headline: "Vet Times charges £595 per listing. We charge £149.",
    subheadline: "Vet Times Jobs is backed by the UK's leading veterinary trade publication and has genuine reach within the profession. But at £595 +VAT for a single Bronze listing, it's the most expensive specialist board per post — and it requires direct contact for anything beyond basic. The Practice Standard is self-serve, instant, and £149.",
    competitorSummary: "Vet Times Jobs (jobs.vettimes.com) is the recruitment platform backed by Vet Times, the UK's most widely-read veterinary trade publication. It has strong brand recognition among UK vets and veterinary nurses. Bronze listings start at £595 +VAT for 28 days. Silver and Gold packages require direct contact and are priced on enquiry.",
    painPoints: [
      {
        heading: "£595 +VAT for a single 28-day Bronze listing",
        body: "The entry-level listing on Vet Times Jobs is £595 +VAT for 28 days. For a small independent vet practice making occasional hires, this is a significant outlay per role — especially compared to £149 on The Practice Standard.",
      },
      {
        heading: "Not self-serve — Silver and Gold require contact",
        body: "Beyond the basic Bronze package, Vet Times Jobs requires direct contact with their team for Silver and Gold packages. There's no instant online posting for premium placement — you're back in the world of briefing calls and deadlines.",
      },
      {
        heading: "Print dependency adds complexity",
        body: "Vet Times Jobs packages include print advertising in the Vet Times magazine as a feature. This means submission deadlines, lead times, and format requirements — adding friction for time-sensitive hiring.",
      },
      {
        heading: "Veterinary only",
        body: "A vet practice that also employs a physiotherapist, practice manager, or receptionist needs separate platforms for those roles. Vet Times Jobs only covers veterinary professions.",
      },
    ],
    comparison: [
      { feature: "Cost per listing (entry)", competitor: "£595 +VAT (Bronze, 28 days)", tps: "£149 +VAT (30 days)" },
      { feature: "Self-serve posting", competitor: "Bronze only — Silver/Gold by enquiry", tps: "Fully self-serve — live in minutes" },
      { feature: "Disciplines covered", competitor: "Veterinary only", tps: "All 88 — including all vet professions" },
      { feature: "Print dependency", competitor: "Yes — submission deadlines", tps: "No — digital only, instant" },
      { feature: "Unlimited listings", competitor: "Pay per listing", tps: "Practice Pro — £249/month unlimited" },
      { feature: "Non-vet roles", competitor: "Not supported", tps: "All disciplines in one dashboard" },
    ],
    faq: [
      {
        q: "Is The Practice Standard a credible Vet Times Jobs alternative?",
        a: "Yes. The Practice Standard covers all veterinary professions — vets, veterinary nurses, practice managers, receptionists — at £149 +VAT per listing. Vet Times Jobs starts at £595 +VAT for the same 28–30 day window.",
      },
      {
        q: "Does The Practice Standard reach enough veterinary candidates?",
        a: "We're building the candidate pool specifically for private practice. Every vet professional on the platform is registered with the RCVS and is actively seeking private practice roles — a more targeted pool than general veterinary boards that mix corporate, charity, and NHS-adjacent roles.",
      },
      {
        q: "What if I need to hire a vet and a practice manager?",
        a: "Post both from the same dashboard. The Practice Standard covers both clinical and operational roles across all disciplines — no need for multiple platforms or multiple subscriptions.",
      },
    ],
    cta: "Post your vet role from £149 — live in minutes, no print deadlines.",
  },
}

export function getAlternative(slug: string): AlternativeContent | null {
  return ALTERNATIVES[slug] ?? null
}
