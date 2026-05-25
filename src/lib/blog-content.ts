export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; heading?: string; text: string }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "table"; headers: string[]; rows: string[][] }

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readingTime: string
  blocks: Block[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-hire-aesthetic-nurse-prescriber",
    title: "How to Hire an Aesthetic Nurse Prescriber Without Agency Fees",
    description: "What aesthetic nurse prescribers actually look for in a clinic, what NMC registration and V300 mean for your hiring process, and how to attract the right candidate without paying 20% to a recruiter.",
    date: "2026-05-20",
    category: "Aesthetics",
    readingTime: "7 min read",
    blocks: [
      {
        type: "p",
        text: "Aesthetic nurse prescribers are among the most sought-after clinical professionals in the UK right now. The combination of NMC registration, independent prescribing qualification, and hands-on aesthetic experience is rare — and expensive when you go through an agency. A nurse on a £45,000 salary costs £6,750 to £11,250 in agency fees alone. Here's how to hire one directly.",
      },
      {
        type: "h2",
        text: "What is an aesthetic nurse prescriber?",
      },
      {
        type: "p",
        text: "An aesthetic nurse prescriber is a registered nurse (RN) on the NMC register who holds an independent prescribing (IP) qualification — typically the V300 prescribing qualification. This qualification, completed at degree level, allows them to prescribe prescription-only medicines (POMs) independently, including botulinum toxin (Botox), dermal fillers containing lidocaine, and skin-conditioning treatments.",
      },
      {
        type: "p",
        text: "Not all aesthetic nurses are prescribers. Some work under a prescribing supervisor and cannot prescribe independently. When hiring, clarify whether you need a V300 independent prescriber or whether a nurse working under a prescribing supervisor arrangement is acceptable for your service model.",
      },
      {
        type: "callout",
        heading: "Prescribing check",
        text: "Ask candidates to confirm their NMC pin number and prescriber status at application stage. You can verify NMC registration at nmc.org.uk/registration/search-the-register.",
      },
      {
        type: "h2",
        text: "What salary should you offer?",
      },
      {
        type: "p",
        text: "Based on 2025–2026 market data, UK aesthetic nurse prescribers command the following salary ranges:",
      },
      {
        type: "table",
        headers: ["Experience", "London / South East", "Rest of UK"],
        rows: [
          ["1–2 years post-qualification", "£42,000–£52,000", "£36,000–£46,000"],
          ["3–5 years experience", "£52,000–£65,000", "£44,000–£58,000"],
          ["5+ years / senior / clinical lead", "£65,000–£80,000+", "£55,000–£70,000"],
        ],
      },
      {
        type: "p",
        text: "These figures assume employed positions. Self-employed or associate arrangements typically operate on a commission split (commonly 40–60% to the practitioner) or a day rate (£350–£550/day). If you're hiring employed, London and South East candidates often expect 15–25% above the base figures above.",
      },
      {
        type: "h2",
        text: "What do aesthetic nurse prescribers actually look for in a clinic?",
      },
      {
        type: "p",
        text: "Salary matters, but it is rarely the deciding factor for experienced prescribers who receive multiple approaches. When you write your job listing or speak to candidates, address these points directly.",
      },
      {
        type: "h3",
        text: "1. Indemnity cover",
      },
      {
        type: "p",
        text: "Independent prescribers need specific indemnity that covers their prescribing activity. Many clinics expect practitioners to source their own indemnity (MDDUS, MDU, Hamilton Fraser), which is acceptable — but the cost (£2,000–£5,000/year depending on scope) is a real overhead. If your clinic provides or contributes to indemnity costs, say so explicitly. It is a significant differentiator.",
      },
      {
        type: "h3",
        text: "2. CPD budget and product training",
      },
      {
        type: "p",
        text: "Aesthetic prescribers need ongoing training to maintain competency and expand their service range. An annual CPD allowance of £1,500–£3,000 is standard at clinics that retain good practitioners. If you work with specific product partners (Allergan, Galderma, Sinclair) who provide rep training, mention it. Practitioners weigh this alongside salary.",
      },
      {
        type: "h3",
        text: "3. Treatment autonomy",
      },
      {
        type: "p",
        text: "Prescribers who have left clinic environments describe a common frustration: being told which products to use, being prevented from declining patients they don't consider suitable, or having quotas placed on treatment volume. If your clinic gives practitioners genuine clinical autonomy — including the right to decline treatments — this is worth stating clearly in your listing.",
      },
      {
        type: "h3",
        text: "4. Equipment and environment",
      },
      {
        type: "p",
        text: "The quality of cannulas, needles, product brands, treatment rooms, and clinic hygiene standards matters. Practitioners who have worked in well-run clinics will notice immediately when something is substandard. If you use premium consumables or have recently refurbished treatment rooms, say so.",
      },
      {
        type: "h3",
        text: "5. Supervision and support",
      },
      {
        type: "p",
        text: "Junior prescribers (1–3 years post-qualification) often want access to a senior clinical lead or named supervisor for complex cases or complications. If you can offer this, it broadens your candidate pool considerably.",
      },
      {
        type: "h2",
        text: "How to write a listing that attracts prescribers",
      },
      {
        type: "p",
        text: "Most aesthetic job listings fail for the same reason: they describe what the candidate will do rather than why the clinic is worth joining. Prescribers get multiple messages per week — your listing needs to stand out.",
      },
      {
        type: "ul",
        items: [
          "State the salary range in the listing (candidates will skip listings without a salary range)",
          "List the indemnity arrangement and any CPD budget",
          "Name the products you use (Allergan, Galderma, Sinclair, Teoxane — brand familiarity matters)",
          "Describe your clinic's patient demographic and volume (appointment numbers per day)",
          "State whether NMC V300 is required or preferred",
          "Include your CQC registration number or note that the clinic operates under a prescribing protocol",
        ],
      },
      {
        type: "h2",
        text: "Why avoid an agency?",
      },
      {
        type: "p",
        text: "Healthcare recruitment agencies for aesthetics typically charge 15–25% of the candidate's first-year salary. On a £45,000 hire, that is £6,750–£11,250 — a cost that recurs every time the practitioner leaves and is replaced. The fee buys you access to a shortlist that the agency has sourced, often from the same online platforms you could access yourself.",
      },
      {
        type: "p",
        text: "Aesthetic nurse prescribers who are actively looking will search online job boards. Those who are passively looking can be reached through social media. An agency adds an intermediary — and a significant invoice — to a process you can run yourself for £149.",
      },
      {
        type: "callout",
        heading: "Ready to post?",
        text: "List your aesthetic nurse prescriber role on The Practice Standard from £149 +VAT. Visible across all UK aesthetic profession and region pages. No agency fees.",
      },
    ],
  },
  {
    slug: "real-cost-healthcare-recruitment-2026",
    title: "The Real Cost of Healthcare Recruitment in 2026",
    description: "UK healthcare practices are paying £6,000–£15,000 per hire in agency fees. Here's what recruitment actually costs across aesthetics, veterinary, physiotherapy, and private medical — and what to do about it.",
    date: "2026-05-15",
    category: "Hiring",
    readingTime: "6 min read",
    blocks: [
      {
        type: "p",
        text: "Healthcare recruitment in the UK has a cost problem that most practice managers are aware of but rarely quantify precisely. Agency fees are presented as a percentage — usually 15–25% — which sounds manageable until you apply it to actual salaries. This guide breaks down what recruitment really costs across the main private healthcare disciplines in 2026, and the alternatives available.",
      },
      {
        type: "h2",
        text: "The agency fee structure",
      },
      {
        type: "p",
        text: "UK healthcare recruitment agencies typically charge a placement fee calculated as a percentage of the candidate's first-year base salary. The standard range is 15–25%, with most agencies positioning themselves at 18–22% for clinical hires and 12–15% for non-clinical and administrative roles.",
      },
      {
        type: "p",
        text: "This fee is usually invoiced when the candidate completes a defined period of employment — commonly 28 days. Most agencies offer a rebate (partial refund) if the candidate leaves within a rebate period, typically 3–12 months on a sliding scale. Read these clauses carefully: a candidate who leaves at month 4 may generate only a 25–50% rebate, depending on the contract.",
      },
      {
        type: "h2",
        text: "What recruitment costs by discipline",
      },
      {
        type: "stats",
        items: [
          { value: "£6,750–£11,250", label: "Aesthetic nurse prescriber (£45k salary, 15–25% fee)" },
          { value: "£5,250–£8,750", label: "Senior veterinarian (£35k salary, 15–25% fee)" },
          { value: "£5,250–£10,000", label: "MSK physiotherapist (£35–40k salary, 15–25% fee)" },
          { value: "£12,750–£21,250", label: "Salaried private GP (£85k salary, 15–25% fee)" },
        ],
      },
      {
        type: "p",
        text: "These figures represent the direct agency invoice. They do not include the internal costs that accrue before and after placement.",
      },
      {
        type: "h2",
        text: "The hidden costs agencies don't mention",
      },
      {
        type: "h3",
        text: "Lost revenue from vacancy",
      },
      {
        type: "p",
        text: "A vacant clinical chair costs revenue every day it sits empty. An aesthetic clinic running at 80% capacity with a £45,000 nurse vacancy loses approximately £1,500–£3,000/month in appointments that cannot be filled. A veterinary vacancy in a busy independent practice can cost £500–£1,200/week in diverted or declined appointments. If the agency takes 6–12 weeks to place a candidate — typical — this hidden cost adds £3,000–£15,000 on top of the placement fee.",
      },
      {
        type: "h3",
        text: "Onboarding and training time",
      },
      {
        type: "p",
        text: "Even an experienced hire requires onboarding: learning your systems, meeting your patient base, understanding your protocols. Practice managers consistently report that new clinical hires operate at 60–70% capacity for their first 6–8 weeks. Managerial time spent on onboarding (inductions, system training, compliance checks) is rarely costed but typically runs to 15–25 hours per hire.",
      },
      {
        type: "h3",
        text: "Repeat recruitment cycles",
      },
      {
        type: "p",
        text: "Agency placements are not guaranteed to be permanent. UK healthcare has high attrition in certain disciplines — particularly veterinary nursing (estimated 30–40% annual turnover in some clinic types) and aesthetics (where practitioners frequently move to higher-commission environments). If a placement doesn't work out after the rebate window, you pay the full fee again.",
      },
      {
        type: "h2",
        text: "The direct-hire alternative",
      },
      {
        type: "p",
        text: "Direct-hire through a specialist job board eliminates the agency intermediary entirely. The comparison:",
      },
      {
        type: "table",
        headers: ["Route", "Direct cost", "Timeline", "Quality filter"],
        rows: [
          ["Specialist agency", "£5,000–£21,000 fee", "6–12 weeks", "Agency-managed shortlist"],
          ["Indeed (sponsored)", "£700+/month ongoing", "2–8 weeks", "Unfiltered, all sectors"],
          ["NHS Jobs", "Free", "4–10 weeks", "NHS-only candidates"],
          ["The Practice Standard", "£149 +VAT per listing", "1–6 weeks", "Registered professionals, private practice only"],
        ],
      },
      {
        type: "h2",
        text: "What direct hire requires from you",
      },
      {
        type: "p",
        text: "Hiring directly is not cost-free. It requires investment in the listing itself (a well-written listing, clear salary range, described benefits) and time to manage applications. The trade-off is that this investment is 30–60 minutes of your time and £149 — compared to £6,750–£21,000 for an equivalent agency placement.",
      },
      {
        type: "ul",
        items: [
          "Write a listing that includes salary range, indemnity arrangement, and CPD budget",
          "Set aside time to review applications (most specialist job boards filter to registered professionals)",
          "Prepare 2–3 interview questions specific to your discipline and patient demographic",
          "Check registration status directly with NMC, RCVS, HCPC, or GOC depending on the role",
          "Make an offer within 5 working days — candidates at this level move quickly",
        ],
      },
      {
        type: "h2",
        text: "When agencies are worth it",
      },
      {
        type: "p",
        text: "Agencies add real value in a narrow set of circumstances: when you need to hire confidentially (replacing an existing employee who hasn't given notice), when you need to hire at volume (opening a new site and staffing it simultaneously), or when the role is highly specialist with a very small pool of candidates nationally. For standard clinical hires in aesthetics, veterinary, physiotherapy, and private medical — the roles most independent practices are filling — a direct approach will typically yield better results faster at a fraction of the cost.",
      },
      {
        type: "callout",
        heading: "The maths",
        text: "One agency placement at 20% on a £45k salary costs £9,000. Practice Pro at £249/month gives you unlimited listings for three years for the same price. Every hire after the first is at zero marginal cost.",
      },
    ],
  },
  {
    slug: "what-private-practice-candidates-want-2026",
    title: "What Private Practice Candidates Actually Want in 2026",
    description: "Salary isn't the top priority for experienced healthcare professionals choosing a new role. Here's what really drives applications — and what your job listing is probably missing.",
    date: "2026-05-10",
    category: "Hiring",
    readingTime: "5 min read",
    blocks: [
      {
        type: "p",
        text: "Most private practice job listings make the same mistake: they describe the job, not the opportunity. They list responsibilities, requirements, and a salary range — then wonder why applications are scarce. Here's what candidates in UK private practice disciplines are actually looking for in 2026, based on what consistently drives applications and acceptances.",
      },
      {
        type: "h2",
        text: "1. CPD budget and learning opportunities",
      },
      {
        type: "p",
        text: "CPD (continuing professional development) investment is the single most commonly cited factor in applications from clinical professionals — consistently ranking above salary in exit surveys and career preference studies across nursing, physiotherapy, and veterinary disciplines. It matters for two reasons: it signals that the employer values clinical excellence, and it represents a concrete financial benefit.",
      },
      {
        type: "p",
        text: "An annual CPD budget of £1,500–£3,000 is standard at practices that retain good staff. If you fund CPD, state the amount. If you have a product partner relationship (e.g., an Allergan or Galderma account for aesthetics, or an Idexx account for veterinary) that provides training access, mention it. These feel like small details to employers; they are significant factors to candidates.",
      },
      {
        type: "h2",
        text: "2. Indemnity cover",
      },
      {
        type: "p",
        text: "For prescribing clinicians — aesthetic nurse prescribers, GPs, consultant specialists — indemnity cover is a major practical concern. Annual premiums from MDDUS, MDU, and Hamilton Fraser run to £2,000–£6,000+ depending on scope of practice. Whether your clinic provides, contributes to, or requires self-funded indemnity is a material financial consideration.",
      },
      {
        type: "p",
        text: "Candidates read listings looking for this information. If it is not in the listing, they assume they will need to fund it themselves and factor that into their effective take-home pay. State your indemnity arrangement explicitly — it is one of the most frequently asked questions at interview stage.",
      },
      {
        type: "h2",
        text: "3. Clinical autonomy",
      },
      {
        type: "p",
        text: "Experienced clinicians leave roles primarily because of clinical frustration. Being told which treatments to offer, which products to use, or being pressured to accept patients they consider clinically unsuitable are the most commonly cited push factors in private practice. Autonomy is not just a nice-to-have — it is a retention mechanism.",
      },
      {
        type: "p",
        text: "If your clinic gives practitioners genuine clinical freedom, describe it in the listing: 'You will have full autonomy over your treatment decisions and are always supported in declining treatments that are not in the patient's best interest.'",
      },
      {
        type: "h2",
        text: "4. Work environment and patient demographic",
      },
      {
        type: "p",
        text: "Candidates want to visualise their working day before they apply. High-performing listings describe the patient demographic, appointment model, and physical environment in concrete terms.",
      },
      {
        type: "ul",
        items: [
          "How many patients do you see per day, and what is the appointment length?",
          "What is your patient demographic (age range, presenting conditions, treatment types)?",
          "What does the treatment environment look like — number of rooms, equipment quality, support staff?",
          "Is there a clinical lead or senior practitioner on site?",
          "How does the rota work — fixed days, flex scheduling, on-call requirements?",
        ],
      },
      {
        type: "h2",
        text: "5. Salary transparency",
      },
      {
        type: "p",
        text: "Listings without a salary range receive significantly fewer applications than those with one. Candidates assume the worst — either the salary is below market or the employer is using the opacity to negotiate down. Stating a range (even a wide one) signals transparency and saves both parties time.",
      },
      {
        type: "p",
        text: "The one exception: if you are genuinely open to negotiation based on candidate experience and can offer well above market for the right person, saying 'salary competitive, depending on experience' with a floor figure mentioned is more effective than a narrow band.",
      },
      {
        type: "h2",
        text: "6. Progression and career development",
      },
      {
        type: "p",
        text: "Candidates at 2–5 years post-qualification are actively thinking about their next clinical or career step. If your practice can offer a route to senior practitioner, clinical lead, or partnership, that is relevant to your listing. Even smaller signals matter: 'we will support your application for advanced clinical training' or 'there is an option to extend into a clinical director capacity as we grow' changes how candidates read your offer.",
      },
      {
        type: "h2",
        text: "What your listing is probably missing",
      },
      {
        type: "p",
        text: "Run a quick audit of your last job listing against this checklist:",
      },
      {
        type: "ol",
        items: [
          "Does it state the salary range (not just 'competitive')?",
          "Does it mention the CPD budget or training support?",
          "Does it describe the indemnity arrangement?",
          "Does it describe the patient demographic and appointment volume?",
          "Does it describe the physical environment?",
          "Does it describe the team — who they'll be working with?",
          "Does it describe any progression pathway?",
          "Does it convey a reason to choose this clinic specifically?",
        ],
      },
      {
        type: "p",
        text: "Most listings cover items 1 and (partially) 2. The clinics that consistently attract strong applicants cover all eight.",
      },
      {
        type: "callout",
        heading: "Write a better listing",
        text: "Post on The Practice Standard from £149 +VAT and reach registered professionals who are actively looking for private practice roles. Your listing appears across all relevant profession and region pages.",
      },
    ],
  },
  {
    slug: "uk-veterinary-staffing-crisis-independent-practices",
    title: "The UK Veterinary Staffing Crisis: What Independent Practices Need to Know",
    description: "Post-Brexit registration figures, RCVS workforce data, and what independent practices can do to compete for veterinary staff without matching corporate chains on pay.",
    date: "2026-05-05",
    category: "Veterinary",
    readingTime: "7 min read",
    blocks: [
      {
        type: "p",
        text: "UK veterinary practices are in a staffing crisis that has been building since 2016 and accelerated sharply after Brexit. The profession is facing simultaneous pressures: a significant reduction in European-trained vets entering the UK workforce, rapid corporate consolidation changing the employment landscape, and a workforce that is visibly burning out. For independent practices competing for staff without the resources of CVS, IVC, or VetPartners, understanding the landscape is the first step to navigating it.",
      },
      {
        type: "h2",
        text: "The post-Brexit workforce gap",
      },
      {
        type: "p",
        text: "Before Brexit, European Economic Area (EEA) trained vets could register with the RCVS on the basis of mutual recognition of qualifications. In the period 2015–2019, EEA-trained vets accounted for approximately 40–50% of new registrations annually. The combination of Brexit uncertainty from 2016 and formal implementation in 2021 sharply reduced this pipeline.",
      },
      {
        type: "p",
        text: "RCVS registration data shows a significant decline in EEA-trained vet registrations post-2020. The gap has been partially offset by increased UK veterinary school output and non-EEA international graduates, but domestic training capacity cannot expand quickly enough to fill the structural shortfall. The RCVS Workforce Action Plan, published in 2021 and updated in 2023, identifies workforce availability as the single largest threat to veterinary service continuity in the UK.",
      },
      {
        type: "h2",
        text: "Corporate consolidation and what it means for wages",
      },
      {
        type: "p",
        text: "The UK veterinary market has experienced rapid consolidation over the past decade. Corporate groups — CVS, IVC Evidensia, VetPartners, Medivet, and others — now own a substantial proportion of UK practices. The British Veterinary Association (BVA) estimates that corporate-owned practices now account for over 40% of veterinary practices in the UK.",
      },
      {
        type: "p",
        text: "This consolidation has changed the salary and benefits baseline that candidates expect. Corporate groups can offer centralised benefits: pension contributions above the legal minimum, group indemnity arrangements, formal CPD programmes with dedicated learning platforms, structured progression paths, and employee assistance programmes. Independent practices that simply match NHS pay scales and offer a standard contract are competing in a market that has moved on.",
      },
      {
        type: "stats",
        items: [
          { value: "40%+", label: "UK vet practices now owned by corporate groups" },
          { value: "£35k–£65k", label: "Typical salary range for experienced vets in private practice" },
          { value: "30–40%", label: "Estimated annual turnover rate in some vet nursing roles" },
          { value: "7+ years", label: "UK veterinary degree duration (including foundation year)" },
        ],
      },
      {
        type: "h2",
        text: "What veterinary candidates want from independent practices",
      },
      {
        type: "p",
        text: "The good news for independent practices is that many veterinary professionals actively prefer independent practice to corporate environments — but only when the independent practice can articulate what makes it better. The most common reasons vets cite for preferring independent practices:",
      },
      {
        type: "ul",
        items: [
          "Clinical autonomy: freedom to practise without corporate protocols overriding clinical judgement",
          "Relationship continuity: seeing the same patients over time rather than high-volume transactional consultations",
          "Culture and ownership: a sense of being part of something specific, not a unit in a national network",
          "Genuine input into practice development: the ability to influence how the practice evolves",
          "Lower administrative burden: less documentation overhead than large corporate practices",
        ],
      },
      {
        type: "p",
        text: "None of these are salary factors. They are positioning factors — and they require you to articulate them in your listing.",
      },
      {
        type: "h2",
        text: "What independent practices can offer that corporates cannot",
      },
      {
        type: "h3",
        text: "Genuine clinical autonomy",
      },
      {
        type: "p",
        text: "Corporate practices increasingly implement standardised protocols, preferred product lists, and performance metrics that constrain clinical decision-making. If your practice gives vets genuine freedom to refer, prescribe, and recommend according to their clinical judgement — without pressure toward in-house revenue targets — say so. This is a significant differentiator.",
      },
      {
        type: "h3",
        text: "Patient continuity and relationship medicine",
      },
      {
        type: "p",
        text: "Many vets leave corporate practices specifically because they never see the same patient twice. If your practice operates a continuity model where practitioners build ongoing client relationships, this is worth highlighting in your listing and at interview.",
      },
      {
        type: "h3",
        text: "Equity pathways",
      },
      {
        type: "p",
        text: "Independent practices can offer something no corporate group can: eventual ownership. A junior vet joining at 28 in an independent practice with a clear partnership or buy-in pathway has a materially different career prospect than a junior vet joining CVS. If this is a genuine option at your practice, it belongs in your listing.",
      },
      {
        type: "h2",
        text: "Where to find veterinary candidates",
      },
      {
        type: "p",
        text: "RCVS Jobs charges £595 +VAT per listing and is the established vet-specific board. Vet Times Jobs charges a similar rate. Both are vet-only platforms. The practical reality is that vets also search on broader platforms — and the best candidates are often passively looking rather than actively refreshing Vet Times daily.",
      },
      {
        type: "p",
        text: "Posting on a specialist private practice board that covers veterinary alongside other clinical disciplines reaches a different candidate pool: professionals who are specifically looking for private practice roles rather than volume hospital positions. It also costs significantly less — £149 versus £595.",
      },
      {
        type: "callout",
        heading: "Competing without the corporate budget",
        text: "Post your veterinary role on The Practice Standard from £149 +VAT. Visible to registered RCVS professionals across all UK regions. Write a listing that sells your practice's independence, culture, and clinical environment — that's what candidates are actually looking for.",
      },
    ],
  },
  {
    slug: "private-practice-hiring-guide-2026",
    title: "Private Practice Hiring in 2026: The Complete Guide",
    description: "A step-by-step guide to hiring clinical and management staff for a UK private healthcare practice — from writing the listing to making the offer, without paying agency fees.",
    date: "2026-04-28",
    category: "Hiring",
    readingTime: "9 min read",
    blocks: [
      {
        type: "p",
        text: "UK private healthcare is growing. The NHS waiting list of over 7 million patients has pushed a significant volume of referrals and self-pay activity into independent sector services, and the private healthcare market is estimated to exceed £12 billion annually. That growth creates hiring pressure — and a set of practices that need to hire clinical and management staff quickly, affordably, and without the quality problems that come from using generic job boards or expensive agencies.",
      },
      {
        type: "p",
        text: "This guide covers the complete hiring process for UK private practices across aesthetics, veterinary, optometry, physiotherapy, and private medical disciplines.",
      },
      {
        type: "h2",
        text: "Step 1: Define the role before you write a word",
      },
      {
        type: "p",
        text: "Before you write a job listing, be clear on the following:",
      },
      {
        type: "ul",
        items: [
          "Employment type: employed, self-employed associate, or sessional?",
          "Registration requirement: which regulatory body must the candidate be registered with (NMC, RCVS, HCPC, GOC, GDC)?",
          "Prescribing requirement: does this role require independent prescribing qualification?",
          "Scope of practice: what treatments or services will the role deliver?",
          "Volume: how many patients per day/week, and what is the appointment length?",
          "Rota: fixed days, flex scheduling, weekend requirements?",
          "Supervision: who will supervise this role, and what are your CQC/clinical governance requirements?",
        ],
      },
      {
        type: "p",
        text: "Getting these clear in advance saves time at every subsequent stage — it makes the listing sharper, the interview more focused, and the offer quicker to construct.",
      },
      {
        type: "h2",
        text: "Step 2: Write a listing that gets applications",
      },
      {
        type: "p",
        text: "Most practice job listings fail not because of where they are posted but because of what they contain. The most effective listings share a structure:",
      },
      {
        type: "h3",
        text: "Lead with what makes you different",
      },
      {
        type: "p",
        text: "Your opening paragraph should answer the question: why would an experienced clinician choose this practice over every other option available to them? Clinical autonomy, patient continuity, CPD investment, equipment quality, culture, ownership potential — pick the two or three most genuine differentiators and lead with them.",
      },
      {
        type: "h3",
        text: "State the salary range",
      },
      {
        type: "p",
        text: "Listings without a salary range receive 40–60% fewer applications than equivalent listings with a range stated. Candidates assume the worst and move on. If the salary is genuinely negotiable based on experience, state a floor: 'from £X depending on experience' is better than nothing.",
      },
      {
        type: "h3",
        text: "Describe the benefits explicitly",
      },
      {
        type: "p",
        text: "List CPD budget (annual amount), indemnity arrangement (provided, contributed to, or self-funded), pension, and any non-standard benefits. Do not write 'competitive benefits package' — it is meaningless. Write '£2,000 annual CPD budget, MDDUS indemnity provided, 5% employer pension contribution.'",
      },
      {
        type: "h3",
        text: "Include the registration requirements",
      },
      {
        type: "p",
        text: "State the regulatory registration requirement clearly: 'NMC registered with V300 independent prescribing qualification required' or 'RCVS registered veterinarian with Certificate in a specialist discipline preferred'. This filters applications appropriately and demonstrates that you understand the regulatory context of the role.",
      },
      {
        type: "h2",
        text: "Step 3: Manage applications",
      },
      {
        type: "p",
        text: "Once applications arrive, move quickly. The candidate market for clinical roles in private practice is competitive — experienced practitioners are considering multiple opportunities simultaneously. A response time of more than 3–5 business days from application to interview invitation loses candidates.",
      },
      {
        type: "p",
        text: "At the application review stage, check:",
      },
      {
        type: "ol",
        items: [
          "Regulatory registration: verify the registration number at the relevant body's public register",
          "Qualifications: check the prescribing qualification if required",
          "Right to work: confirm eligibility to work in the UK",
          "Relevant experience: years in discipline and specific experience with your treatment types",
          "Employment gaps: ask about any gaps at interview, not as a filter at application stage",
        ],
      },
      {
        type: "h2",
        text: "Step 4: Conduct an effective interview",
      },
      {
        type: "p",
        text: "For clinical roles, the interview serves two purposes: to assess whether the candidate has the clinical competence and values you need, and to sell your practice to a candidate who may have better-paying offers.",
      },
      {
        type: "h3",
        text: "Clinical questions to ask",
      },
      {
        type: "ul",
        items: [
          "Describe a case where you had to decline a treatment that a patient was requesting. How did you handle it?",
          "How do you approach a patient who presents with unrealistic expectations?",
          "What's your approach to complications management? Can you walk me through a time you managed a complication?",
          "What CPD have you done in the past 12 months, and what's your development focus for the next year?",
          "What does your ideal working environment look like day-to-day?",
        ],
      },
      {
        type: "h3",
        text: "Sell your practice during the interview",
      },
      {
        type: "p",
        text: "Give the candidate a tour of the clinical environment. Introduce them to other team members. Let them see the actual equipment they'll use. Describe the patient demographic specifically. Explain what progression looks like. The best candidates are evaluating you as much as you are evaluating them.",
      },
      {
        type: "h2",
        text: "Step 5: Make the offer",
      },
      {
        type: "p",
        text: "Make verbal offers same-day where possible. Follow up in writing within 24 hours. Include a clear start date, and be prepared to negotiate on start date rather than salary — a practitioner working their notice period at another clinic is a better indicator of quality than one available immediately.",
      },
      {
        type: "p",
        text: "Include in the written offer: start date, salary, indemnity arrangement, CPD budget, notice period, probationary period, and any condition precedents (DBS check, registration verification). Use a contract drafted for private healthcare employment specifically — a generic employment contract will miss important clauses around clinical governance, CQC obligations, and prescribing frameworks.",
      },
      {
        type: "h2",
        text: "Which hiring channel to use",
      },
      {
        type: "table",
        headers: ["Channel", "Cost", "Candidate quality", "Best for"],
        rows: [
          ["Specialist agency", "£5,000–£21,000", "Pre-screened shortlist", "Confidential replacement hires"],
          ["Indeed (sponsored)", "£700+/month", "Unfiltered — all sectors", "High-volume admin roles"],
          ["NHS Jobs", "Free", "NHS-oriented candidates", "Not available to private practices"],
          ["Specialist job boards (discipline-specific)", "£200–£600/listing", "Good discipline match", "Single-discipline practices"],
          ["The Practice Standard", "£149 +VAT/listing or £249/month unlimited", "Registered professionals, private practice only", "All disciplines, all regions"],
        ],
      },
      {
        type: "h2",
        text: "A note on timelines",
      },
      {
        type: "p",
        text: "UK clinical hiring timelines vary significantly by discipline. Aesthetic nurses typically have 4–8 week notice periods. Vets in permanent employment typically give 1–3 months notice. GPs and consultants may require 3–6 months notice. Factor this into your hiring timeline — a listing posted today will not reliably result in a new starter within a month for many roles.",
      },
      {
        type: "p",
        text: "Post early, extend your listing if needed, and be transparent with candidates about your timeline requirements. The best candidate for your role may not be available for 12 weeks — if your hiring process is strong enough to hold their interest, that is worth the wait.",
      },
      {
        type: "callout",
        heading: "Post your role today",
        text: "The Practice Standard covers all regulated private healthcare disciplines across 88 professions and 12 UK regions. From £149 +VAT per listing. No agency fees. No NHS noise. Candidates always free to apply.",
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | null {
  return BLOG_POSTS.find(p => p.slug === slug) ?? null
}

export function getBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
