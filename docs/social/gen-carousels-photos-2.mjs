import fs from "fs"
const NAVY="#0F3D3E", MINT="#A8D5CC", CREAM="#F2F4F3", SLATE="#5B6B6B", INK="#0D1B2A"
const PH="C:/Users/samue/social-assets/photos"
const OUT="C:/Users/samue/social-assets/html-photos2"
fs.mkdirSync(OUT,{recursive:true})
const img=(name)=>{for(const e of [".png",".jpeg",".jpg"]) if(fs.existsSync(`${PH}/${name}${e}`)) return `${PH}/${name}${e}`; return `${PH}/${name}.png`}
const logo=(d)=>`<svg width="40" height="40" viewBox="0 0 30 30"><rect x="10" y="0" width="10" height="30" rx="3" fill="${d?CREAM:NAVY}"/><rect x="0" y="10" width="30" height="10" rx="3" fill="${d?CREAM:NAVY}"/><path d="M15 8 A7 7 0 0 1 15 22 Z" fill="${d?MINT:CREAM}"/></svg>`
function head(){return `<!doctype html><html><head><meta charset="utf8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif}
html,body{width:1080px;height:1350px;overflow:hidden}
.slide{width:1080px;height:1350px;padding:96px 92px;display:flex;flex-direction:column;position:relative}
.light{background:${CREAM};color:${INK}}.dark{background:${NAVY};color:${CREAM}}
.top{display:flex;align-items:center;justify-content:space-between}
.idx{font-size:22px;font-weight:700;letter-spacing:.08em;color:${SLATE}}
.dark .idx{color:rgba(242,244,243,.5)}
.eyebrow{font-size:23px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:${NAVY};margin-bottom:30px}
.dark .eyebrow{color:${MINT}}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center}
h1{font-size:80px;font-weight:800;line-height:1.03;letter-spacing:-.03em}
.sub{font-size:34px;font-weight:500;line-height:1.4;color:rgba(13,27,42,.62);margin-top:34px}
.dark .sub{color:rgba(242,244,243,.72)}
.stat{font-size:150px;font-weight:800;line-height:.95;letter-spacing:-.04em;color:${NAVY}}
.statlabel{font-size:40px;font-weight:700;line-height:1.25;margin-top:28px}
.note{font-size:27px;font-weight:500;color:${SLATE};margin-top:24px;line-height:1.4}
.rows{display:flex;flex-direction:column;gap:30px}
.row{display:flex;gap:26px;align-items:flex-start}
.num{flex:none;width:60px;height:60px;border-radius:999px;background:${NAVY};color:${CREAM};font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center}
.rowtext{font-size:38px;font-weight:700;line-height:1.22;padding-top:6px}.rowtext b{color:${NAVY}}
.bot{display:flex;align-items:center;justify-content:space-between;color:${SLATE};font-size:25px;font-weight:700;letter-spacing:.04em}
.dark .bot{color:rgba(242,244,243,.55)}.swipe{color:${NAVY}}.dark .swipe{color:${MINT}}
.accent{width:96px;height:8px;border-radius:999px;background:${MINT};margin:0 0 38px}
.photo{width:1080px;height:1350px;position:relative;display:flex;flex-direction:column;justify-content:space-between;padding:80px 80px 88px;background-size:cover;background-position:center}
.photo::before{content:"";position:absolute;inset:0;background:linear-gradient(to top, rgba(13,27,42,.95) 0%, rgba(13,27,42,.8) 26%, rgba(13,27,42,.3) 52%, rgba(13,27,42,0) 74%)}
.ptop,.pbot{position:relative;z-index:2}.ptop{display:flex;align-items:center;justify-content:space-between}
.pidx{font-size:22px;font-weight:700;color:rgba(242,244,243,.7)}
.peyebrow{font-size:23px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:${MINT};margin-bottom:24px}
.phook{font-size:82px;font-weight:800;line-height:1.02;letter-spacing:-.03em;color:${CREAM};text-shadow:0 2px 24px rgba(0,0,0,.35)}
.psub{font-size:32px;font-weight:500;line-height:1.4;color:rgba(242,244,243,.88);margin-top:24px}
.pfoot{display:flex;align-items:center;justify-content:space-between;color:rgba(242,244,243,.8);font-size:25px;font-weight:700;letter-spacing:.04em;margin-top:34px}
</style></head><body>`}
function photocover(c,s){return head()+`<div class="photo" style="background-image:url('file:///${c.img}')">
<div class="ptop">${logo(true)}<span class="pidx">${s.total>1?`${s.n}/${s.total}`:""}</span></div>
<div class="pbot"><div class="accent"></div><div class="peyebrow">${c.eyebrow}</div><h1 class="phook">${s.headline}</h1>${s.sub?`<p class="psub">${s.sub}</p>`:""}
<div class="pfoot"><span>thepracticestandard.co.uk</span><span>${s.total>1?"swipe &rarr;":""}</span></div></div></div></body></html>`}
function stat(c,s){return head()+`<div class="slide light"><div class="top">${logo(false)}<span class="idx">${s.n}/${s.total}</span></div>
<div class="mid"><div class="stat">${s.stat}</div><div class="statlabel">${s.label}</div>${s.note?`<p class="note">${s.note}</p>`:""}</div>
<div class="bot"><span>thepracticestandard.co.uk</span><span class="swipe">&rarr;</span></div></div></body></html>`}
function points(c,s){return head()+`<div class="slide light"><div class="top">${logo(false)}<span class="idx">${s.n}/${s.total}</span></div>
<div class="mid"><div class="rows">${s.rows.map((r,i)=>`<div class="row"><div class="num">${r.n||i+1}</div><div class="rowtext">${r.t}</div></div>`).join("")}</div></div>
<div class="bot"><span>thepracticestandard.co.uk</span><span class="swipe">&rarr;</span></div></div></body></html>`}
function cta(c,s){return head()+`<div class="slide dark"><div class="top">${logo(true)}<span class="idx">${s.n}/${s.total}</span></div>
<div class="mid"><div class="accent"></div><h1>${s.headline}</h1>${s.sub?`<p class="sub">${s.sub}</p>`:""}</div>
<div class="bot"><span style="color:${MINT};font-size:30px">thepracticestandard.co.uk</span><span></span></div></div></body></html>`}
const R={photocover,stat,points,cta}

