// Board listings sourced from clinics' OWN careers pages (link to the practice,
// never an aggregator). Replaces the Adzuna aggregated jobs.
import { createClient } from "@supabase/supabase-js"
const admin=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}})
const ROLE={vet:["veterinarian","Veterinary"],physio:["physiotherapist","Physiotherapy & allied health"],optometry:["optometrist","Optometry"],aesthetics:["aesthetic_nurse","Aesthetics"],medical:["practice_nurse","Clinical"],dental:["general_dentist","Dental"]}
const slugify=s=>(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,70)
const {data:clinics}=await admin.from("clinics").select("name,vertical,city,region,website,careers_url,is_hiring").eq("is_hiring",true).limit(500)
const rows=[]; const seen=new Set()
for(const c of clinics){
  const url=c.careers_url||c.website; if(!url) continue
  const [prof,label]=ROLE[c.vertical]||ROLE.medical
  let slug=`${slugify(c.name)}-${c.vertical}-careers`; if(seen.has(slug))continue; seen.add(slug)
  rows.push({practice_id:null,title:`${label} vacancies — ${c.name}`,profession:prof,job_type:"permanent",region:c.region||"South East",city:c.city,salary_min:null,salary_max:null,description:`${c.name} in ${c.city||"the UK"} is currently advertising vacancies. View their current openings and apply directly on their own website.`,requirements:null,slug,status:"active",payment_status:"unpaid",source:"aggregated",source_url:url,external_org_name:c.name,external_org_url:c.website,noindex:true,published_at:new Date().toISOString(),expires_at:null})
}
// Replace: delete Adzuna + insert clinic-careers listings
const {count:before}=await admin.from("jobs").delete({count:"exact"}).eq("source","aggregated")
let ins=0
for(let i=0;i<rows.length;i+=200){const {error}=await admin.from("jobs").insert(rows.slice(i,i+200));if(!error)ins+=Math.min(200,rows.length-i)}
console.log(`Removed Adzuna jobs (${before??"?"}). Inserted ${ins} clinic-careers listings (each links to the practice's own site).`)
const {data:sample}=await admin.from("jobs").select("title,source_url").eq("source","aggregated").limit(4)
sample.forEach(j=>console.log(`  - ${j.title}\n    -> ${j.source_url}`))
