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
{id:"s01-mens-health",eyebrow:"Men's Health Week",slides:[
 {t:"cover",headline:"Men's Health Week is about patients. Here's the workforce angle.",sub:"Only ~11% of UK nurses are men."},
 {t:"points",rows:[{n:"!",t:"A workforce that reflects the public cares for it better."},{n:"&check;",t:"Verified hiring judges <b>registration</b>, not a hunch from a name."}]},
 {t:"cta",headline:"Hire on competence. Not gut feel."}]},
{id:"s02-pride",eyebrow:"Pride Month",slides:[
 {t:"cover",headline:"Inclusive hiring isn't a rainbow logo in June.",sub:"It's what your shortlist looks like in November."},
 {t:"points",rows:[{n:"&check;",t:"Judge candidates on <b>registration and competence</b>."},{n:"&check;",t:"Verification reduces the bias a name on a CV invites."}]},
 {t:"cta",headline:"Inclusive by design. All year."}]},
{id:"s03-summer-myth",eyebrow:"The hiring calendar",slides:[
 {t:"cover",headline:"&lsquo;No point hiring in summer.&rsquo; It costs practices their best people.",sub:"The myth that quietly empties your pipeline."},
 {t:"stat",stat:"Jul&ndash;Aug",label:"When everyone else pauses &mdash; so the pool gets less competitive."},
 {t:"cta",headline:"Summer is when smart practices hire.",sub:"Don't pause. Get ahead."}]},
{id:"s04-nhs-birthday",eyebrow:"5 July",slides:[
 {t:"cover",headline:"On the NHS's birthday, an honest word.",sub:"No cheap shots."},
 {t:"points",rows:[{n:"&check;",t:"Almost every private clinician trained in the NHS."},{n:"&check;",t:"A thriving private sector relieves pressure on it. Both are true."}]},
 {t:"cta",headline:"Respect to the system that trained the workforce."}]},
{id:"s05-results-day",eyebrow:"Results Day",slides:[
 {t:"cover",headline:"Didn't get the grades for medicine? Healthcare has more doors than you think.",sub:"The routes careers advisers forget to mention."},
 {t:"points",rows:[{n:"1",t:"Nursing, paramedicine, ODP"},{n:"2",t:"Optometry, audiology, dental therapy"},{n:"3",t:"Vet nursing, physiotherapy"}]},
 {t:"cta",headline:"Real careers. Real progression. Often shorter routes."}]},
{id:"s06-physio-day",eyebrow:"World Physiotherapy Day",slides:[
 {t:"cover",headline:"The demand for private physio has never been higher.",sub:"The bottleneck isn't patients."},
 {t:"stat",stat:"342,000",label:"On the MSK waiting list. And rising."},
 {t:"stat",stat:"1:1,136",label:"UK physio density (Australia: 1:742)."},
 {t:"cta",headline:"Reach HCPC-verified physios.",sub:"From &pound;149. No agency markup."}]},
{id:"s07-q4-hiring",eyebrow:"The autumn window",slides:[
 {t:"cover",headline:"September is the second hiring spike. It's shorter than January's.",sub:"And more competitive."},
 {t:"points",rows:[{n:"!",t:"Post-summer, clinicians take stock and budgets reopen."},{n:"&check;",t:"Move in the first two weeks &mdash; or hire from leftovers."}]},
 {t:"cta",headline:"Get ahead of the autumn rush."}]},
{id:"s08-eye-health",eyebrow:"National Eye Health Week",slides:[
 {t:"cover",headline:"Most UK sight loss is avoidable.",sub:"The people preventing it are in short supply."},
 {t:"stat",stat:"~2,000",label:"Projected optometrist shortfall by 2030."},
 {t:"cta",headline:"Reach GOC-verified optometrists.",sub:"From &pound;149."}]},
{id:"s09-mental-health",eyebrow:"World Mental Health Day",slides:[
 {t:"cover",headline:"The clinicians most at risk are too busy to notice.",sub:"For employers, this one's uncomfortable."},
 {t:"points",rows:[{n:"&check;",t:"The best mental-health intervention is <b>adequate staffing</b>."},{n:"&check;",t:"You can't wellbeing-app your way out of a rota gap."}]},
 {t:"cta",headline:"Retention is a wellbeing strategy."}]},
{id:"s10-menopause",eyebrow:"World Menopause Day",slides:[
 {t:"cover",headline:"The fastest-growing group leaving clinical work? Women over 45.",sub:"Menopause is a bigger retention issue than most admit."},
 {t:"points",rows:[{n:"!",t:"Experienced clinicians walk out the door others can't replace."},{n:"&check;",t:"A menopause-aware employer keeps the talent everyone wants."}]},
 {t:"cta",headline:"Flexibility keeps your most experienced people."}]},
{id:"s11-halloween",eyebrow:"Genuinely scary",slides:[
 {t:"cover",headline:"Genuinely scary things in healthcare hiring.",sub:"Four that should keep you up at night."},
 {t:"points",rows:[{n:"&times;",t:"A registration number that doesn't check out."},{n:"&times;",t:"An &pound;11k agency invoice for one hire."},{n:"&times;",t:"&lsquo;Competitive salary&rsquo; with no number."},{n:"&times;",t:"A 40-CV inbox at 9pm."}]},
 {t:"cta",headline:"We verify before you see them.",sub:"Hire without the horror."}]},
{id:"s12-movember",eyebrow:"Movember",slides:[
 {t:"cover",headline:"Movember is about men talking. Clinicians are some of the worst at it.",sub:"Trained to be the strong one in the room."},
 {t:"points",rows:[{n:"&check;",t:"A male-friendly culture isn't soft &mdash; it's retention."},{n:"&check;",t:"It's why your male clinicians stay instead of quietly burning out."}]},
 {t:"cta",headline:"Culture keeps people. Pay alone doesn't."}]},
{id:"s13-black-friday",eyebrow:"Black Friday",slides:[
 {t:"cover",headline:"We're not doing a Black Friday deal on hiring.",sub:"Hiring isn't a doorbuster."},
 {t:"stat",stat:"&pound;199 vs &pound;11k",label:"The deal that's on every day: a verified hire vs an agency fee."},
 {t:"cta",headline:"No countdown timer. The maths doesn't expire.",sub:"thepracticestandard.co.uk/founding"}]},
{id:"s14-christmas",eyebrow:"December",slides:[
 {t:"cover",headline:"The Christmas rota is the most honest document in your practice.",sub:"It shows exactly where you're thin."},
 {t:"points",rows:[{n:"!",t:"If covering the festive period means one person doing two jobs..."},{n:"&check;",t:"...January's resignation is already written."}]},
 {t:"cta",headline:"Staff for the gaps you can see coming."}]},
{id:"s15-new-year",eyebrow:"The quitting season",slides:[
 {t:"cover",headline:"January is the busiest month for resignations in healthcare.",sub:"Not hiring. Resignations."},
 {t:"points",rows:[{n:"!",t:"Those who decided to leave in December hand in notice now."},{n:"&check;",t:"Quiet hiring beats panic hiring. Post before you need to."}]},
 {t:"cta",headline:"Get ahead of the new-year wave.",sub:"thepracticestandard.co.uk/founding"}]},
]
let count=0
for(const c of carousels){
  c.slides.forEach((s,i)=>{s.n=i+1;s.total=c.slides.length})
  c.slides.forEach((s,i)=>{
    fs.writeFileSync(`${OUT}/${c.id}_${String(i+1).padStart(2,"0")}.html`,R[s.t](c,s))
    count++
  })
}
console.log("Wrote "+count+" seasonal slide HTML files across "+carousels.length+" carousels")