const posts=[
{id:"pp01-physio",eyebrow:"Physiotherapy",im:"physio-treating",slides:[
 {t:"photocover",headline:"Demand for private physio has never been higher."},
 {t:"stat",stat:"342,000",label:"On the MSK waiting list. The bottleneck is clinicians, not patients."},
 {t:"cta",headline:"Reach HCPC-verified physios.",sub:"From &pound;149. No agency markup."}]},
{id:"pp02-optometry",eyebrow:"Optometry",im:"optometry-exam",slides:[
 {t:"photocover",headline:"Optometry's quiet crisis."},
 {t:"stat",stat:"~2,000",label:"Projected practitioner shortfall by 2030. 10.3% vacancy today."},
 {t:"cta",headline:"Reach GOC-verified optometrists.",sub:"Speed + verification win the good ones."}]},
{id:"pp03-vet",eyebrow:"Veterinary",im:"vet-dog",slides:[
 {t:"photocover",headline:"Hiring a vet feels brutal. It's not you &mdash; it's the maths."},
 {t:"stat",stat:"&minus;68%",label:"EU vet registrations in the UK since Brexit. Demand didn't move."},
 {t:"cta",headline:"Reach RCVS-verified vets directly.",sub:"Not via a 20% fee."}]},
{id:"pp04-gp",eyebrow:"Private medical",im:"gp-consult",slides:[
 {t:"photocover",headline:"Private GP demand is outrunning supply."},
 {t:"stat",stat:"7.1m",label:"On the NHS waiting list &mdash; pushing patients and clinicians private."},
 {t:"cta",headline:"Built for private practice.",sub:"Verified clinicians, every discipline."}]},
{id:"pp05-dental",eyebrow:"Dental",im:"dentist-chairside",slides:[
 {t:"photocover",headline:"Dental hiring, without the agency markup.",sub:"From &pound;149 a listing &mdash; verified candidates only."}]},
{id:"pp06-screening",eyebrow:"For practices",im:"manager-reviewing",slides:[
 {t:"photocover",headline:"40 CVs. 6 worth interviewing."},
 {t:"stat",stat:"68%",label:"Of applicants from general boards fail initial screening."},
 {t:"cta",headline:"We verify registration before you see them.",sub:"Hire from a shortlist that's already filtered."}]},
{id:"pp07-empty-chair",eyebrow:"Hidden cost",im:"empty-chair",slides:[
 {t:"photocover",headline:"An empty chair costs you &pound;1,000s a month.",sub:"Every week it sits empty is appointments not booked."}]},
{id:"pp08-team",eyebrow:"Retention",im:"team",slides:[
 {t:"photocover",headline:"Build a team that doesn't churn."},
 {t:"points",rows:[{n:"&check;",t:"Turnover is decided in the first 90 days."},{n:"&check;",t:"Onboarding, a named buddy, CPD from day one."}]},
 {t:"cta",headline:"The cheapest hire is the one you didn't lose."}]},
{id:"pp09-owner",eyebrow:"The maths",im:"owner-candid",slides:[
 {t:"photocover",headline:"Hiring shouldn't cost &pound;11,000.",sub:"One agency invoice = a year of founder pricing. /founding"}]},
{id:"pp10-male-nurse",eyebrow:"The workforce",im:"male-nurse",slides:[
 {t:"photocover",headline:"Only ~11% of UK nurses are men."},
 {t:"points",rows:[{n:"!",t:"A workforce that reflects the public cares for it better."},{n:"&check;",t:"Verified hiring judges registration, not a name."}]},
 {t:"cta",headline:"Hire on competence. Not gut feel."}]},
{id:"pp11-returner",eyebrow:"The undervalued hire",im:"experienced-clinician",slides:[
 {t:"photocover",headline:"The returner is your most undervalued hire."},
 {t:"points",rows:[{n:"&check;",t:"Fully trained, registered, low flight-risk."},{n:"&check;",t:"Experience doesn't expire &mdash; if you offer flexibility."}]},
 {t:"cta",headline:"Advertise the 3-day role nobody else will."}]},
{id:"pp12-job-search",eyebrow:"For professionals",im:"job-searching",slides:[
 {t:"photocover",headline:"Dreading the same diary tomorrow? That's your sign."},
 {t:"cta",headline:"Private-practice roles, no NHS noise.",sub:"Always free for professionals."}]},
{id:"pp13-aesthetics",eyebrow:"Aesthetics",im:"nurse-injector-portrait",slides:[
 {t:"photocover",headline:"Hire verified. Not hopeful."},
 {t:"stat",stat:"65%",label:"Of aesthetic practitioners are nurses or doctors. A third may not be."},
 {t:"cta",headline:"We check NMC / GMC before they reach you.",sub:"The hiring standard for modern aesthetics."}]},
{id:"pp14-two-min",eyebrow:"Post once",im:"hands-laptop",slides:[
 {t:"photocover",headline:"Post a verified role in under 2 minutes.",sub:"From &pound;149. No agency calls. No NHS noise. /founding"}]},
{id:"pp15-verified",eyebrow:"Verification",im:"id-badge",slides:[
 {t:"photocover",headline:"&lsquo;Verified&rsquo; isn't a badge. It's a register check."},
 {t:"points",rows:[{n:"&check;",t:"We confirm the number against the regulator."},{n:"&check;",t:"NMC / GMC / GDC / RCVS / GOC / HCPC."}]},
 {t:"cta",headline:"Compliance shouldn't depend on hope."}]},
]
let count=0
for(const c of posts){
  c.img=img(c.im)
  c.slides.forEach((s,i)=>{s.n=i+1;s.total=c.slides.length})
  c.slides.forEach((s,i)=>{fs.writeFileSync(`${OUT}/${c.id}_${String(i+1).padStart(2,"0")}.html`,R[s.t](c,s));count++})
}
console.log("Wrote "+count+" photo-2 slide HTML files across "+posts.length+" posts")
EOF
