import fs from "fs"
const NAVY="#0F3D3E", MINT="#A8D5CC", CREAM="#F2F4F3", SLATE="#5B6B6B", INK="#0D1B2A"
const IMG="C:/Users/samue/practice-standard/public/images"
const OUT="C:/Users/samue/social-assets/html-photos"
fs.mkdirSync(OUT,{recursive:true})

const logo=(dark)=>`<svg width="40" height="40" viewBox="0 0 30 30"><rect x="10" y="0" width="10" height="30" rx="3" fill="${dark?CREAM:NAVY}"/><rect x="0" y="10" width="30" height="10" rx="3" fill="${dark?CREAM:NAVY}"/><path d="M15 8 A7 7 0 0 1 15 22 Z" fill="${dark?MINT:CREAM}"/></svg>`

function head(){return `<!doctype html><html><head><meta charset="utf8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif}
html,body{width:1080px;height:1350px;overflow:hidden}
.slide{width:1080px;height:1350px;padding:96px 92px;display:flex;flex-direction:column;position:relative}
.light{background:${CREAM};color:${INK}}
.top{display:flex;align-items:center;justify-content:space-between}
.idx{font-size:22px;font-weight:700;letter-spacing:.08em;color:${SLATE}}
.eyebrow{font-size:23px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:${NAVY};margin-bottom:30px}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center}
.stat{font-size:150px;font-weight:800;line-height:.95;letter-spacing:-.04em;color:${NAVY}}
.statlabel{font-size:40px;font-weight:700;line-height:1.25;margin-top:28px}
.note{font-size:27px;font-weight:500;color:${SLATE};margin-top:24px;line-height:1.4}
.rows{display:flex;flex-direction:column;gap:30px}
.row{display:flex;gap:26px;align-items:flex-start}
.num{flex:none;width:60px;height:60px;border-radius:999px;background:${NAVY};color:${CREAM};font-weight:800;font-size:30px;display:flex;align-items:center;justify-content:center}
.rowtext{font-size:38px;font-weight:700;line-height:1.22;padding-top:6px}
.rowtext b{color:${NAVY}}
.bot{display:flex;align-items:center;justify-content:space-between;color:${SLATE};font-size:25px;font-weight:700;letter-spacing:.04em}
.swipe{color:${NAVY}}
.accent{width:96px;height:8px;border-radius:999px;background:${MINT};margin:0 0 38px}
/* dark CTA */
.dark{background:${NAVY};color:${CREAM}}
.dark .eyebrow,.dark .swipe{color:${MINT}}
.dark h1{color:${CREAM}}
h1{font-size:80px;font-weight:800;line-height:1.03;letter-spacing:-.03em}
.sub{font-size:34px;font-weight:500;line-height:1.4;color:rgba(13,27,42,.62);margin-top:34px}
.dark .sub{color:rgba(242,244,243,.72)}
.dark .bot{color:rgba(242,244,243,.55)}
/* photo cover */
.photo{width:1080px;height:1350px;position:relative;display:flex;flex-direction:column;justify-content:space-between;padding:80px 80px 88px;background-size:cover;background-position:center}
.photo::before{content:"";position:absolute;inset:0;background:linear-gradient(to top, rgba(13,27,42,.94) 0%, rgba(13,27,42,.78) 26%, rgba(13,27,42,.28) 52%, rgba(13,27,42,0) 74%)}
.ptop,.pbot{position:relative;z-index:2}
.ptop{display:flex;align-items:center;justify-content:space-between}
.pidx{font-size:22px;font-weight:700;color:rgba(242,244,243,.7)}
.peyebrow{font-size:23px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:${MINT};margin-bottom:24px}
.phook{font-size:84px;font-weight:800;line-height:1.02;letter-spacing:-.03em;color:${CREAM};text-shadow:0 2px 24px rgba(0,0,0,.35)}
.psub{font-size:32px;font-weight:500;line-height:1.4;color:rgba(242,244,243,.85);margin-top:26px}
.pfoot{display:flex;align-items:center;justify-content:space-between;color:rgba(242,244,243,.8);font-size:25px;font-weight:700;letter-spacing:.04em;margin-top:34px}
</style></head><body>`}

