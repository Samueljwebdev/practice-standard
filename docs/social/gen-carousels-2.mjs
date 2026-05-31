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
h1{font-size:82px;font-weight:800;line-height:1.03;letter-spacing:-.03em}
.sub{font-size:34px;font-weight:500;line-height:1.4;color:${dark?"rgba(242,244,243,.72)":SLATE};margin-top:34px}
.stat{font-size:160px;font-weight:800;line-height:.95;letter-spacing:-.04em;color:${dark?MINT:NAVY}}
.statlabel{font-size:40px;font-weight:700;line-height:1.25;margin-top:28px}
.note{font-size:27px;font-weight:500;color:${dark?"rgba(242,244,243,.6)":SLATE};margin-top:24px;line-height:1.4}
.rows{display:flex;flex-direction:column;gap:28px}
.row{display:flex;gap:26px;align-items:flex-start}
.num{flex:none;width:58px;height:58px;border-radius:999px;background:${dark?"rgba(168,213,204,.15)":NAVY};color:${dark?MINT:CREAM};font-weight:800;font-size:28px;display:flex;align-items:center;justify-content:center}
.rowtext{font-size:36px;font-weight:700;line-height:1.22;padding-top:8px}
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
{id:"07-empty-chair",eyebrow:"Hidden costs",slides:[
 {t:"cover",headline:"An empty clinical chair costs more than you think.",sub:"Five hidden costs of a vacancy."},
 {t:"points",rows:[{n:"1",t:"Lost appointment revenue &mdash; every day it&rsquo;s unfilled."},{n:"2",t:"Locum cover to plug the gap."},{n:"3",t:"Burnout on the team carrying the extra load."},{n:"4",t:"Patients who don&rsquo;t rebook."},{n:"5",t:"The agency fee to end it: <b>&pound;3k&ndash;&pound;15k</b>."}]},
 {t:"cta",headline:"Time-to-fill isn&rsquo;t an HR metric. It&rsquo;s a P&amp;L line.",sub:"Fill it from &pound;149."}]},
{id:"08-agency-vs-board",eyebrow:"An honest comparison",slides:[
 {t:"cover",headline:"Agency or job board?",sub:"We&rsquo;re not anti-agency. We&rsquo;re anti agency prices for &pound;149 roles."},
 {t:"points",rows:[{n:"&#9201;",t:"<b>Speed:</b> agency = days. Board = minutes, then it works for you."},{n:"&pound;",t:"<b>Cost:</b> &pound;3k&ndash;&pound;15k/hire vs &pound;149 a listing."},{n:"&#9673;",t:"<b>Control:</b> gatekept vs your own dashboard."},{n:"&check;",t:"<b>Quality:</b> both &mdash; if the board verifies registration. Ours does."}]},
 {t:"cta",headline:"Agencies for the rare exec search. A board for everything else.",sub:"From &pound;149, or &pound;249/mo unlimited."}]},
{id:"09-always-agency",eyebrow:"Before you call",slides:[
 {t:"cover",headline:"5 things to check before you call the agency again.",sub:"Not saying switch. Saying test."},
 {t:"points",rows:[{n:"1",t:"What did your last 3 placements cost &mdash; total?"},{n:"2",t:"Could that have funded a year of listings?"},{n:"3",t:"Do you own the candidate relationship, or the agency?"},{n:"4",t:"Are you paying for a network you could build?"},{n:"5",t:"When did you last <b>test</b> an alternative?"}]},
 {t:"cta",headline:"Loyalty to a process is expensive when it&rsquo;s 20% of salary."}]},
{id:"10-fill-no-agency",eyebrow:"5 steps",slides:[
 {t:"cover",headline:"Fill a clinical role without an agency.",sub:"Save this for your next vacancy."},
 {t:"points",rows:[{n:"1",t:"Write the role for the <b>person</b>, not the spec sheet."},{n:"2",t:"Post where registered professionals actually look."},{n:"3",t:"Verify registration <b>before</b> you interview."},{n:"4",t:"Move fast &mdash; good clinicians have offers in days."},{n:"5",t:"Keep the post live and build a pipeline."}]},
 {t:"cta",headline:"From &pound;149. Verified applicants only.",sub:"Which step does your practice skip most?"}]},
{id:"11-time-to-fill",eyebrow:"The shortage",slides:[
 {t:"cover",headline:"Why your roles take so long to fill.",sub:"It&rsquo;s a shortage market &mdash; you&rsquo;re being interviewed too."},
 {t:"stat",stat:"10.3%",label:"Optometry vacancy rate. Candidates have options."},
 {t:"stat",stat:"1:1,136",label:"UK physios per person (Australia: 1:742)."},
 {t:"stat",stat:"&minus;68%",label:"EU vet registrants, post-Brexit."},
 {t:"cta",headline:"Speed + a verified process wins the good ones.",sub:"What&rsquo;s your time-to-fill right now?"}]},
{id:"12-post-once",eyebrow:"One place",slides:[
 {t:"cover",headline:"Why does your practice post roles in 5 places?",sub:"Most private practices hire across multiple disciplines."},
 {t:"points",rows:[{n:"&times;",t:"A vet role on one board."},{n:"&times;",t:"A physio role on another."},{n:"&times;",t:"A nurse role on Indeed."},{n:"&times;",t:"5 logins. 5 dashboards. 5 invoices."},{n:"&check;",t:"<b>One board. Every discipline. One dashboard.</b>"}]},
 {t:"cta",headline:"Hire the whole team from one place.",sub:"How many platforms did your last 3 hires take?"}]},
{id:"13-what-verified",eyebrow:"Verification",slides:[
 {t:"cover",headline:"What we check before a candidate reaches you.",sub:"Transparency over volume."},
 {t:"points",rows:[{n:"1",t:"The candidate enters their registration number."},{n:"2",t:"We check it against the regulator."},{n:"3",t:"A &lsquo;Verified&rsquo; badge appears on their application."},{n:"4",t:"You see it the moment they apply."},{n:"5",t:"No badge &ne; rejected &mdash; <b>you</b> decide, fully informed."}]},
 {t:"cta",headline:"Hire verified. Not hopeful."}]},
{id:"14-quality-volume",eyebrow:"Quality > volume",slides:[
 {t:"cover",headline:"Volume boards vs a standard.",sub:"The goal was never 40 CVs."},
 {t:"points",rows:[{n:"1",t:"A volume board optimises for <b>applications</b>. More is better."},{n:"2",t:"You optimise for <b>the right one</b>. More is just inbox."},{n:"3",t:"Specialist boards: 38% better-quality candidates."},{n:"4",t:"We add registration verification on top."}]},
 {t:"stat",stat:"3 not 40",label:"Verified applicants you&rsquo;d hire, vs CVs you&rsquo;d screen out."},
 {t:"cta",headline:"Fewer. Better. Verified."}]},
{id:"15-compliance",eyebrow:"Save this",slides:[
 {t:"cover",headline:"Pre-employment checks for a clinical hire.",sub:"Don&rsquo;t skip these."},
 {t:"points",rows:[{n:"&check;",t:"Current professional registration (verify the number)."},{n:"&check;",t:"Right to work."},{n:"&check;",t:"Two recent references."},{n:"&check;",t:"DBS where the role requires it."},{n:"&check;",t:"Indemnity / scope of practice confirmed."}]},
 {t:"cta",headline:"We handle the first signal. You own the rest.",sub:"What would you add?"}]},
{id:"16-will-i-get-quality",eyebrow:"The #1 question",slides:[
 {t:"cover",headline:"Will we actually get quality applicants?",sub:"The question every practice asks us."},
 {t:"points",rows:[{n:"1",t:"Fair &mdash; you&rsquo;ve been burned by CV-spray boards."},{n:"2",t:"Every account is tied to a profession + registration."},{n:"3",t:"We&rsquo;re built for registered professionals."},{n:"4",t:"Not anonymous CV spray."}]},
 {t:"cta",headline:"Quality is the product. Volume is a vanity metric."}]},
{id:"17-aesthetics-numbers",eyebrow:"Aesthetics",slides:[
 {t:"cover",headline:"The UK aesthetics market in 5 numbers.",sub:"Scaling &mdash; and regulating."},
 {t:"stat",stat:"&pound;3.6bn",label:"Market value, growing 8.4% a year."},
 {t:"stat",stat:"5,000+",label:"Independent clinics in the UK."},
 {t:"stat",stat:"19,700+",label:"Practitioners in Botox clinics alone."},
 {t:"points",rows:[{n:"!",t:"65% are registered nurses or doctors &mdash; and rules are tightening."}]},
 {t:"cta",headline:"Growth + regulation = verified hiring matters."}]},
{id:"18-blind-spot",eyebrow:"The gap",slides:[
 {t:"cover",headline:"There&rsquo;s no NHS Jobs for private practice.",sub:"A &pound;5.7bn segment with no home."},
 {t:"points",rows:[{n:"1",t:"Independent clinics &amp; private doctors: <b>&pound;5.7bn</b>."},{n:"2",t:"NHS Jobs owns NHS hiring."},{n:"3",t:"Indeed/Reed serve volume, not private practice."},{n:"4",t:"Specialist boards are siloed by discipline."}]},
 {t:"cta",headline:"&pound;5.7bn of hiring, no purpose-built home. Until now."}]},
{id:"19-clinicians-private",eyebrow:"The shift",slides:[
 {t:"cover",headline:"Why great clinicians are leaving the NHS for private practice.",sub:"The talent is moving. Catch it."},
 {t:"points",rows:[{n:"1",t:"Shorter lists, more time per patient."},{n:"2",t:"Autonomy over how they practise."},{n:"3",t:"Better kit and facilities."},{n:"4",t:"Clearer progression and pay."},{n:"5",t:"Less admin, more care."}]},
 {t:"cta",headline:"Which can your practice offer? That&rsquo;s your pitch."}]},
{id:"20-good-hiring",eyebrow:"5 rules",slides:[
 {t:"cover",headline:"Hiring when candidates are scarce.",sub:"The slow practice loses every time."},
 {t:"points",rows:[{n:"1",t:"You&rsquo;re being interviewed too &mdash; sell the role."},{n:"2",t:"Reply in 24h or lose them."},{n:"3",t:"Verify fast, decide faster."},{n:"4",t:"Always be hiring &mdash; keep a pipeline."},{n:"5",t:"Treat candidates like patients."}]},
 {t:"cta",headline:"In a shortage, your hiring experience is your pitch."}]},
{id:"21-how-it-works",eyebrow:"4 steps",slides:[
 {t:"cover",headline:"Hire a verified professional in 4 steps.",sub:"No agency calls. No NHS noise."},
 {t:"points",rows:[{n:"1",t:"Post your role in minutes (from &pound;149)."},{n:"2",t:"It goes live to private-practice pros only."},{n:"3",t:"Applicants arrive with a verified badge."},{n:"4",t:"Review and contact from one dashboard."}]},
 {t:"cta",headline:"Worth a look if you&rsquo;re hiring this quarter."}]},
{id:"22-green-flags",eyebrow:"For professionals",slides:[
 {t:"cover",headline:"Green flags when you join a private practice.",sub:"Tag a clinician job-hunting now."},
 {t:"points",rows:[{n:"&check;",t:"CPD budget (&pound;500&ndash;&pound;2k)."},{n:"&check;",t:"Indemnity covered."},{n:"&check;",t:"Real clinical supervision."},{n:"&check;",t:"A diary that isn&rsquo;t rushed."},{n:"&check;",t:"Low team turnover."}]},
 {t:"cta",headline:"High standards attract great people."}]},
{id:"23-red-flags",eyebrow:"For professionals",slides:[
 {t:"cover",headline:"Healthcare job ad red flags.",sub:"Trust your gut."},
 {t:"points",rows:[{n:"&#128681;",t:"&lsquo;Fast-paced&rsquo; = understaffed."},{n:"&#128681;",t:"&lsquo;Wear many hats&rsquo; = no support."},{n:"&#128681;",t:"No salary listed = below market."},{n:"&#128681;",t:"No CPD mention = you&rsquo;re a cost, not an investment."}]},
 {t:"cta",headline:"You&rsquo;re interviewing them too."}]},
{id:"24-private-vs-nhs",eyebrow:"The honest version",slides:[
 {t:"cover",headline:"Private vs NHS.",sub:"Different, not better. Choose on purpose."},
 {t:"points",rows:[{n:"&uarr;",t:"Autonomy is higher."},{n:"&uarr;",t:"Lists are shorter."},{n:"&uarr;",t:"Pay is often higher."},{n:"&darr;",t:"Less structure &mdash; you own your CPD."}]},
 {t:"cta",headline:"Find private roles &mdash; always free for professionals."}]},
{id:"25-beyond-salary",eyebrow:"What candidates ask",slides:[
 {t:"cover",headline:"It&rsquo;s not just about salary.",sub:"What candidates actually ask before they join."},
 {t:"points",rows:[{n:"1",t:"What&rsquo;s the CPD budget?"},{n:"2",t:"Who covers indemnity?"},{n:"3",t:"What does supervision look like?"},{n:"4",t:"Is the equipment up to date?"},{n:"5",t:"What&rsquo;s the team culture like?"}]},
 {t:"cta",headline:"Practices: answer these and you win.",sub:"Are you answering them in your ads?"}]},
]

let count=0
for(const c of carousels){
  c.slides.forEach((s,i)=>{s.n=i+1;s.total=c.slides.length})
  c.slides.forEach((s,i)=>{
    fs.writeFileSync(`C:/Users/samue/social-assets/html/${c.id}_${String(i+1).padStart(2,"0")}.html`,R[s.t](c,s))
    count++
  })
}
console.log("Wrote "+count+" slide HTML files across "+carousels.length+" carousels")
