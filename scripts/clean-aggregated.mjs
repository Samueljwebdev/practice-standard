import { createClient } from "@supabase/supabase-js"
const admin=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false}})
const DENTAL=/dentist|dental|orthodont|endodont|periodont|hygienist/i;
const BLOCK=/business development|account manager|\bsales\b|merchandiser|retail|maintenance|\bhgv\b|driver|warehouse|logistics|it systems|it support|software|developer|\bengineer\b|research officer|marketing|recruit|finance|payroll|cleaner|porter|catering|\bchef\b|security|fundrais|volunteer|apprentice|work experience|student/i;
const TESTS=[
 [/aesthetic.*(doctor|physician)|cosmetic doctor/i,"aesthetic_doctor"],
 [/injector|dermal filler|botox|aesthetic (nurse|practitioner|clinician)|nurse prescriber|aesthetician|skin (specialist|therapist)|laser (technician|practitioner)|\baesthetic\b/i,"aesthetic_nurse"],
 [/r\.?v\.?n\b|veterinary nurse|vet nurse/i,"vet_nurse"],
 [/veterinary surgeon|veterinarian|\bvet\b/i,"veterinarian"],
 [/optometrist/i,"optometrist"],
 [/dispensing optician|optical (assistant|advisor|consultant)|optician/i,"optometrist"],
 [/physiother|physio\b|sports therap|musculoskeletal|\bmsk\b/i,"physiotherapist"],
 [/podiatr|chiropod/i,"podiatrist"],
 [/osteopath/i,"osteopath"],
 [/dietit|dietic/i,"dietitian"],
 [/general practitioner|\bgp\b|private doctor|salaried gp/i,"private_gp"],
 [/theatre (nurse|practitioner)|scrub nurse|recovery nurse|\bodp\b|operating department|anaesthetic (nurse|practitioner)/i,"theatre_nurse"],
 [/practice nurse|treatment room nurse/i,"practice_nurse"],
 [/sonograph/i,"sonographer"],[/radiograph/i,"radiographer"],[/phlebotom/i,"phlebotomist"],
 [/health\s?care assistant|\bhca\b|nursing assistant|care assistant/i,"healthcare_assistant"],
 [/specialist nurse|clinical nurse|\brgn\b|\brmn\b|registered nurse|staff nurse|nurse/i,"specialist_nurse"],
 [/receptionist/i,"medical_receptionist"],[/medical secretary|secretary/i,"medical_secretary"],
 [/practice manager|clinic manager|clinical lead|clinical director/i,"clinic_manager"],
 [/coordinator|administrator|\badmin\b/i,"clinic_coordinator"],
];
function classify(t){ if(DENTAL.test(t))return null; if(BLOCK.test(t))return null; for(const [re,p] of TESTS)if(re.test(t))return p; return null; }
const {data:jobs}=await admin.from("jobs").select("id,title,profession").eq("source","aggregated").limit(2000);
const del=[], upd={};
for(const j of jobs){const p=classify(j.title); if(!p){del.push(j.id);continue;} if(p!==j.profession){(upd[p]=upd[p]||[]).push(j.id);} }
console.log(`total ${jobs.length} | delete ${del.length} | keep ${jobs.length-del.length}`);
for(let i=0;i<del.length;i+=200){await admin.from("jobs").delete().in("id",del.slice(i,i+200));}
for(const [p,ids] of Object.entries(upd)){for(let i=0;i<ids.length;i+=200){await admin.from("jobs").update({profession:p}).in("id",ids.slice(i,i+200));}}
const {data:after}=await admin.from("jobs").select("profession").eq("source","aggregated").limit(2000);
const byProf={};after.forEach(r=>byProf[r.profession]=(byProf[r.profession]||0)+1);
console.log("kept by profession:",JSON.stringify(byProf,null,0));
console.log("TOTAL clean aggregated jobs:",after.length);