function photocover(c,s){return head()+`<div class="photo" style="background-image:url('file:///${c.img}')">
<div class="ptop">${logo(true)}<span class="pidx">${s.total>1?`${s.n}/${s.total}`:""}</span></div>
<div class="pbot"><div class="accent"></div><div class="peyebrow">${c.eyebrow}</div><h1 class="phook">${s.headline}</h1>${s.sub?`<p class="psub">${s.sub}</p>`:""}
<div class="pfoot"><span>thepracticestandard.co.uk</span><span>${s.total>1?"swipe &rarr;":""}</span></div></div>
</div></body></html>`}
function stat(c,s){return head()+`<div class="slide light"><div class="top">${logo(false)}<span class="idx">${s.n}/${s.total}</span></div>
<div class="mid"><div class="stat">${s.stat}</div><div class="statlabel">${s.label}</div>${s.note?`<p class="note">${s.note}</p>`:""}</div>
<div class="bot"><span>thepracticestandard.co.uk</span><span class="swipe">&rarr;</span></div></div></body></html>`}
function points(c,s){return head()+`<div class="slide light"><div class="top">${logo(false)}<span class="idx">${s.n}/${s.total}</span></div>
<div class="mid"><div class="rows">${s.rows.map((r,i)=>`<div class="row"><div class="num">${r.n||i+1}</div><div class="rowtext">${r.t}</div></div>`).join("")}</div></div>
<div class="bot"><span>thepracticestandard.co.uk</span><span class="swipe">&rarr;</span></div></div></body></html>`}
function cta(c,s){return head()+`<div class="slide dark"><div class="top">${logo(true)}<span class="idx" style="color:rgba(242,244,243,.5)">${s.n}/${s.total}</span></div>
<div class="mid"><div class="accent"></div><h1>${s.headline}</h1>${s.sub?`<p class="sub">${s.sub}</p>`:""}</div>
<div class="bot"><span style="color:${MINT};font-size:30px">thepracticestandard.co.uk</span><span></span></div></div></body></html>`}
const R={photocover,stat,points,cta}

const posts=[
{id:"p1-verify",eyebrow:"Aesthetics",img:`${IMG}/aesthetics-consultation.jpg`,slides:[
 {t:"photocover",headline:"She&rsquo;s qualified. Can you prove your next hire is?"},
 {t:"stat",stat:"65%",label:"Of aesthetic practitioners are nurses or doctors.",note:"Which means a third may not be."},
 {t:"points",rows:[{n:"!",t:"As regulation tightens, &lsquo;they seemed qualified&rsquo; stops being a defence."},{n:"&check;",t:"We verify NMC / GMC registration <b>before</b> they reach you."}]},
 {t:"cta",headline:"Hire verified. Not hopeful.",sub:"Founding 41 open &mdash; /founding"}]},
{id:"p2-team",eyebrow:"Retention",img:`${IMG}/aesthetics-team.png`,slides:[
 {t:"photocover",headline:"The team you keep is the team you built right.",sub:"Turnover is decided in the first 90 days, not the exit interview."}]},
{id:"p3-worth",eyebrow:"Know your worth",img:`${IMG}/for-practices.png`,slides:[
 {t:"photocover",headline:"Are you underpaid? The 2026 numbers."},
 {t:"points",rows:[{n:"&pound;",t:"Aesthetic nurse prescriber &mdash; <b>&pound;38&ndash;58k</b> + commission"},{n:"&pound;",t:"Practice nurse (private) &mdash; <b>&pound;30&ndash;42k</b>"},{n:"&pound;",t:"Specialist nurse &mdash; <b>&pound;38&ndash;52k</b>"}]},
 {t:"cta",headline:"Know your worth before the appraisal.",sub:"Private roles &mdash; always free for professionals."}]},
{id:"p4-bridge",eyebrow:"Why we built it",img:`${IMG}/hero-dentist.png`,slides:[
 {t:"photocover",headline:"&ldquo;40 CVs. None registered.&rdquo;",sub:"So we built the bridge. The Practice Standard."}]},
{id:"p5-question",eyebrow:"For professionals",img:`${IMG}/sauria_Warm_clinical_consultation_room_soft_natural_window_li_7e60607d-99f0-49d6-b939-08916172d80f_1.png`,slides:[
 {t:"photocover",headline:"One interview question tells you everything."},
 {t:"stat",stat:"&pound;500&ndash;2k",label:"A healthy annual CPD budget. Below &pound;500 is a red flag."},
 {t:"points",rows:[{t:"How long are appointment slots?"},{t:"Who covers indemnity?"},{t:"What&rsquo;s team turnover been?"}]},
 {t:"cta",headline:"Save this for your next interview.",sub:"Find practices that answer all four."}]},
{id:"p6-chair",eyebrow:"Hidden cost",img:`${IMG}/aesthetics-consultation.jpg`,slides:[
 {t:"photocover",headline:"Booked solid. Still short a clinician.",sub:"An empty chair is &pound;1,000s in lost appointments every month."}]},
{id:"p7-greenflags",eyebrow:"For professionals",img:`${IMG}/aesthetics-team.png`,slides:[
 {t:"photocover",headline:"Green flags in a job ad."},
 {t:"points",rows:[{n:"&check;",t:"A named salary band"},{n:"&check;",t:"CPD budget in &pound;"},{n:"&check;",t:"&lsquo;We protect your diary&rsquo;"},{n:"&check;",t:"Indemnity covered"}]},
 {t:"cta",headline:"The best clinicians read your ad like you read theirs.",sub:"Write one that converts."}]},
]

let count=0
for(const c of posts){
  c.slides.forEach((s,i)=>{s.n=i+1;s.total=c.slides.length})
  c.slides.forEach((s,i)=>{
    const html=R[s.t](c,s)
    fs.writeFileSync(`${OUT}/${c.id}_${String(i+1).padStart(2,"0")}.html`,html)
    count++
  })
}
console.log("Wrote "+count+" photo-carousel slide HTML files across "+posts.length+" posts")
