import fs from "fs"
const NAVY="#0F3D3E", MINT="#A8D5CC", CREAM="#F2F4F3", SLATE="#5B6B6B", INK="#0D1B2A"
const logo=(dark)=>`<svg width="40" height="40" viewBox="0 0 30 30"><rect x="10" y="0" width="10" height="30" rx="3" fill="${dark?CREAM:NAVY}"/><rect x="0" y="10" width="30" height="10" rx="3" fill="${dark?CREAM:NAVY}"/><path d="M15 8 A7 7 0 0 1 15 22 Z" fill="${dark?MINT:CREAM}"/></svg>`
function page(inner, dark){return `<!doctype html><html><head><meta charset="utf8">
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
h1{font-size:86px;font-weight:800;line-height:1.02;letter-spacing:-.03em}
.sub{font-size:34px;font-weight:500;line-height:1.4;color:${dark?"rgba(242,244,243,.72)":SLATE};margin-top:34px}
.stat{font-size:168px;font-weight:800;line-height:.95;letter-spacing:-.04em;color:${dark?MINT:NAVY}}
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
{id:"01-agency-maths",eyebrow:"The maths",slides:[
 {t:"cover",headline:"What a recruitment agency really costs you.",sub:"The numbers most practices never stop to do."},
 {t:"stat",stat:"&pound;10,000",label:"A &pound;50k clinical hire, via an agency at 20%.",note:"And that is before the UK&rsquo;s &pound;6,125 average cost-per-hire."},
 {t:"stat",stat:"&pound;249",label:"Practice Pro &mdash; per month. Unlimited roles, every discipline."},
 {t:"points",rows:[{n:"=",t:"<b>One agency invoice</b> &asymp; a whole year of your hiring."},{n:"&check;",t:"Every role. Every discipline. One dashboard."},{n:"&check;",t:"Verified, private-practice professionals only."}]},
 {t:"cta",headline:"The agency isn&rsquo;t the only option. It&rsquo;s just the habit.",sub:"Post a verified role from &pound;149."}]},
{id:"02-private-boom",eyebrow:"The market",slides:[
 {t:"cover",headline:"UK private healthcare is booming. The hiring isn&rsquo;t keeping up.",sub:"Five numbers that explain the gap."},
 {t:"stat",stat:"&pound;18.6bn",label:"The UK private healthcare market by 2033 (&pound;13.75bn today)."},
 {t:"stat",stat:"7.1m",label:"On the NHS waiting list &mdash; pushing patients and clinicians private."},
 {t:"stat",stat:"3% &rarr; 13%",label:"GP appointments now private, up from 3% in 2009."},
 {t:"points",rows:[{n:"!",t:"550+ CQC-registered private GP services."},{n:"!",t:"Demand is exploding. The staffing model hasn&rsquo;t caught up."}]},
 {t:"cta",headline:"A whole market, hiring with tools built for someone else.",sub:"The Practice Standard &mdash; private practice only."}]},
{id:"03-salary-2026",eyebrow:"Know your worth",slides:[
 {t:"cover",headline:"What private practice actually pays in 2026.",sub:"Save this before your next interview."},
 {t:"points",rows:[{n:"&pound;",t:"Aesthetic nurse prescriber &mdash; <b>&pound;38k&ndash;&pound;58k</b> + commission"},{n:"&pound;",t:"Experienced vet, 3+ yrs &mdash; <b>&pound;42k&ndash;&pound;65k</b>"},{n:"&pound;",t:"IP optometrist &mdash; <b>&pound;52k&ndash;&pound;68k</b>"},{n:"&pound;",t:"MSK physiotherapist &mdash; <b>&pound;35k&ndash;&pound;50k</b>"}]},
 {t:"stat",stat:"+15&ndash;25%",label:"What London typically adds to these ranges."},
 {t:"cta",headline:"Know the number before you negotiate.",sub:"Private roles, every discipline, always free for professionals."}]},
{id:"04-ask-5",eyebrow:"For professionals",slides:[
 {t:"cover",headline:"Interviewing a private practice? Ask these 5.",sub:"You&rsquo;re interviewing them too."},
 {t:"points",rows:[{t:"Who covers <b>indemnity</b> &mdash; and to what limit?"},{t:"What&rsquo;s the <b>CPD budget</b>? (&pound;500&ndash;&pound;2k is healthy)"},{t:"What does <b>clinical supervision</b> look like?"},{t:"How is the <b>diary</b> managed &mdash; will I be rushed?"},{t:"What&rsquo;s the team&rsquo;s <b>tenure</b>? (low turnover = good sign)"}]},
 {t:"cta",headline:"The right practice will have good answers ready.",sub:"Find private-practice roles &mdash; free."}]},
{id:"05-aesthetics-verify",eyebrow:"Aesthetics",slides:[
 {t:"cover",headline:"Would you let an unregistered injector near a patient?",sub:"A CV that says &lsquo;registered&rsquo; isn&rsquo;t proof."},
 {t:"stat",stat:"65%",label:"Of aesthetic practitioners are registered nurses or doctors.",note:"Which means a third may not be &mdash; and 2026 scrutiny is coming."},
 {t:"points",rows:[{n:"&check;",t:"We check the registration <b>number</b> against the regulator."},{n:"&check;",t:"A &lsquo;Verified&rsquo; badge appears the moment they apply."},{n:"&check;",t:"Compliance shouldn&rsquo;t depend on hope."}]},
 {t:"cta",headline:"Hire verified. Not hopeful.",sub:"The hiring standard for modern aesthetics."}]},
{id:"06-optometry",eyebrow:"Optometry",slides:[
 {t:"cover",headline:"Optometry&rsquo;s quiet crisis.",sub:"Independents are competing for a shrinking pool."},
 {t:"stat",stat:"~2,000",label:"Projected practitioner shortfall by 2030 (College of Optometrists)."},
 {t:"stat",stat:"10.3%",label:"Current vacancy rate. 21% of weekly hours are locum-covered."},
 {t:"points",rows:[{n:"!",t:"Only 44% of optometrists now work full-time."},{n:"!",t:"In a shortage, the practice is being interviewed too."}]},
 {t:"cta",headline:"Speed + verification wins the good ones.",sub:"Reach verified optometrists &mdash; from &pound;149."}]},
]

let count=0
for(const c of carousels){
  c.slides.forEach((s,i)=>{s.n=i+1;s.total=c.slides.length})
  c.slides.forEach((s,i)=>{
    const html=R[s.t](c,s)
    fs.writeFileSync(`C:/Users/samue/social-assets/html/${c.id}_${String(i+1).padStart(2,"0")}.html`,html)
    count++
  })
}
console.log("Wrote "+count+" slide HTML files across "+carousels.length+" carousels")
