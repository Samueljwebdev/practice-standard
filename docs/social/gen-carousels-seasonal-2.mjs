import fs from "fs"
const NAVY="#0F3D3E", MINT="#A8D5CC", CREAM="#F2F4F3", SLATE="#5B6B6B", INK="#0D1B2A"
const OUT="C:/Users/samue/social-assets/html-seasonal"
fs.mkdirSync(OUT,{recursive:true})
const logo=(dark)=>`<svg width="40" height="40" viewBox="0 0 30 30"><rect x="10" y="0" width="10" height="30" rx="3" fill="${dark?CREAM:NAVY}"/><rect x="0" y="10" width="30" height="10" rx="3" fill="${dark?CREAM:NAVY}"/><path d="M15 8 A7 7 0 0 1 15 22 Z" fill="${dark?MINT:CREAM}"/></svg>`
function page(inner,dark){return `<!doctype html><html><head><meta charset="utf8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif}
html,body{width:1080px;height:1350px;overflow:hidden}
.slide{width:1080px;height:1350px;background:${dark?NAVY:CREAM};color:${dark?CREAM:INK};padding:96px 92px;display:flex;flex-direction:column;position:relative}
.top{display:flex;align-items:center;justify-content:space-between}
.idx{font-size:22px;font-weight:700;letter-spacing:.08em;color:${dark?"rgba(242,244,243,.5)":SLATE}}
.eyebrow{font-size:23px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:${dark?MINT:NAVY};margin-bottom:30px}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center}
h1{font-size:84px;font-weight:800;line-height:1.03;letter-spacing:-.03em}
.sub{font-size:34px;font-weight:500;line-height:1.4;color:${dark?"rgba(242,244,243,.72)":SLATE};margin-top:34px}
.stat{font-size:150px;font-weight:800;line-height:.95;letter-spacing:-.04em;color:${dark?MINT:NAVY}}
.statlabel{font-size:40px;font-weight:700;line-height:1.25;margin-top:28px}
.note{font-size:27px;font-weight:500;color:${dark?"rgba(242,244,243,.6)":SLATE};margin-top:24px;line-height:1.4}
.rows{display:flex;flex-direction:column;gap:30px}
.row{display:flex;gap:26px;align-items:flex-start}
.num{flex:none;width:60px;height:60px;border-radius:999px;background:${dark?"rgba(168,213,204,.15)":NAVY};color:${dark?MINT:CREAM};font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center}
.rowtext{font-size:38px;font-weight:700;line-height:1.22;padding-top:6px}
.rowtext b{color:${dark?MINT:NAVY}}
.bot{display:flex;align-items:center;justify-content:space-between;color:${dark?"rgba(242,244,243,.55)":SLATE};font-size:25px;font-weight:700;letter-spacing:.04em}
.swipe{color:${dark?MINT:NAVY}}
.accent{width:96px;height:8px;border-radius:999px;background:${MINT};margin:0 0 38px}
</style></head><body><div class="slide">${inner}</div></body></html>`}
function cover(c,s){return page(`<div class="top">${logo(true)}<span class="idx">${s.n}/${s.total}</span></div>
<div class="mid"><div class="accent"></div><div class="eyebrow">${c.eyebrow}</div><h1>${s.headline}</h1>${s.sub?`<p class="sub">${s.sub}</p>`:""}</div>
<div class="bot"><span>thepracticestandard.co.uk</span><span class="swipe">swipe &rarr;</span></div>`,true)}
function stat(c,s){return page(`<div class="top">${logo(false)}<span class="idx">${s.n}/${s.total}</span></div>
<div class="mid"><div class="stat">${s.stat}</div><div class="statlabel">${s.label}</div>${s.note?`<p class="note">${s.note}</p>`:""}</div>
<div class="bot"><span>thepracticestandard.co.uk</span><span class="swipe">&rarr;</span></div>`,false)}
function points(c,s){return page(`<div class="top">${logo(false)}<span class="idx">${s.n}/${s.total}</span></div>
<div class="mid"><div class="rows">${s.rows.map((r,i)=>`<div class="row"><div class="num">${r.n||i+1}</div><div class="rowtext">${r.t}</div></div>`).join("")}</div></div>
<div class="bot"><span>thepracticestandard.co.uk</span><span class="swipe">&rarr;</span></div>`,false)}
function cta(c,s){return page(`<div class="top">${logo(true)}<span class="idx">${s.n}/${s.total}</span></div>
<div class="mid"><div class="accent"></div><h1>${s.headline}</h1>${s.sub?`<p class="sub">${s.sub}</p>`:""}</div>
<div class="bot"><span style="color:${MINT};font-size:30px">thepracticestandard.co.uk</span><span></span></div>`,true)}
const R={cover,stat,points,cta}

