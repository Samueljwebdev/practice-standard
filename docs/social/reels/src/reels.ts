import type { ReelDef } from "./Reel"

// 20 brand reels. Each scene duration is in frames @ 30fps.
export const REELS: ReelDef[] = [
  { id: "EmptyChair", scenes: [
    { t: "statement", dur: 78, eyebrow: "POV", lines: ["You’re short a", "clinician again."] },
    { t: "stat", dur: 80, eyebrow: "An empty chair costs you", value: "£1,000s", label: "every month it’s unfilled.", color: "cream" },
    { t: "statement", dur: 70, lines: ["Fill it from £149.", "Not £10,000."], accentLast: true },
    { t: "cta", dur: 64, headline: "No agency fees." },
  ]},
  { id: "Screening", scenes: [
    { t: "statement", dur: 76, eyebrow: "General job boards", lines: ["You post a role.", "You get 40 CVs."] },
    { t: "stat", dur: 84, eyebrow: "Of applicants", value: "68%", label: "fail initial screening.", color: "cream" },
    { t: "statement", dur: 70, lines: ["We check registration", "before you see them."], accentLast: true },
    { t: "cta", dur: 62, headline: "Hire verified." },
  ]},
  { id: "EverythingNHS", scenes: [
    { t: "statement", dur: 84, eyebrow: "Looking for private work?", lines: ["You search.", "It’s all NHS."] },
    { t: "statement", dur: 80, lines: ["We’re private", "practice only.", "No NHS noise."], accentLast: true },
    { t: "cta", dur: 64, headline: "Always free for professionals." },
  ]},
  { id: "AestheticSalary", scenes: [
    { t: "statement", dur: 70, eyebrow: "Aesthetic nurses", lines: ["Are you", "underpaid?"] },
    { t: "stat", dur: 86, eyebrow: "Nurse prescriber", value: "£38–58k", label: "+ commission (2026).", color: "mint" },
    { t: "cta", dur: 64, headline: "Know your worth." },
  ]},
  { id: "VetShortage", scenes: [
    { t: "statement", dur: 76, eyebrow: "Veterinary", lines: ["Why is hiring", "a vet so brutal?"] },
    { t: "stat", dur: 86, eyebrow: "EU vets registering in the UK", value: "−68%", label: "since Brexit.", color: "cream" },
    { t: "statement", dur: 64, lines: ["It’s not you.", "It’s the maths."], accentLast: true },
    { t: "cta", dur: 60, headline: "Reach verified vets." },
  ]},
  { id: "GreenFlags", scenes: [
    { t: "statement", dur: 64, eyebrow: "For professionals", lines: ["Green flags in a", "private practice"] },
    { t: "lines", dur: 132, eyebrow: "Look for", items: ["CPD budget (£500–2k)", "Indemnity covered", "Real supervision", "An unrushed diary", "Low team turnover"] },
    { t: "cta", dur: 60, headline: "Find a practice that has them." },
  ]},
  { id: "AgencyMaths", scenes: [
    { t: "stat", dur: 84, eyebrow: "A £50k hire, via an agency", value: "£10,000", label: "in fees. For one role.", color: "cream" },
    { t: "stat", dur: 80, eyebrow: "Practice Pro", value: "£249", label: "/month. Unlimited roles.", color: "mint" },
    { t: "statement", dur: 64, lines: ["One invoice =", "a year of hiring."], accentLast: true },
    { t: "cta", dur: 60, headline: "The agency isn’t the only option." },
  ]},
  { id: "RedFlags", scenes: [
    { t: "statement", dur: 60, eyebrow: "For professionals", lines: ["Job ad red flags"] },
    { t: "lines", dur: 120, items: ["‘Fast-paced’ = understaffed", "‘Wear many hats’ = no support", "No salary = below market", "No CPD = you’re a cost"] },
    { t: "cta", dur: 60, headline: "You’re interviewing them too." },
  ]},
  { id: "PhysioDemand", scenes: [
    { t: "stat", dur: 84, eyebrow: "On the MSK waiting list", value: "342,000", label: "people. And rising.", color: "cream" },
    { t: "stat", dur: 80, eyebrow: "UK physios per person", value: "1:1,136", label: "(Australia: 1:742).", color: "mint" },
    { t: "statement", dur: 64, lines: ["Every wait is a", "private opportunity."], accentLast: true },
    { t: "cta", dur: 60, headline: "Can you staff for it?" },
  ]},
  { id: "WhyIBuilt", scenes: [
    { t: "statement", dur: 84, eyebrow: "Two sentences I kept hearing", lines: ["“40 CVs.", "None registered.”"] },
    { t: "statement", dur: 78, lines: ["“Everything", "is NHS.”"] },
    { t: "statement", dur: 60, lines: ["So I built", "the bridge."], accentLast: true },
    { t: "cta", dur: 60, headline: "The Practice Standard." },
  ]},
  { id: "Optometry", scenes: [
    { t: "statement", dur: 60, eyebrow: "Optometry", lines: ["A quiet crisis."] },
    { t: "stat", dur: 84, eyebrow: "Practitioner shortfall by 2030", value: "~2,000", label: "10.3% vacancy rate today.", color: "cream" },
    { t: "cta", dur: 60, headline: "Reach verified optometrists." },
  ]},
  { id: "PrivateBoom", scenes: [
    { t: "statement", dur: 70, eyebrow: "The market", lines: ["Private healthcare", "is booming."] },
    { t: "stat", dur: 80, eyebrow: "UK market by 2033", value: "£18.6bn", label: "up from £13.75bn today.", color: "mint" },
    { t: "statement", dur: 64, lines: ["The hiring hasn’t", "caught up."], accentLast: true },
    { t: "cta", dur: 60, headline: "Built for private practice." },
  ]},
  { id: "ThreeNumbers", scenes: [
    { t: "stat", dur: 66, eyebrow: "NHS waiting list", value: "7.1m", color: "cream" },
    { t: "stat", dur: 66, eyebrow: "Applicants who fail screening", value: "68%", color: "cream" },
    { t: "stat", dur: 66, eyebrow: "UK cost-per-hire", value: "£6,125", color: "mint" },
    { t: "cta", dur: 62, headline: "We fix the middle one." },
  ]},
  { id: "CliniciansMoving", scenes: [
    { t: "statement", dur: 64, eyebrow: "The shift", lines: ["Why clinicians", "are going private"] },
    { t: "lines", dur: 124, items: ["Shorter lists", "More autonomy", "Better kit", "Clearer pay", "Less admin"] },
    { t: "cta", dur: 60, headline: "Which can you offer?" },
  ]},
  { id: "LocumDefault", scenes: [
    { t: "statement", dur: 90, eyebrow: "Be honest", lines: ["Locuming by choice?", "Or because you couldn’t", "find the right role?"] },
    { t: "statement", dur: 70, lines: ["It wasn’t your options.", "It was visibility."], accentLast: true },
    { t: "cta", dur: 60, headline: "Private permanent roles, one place." },
  ]},
  { id: "Aesthetics2026", scenes: [
    { t: "statement", dur: 70, eyebrow: "Aesthetics", lines: ["Regulation is", "tightening."] },
    { t: "stat", dur: 80, eyebrow: "Practitioners who are nurses or doctors", value: "65%", label: "A third may not be.", color: "cream" },
    { t: "statement", dur: 60, lines: ["We verify", "registration."], accentLast: true },
    { t: "cta", dur: 60, headline: "Hire verified. Not hopeful." },
  ]},
  { id: "NoNHS", scenes: [
    { t: "statement", dur: 80, eyebrow: "We made one choice", lines: ["We deleted every", "NHS job."] },
    { t: "statement", dur: 70, lines: ["Private practice", "deserves its", "own home."], accentLast: true },
    { t: "cta", dur: 62, headline: "No NHS noise." },
  ]},
  { id: "CPDQuestion", scenes: [
    { t: "statement", dur: 70, eyebrow: "One interview question", lines: ["…tells you", "everything."] },
    { t: "statement", dur: 84, lines: ["“What’s the", "CPD budget?”"], accentLast: true },
    { t: "stat", dur: 70, eyebrow: "Healthy", value: "£500–2k", label: "Below £500 is a red flag.", color: "mint" },
    { t: "cta", dur: 58, headline: "Save this for your next interview." },
  ]},
  { id: "OutProcess", scenes: [
    { t: "statement", dur: 86, eyebrow: "Can’t out-pay the big group?", lines: ["Out-process", "them."] },
    { t: "lines", dur: 96, items: ["Reply in 24h", "Verify cleanly", "Make them feel chosen"] },
    { t: "cta", dur: 60, headline: "Process beats pay." },
  ]},
  { id: "TwoMinSetup", scenes: [
    { t: "statement", dur: 70, eyebrow: "Hiring?", lines: ["Post a role in", "under 2 minutes."] },
    { t: "lines", dur: 96, items: ["From £149", "Private-practice pros only", "Verified applicants"] },
    { t: "cta", dur: 62, headline: "No agency calls. No NHS noise." },
  ]},
]