const carousels=[
{id:"f01-new-year-pro",eyebrow:"New Year",slides:[
 {t:"cover",headline:"Dreading January back at work? That's data, not a mood.",sub:"If the same diary, chaos and pay ruined your break &mdash; that's your sign."},
 {t:"points",rows:[{n:"&check;",t:"The new-year hiring wave starts now."},{n:"&check;",t:"Line up private roles before you're reacting to burnout."}]},
 {t:"cta",headline:"Be ready, not reactive.",sub:"Private roles, registration verified, free for professionals."}]},
{id:"f02-blue-monday",eyebrow:"Blue Monday",slides:[
 {t:"cover",headline:"Blue Monday is marketing. Clinician burnout isn't.",sub:"The reason a third are quietly browsing jobs this week is real."},
 {t:"points",rows:[{n:"!",t:"It's rarely pay. It's the diary that got fuller every quarter."},{n:"&check;",t:"Fix the diary, keep the clinician."}]},
 {t:"cta",headline:"The 5 green flags that retain staff.",sub:"Save this for your next move."}]},
{id:"f03-cancer-day",eyebrow:"World Cancer Day",slides:[
 {t:"cover",headline:"Behind every early diagnosis, a clinician.",sub:"Radiographers, oncology nurses, dermatologists, GPs who caught it."},
 {t:"points",rows:[{n:"&check;",t:"Private practice carries a growing share of the diagnostic load."},{n:"&check;",t:"If you staff for it, staff verified."}]},
 {t:"cta",headline:"Respect to the people doing the work."}]},
{id:"f04-time-to-talk",eyebrow:"Time to Talk Day",slides:[
 {t:"cover",headline:"We ask clinicians to hold everyone's stress. Who holds theirs?",sub:"Wellbeing is a rota decision before it's a perk."},
 {t:"points",rows:[{n:"&check;",t:"Realistic lists. Real cover. A manager who notices."},{n:"&check;",t:"That's your actual recruitment advantage."}]},
 {t:"cta",headline:"Retention is a wellbeing strategy."}]},
{id:"f05-valentines",eyebrow:"Job-ad red flags",slides:[
 {t:"cover",headline:"Red flags vs green flags. The job-ad version could save your career.",sub:"You're allowed to swipe left on a bad employer."},
 {t:"points",rows:[{n:"&times;",t:"&lsquo;Fast-paced&rsquo; = understaffed."},{n:"&times;",t:"&lsquo;Wear many hats&rsquo; = no support."},{n:"&check;",t:"A named CPD budget. &lsquo;We protect your diary.&rsquo;"}]},
 {t:"cta",headline:"You're interviewing them too."}]},
{id:"f06-careers-week",eyebrow:"National Careers Week",slides:[
 {t:"cover",headline:"Feeling stuck by year five? The NHS&rarr;private move isn't selling out.",sub:"Shorter lists, more autonomy, a salary you can read."},
 {t:"points",rows:[{n:"&check;",t:"What private practice gives you."},{n:"&check;",t:"And what it honestly asks of you."}]},
 {t:"cta",headline:"The honest NHS&rarr;private guide.",sub:"On the blog."}]},
{id:"f07-iwd",eyebrow:"International Women's Day",slides:[
 {t:"cover",headline:"Healthcare runs on women. Ownership doesn't &mdash; yet.",sub:"~77% of the NHS workforce. The majority of nurses and AHPs."},
 {t:"points",rows:[{n:"!",t:"Private practice can close that gap faster than the NHS."},{n:"&check;",t:"Not through a campaign &mdash; through who gets hired and paid fairly."}]},
 {t:"cta",headline:"The fastest fair act this year? A fair offer to a returning clinician."}]},
{id:"f08-mothers-day",eyebrow:"Mother's Day",slides:[
 {t:"cover",headline:"The clinician you &lsquo;can't find&rsquo; is often a mother no one offered 3 days a week.",sub:"A returner isn't a risk."},
 {t:"points",rows:[{n:"&check;",t:"Fully trained, registered, loyal to whoever meets her halfway."},{n:"&check;",t:"Flexible roles are the most under-advertised advantage in hiring."}]},
 {t:"cta",headline:"Hiring flexibly attracts the best."}]},
{id:"f09-vet-day",eyebrow:"World Veterinary Day",slides:[
 {t:"cover",headline:"Hiring a vet feels brutal right now. It's not you &mdash; it's the maths.",sub:"To every vet holding practices together with too few hands: today's for you."},
 {t:"stat",stat:"&minus;68%",label:"EU vet registrations in the UK since Brexit. Demand didn't move."},
 {t:"cta",headline:"Reach RCVS-verified vets directly.",sub:"Not via a 20% fee."}]},
{id:"f10-april-fools",eyebrow:"No joke",slides:[
 {t:"cover",headline:"Things in healthcare hiring that sound like a joke but aren't.",sub:"We're not laughing either."},
 {t:"points",rows:[{n:"&times;",t:"40 CVs, not one registered."},{n:"&times;",t:"An &pound;11,000 invoice for one introduction."},{n:"&times;",t:"&lsquo;Competitive salary&rsquo; with no number."}]},
 {t:"cta",headline:"There's a less ridiculous way.",sub:"From &pound;149."}]},
{id:"f11-tax-year",eyebrow:"New financial year",slides:[
 {t:"cover",headline:"If recruitment was your biggest uncontrolled cost last year, cap it now.",sub:"One agency placement can run &pound;8&ndash;11k."},
 {t:"points",rows:[{n:"&check;",t:"A flat board fee is a known, budgetable line."},{n:"&check;",t:"Plan hiring like a fixed cost, not an emergency."}]},
 {t:"cta",headline:"The maths to take to your accountant.",sub:"Try the calculator."}]},
{id:"f12-world-health-day",eyebrow:"World Health Day",slides:[
 {t:"cover",headline:"There is no health system without the workforce. Full stop.",sub:"A rota gap is a care gap."},
 {t:"points",rows:[{n:"&check;",t:"We can build apps, scanners and clinics."},{n:"&check;",t:"But staffing IS healthcare. Everything else is logistics."}]},
 {t:"cta",headline:"The unglamorous truth, on World Health Day."}]},
{id:"f13-stress-month",eyebrow:"Stress Awareness Month",slides:[
 {t:"cover",headline:"5 things that burn clinicians out. None of them are the patients.",sub:"Fix these and you fix retention."},
 {t:"points",rows:[{n:"1",t:"Back-to-back lists, no admin time."},{n:"2",t:"Broken kit. Unclear pay."},{n:"3",t:"A manager who only appears when something's wrong."}]},
 {t:"cta",headline:"Practices that get this right keep their people."}]},
{id:"f14-midwife-day",eyebrow:"Day of the Midwife",slides:[
 {t:"cover",headline:"Midwives don't get a fraction of the noise they deserve.",sub:"Private maternity and women's health are growing fast."},
 {t:"points",rows:[{n:"&check;",t:"Demand for experienced, registered midwives is climbing."},{n:"&check;",t:"They're choosing employers who respect their autonomy."}]},
 {t:"cta",headline:"Today: thank you. Tomorrow: hire like you mean it."}]},
{id:"f15-nurses-day",eyebrow:"International Nurses Day",slides:[
 {t:"cover",headline:"A nurse is not a cost line.",sub:"The 2026 theme says it: the economic power of care."},
 {t:"points",rows:[{n:"&check;",t:"A verified aesthetic nurse generates revenue."},{n:"&check;",t:"A specialist nurse keeps a clinic compliant and safe."}]},
 {t:"cta",headline:"Treat nursing as an expense, and you'll be short-staffed.",sub:"Reach verified nurses."}]},
{id:"f16-mh-week",eyebrow:"Mental Health Awareness Week",slides:[
 {t:"cover",headline:"We talk about patient mental health every week. Clinician mental health gets one.",sub:"This year's theme is action."},
 {t:"points",rows:[{n:"&check;",t:"Action isn't a webinar &mdash; it's lists you can finish."},{n:"&check;",t:"Cover when someone's off. Permission to say &lsquo;I'm not okay.&rsquo;"}]},
 {t:"cta",headline:"Retention is the real intervention."}]},
{id:"f17-diabetes-day",eyebrow:"World Diabetes Day",slides:[
 {t:"cover",headline:"Chronic disease is rising faster than the workforce treating it.",sub:"Diabetes is the clearest example."},
 {t:"points",rows:[{n:"!",t:"More patients, more monitoring, more demand on private clinics."},{n:"&check;",t:"The question every practice faces: can you staff for it?"}]},
 {t:"cta",headline:"Respect to the DSNs and GPs on the front line."}]},
{id:"f18-returners",eyebrow:"The undervalued hire",slides:[
 {t:"cover",headline:"The most undervalued hire in private practice? The returner.",sub:"Maternity, caring, burnout, a stint abroad &mdash; then back."},
 {t:"points",rows:[{n:"&check;",t:"Experience doesn't expire; currency comes back fast."},{n:"&check;",t:"Low flight-risk, high skill &mdash; if you offer flexibility."}]},
 {t:"cta",headline:"Advertise the 3-day role nobody else will."}]},
]
let count=0
for(const c of carousels){
  c.slides.forEach((s,i)=>{s.n=i+1;s.total=c.slides.length})
  c.slides.forEach((s,i)=>{
    fs.writeFileSync(`${OUT}/${c.id}_${String(i+1).padStart(2,"0")}.html`,R[s.t](c,s))
    count++
  })
}
console.log("Wrote "+count+" seasonal-2 slide HTML files across "+carousels.length+" carousels")
