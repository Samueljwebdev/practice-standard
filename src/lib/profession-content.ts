export interface ProfessionContent {
  intro: string
  regulator: string | null
  salaryRange: string
  faq: { q: string; a: string }[]
}

export const PROFESSION_CONTENT: Record<string, ProfessionContent> = {

  // DENTISTRY
  general_dentist: {
    intro: "General dentists in the UK are registered with the General Dental Council (GDC) and deliver routine oral healthcare including examinations, restorations, and preventive treatments. Around 30,000 dentists are currently registered in the UK across NHS and private practice. Private general dentist salaries range from £50,000 to £130,000 depending on experience and sessional arrangements.",
    regulator: "General Dental Council (GDC)",
    salaryRange: "£50,000 – £130,000",
    faq: [
      { q: "What qualifications do I need to work as a General Dentist in the UK?", a: "You need a GDC-recognised dental degree (BDS or equivalent). International graduates must either hold a GDC-accepted qualification or pass the Overseas Registration Examination (ORE)." },
      { q: "How much does a General Dentist earn in private practice in the UK?", a: "Private general dentists typically earn £50,000–£130,000 per year. Associate dentists on NHS contracts are paid per UDA (Unit of Dental Activity), while fully private practices can command significantly higher earnings." },
      { q: "Are General Dentist jobs in demand in the UK?", a: "Yes. NHS dentist shortages have driven growth in private and mixed practices across all UK regions. Many practices are actively recruiting associates, especially outside major cities." },
    ],
  },

  associate_dentist: {
    intro: "Associate dentists work as self-employed clinicians within an established dental practice, typically on an NHS or private contract. This is the most common employment model for UK dentists post-foundation training. Associate positions offer flexibility in hours and the ability to build a loyal patient list.",
    regulator: "General Dental Council (GDC)",
    salaryRange: "£45,000 – £120,000",
    faq: [
      { q: "What is the difference between an associate dentist and a principal dentist?", a: "An associate dentist works as a self-employed clinician within someone else's practice, typically sharing revenue. A principal dentist owns or has a financial stake in the practice." },
      { q: "How much does an Associate Dentist earn in the UK?", a: "Associate dentists earning on NHS contracts typically earn £45,000–£80,000. Those working in private practice can earn significantly more, with experienced associates reaching £100,000–£120,000." },
      { q: "Do Associate Dentists need to complete Foundation Training?", a: "Yes. All new dental graduates in the UK must complete a year of Dental Foundation Training (DFT) before working as an associate in an NHS practice." },
    ],
  },

  specialist_dentist: {
    intro: "Specialist dentists in the UK hold a GDC-recognised specialist qualification in one of 13 recognised dental specialties, including orthodontics, endodontics, and periodontics. Specialists may work in private referral practices or hospital settings. Specialist roles command premium salaries reflecting the additional training required.",
    regulator: "General Dental Council (GDC) — Specialist List",
    salaryRange: "£70,000 – £150,000",
    faq: [
      { q: "How do I become a Specialist Dentist in the UK?", a: "You must complete a GDC-approved specialist training programme (typically 3 years) after your dental degree and foundation training, leading to a Certificate of Completion of Specialist Training (CCST) and entry onto the GDC Specialist List." },
      { q: "How much does a Specialist Dentist earn in the UK?", a: "Specialist dentists typically earn £70,000–£150,000 depending on the specialty and whether they work privately or in an NHS trust." },
      { q: "Are Specialist Dentist roles in demand in the UK?", a: "Yes. There is a shortage of specialists in many disciplines, particularly in areas outside London. Referral practices often struggle to recruit experienced specialists." },
    ],
  },

  orthodontist: {
    intro: "Orthodontists are GDC-registered specialists who diagnose and treat dental and facial irregularities, including malocclusions and tooth alignment. There are approximately 1,500 orthodontists on the GDC Specialist List in the UK. Private orthodontic practices are growing rapidly, driven by demand for clear aligner treatments such as Invisalign.",
    regulator: "General Dental Council (GDC) — Orthodontics Specialist List",
    salaryRange: "£80,000 – £160,000",
    faq: [
      { q: "What training is required to become an Orthodontist in the UK?", a: "A dental degree, followed by Dental Foundation Training, then a 3-year GDC-approved specialist orthodontic training programme leading to the MOrth RCS qualification." },
      { q: "How much does an Orthodontist earn in private practice?", a: "Private orthodontists in the UK typically earn £80,000–£160,000. High-volume private practices with a strong clear aligner caseload can exceed this." },
      { q: "Is there demand for Orthodontist jobs in the UK?", a: "Yes. Consumer demand for aesthetic orthodontic treatments has driven significant growth in private orthodontic practices. NHS waiting lists have also created strong demand for private providers." },
    ],
  },

  endodontist: {
    intro: "Endodontists are dental specialists focusing on root canal treatments, dental trauma, and the diagnosis of tooth pain. They work from the GDC Endodontics Specialist List and typically operate in private referral centres. Endodontic treatments command high private fees, making this a financially rewarding specialty.",
    regulator: "General Dental Council (GDC) — Endodontics Specialist List",
    salaryRange: "£70,000 – £140,000",
    faq: [
      { q: "What qualifications do I need to work as an Endodontist in the UK?", a: "A dental degree plus GDC-approved specialist endodontic training (typically 3 years), resulting in a CCST and GDC Specialist List entry." },
      { q: "How much does an Endodontist earn in the UK?", a: "Endodontists typically earn £70,000–£140,000 depending on referral volume and practice location." },
      { q: "Are Endodontist positions in demand?", a: "Yes. Complex root canal cases are routinely referred by general dentists, and there are relatively few specialists in many regions of the UK." },
    ],
  },

  periodontist: {
    intro: "Periodontists specialise in the prevention, diagnosis, and treatment of gum disease and the placement of dental implants. They hold a GDC specialist qualification in Periodontics and typically work in private referral practices or teaching hospitals. The growing awareness of periodontal disease as a systemic health factor is increasing demand for this specialty.",
    regulator: "General Dental Council (GDC) — Periodontics Specialist List",
    salaryRange: "£70,000 – £140,000",
    faq: [
      { q: "What training do I need to become a Periodontist in the UK?", a: "A dental degree followed by 3 years of GDC-approved specialist periodontic training, typically leading to the MPerio RCS qualification." },
      { q: "How much does a Periodontist earn in the UK?", a: "UK periodontists typically earn £70,000–£140,000, with higher earnings possible in high-volume private referral practices." },
      { q: "Is periodontics in demand as a career in the UK?", a: "Yes. Increased public awareness of gum disease and its links to systemic conditions, combined with implant demand, has driven significant growth in referrals to periodontists." },
    ],
  },

  prosthodontist: {
    intro: "Prosthodontists are dental specialists in the restoration and replacement of teeth, including complex restorative cases, implant-supported prostheses, and full-mouth rehabilitation. They are listed on the GDC Prosthodontics Specialist List. Private prosthodontic practices work on some of the highest-value cases in dentistry.",
    regulator: "General Dental Council (GDC) — Prosthodontics Specialist List",
    salaryRange: "£75,000 – £150,000",
    faq: [
      { q: "What qualifications are required to become a Prosthodontist in the UK?", a: "A dental degree plus 3 years of GDC-approved specialist prosthodontic training, leading to the MPros RCS qualification and GDC Specialist List entry." },
      { q: "How much does a Prosthodontist earn in the UK?", a: "Prosthodontists typically earn £75,000–£150,000, with complex full-arch rehabilitation cases commanding some of the highest fees in private dentistry." },
      { q: "What types of practices employ Prosthodontists?", a: "Prosthodontists work in specialist referral centres, implant clinics, dental hospitals, and high-end private practices." },
    ],
  },

  oral_surgeon: {
    intro: "Oral surgeons in the UK are specialists in surgical procedures of the mouth, jaws, and face, including extractions, implant placement, and jaw surgery. They may hold GDC specialist qualifications in Oral Surgery or Oral and Maxillofacial Surgery (OMFS). Oral surgeons work in private referral practices and NHS trusts.",
    regulator: "General Dental Council (GDC) / GMC (for OMFS)",
    salaryRange: "£80,000 – £160,000",
    faq: [
      { q: "What is the difference between an Oral Surgeon and an Oral & Maxillofacial Surgeon?", a: "Oral surgeons hold a dental degree with specialist oral surgery training. Oral and Maxillofacial Surgeons (OMFS) hold dual medical and dental qualifications and handle more complex head, neck, and jaw conditions." },
      { q: "How much does an Oral Surgeon earn in the UK?", a: "Private oral surgeons typically earn £80,000–£160,000 depending on caseload and whether they perform implant surgery." },
      { q: "Are Oral Surgeon positions in demand in the UK?", a: "Yes. Complex extractions and implant cases are regularly referred from general practices, and many regions lack accessible surgical specialists." },
    ],
  },

  implantologist: {
    intro: "Implantologists are dentists with advanced training in the surgical placement and restoration of dental implants. In the UK, implantology is not a formal GDC specialty, but practitioners typically hold postgraduate implant qualifications from bodies such as the ITI, FGDP, or universities. Implant dentistry is one of the fastest-growing areas of private dentistry in the UK.",
    regulator: "General Dental Council (GDC)",
    salaryRange: "£70,000 – £150,000",
    faq: [
      { q: "What qualifications do Implantologists need in the UK?", a: "No single mandatory qualification exists, but reputable implantologists hold a postgraduate implant diploma or master's (e.g., MSc Implant Dentistry), alongside GDC registration." },
      { q: "How much does an Implantologist earn in the UK?", a: "Implantologists can earn £70,000–£150,000+, depending on surgical volume and whether they place and restore implants or specialise in one aspect." },
      { q: "Is implant dentistry growing in the UK?", a: "Yes. The UK implant market has grown consistently, driven by aging demographics, increased tooth loss awareness, and patient preference for fixed over removable prostheses." },
    ],
  },

  sedation_dentist: {
    intro: "Sedation dentists in the UK are trained to administer conscious sedation (typically intravenous or inhalation) to anxious or phobic patients. They must comply with GDC standards on conscious sedation and work within appropriate clinical governance frameworks. Sedation services are in high demand in both NHS and private settings.",
    regulator: "General Dental Council (GDC)",
    salaryRange: "£55,000 – £120,000",
    faq: [
      { q: "What training is required for sedation dentistry in the UK?", a: "Dentists offering IV sedation must complete an approved sedation training course and work within a team that includes a trained sedation nurse. The GDC and SAAD publish guidance on required competencies." },
      { q: "How much do Sedation Dentists earn in the UK?", a: "Salaries depend on overall clinical role, but sedation competency typically commands a premium. Most sedation dentists earn £55,000–£120,000." },
      { q: "Are Sedation Dentist roles common in the UK?", a: "Practices offering sedation are increasingly common as NHS and private providers seek to manage dental anxiety. Demand for sedation-trained dentists is strong." },
    ],
  },

  cosmetic_dentist: {
    intro: "Cosmetic dentists in the UK focus on aesthetic dental treatments including teeth whitening, composite bonding, porcelain veneers, and smile makeovers. Cosmetic dentistry is not a GDC-recognised specialty, but practitioners typically hold postgraduate aesthetic dentistry qualifications. The UK cosmetic dental market has grown significantly, driven by social media and accessible treatment options.",
    regulator: "General Dental Council (GDC)",
    salaryRange: "£55,000 – £130,000",
    faq: [
      { q: "What qualifications do Cosmetic Dentists need in the UK?", a: "All cosmetic dentists must be GDC-registered. Many hold postgraduate certificates or diplomas in aesthetic dentistry from providers such as the BACD, AACD, or university programmes." },
      { q: "How much does a Cosmetic Dentist earn in the UK?", a: "Cosmetic dentists can earn £55,000–£130,000 depending on treatment volume and the type of practice." },
      { q: "Is cosmetic dentistry a growing field in the UK?", a: "Yes. The UK cosmetic dental market has grown substantially, with composite bonding and teeth whitening becoming among the most requested treatments. Social media influence has accelerated demand." },
    ],
  },

  dental_hygienist: {
    intro: "Dental hygienists in the UK are GDC-registered clinicians who specialise in preventive dentistry, including professional teeth cleaning (scale and polish), periodontal therapy, and oral health education. Since 2013, registered dental hygienists can see patients without a dentist's prescription under Direct Access. There are approximately 8,000 registered dental hygienists in the UK.",
    regulator: "General Dental Council (GDC)",
    salaryRange: "£30,000 – £55,000",
    faq: [
      { q: "What qualifications do I need to become a Dental Hygienist in the UK?", a: "You need a GDC-approved dental hygiene diploma or degree. Programmes are offered by universities and dental schools across the UK, typically lasting 2 years for a diploma or 3 years for a BSc." },
      { q: "How much does a Dental Hygienist earn in the UK?", a: "UK dental hygienists typically earn £30,000–£55,000 per year. Many work on a self-employed basis and charge per session." },
      { q: "Can Dental Hygienists work independently in the UK?", a: "Yes. Since the introduction of Direct Access in 2013, GDC-registered dental hygienists can provide a range of treatments without a dentist's prescription, allowing independent practice." },
    ],
  },

  dental_therapist: {
    intro: "Dental therapists in the UK are GDC-registered clinicians who can perform a range of dental treatments including fillings, extractions of primary teeth, and preventive work. They can also carry out all duties of a dental hygienist. Dental therapists work under Direct Access and are increasingly used to support patient demand in both NHS and private settings.",
    regulator: "General Dental Council (GDC)",
    salaryRange: "£28,000 – £50,000",
    faq: [
      { q: "What can a Dental Therapist do in the UK?", a: "Dental therapists can perform fillings, extract deciduous teeth, carry out all dental hygiene treatments, apply fissure sealants, and provide oral health education — all under Direct Access since 2013." },
      { q: "How much does a Dental Therapist earn in the UK?", a: "Dental therapists typically earn £28,000–£50,000 per year depending on location and whether employed or self-employed." },
      { q: "Is there demand for Dental Therapists in the UK?", a: "Yes. NHS England has encouraged greater use of dental therapists to improve workforce capacity and patient access, making this a growing role in NHS and mixed practices." },
    ],
  },

  dental_nurse: {
    intro: "Dental nurses in the UK must be registered with the General Dental Council (GDC) and support dentists and other dental professionals during clinical procedures. They are responsible for patient care, instrument preparation, and infection control. There are over 60,000 GDC-registered dental nurses, making it the largest dental workforce group in the UK.",
    regulator: "General Dental Council (GDC)",
    salaryRange: "£20,000 – £32,000",
    faq: [
      { q: "How do I become a Dental Nurse in the UK?", a: "You must complete a GDC-approved dental nursing qualification (NEBDN National Diploma or equivalent), which can be studied alongside working as a trainee dental nurse. You then register with the GDC." },
      { q: "How much does a Dental Nurse earn in the UK?", a: "Newly qualified dental nurses typically earn £20,000–£24,000. Experienced dental nurses can earn up to £30,000–£32,000, particularly in London or specialist roles." },
      { q: "Are Dental Nurse jobs in demand in the UK?", a: "Yes. Dental nurse shortages are reported across the UK, particularly in NHS practices. Many practices recruit trainee dental nurses and support them through qualification." },
    ],
  },

  lead_dental_nurse: {
    intro: "Lead dental nurses in the UK oversee the clinical nursing team within a dental practice, managing rotas, training, CQC compliance, and decontamination protocols. This senior role combines clinical duties with practice management responsibilities. Lead dental nurses typically hold additional qualifications in decontamination or management.",
    regulator: "General Dental Council (GDC)",
    salaryRange: "£26,000 – £38,000",
    faq: [
      { q: "What additional qualifications does a Lead Dental Nurse need?", a: "Lead dental nurses often hold qualifications in decontamination (HTM 01-05), radiography, and team management. Some hold the NEBDN Certificate in Special Care Dentistry or sedation nursing." },
      { q: "How much does a Lead Dental Nurse earn in the UK?", a: "Lead dental nurses typically earn £26,000–£38,000 depending on practice size and location." },
      { q: "What are the responsibilities of a Lead Dental Nurse?", a: "Responsibilities include managing the nursing team, ensuring CQC compliance, overseeing decontamination and infection control, induction of new staff, and maintaining stock and equipment." },
    ],
  },

  dental_receptionist: {
    intro: "Dental receptionists are the first point of contact for patients in a dental practice, managing appointment scheduling, patient records, and treatment coordination. They play a key role in practice profitability by converting enquiries to bookings. Experience with dental software (SOE, Dentally, R4) is typically required.",
    regulator: null,
    salaryRange: "£20,000 – £28,000",
    faq: [
      { q: "What skills does a Dental Receptionist need in the UK?", a: "Key skills include communication, experience with dental practice management software, understanding of NHS and private treatment plans, and the ability to handle patient anxiety effectively." },
      { q: "How much does a Dental Receptionist earn in the UK?", a: "Dental receptionists typically earn £20,000–£28,000 per year, with higher salaries in London and at busy private practices." },
      { q: "Do Dental Receptionists need specific qualifications?", a: "No mandatory qualifications are required, though BTEC or NVQ qualifications in dental administration are available. Most training is on-the-job." },
    ],
  },

  treatment_coordinator: {
    intro: "Treatment coordinators (TCOs) in dental practices guide patients through treatment planning, manage case acceptance, and handle financial discussions. An effective TCO can significantly increase private revenue by improving patient conversion rates. This role does not require GDC registration but typically requires strong dental knowledge.",
    regulator: null,
    salaryRange: "£24,000 – £38,000",
    faq: [
      { q: "What does a Dental Treatment Coordinator do?", a: "A TCO meets with patients to discuss proposed treatment plans, answers questions, explains costs and finance options, and guides the patient toward a treatment decision. They help bridge the gap between clinical recommendation and patient acceptance." },
      { q: "How much does a Treatment Coordinator earn in the UK?", a: "Treatment coordinators typically earn £24,000–£38,000, often with a performance-related element tied to case acceptance rates." },
      { q: "Do you need to be a dental nurse to become a TCO?", a: "Not necessarily, though many TCOs come from a dental nursing background. Strong communication skills, dental knowledge, and experience with finance discussions are more important." },
    ],
  },

  dental_practice_manager: {
    intro: "Dental practice managers oversee the day-to-day operations of a dental practice, including HR, CQC compliance, financial performance, and staff management. This is a senior role that requires both healthcare regulatory knowledge and business management skills. Practice managers are critical to practice profitability and CQC registration.",
    regulator: null,
    salaryRange: "£30,000 – £55,000",
    faq: [
      { q: "What qualifications does a Dental Practice Manager need in the UK?", a: "No single mandatory qualification exists, but many practice managers hold the DPPM (Diploma in Primary Care Management) or similar healthcare management qualifications. CQC regulatory knowledge is essential." },
      { q: "How much does a Dental Practice Manager earn in the UK?", a: "Dental practice managers typically earn £30,000–£55,000 depending on practice size, location, and group vs. single-site." },
      { q: "What are the CQC responsibilities of a Dental Practice Manager?", a: "The practice manager typically acts as or supports the CQC Registered Manager, ensuring the practice meets all fundamental standards, maintains accurate records, and is prepared for inspections." },
    ],
  },

  dental_technician: {
    intro: "Dental technicians in the UK design and manufacture dental prostheses including crowns, bridges, dentures, and orthodontic appliances. They work in dental laboratories, either attached to practices or as commercial laboratories. GDC registration is required for dental technicians who communicate directly with patients.",
    regulator: "General Dental Council (GDC)",
    salaryRange: "£22,000 – £45,000",
    faq: [
      { q: "What qualifications does a Dental Technician need in the UK?", a: "A BTEC Level 3 or HND in Dental Technology, or a Foundation Degree in Dental Technology. GDC registration is required." },
      { q: "How much does a Dental Technician earn in the UK?", a: "Dental technicians earn £22,000–£45,000 depending on experience and specialisation (e.g., implant restorations command higher rates)." },
      { q: "Is dental technology a growing field in the UK?", a: "The field is evolving rapidly. Digital dentistry, including CAD/CAM milling and 3D printing, is transforming laboratory work, and technicians with digital skills are in high demand." },
    ],
  },

  lab_technician: {
    intro: "Laboratory technicians in healthcare settings support diagnostic and research functions, processing samples and maintaining laboratory equipment. In dental settings, lab technicians assist dental technicians in the production of prosthetic work. Roles vary widely by setting, from dental labs to private medical diagnostic facilities.",
    regulator: null,
    salaryRange: "£22,000 – £38,000",
    faq: [
      { q: "What qualifications are needed for a Lab Technician role in a healthcare setting?", a: "Requirements vary by setting. Dental lab technicians typically hold a BTEC or HND in Dental Technology. Medical laboratory technicians may require IBMS-accredited qualifications." },
      { q: "How much does a Lab Technician earn in the UK?", a: "Lab technicians in healthcare typically earn £22,000–£38,000 depending on the setting and level of responsibility." },
      { q: "What software do dental lab technicians use?", a: "Modern dental labs use CAD/CAM software (e.g., Exocad, 3Shape) for digital workflows. Experience with these platforms is increasingly required." },
    ],
  },

  lab_manager: {
    intro: "Laboratory managers in dental and medical settings oversee all lab operations including quality control, staffing, equipment maintenance, and client relations. This leadership role requires both technical expertise and management skills. Dental lab managers often hold GDC registration and significant bench experience.",
    regulator: null,
    salaryRange: "£35,000 – £60,000",
    faq: [
      { q: "What does a Dental Lab Manager do?", a: "A dental lab manager oversees production workflow, ensures quality standards are met, manages lab staff, liaises with dental practices, and maintains compliance with relevant regulations." },
      { q: "How much does a Lab Manager earn in the UK?", a: "Lab managers typically earn £35,000–£60,000 depending on lab size and whether it is a single-site or multi-site operation." },
      { q: "What qualifications do Lab Managers need?", a: "Technical qualifications in dental technology or medical laboratory science, plus management experience. Many managers have progressed from senior technician roles." },
    ],
  },

  // AESTHETICS & MEDSPA
  aesthetic_doctor: {
    intro: "Aesthetic doctors in the UK are GMC-registered medical doctors who specialise in non-surgical cosmetic treatments including botulinum toxin, dermal fillers, thread lifting, and advanced skin treatments. The UK aesthetic medicine market is estimated at over £3.6 billion annually. Following the Health and Care Act 2022, certain procedures are now restricted to medical professionals only.",
    regulator: "General Medical Council (GMC)",
    salaryRange: "£60,000 – £130,000",
    faq: [
      { q: "What qualifications does an Aesthetic Doctor need in the UK?", a: "GMC registration as a medical doctor is required. Most aesthetic doctors also hold postgraduate aesthetic medicine qualifications from bodies such as Harley Academy, BCAM, or the Royal College of Surgeons." },
      { q: "How much does an Aesthetic Doctor earn in the UK?", a: "Aesthetic doctors typically earn £60,000–£130,000 depending on clinic ownership, patient volume, and the treatments offered." },
      { q: "Is the UK aesthetic medicine market regulated?", a: "The sector is becoming more regulated. The Health and Care Act 2022 introduced licensing requirements for practitioners performing botulinum toxin and filler injections, with enforcement increasing." },
    ],
  },

  cosmetic_doctor: {
    intro: "Cosmetic doctors in the UK are GMC-registered physicians who deliver cosmetic and aesthetic medical treatments. They may operate independently, work in aesthetic clinics, or combine private cosmetic work with another medical specialty. The terms 'aesthetic doctor' and 'cosmetic doctor' are broadly interchangeable in UK practice.",
    regulator: "General Medical Council (GMC)",
    salaryRange: "£60,000 – £130,000",
    faq: [
      { q: "What treatments can Cosmetic Doctors perform in the UK?", a: "Cosmetic doctors can administer botulinum toxin, dermal fillers, PRP, chemical peels, fat dissolving injections, and other non-surgical procedures. Some also offer minor surgical procedures under local anaesthetic." },
      { q: "How much does a Cosmetic Doctor earn in the UK?", a: "Earnings typically range from £60,000–£130,000, with clinic owners and those with a strong private patient list earning at the higher end." },
      { q: "Do Cosmetic Doctors need specific insurance in the UK?", a: "Yes. Indemnity insurance specifically covering aesthetic procedures is required, as standard GMC indemnity may not cover cosmetic treatments. Providers include MDDUS, MDU, and specialist brokers." },
    ],
  },

  aesthetic_nurse: {
    intro: "Aesthetic nurses in the UK are NMC-registered nurses who specialise in non-surgical cosmetic treatments including botulinum toxin, dermal fillers, and skin rejuvenation procedures. Since 2022, Schedule 4 Poisons legislation restricts botulinum toxin administration to prescribers or their authorised delegates, meaning aesthetic nurses now operate under a prescribing practitioner's oversight unless they are independent prescribers themselves.",
    regulator: "Nursing and Midwifery Council (NMC)",
    salaryRange: "£35,000 – £70,000",
    faq: [
      { q: "What qualifications does an Aesthetic Nurse need in the UK?", a: "NMC registration as a registered nurse (RN) is required, plus an aesthetic nursing qualification from an accredited provider. Independent prescribing qualification is increasingly required for autonomous practice." },
      { q: "How much does an Aesthetic Nurse earn in the UK?", a: "Aesthetic nurses typically earn £35,000–£70,000. Independent prescribers and those who own their own clinic can earn significantly more." },
      { q: "Can Aesthetic Nurses administer botulinum toxin independently in the UK?", a: "Since the 2022 reclassification of botulinum toxin as a Prescription Only Medicine, aesthetic nurses must either be independent prescribers or work under the supervision of a prescriber to administer it legally." },
    ],
  },

  nurse_injector: {
    intro: "Nurse injectors in the UK are NMC-registered nurses trained specifically in injectable aesthetic treatments, particularly botulinum toxin and dermal fillers. This role is highly sought after in aesthetic clinics and medspas. Independent prescribing qualification is increasingly required for autonomous practice following 2022 regulatory changes.",
    regulator: "Nursing and Midwifery Council (NMC)",
    salaryRange: "£35,000 – £65,000",
    faq: [
      { q: "What training does a Nurse Injector need in the UK?", a: "NMC registration plus aesthetic injectable training from an accredited provider. The Joint Council for Cosmetic Practitioners (JCCP) and BACN publish standards for aesthetic nursing competencies." },
      { q: "How much does a Nurse Injector earn in the UK?", a: "Nurse injectors typically earn £35,000–£65,000. Those with an independent prescribing qualification and a strong patient following can earn more." },
      { q: "Is independent prescribing required for Nurse Injectors?", a: "Since 2022, yes — to administer botulinum toxin independently, a nurse must hold an independent prescribing qualification or work under a prescriber. Most reputable clinics now require or support nurses in obtaining this." },
    ],
  },

  advanced_aesthetic_practitioner: {
    intro: "Advanced aesthetic practitioners in the UK are healthcare professionals (typically nurses or paramedics) with enhanced training in complex injectable and energy-based treatments. This role goes beyond standard aesthetic nurse duties to include thread lifting, polynucleotides, advanced filler techniques, and combination treatment planning.",
    regulator: "Nursing and Midwifery Council (NMC) or Health and Care Professions Council (HCPC)",
    salaryRange: "£45,000 – £80,000",
    faq: [
      { q: "What makes an 'Advanced' Aesthetic Practitioner different from a standard aesthetic nurse?", a: "Advanced practitioners demonstrate higher-level skills in treatment planning, complex techniques (thread lifting, advanced fillers, combination approaches), patient assessment, and complication management." },
      { q: "How much does an Advanced Aesthetic Practitioner earn?", a: "Salaries typically range from £45,000–£80,000, with independent prescribers and clinic owners earning more." },
      { q: "What regulatory body covers Advanced Aesthetic Practitioners in the UK?", a: "It depends on the practitioner's base profession — NMC for nurses, HCPC for paramedics or allied health professionals, GMC for doctors. The JCCP provides cross-professional standards." },
    ],
  },

  injector_practitioner: {
    intro: "Injector practitioners in UK aesthetic clinics deliver injectable treatments under the clinical governance of a registered medical prescriber. This term is sometimes used for practitioners from non-traditional healthcare backgrounds who have completed aesthetic injectable training programmes. Regulatory requirements vary based on base profession.",
    regulator: "Varies by base profession (NMC / HCPC / GMC)",
    salaryRange: "£30,000 – £60,000",
    faq: [
      { q: "Who can become an Injector Practitioner in the UK?", a: "Injector practitioners typically come from nursing, paramedic, dentistry, or other healthcare backgrounds. Base healthcare registration plus injectable training from an accredited provider is required." },
      { q: "How much does an Injector Practitioner earn?", a: "Earnings typically range from £30,000–£60,000 depending on experience and clinic type." },
      { q: "Are Injector Practitioners regulated in the UK?", a: "The UK aesthetic sector is moving toward stricter licensing. The Health and Care Act 2022 requires a licence to perform certain injectable procedures. Practitioners should ensure they work within a proper clinical governance framework." },
    ],
  },

  laser_technician: {
    intro: "Laser technicians in aesthetic clinics and medspas operate laser and energy-based devices for treatments including hair removal, skin resurfacing, and body contouring. In the UK, certain laser treatments are classified as special procedures requiring a local authority licence. Training requirements vary by laser type and clinic governance.",
    regulator: null,
    salaryRange: "£22,000 – £38,000",
    faq: [
      { q: "What qualifications does a Laser Technician need in the UK?", a: "Training from a recognised laser safety and operation provider is required. Level 4 certificates in Laser and IPL treatments are available from NVQ-awarding bodies. A Laser Protection Adviser (LPA) should oversee the clinic's laser safety protocols." },
      { q: "How much does a Laser Technician earn in a UK aesthetic clinic?", a: "Laser technicians typically earn £22,000–£38,000 depending on experience and the treatments offered." },
      { q: "Do laser treatments in the UK require a licence?", a: "Certain laser treatments performed on unlicensed premises may require a local authority licence under the special treatments register, depending on the local authority area." },
    ],
  },

  skin_therapist: {
    intro: "Skin therapists in UK aesthetic clinics perform clinical and semi-clinical skincare treatments including facials, chemical peels, microneedling, and LED therapy. They work alongside injecting practitioners to support patients' overall skin health outcomes. Most skin therapists hold Level 3 or Level 4 aesthetics qualifications.",
    regulator: null,
    salaryRange: "£22,000 – £38,000",
    faq: [
      { q: "What qualifications does a Skin Therapist need?", a: "Level 3 in Beauty Therapy or a Level 4 qualification in advanced skincare or clinical aesthetics. VTCT, CIBTAC, and Cidesco qualifications are widely recognised." },
      { q: "How much does a Skin Therapist earn in a UK aesthetic clinic?", a: "Skin therapists typically earn £22,000–£38,000. Those with medical-grade treatment training (peels, microneedling) earn at the higher end." },
      { q: "Is there demand for Skin Therapists in aesthetic clinics?", a: "Yes. Aesthetic clinics increasingly offer comprehensive skin health programmes alongside injectable treatments, creating strong demand for qualified skin therapists." },
    ],
  },

  skin_specialist: {
    intro: "Skin specialists in private medical and aesthetic settings assess and treat complex skin conditions using both prescription skincare and clinical procedures. The role bridges aesthetics and dermatology, often supporting consultant dermatologists or working autonomously within a clinical governance framework.",
    regulator: "Varies — NMC / HCPC depending on base profession",
    salaryRange: "£30,000 – £55,000",
    faq: [
      { q: "What background do Skin Specialists typically have?", a: "Many skin specialists are registered nurses or allied health professionals with additional training in dermatology or aesthetic medicine." },
      { q: "How much does a Skin Specialist earn in the UK?", a: "Skin specialists typically earn £30,000–£55,000 depending on qualifications and the type of practice." },
      { q: "What treatments do Skin Specialists perform?", a: "Skin analysis, prescription skincare protocols, clinical-grade peels, laser and light-based treatments, and liaison with dermatologists for more complex conditions." },
    ],
  },

  medical_aesthetician: {
    intro: "Medical aestheticians work in clinical settings to deliver advanced skincare treatments under medical supervision, combining beauty therapy expertise with clinical protocols. They are distinct from beauty therapists in that they operate within a medically governed environment and may assist with post-procedure care for patients who have had injectables or laser treatments.",
    regulator: null,
    salaryRange: "£24,000 – £40,000",
    faq: [
      { q: "What qualifications does a Medical Aesthetician need?", a: "Level 3 or Level 4 in Beauty Therapy or Aesthetics, plus additional training in medical aesthetics and clinical protocols. Experience working within a medical setting is valued." },
      { q: "How much does a Medical Aesthetician earn in the UK?", a: "Typically £24,000–£40,000 depending on clinic type and treatment complexity." },
      { q: "How is a Medical Aesthetician different from a beauty therapist?", a: "A medical aesthetician operates in a clinical or medically supervised environment, often treating post-procedure patients, and uses medical-grade products and clinical protocols beyond standard beauty therapy." },
    ],
  },

  body_contouring_specialist: {
    intro: "Body contouring specialists in UK aesthetic clinics operate non-surgical fat reduction, skin tightening, and body shaping technologies including cryolipolysis, HIFU, radiofrequency, and EMSculpt. This is a fast-growing treatment category driven by patient demand for non-invasive alternatives to liposuction.",
    regulator: null,
    salaryRange: "£24,000 – £45,000",
    faq: [
      { q: "What training does a Body Contouring Specialist need?", a: "Device-specific training from the equipment manufacturer plus broader aesthetic therapist qualifications (Level 3/4). Some clinics also require a nursing or allied health background for specific technologies." },
      { q: "How much does a Body Contouring Specialist earn in the UK?", a: "Typically £24,000–£45,000 depending on device expertise and clinic type." },
      { q: "Is body contouring in demand in the UK?", a: "Yes. Non-surgical body contouring is one of the fastest-growing aesthetic treatment categories in the UK, with patient demand increasing year-on-year." },
    ],
  },

  hair_restoration_technician: {
    intro: "Hair restoration technicians assist surgeons in hair transplant procedures, specifically in the extraction and implantation of hair follicle grafts (FUE and FUT techniques). This is a specialised clinical support role within private hair restoration clinics. The UK hair transplant market has expanded significantly, driven by increasing patient acceptance and improved outcomes.",
    regulator: null,
    salaryRange: "£25,000 – £45,000",
    faq: [
      { q: "What does a Hair Restoration Technician do?", a: "They assist the surgeon in graft extraction (FUE punching), graft preparation, and implantation. They work as part of a team and require precision and stamina for long procedures." },
      { q: "How much does a Hair Restoration Technician earn in the UK?", a: "Typically £25,000–£45,000. Experienced technicians in high-volume clinics can earn more." },
      { q: "Do Hair Restoration Technicians need a medical background?", a: "Not necessarily, though a background in healthcare, beauty, or science is advantageous. Most training is delivered on-the-job by the clinic or through specialist courses." },
    ],
  },

  hair_transplant_technician: {
    intro: "Hair transplant technicians support surgeons throughout FUE (Follicular Unit Extraction) and FUT (Follicular Unit Transplantation) procedures in private hair restoration clinics. This precision clinical role is central to procedure outcomes. The UK hair transplant market has grown, with clinics in London and major cities handling increasing patient volumes.",
    regulator: null,
    salaryRange: "£25,000 – £45,000",
    faq: [
      { q: "What is the role of a Hair Transplant Technician?", a: "Technicians assist with graft extraction, sorting, counting, and implantation. They are critical to procedure efficiency and patient outcomes." },
      { q: "How much does a Hair Transplant Technician earn?", a: "Typically £25,000–£45,000 in the UK, with experienced technicians in busy London clinics earning more." },
      { q: "Is hair transplant surgery growing in the UK?", a: "Yes. Patient demand for surgical hair restoration has grown alongside improvements in FUE technique and more accessible pricing." },
    ],
  },

  iv_therapy_nurse: {
    intro: "IV therapy nurses in the UK administer intravenous vitamin drips, hydration therapies, and other infusion-based wellness treatments in private clinics and mobile settings. This role requires NMC registration and cannulation competency. The IV therapy wellness sector has grown in the UK, though practitioners must operate within a clinical governance framework with prescriber oversight.",
    regulator: "Nursing and Midwifery Council (NMC)",
    salaryRange: "£30,000 – £55,000",
    faq: [
      { q: "What qualifications does an IV Therapy Nurse need in the UK?", a: "NMC registration as a registered nurse, plus cannulation training and IV therapy competency. Many clinics also require independent prescribing qualification." },
      { q: "How much does an IV Therapy Nurse earn?", a: "IV therapy nurses typically earn £30,000–£55,000. Those who run mobile services or own their clinic can earn more." },
      { q: "Is IV therapy regulated in the UK?", a: "IV therapy administration is a nursing skill regulated by the NMC. IV clinics operate within a clinical governance framework and should have prescriber oversight for the substances administered." },
    ],
  },

  weight_loss_practitioner: {
    intro: "Weight loss practitioners in private medical and aesthetic settings support patients through medically supervised weight management programmes, including GLP-1 agonist therapies (e.g., semaglutide), dietary coaching, and behaviour change support. This role has expanded significantly following the widespread adoption of GLP-1 medications in UK private clinics.",
    regulator: "Varies — GMC / NMC depending on prescribing role",
    salaryRange: "£30,000 – £65,000",
    faq: [
      { q: "What qualifications do Weight Loss Practitioners need?", a: "Clinical practitioners (doctors or nurses) who prescribe GLP-1 medications need GMC or NMC registration plus prescribing authority. Non-prescribing roles in coaching and support may not require clinical registration." },
      { q: "How much does a Weight Loss Practitioner earn?", a: "Typically £30,000–£65,000 depending on qualifications and the prescribing model used." },
      { q: "Is medically supervised weight loss growing in the UK?", a: "Yes. The approval of semaglutide (Wegovy) and widespread use of tirzepatide in private clinics has driven major growth in medically supervised weight management services." },
    ],
  },

  wellness_practitioner: {
    intro: "Wellness practitioners in private medical and aesthetic settings design and deliver holistic wellness programmes encompassing nutrition, lifestyle medicine, stress management, and complementary therapies. This is an evolving role as private clinics expand beyond traditional clinical services into longevity and preventive health.",
    regulator: null,
    salaryRange: "£25,000 – £50,000",
    faq: [
      { q: "What qualifications does a Wellness Practitioner need?", a: "Requirements vary widely. Relevant qualifications include nutritional therapy, health coaching, functional medicine, and related clinical backgrounds. Some positions require clinical registration." },
      { q: "How much does a Wellness Practitioner earn?", a: "Typically £25,000–£50,000. Practitioners with specialist qualifications in functional medicine or longevity medicine can earn more." },
      { q: "Is the wellness sector growing in the UK?", a: "Yes. Private clinics and medspas are increasingly offering comprehensive wellness services alongside traditional treatments, driven by patient interest in preventive and lifestyle medicine." },
    ],
  },

  clinic_manager: {
    intro: "Clinic managers in aesthetic and private medical practices oversee daily operations, staff management, compliance, and financial performance. They ensure the clinic meets CQC standards, maintains treatment quality, and achieves revenue targets. Aesthetic clinic managers often come from a clinical background combined with management experience.",
    regulator: null,
    salaryRange: "£32,000 – £55,000",
    faq: [
      { q: "What does an Aesthetic Clinic Manager do?", a: "Day-to-day management of clinic operations including staffing rotas, patient experience, CQC compliance, stock management, marketing support, and financial reporting." },
      { q: "How much does an Aesthetic Clinic Manager earn in the UK?", a: "Typically £32,000–£55,000 depending on clinic size, location, and group vs. single site." },
      { q: "Do Aesthetic Clinic Managers need CQC registration?", a: "Clinics regulated by CQC must have a Registered Manager. The clinic manager typically holds or supports the Registered Manager role and is responsible for compliance with CQC fundamental standards." },
    ],
  },

  clinic_director: {
    intro: "Clinic directors in aesthetic and private medical settings hold overall strategic responsibility for clinic operations, clinical governance, business development, and regulatory compliance. This senior leadership role typically combines clinical credentials with strong business acumen. Directors at group practices may oversee multiple sites.",
    regulator: "Typically GMC or NMC (for clinical directors) or general management",
    salaryRange: "£50,000 – £90,000",
    faq: [
      { q: "What is the role of an Aesthetic Clinic Director?", a: "Strategic oversight of all clinic operations — clinical governance, team leadership, business development, CQC compliance, and P&L responsibility." },
      { q: "How much does a Clinic Director earn in the UK?", a: "Clinic directors typically earn £50,000–£90,000, with group practice directors potentially earning more through performance-linked packages." },
      { q: "What background do Clinic Directors typically have?", a: "Many clinic directors come from a clinical background (medicine, nursing) with added business management experience. Some come from healthcare management without a clinical base." },
    ],
  },

  patient_coordinator: {
    intro: "Patient coordinators in aesthetic and private medical clinics manage the patient journey from initial enquiry through to post-treatment follow-up. They handle consultations, treatment plan discussions, appointment booking, and often support the financial conversation. Strong sales and communication skills are essential.",
    regulator: null,
    salaryRange: "£22,000 – £36,000",
    faq: [
      { q: "What does a Patient Coordinator do in an aesthetic clinic?", a: "They manage patient enquiries, book consultations, guide patients through treatment options, handle financial discussions, and ensure a positive patient experience throughout." },
      { q: "How much does a Patient Coordinator earn in the UK?", a: "Typically £22,000–£36,000, often with a performance-related bonus tied to conversion rates." },
      { q: "Do Patient Coordinators need a clinical background?", a: "Not necessarily, though knowledge of aesthetic treatments is important. Many coordinators come from customer service, retail management, or healthcare reception backgrounds." },
    ],
  },

  // PRIVATE MEDICAL
  private_gp: {
    intro: "Private GPs in the UK are GMC-registered general practitioners working outside the NHS system, offering same-day appointments, extended consultations, home visits, and direct access to specialist referrals. The UK private GP sector has grown significantly as NHS access challenges have increased. Private GPs typically earn substantially more than NHS counterparts.",
    regulator: "General Medical Council (GMC)",
    salaryRange: "£70,000 – £150,000",
    faq: [
      { q: "What qualifications does a Private GP need in the UK?", a: "GMC registration, completion of GP specialty training (MRCGP), and inclusion on the GP Register. Most private GPs have significant NHS experience before transitioning to private practice." },
      { q: "How much does a Private GP earn in the UK?", a: "Private GPs typically earn £70,000–£150,000 depending on patient volume, location, and whether they own the practice." },
      { q: "Is private GP practice growing in the UK?", a: "Yes significantly. NHS GP access difficulties have driven increased patient willingness to pay for private GP services, particularly in urban areas." },
    ],
  },

  consultant_specialist: {
    intro: "Consultant specialists in private hospitals and clinics in the UK hold GMC specialist registration and practise at the highest level of their specialty. Many hold NHS consultant posts and undertake private practice in parallel. Private consultants typically earn premium rates through private medical insurance and self-pay patients.",
    regulator: "General Medical Council (GMC) — Specialist Register",
    salaryRange: "£80,000 – £200,000",
    faq: [
      { q: "What qualifications does a Consultant Specialist need in the UK?", a: "Full GMC registration, completion of specialty training to CCST level, and entry on the GMC Specialist Register. Most hold a Fellowship of a Royal College in their specialty." },
      { q: "How much does a Private Consultant Specialist earn?", a: "Private consultants typically earn £80,000–£200,000+ depending on specialty, patient volume, and NHS vs. full private commitment." },
      { q: "Can NHS Consultants do private practice in the UK?", a: "Yes. Most NHS consultants with a standard contract may undertake private practice outside NHS hours. The proportion of private earnings is governed by contract terms." },
    ],
  },

  dermatologist: {
    intro: "Dermatologists in the UK are GMC-registered specialists in the diagnosis and treatment of skin, hair, and nail conditions. Private dermatology is in high demand due to long NHS waiting times. Private dermatologists see patients for acne, eczema, psoriasis, skin cancer screening, and cosmetic skin concerns.",
    regulator: "General Medical Council (GMC) — Dermatology Specialist Register",
    salaryRange: "£80,000 – £180,000",
    faq: [
      { q: "What qualifications does a Dermatologist need in the UK?", a: "Medical degree, full GMC registration, completion of core and specialty dermatology training, and MRCP(Derm) or FRCDerm qualification." },
      { q: "How much does a Private Dermatologist earn in the UK?", a: "Private dermatologists typically earn £80,000–£180,000. High demand for private dermatology consultations makes this a financially rewarding private practice specialty." },
      { q: "Is private dermatology in demand in the UK?", a: "Yes. NHS dermatology waiting times regularly exceed 18 weeks, driving patients to seek private consultations for both medical and cosmetic skin conditions." },
    ],
  },

  ent_consultant: {
    intro: "ENT (Ear, Nose and Throat) consultants in private practice are GMC-registered specialists treating conditions of the head and neck including sinusitis, hearing disorders, tonsil problems, and thyroid conditions. Private ENT is particularly active in London and major UK cities, with many consultants holding parallel NHS posts.",
    regulator: "General Medical Council (GMC) — ENT Specialist Register",
    salaryRange: "£80,000 – £180,000",
    faq: [
      { q: "What does an ENT Consultant treat in private practice?", a: "Common conditions include rhinitis, sinusitis, hearing loss, tinnitus, tonsillitis, voice disorders, and head and neck tumours. Cosmetic ear, nose, and throat surgery is also a growing area of private practice." },
      { q: "How much does a Private ENT Consultant earn?", a: "Typically £80,000–£180,000 depending on surgical volume and private/NHS split." },
      { q: "Is private ENT in demand in the UK?", a: "Yes. NHS ENT waiting times are among the longest of any specialty, making private access particularly attractive to patients." },
    ],
  },

  fertility_specialist: {
    intro: "Fertility specialists in UK private clinics are GMC-registered specialists in reproductive medicine who provide IVF, IUI, egg freezing, and fertility investigation services. The UK private fertility sector is regulated by the Human Fertilisation and Embryology Authority (HFEA). Private fertility clinics are predominantly self-pay, with limited NHS commissioning.",
    regulator: "General Medical Council (GMC) / Human Fertilisation and Embryology Authority (HFEA)",
    salaryRange: "£80,000 – £180,000",
    faq: [
      { q: "What qualifications does a Fertility Specialist need in the UK?", a: "GMC specialist registration in reproductive medicine or obstetrics/gynaecology, plus HFEA clinic licence compliance. The sub-specialty of reproductive medicine follows formal RCOG training pathways." },
      { q: "How much does a Private Fertility Specialist earn?", a: "Typically £80,000–£180,000 depending on clinic ownership and patient volume." },
      { q: "Is the private fertility sector regulated in the UK?", a: "Yes. All fertility clinics in the UK must be licenced by the HFEA, which regulates IVF, donor conception, embryo storage, and related treatments." },
    ],
  },

  surgical_consultant: {
    intro: "Surgical consultants in UK private hospitals perform elective surgical procedures across specialties including orthopaedics, general surgery, cosmetic surgery, and bariatric surgery. Private surgical volumes have grown as NHS waiting lists extend. Surgical consultants typically hold dual NHS and private commitments.",
    regulator: "General Medical Council (GMC) — Surgical Specialist Register",
    salaryRange: "£90,000 – £250,000",
    faq: [
      { q: "What qualifications does a Surgical Consultant need?", a: "GMC specialist registration in the relevant surgical specialty, Fellowship of the Royal College of Surgeons (FRCS), and completion of specialty surgical training." },
      { q: "How much does a Private Surgical Consultant earn?", a: "Private surgical consultants are among the highest earners in UK medicine, typically £90,000–£250,000+ depending on surgical volume and specialty." },
      { q: "Is private surgery in demand in the UK?", a: "Yes. NHS surgical waiting lists exceeding 18 months across many specialties have driven significant patient demand for private surgery." },
    ],
  },

  practice_nurse: {
    intro: "Practice nurses in private medical clinics are NMC-registered nurses who deliver a range of clinical services including health assessments, chronic disease management, vaccinations, and minor illness treatment. Private practice nurses often have more time per consultation than NHS counterparts, allowing more comprehensive care.",
    regulator: "Nursing and Midwifery Council (NMC)",
    salaryRange: "£30,000 – £50,000",
    faq: [
      { q: "What qualifications does a Practice Nurse need for private practice?", a: "NMC registration as a registered nurse, plus relevant clinical experience. Additional qualifications in travel health, chronic disease management, or minor illness are often required." },
      { q: "How much does a Private Practice Nurse earn?", a: "Typically £30,000–£50,000 depending on experience, qualifications, and the type of private clinic." },
      { q: "What do Practice Nurses do in private clinics?", a: "Health MOTs, travel health and vaccinations, chronic disease monitoring, wound care, phlebotomy, ECGs, and support for GP and consultant clinics." },
    ],
  },

  specialist_nurse: {
    intro: "Specialist nurses in UK private settings hold advanced clinical expertise in a specific area of care, such as diabetes, oncology, cardiac health, or reproductive medicine. They often hold non-medical prescribing qualifications and work at an advanced level of practice, frequently managing their own patient caseloads.",
    regulator: "Nursing and Midwifery Council (NMC)",
    salaryRange: "£38,000 – £60,000",
    faq: [
      { q: "What qualifications does a Specialist Nurse need?", a: "NMC registration plus postgraduate education in the specialist area. Many specialist nurses hold a Master's level qualification or specialist practice qualification. Independent prescribing is often required." },
      { q: "How much does a Specialist Nurse earn in private practice?", a: "Typically £38,000–£60,000 depending on the specialty and level of autonomous practice." },
      { q: "What specialist nurse roles are in demand in private healthcare?", a: "High demand exists for specialist nurses in aesthetics, fertility, diabetes, oncology, cardiology, and gynaecology in the UK private sector." },
    ],
  },

  theatre_nurse: {
    intro: "Theatre nurses in private hospitals support surgical teams throughout operative procedures, ensuring instrument availability, sterility, and patient safety. This includes scrub, circulating, and anaesthetic nursing roles. Private theatre nursing is a skilled and highly regarded specialty within surgical nursing.",
    regulator: "Nursing and Midwifery Council (NMC)",
    salaryRange: "£32,000 – £52,000",
    faq: [
      { q: "What qualifications does a Theatre Nurse need?", a: "NMC registration plus completion of a perioperative care course (e.g., ENB 183 equivalent or PgC in Perioperative Practice). Many theatre nurses undertake the NATN competency framework." },
      { q: "How much does a Theatre Nurse earn in a private hospital?", a: "Typically £32,000–£52,000 depending on experience, speciality, and whether they hold additional scrub or anaesthetic competencies." },
      { q: "Is there demand for Theatre Nurses in UK private hospitals?", a: "Yes. Private surgical volumes have increased as NHS waiting lists grow, creating consistent demand for experienced perioperative nurses." },
    ],
  },

  scrub_nurse: {
    intro: "Scrub nurses work directly alongside surgeons during operative procedures, passing instruments and maintaining the sterile field. This demanding perioperative role requires detailed procedural knowledge and the ability to anticipate surgical requirements. Scrub nurses work across all surgical specialties in private hospitals.",
    regulator: "Nursing and Midwifery Council (NMC)",
    salaryRange: "£30,000 – £50,000",
    faq: [
      { q: "What does a Scrub Nurse do?", a: "A scrub nurse prepares and maintains the sterile instrument field, passes instruments to the surgeon, counts instruments and swabs, and maintains the sterile environment throughout the procedure." },
      { q: "How much does a Scrub Nurse earn in the UK?", a: "Typically £30,000–£50,000 in private hospitals, with higher rates for agency scrub nurses or those with speciality expertise." },
      { q: "What specialties do Scrub Nurses work in?", a: "All surgical specialties, including orthopaedics, cardiac surgery, general surgery, gynaecology, ENT, ophthalmology, and plastic surgery." },
    ],
  },

  recovery_nurse: {
    intro: "Recovery nurses (post-anaesthetic care nurses) in private surgical facilities manage patients waking from general or regional anaesthesia, monitoring vital signs, managing pain and nausea, and ensuring safe transfer to the ward. This is a critical patient safety role requiring advanced assessment skills.",
    regulator: "Nursing and Midwifery Council (NMC)",
    salaryRange: "£30,000 – £50,000",
    faq: [
      { q: "What qualifications does a Recovery Nurse need?", a: "NMC registration plus perioperative nursing experience. Many hold a post-anaesthetic care (PACU) or recovery nursing qualification. ATLS and ACLS training is advantageous." },
      { q: "How much does a Recovery Nurse earn?", a: "Typically £30,000–£50,000 in private hospitals." },
      { q: "What are the key responsibilities of a Recovery Nurse?", a: "Monitoring patients post-anaesthesia, managing airway, assessing pain and nausea, administering prescribed medications, and determining readiness for transfer to ward or discharge." },
    ],
  },

  anaesthetic_practitioner: {
    intro: "Anaesthetic practitioners (APs) in UK private hospitals support anaesthetists throughout the perioperative pathway, including preparation of anaesthetic equipment, patient positioning, and assistance during induction and emergence. APs are HCPC-registered operating department practitioners (ODPs) or NMC-registered nurses with anaesthetic training.",
    regulator: "Health and Care Professions Council (HCPC) or Nursing and Midwifery Council (NMC)",
    salaryRange: "£30,000 – £50,000",
    faq: [
      { q: "What qualifications does an Anaesthetic Practitioner need?", a: "Either a BSc in Operating Department Practice (HCPC-registered ODP) or NMC nursing registration plus anaesthetic training. The AAGBI publishes competency guidelines for anaesthetic practitioners." },
      { q: "How much does an Anaesthetic Practitioner earn in private practice?", a: "Typically £30,000–£50,000 in private hospitals." },
      { q: "What is the difference between an ODP and a Theatre Nurse?", a: "ODPs are specifically trained in the three phases of the operative journey (anaesthetic, surgical, recovery). Theatre nurses come from a nursing background. Both can work across perioperative roles with appropriate training." },
    ],
  },

  surgical_assistant: {
    intro: "Surgical assistants in UK private hospitals provide direct assistance to surgeons during operative procedures, performing tasks such as retraction, suturing, and wound closure under supervision. The role is distinct from scrub nursing and requires specific surgical assistant training. The profession is growing in the UK private sector.",
    regulator: "Health Education England / Faculty of Surgical Trainers recognition",
    salaryRange: "£32,000 – £55,000",
    faq: [
      { q: "What qualifications does a Surgical Assistant need in the UK?", a: "A background in nursing or operating department practice, plus a recognised surgical assistant qualification. The Royal College of Surgeons of England has developed a national framework for surgical care practitioners and assistants." },
      { q: "How much does a Surgical Assistant earn?", a: "Typically £32,000–£55,000 in private hospitals, with experienced surgical care practitioners earning more." },
      { q: "Is the Surgical Assistant role growing in the UK?", a: "Yes. The NHS Long Term Workforce Plan and private sector demand have both driven expansion of surgical assistant and surgical care practitioner roles." },
    ],
  },

  healthcare_assistant: {
    intro: "Healthcare assistants (HCAs) in private clinics and hospitals support registered healthcare professionals in delivering patient care, including basic clinical observations, patient hygiene, bed management, and administrative support. HCAs are a critical workforce pillar in private medical settings.",
    regulator: null,
    salaryRange: "£20,000 – £28,000",
    faq: [
      { q: "What qualifications does a Healthcare Assistant need?", a: "No mandatory qualifications are required, though NVQ Level 2 or 3 in Health and Social Care is standard. Many private employers require care certificate completion or equivalent training." },
      { q: "How much does an HCA earn in a private clinic?", a: "Typically £20,000–£28,000, with higher rates in London and for HCAs with specialist experience." },
      { q: "What do HCAs do in private medical settings?", a: "Clinical observations, patient preparation, phlebotomy assistance, escorting patients, administrative support, and working under the supervision of registered nurses and doctors." },
    ],
  },

  phlebotomist: {
    intro: "Phlebotomists in private clinics and hospitals perform venepuncture and other sample collection procedures, processing and dispatching samples to laboratory. The role is in high demand in the growing private blood testing and health screening market. Many phlebotomists work across multiple settings on a sessional basis.",
    regulator: null,
    salaryRange: "£22,000 – £30,000",
    faq: [
      { q: "What qualifications does a Phlebotomist need?", a: "A recognised phlebotomy qualification (e.g., City & Guilds, UKAS-approved training) is typically required. There is no mandatory statutory regulation, but many employers require a formal qualification." },
      { q: "How much does a Phlebotomist earn in the UK?", a: "Typically £22,000–£30,000 in private settings. Sessional phlebotomists often earn per-session rates." },
      { q: "Is phlebotomy in demand in the UK?", a: "Yes. The private blood testing and health screening market has expanded rapidly, driving demand for experienced phlebotomists across clinics and mobile services." },
    ],
  },

  radiographer: {
    intro: "Radiographers in UK private hospitals and imaging centres are HCPC-registered practitioners who perform diagnostic imaging including X-ray, MRI, CT, and ultrasound. There are approximately 28,000 registered radiographers in the UK. Private radiology services are growing as NHS imaging waiting times increase.",
    regulator: "Health and Care Professions Council (HCPC)",
    salaryRange: "£30,000 – £52,000",
    faq: [
      { q: "What qualifications does a Radiographer need in the UK?", a: "A BSc in Diagnostic Radiography (for diagnostic roles) or Therapeutic Radiography (for oncology settings), plus HCPC registration." },
      { q: "How much does a Private Radiographer earn?", a: "Typically £30,000–£52,000. Radiographers with advanced practice qualifications (e.g., CT or MRI reporting) earn more." },
      { q: "Are Radiographer roles in demand in the UK?", a: "Yes. The UK faces a significant radiographer workforce shortage, particularly in CT, MRI, and ultrasound. Private imaging centres are actively recruiting." },
    ],
  },

  sonographer: {
    intro: "Sonographers in UK private clinics use ultrasound technology to image internal structures and diagnose medical conditions. Obstetric, vascular, and general abdominal sonography are common specialties. HCPC registration is standard. The private sonography market is growing, particularly for pregnancy scanning and health screening.",
    regulator: "Health and Care Professions Council (HCPC) / Voluntary — British Medical Ultrasound Society (BMUS)",
    salaryRange: "£35,000 – £58,000",
    faq: [
      { q: "What qualifications does a Sonographer need in the UK?", a: "A Postgraduate Certificate or Diploma in Medical Ultrasound from an accredited programme. Many sonographers come from a radiography or midwifery background. HCPC registration via diagnostic radiography or relevant allied health profession." },
      { q: "How much does a Sonographer earn in private practice?", a: "Typically £35,000–£58,000 in private clinics. Specialist sonographers (e.g., vascular, echocardiography) can earn more." },
      { q: "Is there demand for Sonographers in the UK?", a: "Yes. Sonographer shortages are significant, particularly in obstetrics and vascular imaging. Private clinics offer competitive salaries to attract experienced practitioners." },
    ],
  },

  medical_receptionist: {
    intro: "Medical receptionists in private clinics are the first point of contact for patients, managing appointment scheduling, patient records, insurance billing enquiries, and front-of-house responsibilities. Experience with private medical software (e.g., Heydoc, Semble, Cliniko) and private medical insurance processes is valuable.",
    regulator: null,
    salaryRange: "£22,000 – £30,000",
    faq: [
      { q: "What skills does a Medical Receptionist need for private practice?", a: "Strong communication skills, experience with practice management software, knowledge of private medical insurance (BUPA, AXA, Aviva), and the ability to manage multiple consultants' schedules." },
      { q: "How much does a Medical Receptionist earn in a private clinic?", a: "Typically £22,000–£30,000. London clinics typically pay at the higher end." },
      { q: "What software do Medical Receptionists use in private practice?", a: "Common systems include Semble, Heydoc, Cliniko, and Healthcode for insurance billing. Experience with these platforms is often sought." },
    ],
  },

  medical_secretary: {
    intro: "Medical secretaries in private practice manage correspondence, dictation, referral letters, patient records, and administrative workflows for consultants and specialist clinics. Strong medical terminology knowledge and audio transcription skills are essential. This role is critical to consultant productivity in private practice.",
    regulator: null,
    salaryRange: "£24,000 – £38,000",
    faq: [
      { q: "What qualifications does a Medical Secretary need?", a: "AMSPAR (Association of Medical Secretaries, Practice Administrators and Receptionists) qualifications are the gold standard. Strong typing speed, medical terminology, and audio transcription skills are required." },
      { q: "How much does a Medical Secretary earn in private practice?", a: "Typically £24,000–£38,000 depending on the consultant load and practice type." },
      { q: "Is the Medical Secretary role evolving?", a: "Yes. Digital dictation and AI transcription tools are changing the role, but complex letter writing, patient communication, and administrative coordination remain firmly human-led." },
    ],
  },

  clinic_coordinator: {
    intro: "Clinic coordinators in private medical settings manage the operational and administrative workflow of clinical sessions, ensuring consultants' clinics run smoothly. They liaise between patients, clinical staff, and administrative teams, managing appointment flow, patient correspondence, and post-consultation follow-up.",
    regulator: null,
    salaryRange: "£24,000 – £36,000",
    faq: [
      { q: "What does a Clinic Coordinator do?", a: "Manage appointment scheduling, prepare clinic packs, liaise with consultants, coordinate referrals, handle patient queries, and ensure smooth clinic operations." },
      { q: "How much does a Clinic Coordinator earn?", a: "Typically £24,000–£36,000 depending on the size and type of private clinic." },
      { q: "What skills are needed for a Clinic Coordinator role?", a: "Strong organisation, communication, experience with practice management software, and the ability to manage multiple clinicians' schedules simultaneously." },
    ],
  },

  admissions_coordinator: {
    intro: "Admissions coordinators in private hospitals manage the patient journey from referral or self-referral through to surgical or inpatient admission, ensuring all pre-operative requirements, insurance authorisations, and administrative steps are completed. This is a high-responsibility role central to private hospital revenue management.",
    regulator: null,
    salaryRange: "£26,000 – £40,000",
    faq: [
      { q: "What does an Admissions Coordinator do?", a: "Manage patient referrals, obtain insurance pre-authorisations, coordinate pre-assessment requirements, confirm surgical bookings, and ensure all administrative admission steps are completed accurately." },
      { q: "How much does an Admissions Coordinator earn?", a: "Typically £26,000–£40,000 in private hospital settings." },
      { q: "Do Admissions Coordinators need healthcare experience?", a: "Private medical insurance knowledge and healthcare administration experience are highly valued, as is familiarity with insurance billing processes (Healthcode, BUPA portals, etc.)." },
    ],
  },

  // ALLIED HEALTH
  physiotherapist: {
    intro: "Physiotherapists in the UK are HCPC-registered clinicians who assess and treat physical conditions affecting movement, function, and quality of life. There are approximately 62,000 registered physiotherapists in the UK. Private physiotherapy has grown significantly, covering musculoskeletal, sports, neurological, and women's health specialities.",
    regulator: "Health and Care Professions Council (HCPC)",
    salaryRange: "£28,000 – £55,000",
    faq: [
      { q: "What qualifications does a Physiotherapist need in the UK?", a: "A BSc in Physiotherapy from an HCPC-approved programme, followed by HCPC registration. Many physiotherapists pursue postgraduate specialisation in MSK, sports, or neurological physiotherapy." },
      { q: "How much does a Physiotherapist earn in private practice?", a: "Private physiotherapists typically earn £28,000–£55,000 employed, or significantly more in self-employed or clinic-owner models." },
      { q: "Is physiotherapy in demand in the UK?", a: "Yes. Demand for physiotherapy consistently exceeds NHS supply, driving strong growth in private physiotherapy clinics and sports injury centres." },
    ],
  },

  osteopath: {
    intro: "Osteopaths in the UK are regulated by the General Osteopathic Council (GOsC) and treat musculoskeletal and other conditions using hands-on manipulation, massage, and movement techniques. There are approximately 5,500 registered osteopaths in the UK. Most osteopaths work in private practice.",
    regulator: "General Osteopathic Council (GOsC)",
    salaryRange: "£30,000 – £60,000",
    faq: [
      { q: "What qualifications does an Osteopath need in the UK?", a: "A 4-year Master of Osteopathy (MOst) or Bachelor of Osteopathy (BOst) degree from a GOsC-accredited institution, followed by GOsC registration." },
      { q: "How much does an Osteopath earn in the UK?", a: "Employed osteopaths earn £30,000–£45,000. Self-employed osteopaths building their own practice can earn £45,000–£70,000+." },
      { q: "Is osteopathy growing in the UK?", a: "Yes. Increasing public awareness of musculoskeletal health and growing acceptance of complementary medicine approaches have supported sustained demand for osteopathy." },
    ],
  },

  chiropractor: {
    intro: "Chiropractors in the UK are regulated by the General Chiropractic Council (GCC) and focus on the diagnosis and treatment of conditions related to the spine, joints, and nervous system. There are approximately 3,500 registered chiropractors in the UK. Chiropractic is a well-established primary contact profession in private healthcare.",
    regulator: "General Chiropractic Council (GCC)",
    salaryRange: "£30,000 – £65,000",
    faq: [
      { q: "What qualifications does a Chiropractor need in the UK?", a: "A 4-5 year Masters degree in Chiropractic from a GCC-accredited institution, followed by GCC registration." },
      { q: "How much does a Chiropractor earn in the UK?", a: "Employed chiropractors earn £30,000–£45,000. Associate and practice-owner chiropractors can earn £50,000–£80,000+." },
      { q: "Is chiropractic in demand in the UK?", a: "Yes. Back pain and musculoskeletal conditions are among the most common presenting complaints in primary care. Chiropractic practices continue to grow as patients seek alternatives to NHS physiotherapy waiting lists." },
    ],
  },

  podiatrist: {
    intro: "Podiatrists in the UK are HCPC-registered clinicians who assess and treat conditions of the foot, ankle, and lower limb. Areas of practice include diabetic foot care, biomechanics, nail surgery, and sports injuries. There are approximately 12,000 registered podiatrists in the UK, with many working in private practice.",
    regulator: "Health and Care Professions Council (HCPC)",
    salaryRange: "£26,000 – £48,000",
    faq: [
      { q: "What qualifications does a Podiatrist need in the UK?", a: "A BSc in Podiatry from an HCPC-approved programme, followed by HCPC registration." },
      { q: "How much does a Podiatrist earn in the UK?", a: "Employed podiatrists typically earn £26,000–£45,000. Private practice owners can earn more. Podiatrists with surgical qualifications (nail surgery, injection therapy) earn at the higher end." },
      { q: "Is podiatry in demand in the UK?", a: "Yes. An aging population and increasing prevalence of diabetes have driven strong demand for podiatry services, particularly in NHS and private diabetic foot care." },
    ],
  },

  occupational_therapist: {
    intro: "Occupational therapists (OTs) in the UK are HCPC-registered clinicians who help people overcome barriers to daily activities caused by physical or mental health conditions. Private OTs work across paediatric, mental health, neurological, and vocational rehabilitation settings. There are approximately 38,000 registered OTs in the UK.",
    regulator: "Health and Care Professions Council (HCPC)",
    salaryRange: "£28,000 – £50,000",
    faq: [
      { q: "What qualifications does an Occupational Therapist need?", a: "A BSc or MSc in Occupational Therapy from an HCPC-approved programme, followed by HCPC registration." },
      { q: "How much does an OT earn in private practice?", a: "Employed OTs in private settings typically earn £28,000–£50,000. Independent OTs working with medico-legal or complex rehabilitation cases can earn significantly more." },
      { q: "What areas of private practice do OTs work in?", a: "Paediatric OT, neurological rehabilitation, mental health, medico-legal assessment, hand therapy, vocational rehabilitation, and cognitive rehabilitation." },
    ],
  },

  speech_language_therapist: {
    intro: "Speech and language therapists (SLTs) in the UK are HCPC-registered clinicians who assess and treat communication and swallowing disorders across all age groups. Private SLTs work with children (language delay, autism) and adults (stroke rehabilitation, voice disorders, dysphagia). There are approximately 18,000 registered SLTs in the UK.",
    regulator: "Health and Care Professions Council (HCPC) / Royal College of Speech and Language Therapists (RCSLT)",
    salaryRange: "£28,000 – £52,000",
    faq: [
      { q: "What qualifications does a Speech and Language Therapist need?", a: "A BSc or MSc in Speech and Language Therapy from an HCPC-approved programme, followed by HCPC registration and RCSLT membership." },
      { q: "How much does a private SLT earn?", a: "Employed SLTs in private settings earn £28,000–£45,000. Independent private SLTs charging per session can earn £50,000+." },
      { q: "Is speech therapy in demand in the UK?", a: "Yes. Long NHS waiting times for paediatric SLT and growing awareness of language development have driven strong demand for private SLT services." },
    ],
  },

  dietitian: {
    intro: "Dietitians in the UK are HCPC-registered clinicians and the only nutrition professionals with statutory regulation. They assess, diagnose, and treat nutritional and dietary conditions across a wide range of clinical settings. Private dietitians work in weight management, gastrointestinal conditions, paediatric nutrition, and sports performance.",
    regulator: "Health and Care Professions Council (HCPC) / British Dietetic Association (BDA)",
    salaryRange: "£28,000 – £50,000",
    faq: [
      { q: "What qualifications does a Dietitian need in the UK?", a: "A BSc or postgraduate diploma in Dietetics from an HCPC-approved programme, followed by HCPC registration. Dietitians are the only protected nutrition professional title in the UK." },
      { q: "How much does a private Dietitian earn?", a: "Employed private dietitians earn £28,000–£45,000. Independent dietitians charging per consultation can earn more." },
      { q: "What is the difference between a Dietitian and a Nutritionist?", a: "The title 'Dietitian' is legally protected in the UK and requires HCPC registration. 'Nutritionist' is not a protected title, though registered nutritionists (RNutr) are accredited by the Association for Nutrition." },
    ],
  },

  nutritionist: {
    intro: "Nutritionists in the UK provide advice and guidance on diet and nutrition for health and performance. Unlike dietitians, the title 'nutritionist' is not legally protected, but registered nutritionists (RNutr) hold qualifications accredited by the Association for Nutrition (AfN). Private nutritionists work across weight management, sports nutrition, and functional health settings.",
    regulator: "Association for Nutrition (AfN) — Voluntary Registration",
    salaryRange: "£24,000 – £45,000",
    faq: [
      { q: "What qualifications does a Nutritionist need in the UK?", a: "A degree or postgraduate qualification in Nutrition or Nutritional Science, plus accreditation by the Association for Nutrition as a Registered Nutritionist (RNutr) is the gold standard." },
      { q: "How much does a Nutritionist earn in private practice?", a: "Typically £24,000–£45,000. Sports nutritionists and those working with elite athletes or in corporate wellness can earn more." },
      { q: "Is nutritionist a protected title in the UK?", a: "No. Unlike 'Dietitian,' the title 'Nutritionist' is not legally protected. However, Registered Nutritionist (RNutr) is an accredited designation from the AfN that signals quality." },
    ],
  },

  cbt_therapist: {
    intro: "Cognitive behavioural therapists (CBT therapists) in the UK use structured, evidence-based therapy to treat anxiety, depression, OCD, PTSD, and other mental health conditions. BABCP (British Association for Behavioural and Cognitive Psychotherapies) accreditation is the gold standard in UK private practice. Demand for CBT in private practice has grown significantly.",
    regulator: "British Association for Behavioural and Cognitive Psychotherapies (BABCP) — Accreditation",
    salaryRange: "£30,000 – £55,000",
    faq: [
      { q: "What qualifications does a CBT Therapist need in the UK?", a: "Postgraduate training in CBT from a BABCP-accredited programme. Many CBT therapists hold prior qualifications in nursing, psychology, or social work and complete CBT as a specialist training." },
      { q: "How much does a CBT Therapist earn in private practice?", a: "Employed CBT therapists earn £30,000–£45,000. Self-employed therapists charging £60–£120 per session can earn £50,000+ depending on client volume." },
      { q: "Is CBT therapy in demand in the UK?", a: "Yes. NHS IAPT (now Talking Therapies) waiting lists are long, driving patients to seek private CBT. There is also strong employer demand as organisations expand mental health benefits for employees." },
    ],
  },

  counsellor: {
    intro: "Counsellors in UK private practice provide therapeutic support for a range of emotional, relational, and psychological issues. BACP (British Association for Counselling and Psychotherapy) or UKCP accreditation is standard in private practice. Counsellors work with individuals, couples, and groups across a wide range of presenting concerns.",
    regulator: "British Association for Counselling and Psychotherapy (BACP) / UKCP — Voluntary Accreditation",
    salaryRange: "£24,000 – £48,000",
    faq: [
      { q: "What qualifications does a Counsellor need in private practice?", a: "A Level 4 Diploma in Counselling or higher, plus BACP or UKCP membership/accreditation. Many counsellors also hold a degree-level qualification in a related field." },
      { q: "How much does a private Counsellor earn in the UK?", a: "Employed counsellors earn £24,000–£35,000. Self-employed counsellors charging £40–£100 per session can earn £35,000–£55,000+ depending on client volume." },
      { q: "Is counselling in demand in the UK?", a: "Yes. Growing mental health awareness and long NHS waiting times have driven significant growth in demand for private counselling services." },
    ],
  },

  mental_health_therapist: {
    intro: "Mental health therapists in UK private practice provide evidence-based psychological therapy for a range of mental health conditions. This broad term encompasses practitioners from various training backgrounds including clinical psychology, psychotherapy, and counselling. HCPC, BACP, or UKCP registration is typical.",
    regulator: "HCPC / BACP / UKCP depending on training background",
    salaryRange: "£30,000 – £60,000",
    faq: [
      { q: "What qualifications do Mental Health Therapists need?", a: "Qualifications vary by specific therapy modality and professional background. HCPC registration applies to psychologists and arts therapists; BACP/UKCP accreditation applies to counsellors and psychotherapists." },
      { q: "How much does a Mental Health Therapist earn?", a: "Employed therapists earn £30,000–£45,000. Independent practitioners earn more, particularly those offering specialist services or trauma-informed therapies." },
      { q: "Is private mental health therapy growing in the UK?", a: "Significantly. Employee mental health benefits, digital therapy platforms, and NHS access pressures have all driven strong growth in private mental health therapy demand." },
    ],
  },

  // OPERATIONS & MANAGEMENT
  operations_manager: {
    intro: "Operations managers in private healthcare practices oversee clinical and administrative workflows, staffing, compliance, financial performance, and growth. This leadership role requires a strong understanding of healthcare regulation (CQC, HTM, ICO) alongside business management capability. Multi-site operators particularly value experienced healthcare operations managers.",
    regulator: null,
    salaryRange: "£40,000 – £70,000",
    faq: [
      { q: "What does an Operations Manager do in a healthcare practice?", a: "Manage day-to-day and strategic operations across clinical and non-clinical functions, including staff management, CQC compliance, financial reporting, KPI monitoring, and operational process improvement." },
      { q: "How much does a Healthcare Operations Manager earn?", a: "Typically £40,000–£70,000 depending on practice size, number of sites, and group vs. single-site operation." },
      { q: "What healthcare regulatory knowledge is needed?", a: "CQC registration, fundamental standards, GDPR/ICO compliance, HTM 01-05 (if dental), and Health and Safety legislation are core knowledge areas for UK healthcare operations managers." },
    ],
  },

  area_manager: {
    intro: "Area managers in healthcare group practices oversee multiple practice sites within a defined geographic area, ensuring consistent standards, performance, and compliance across the portfolio. This is a senior operational role requiring strong people management and commercial acumen.",
    regulator: null,
    salaryRange: "£45,000 – £75,000",
    faq: [
      { q: "What does an Area Manager do in a healthcare group?", a: "Oversee 5–15+ practice sites, ensuring each meets financial, clinical quality, CQC, and HR standards. Coach practice managers, resolve operational issues, and support new practice development." },
      { q: "How much does an Area Manager earn in healthcare?", a: "Typically £45,000–£75,000 depending on the number of sites, group size, and sector (dental, aesthetics, allied health)." },
      { q: "What experience is required for an Area Manager role?", a: "Typically 3–5 years as a practice or clinic manager, with demonstrable experience managing teams and delivering operational targets." },
    ],
  },

  regional_manager: {
    intro: "Regional managers in healthcare group organisations take strategic and operational responsibility for a cluster of practices across a region, reporting to the CEO or COO. This director-level role involves significant people leadership, financial accountability, and regulatory oversight. Regional managers are essential to scaling healthcare group businesses.",
    regulator: null,
    salaryRange: "£55,000 – £90,000",
    faq: [
      { q: "What does a Regional Manager do in a healthcare group?", a: "Lead all operations across a regional cluster of practices, managing area managers, overseeing P&L, ensuring CQC compliance, and contributing to group growth strategy." },
      { q: "How much does a Regional Manager earn in healthcare?", a: "Typically £55,000–£90,000 with performance bonuses at larger organisations." },
      { q: "What background do Regional Managers typically have?", a: "Progression from area or practice manager roles, with demonstrable experience leading multi-site healthcare operations." },
    ],
  },

  hr_manager: {
    intro: "HR managers in private healthcare practices manage the full employee lifecycle including recruitment, onboarding, performance management, workforce planning, and regulatory compliance (DBS, professional registration checks). Healthcare HR requires specific knowledge of clinical workforce regulations and CQC workforce standards.",
    regulator: null,
    salaryRange: "£35,000 – £58,000",
    faq: [
      { q: "What does an HR Manager do in a healthcare practice?", a: "Manage recruitment, contracts, DBS and professional registration compliance, absence management, disciplinary processes, workforce planning, and HR policy in line with employment law and CQC requirements." },
      { q: "How much does an HR Manager earn in private healthcare?", a: "Typically £35,000–£58,000 depending on organisation size." },
      { q: "Is CIPD membership required for healthcare HR roles?", a: "CIPD Level 5 or 7 qualification is typically required or preferred. Healthcare-specific HR knowledge (CQC workforce standards, mandatory training requirements) is additionally valued." },
    ],
  },

  compliance_manager: {
    intro: "Compliance managers in private healthcare ensure all clinical, regulatory, and legal obligations are met across the organisation. This includes CQC compliance, GDPR, HTM compliance, Health and Safety, and professional registration verification. This is a high-accountability role critical to avoiding regulatory sanctions.",
    regulator: null,
    salaryRange: "£40,000 – £65,000",
    faq: [
      { q: "What does a Compliance Manager do in a healthcare practice?", a: "Maintain CQC compliance, manage audit programmes, ensure staff training records meet regulatory requirements, maintain GDPR compliance, and prepare the organisation for inspections and regulatory reviews." },
      { q: "How much does a Healthcare Compliance Manager earn?", a: "Typically £40,000–£65,000 depending on organisation size and complexity." },
      { q: "What regulatory knowledge is required?", a: "CQC fundamental standards and evidence requirements, GDPR/ICO obligations, Health and Safety legislation, HTM 01-05 (dental), and sector-specific regulatory frameworks." },
    ],
  },

  cqc_compliance_lead: {
    intro: "CQC Compliance Leads in UK healthcare practices are responsible for ensuring the organisation consistently meets the Care Quality Commission's fundamental standards. They maintain evidence portfolios, manage mock inspections, oversee mandatory training compliance, and support the Registered Manager in all regulatory matters.",
    regulator: null,
    salaryRange: "£35,000 – £58,000",
    faq: [
      { q: "What does a CQC Compliance Lead do?", a: "Maintain CQC evidence across all five Key Lines of Enquiry (KLOE), manage staff training records, lead mock inspections, coordinate with the Registered Manager, and respond to regulatory notifications." },
      { q: "How much does a CQC Compliance Lead earn?", a: "Typically £35,000–£58,000 in private healthcare." },
      { q: "What knowledge is required for a CQC Compliance Lead?", a: "Deep understanding of the CQC inspection framework, KLOE evidence requirements, fundamental standards, duty of candour, and the Healthcare Standards and regulatory notification requirements." },
    ],
  },

  marketing_manager: {
    intro: "Marketing managers in private healthcare practices drive patient acquisition and retention through digital marketing, SEO, paid advertising, social media, and PR. Healthcare marketing requires understanding of ASA/CAP regulations governing claims about clinical treatments. Growing practices rely heavily on effective marketing to fill appointment books.",
    regulator: null,
    salaryRange: "£32,000 – £55,000",
    faq: [
      { q: "What does a Marketing Manager do in a private practice?", a: "Manage digital and offline marketing channels, oversee SEO and paid advertising, manage social media, develop content, track ROI, and ensure all marketing complies with ASA/CAP healthcare advertising regulations." },
      { q: "How much does a Healthcare Marketing Manager earn?", a: "Typically £32,000–£55,000 depending on practice size and marketing budget." },
      { q: "Are there specific regulations for healthcare marketing?", a: "Yes. The ASA and CAP Code govern healthcare advertising claims. Medical device and treatment claims must be factual, substantiated, and comply with MHRA guidance where applicable." },
    ],
  },

  patient_experience_manager: {
    intro: "Patient Experience Managers in private healthcare are responsible for all aspects of the patient journey, from first enquiry to post-treatment follow-up. They design processes to maximise satisfaction, manage complaints, collect and act on patient feedback, and ensure service quality meets the expectations of private-paying patients.",
    regulator: null,
    salaryRange: "£30,000 – £50,000",
    faq: [
      { q: "What does a Patient Experience Manager do?", a: "Map and optimise the patient journey, manage Friends and Family Test and other satisfaction surveys, handle complaints and compliments, coach front-of-house teams, and report patient experience metrics to leadership." },
      { q: "How much does a Patient Experience Manager earn?", a: "Typically £30,000–£50,000 in private healthcare." },
      { q: "What background do Patient Experience Managers typically have?", a: "Customer experience, hospitality management, or healthcare administration backgrounds, with strong empathy and process improvement skills." },
    ],
  },

  treatment_coordinator_lead: {
    intro: "Treatment Coordinator Leads in multi-chair or group dental and aesthetic practices manage and coach a team of treatment coordinators, setting conversion targets, refining consultation processes, and driving private revenue. This senior TCO role blends clinical knowledge with sales leadership capability.",
    regulator: null,
    salaryRange: "£32,000 – £50,000",
    faq: [
      { q: "What does a Treatment Coordinator Lead do?", a: "Manage a team of TCOs, set KPIs, coach on consultation technique, analyse conversion data, refine the patient journey, and report on private case acceptance rates to clinical and operational leadership." },
      { q: "How much does a TCO Lead earn?", a: "Typically £32,000–£50,000 with performance-related elements tied to team conversion." },
      { q: "What skills are needed for a TCO Lead?", a: "Strong sales coaching ability, dental or aesthetic clinical knowledge, data analysis skills, and experience managing or mentoring a team of patient-facing staff." },
    ],
  },

  business_development_manager: {
    intro: "Business Development Managers in private healthcare drive practice growth through new patient acquisition partnerships, referral network development, corporate health contracts, and expansion into new service lines. This commercially focused role is increasingly important as practices compete in the growing UK private healthcare market.",
    regulator: null,
    salaryRange: "£40,000 – £65,000",
    faq: [
      { q: "What does a Business Development Manager do in private healthcare?", a: "Develop and manage referral partnerships, identify new market opportunities, negotiate corporate health contracts, support new site launches, and contribute to commercial strategy." },
      { q: "How much does a Healthcare Business Development Manager earn?", a: "Typically £40,000–£65,000 with performance bonuses common in this role." },
      { q: "What background do Healthcare BDMs typically have?", a: "Healthcare sales, clinical background with commercial experience, or corporate health business development experience are all common pathways." },
    ],
  },

  // VETERINARY & OPTOMETRY
  veterinarian: {
    intro: "Veterinarians (vets) in the UK are registered with the Royal College of Veterinary Surgeons (RCVS) and provide medical and surgical care for animals across small animal, large animal, equine, and exotic species practice. There are approximately 27,000 RCVS-registered vets in the UK. The profession has faced significant workforce shortages in recent years.",
    regulator: "Royal College of Veterinary Surgeons (RCVS)",
    salaryRange: "£30,000 – £75,000",
    faq: [
      { q: "What qualifications does a Vet need to practice in the UK?", a: "A RCVS-recognised veterinary degree (BVSc, BVetMed, or equivalent) and RCVS registration. EU-qualified vets can apply for RCVS registration; non-EU graduates typically sit the RCVS registration examination." },
      { q: "How much does a Vet earn in the UK?", a: "New graduate vets typically earn £30,000–£35,000. Experienced vets and those in specialist or out-of-hours roles earn £45,000–£75,000+." },
      { q: "Are there Vet shortages in the UK?", a: "Yes. The UK veterinary profession has faced a well-documented workforce crisis, with many practices struggling to recruit. Graduate numbers and EU vet migration have not kept pace with demand." },
    ],
  },

  vet_nurse: {
    intro: "Veterinary nurses in the UK are registered with the RCVS and support veterinarians during surgical and medical procedures, manage anaesthesia, perform nursing care, and run nurse clinics. There are approximately 17,000 RCVS-registered veterinary nurses. Like the broader veterinary workforce, vet nurse recruitment is challenging.",
    regulator: "Royal College of Veterinary Surgeons (RCVS)",
    salaryRange: "£22,000 – £38,000",
    faq: [
      { q: "How do I become a Veterinary Nurse in the UK?", a: "Complete an RCVS-approved veterinary nursing qualification (Level 3 Diploma in Veterinary Nursing or BSc in Veterinary Nursing), including clinical placement at an RCVS-approved training practice." },
      { q: "How much does a Veterinary Nurse earn in the UK?", a: "Newly qualified vet nurses earn approximately £22,000–£26,000. Experienced and senior vet nurses earn £28,000–£38,000." },
      { q: "Is there demand for Veterinary Nurses?", a: "Yes. Veterinary nurse shortages mirror those for vets. Many practices actively recruit and offer relocation packages and CPD support to attract qualified vet nurses." },
    ],
  },

  optometrist: {
    intro: "Optometrists in the UK are regulated by the General Optical Council (GOC) and provide primary eye care including sight testing, contact lens fitting, and the detection of eye diseases. There are approximately 15,000 registered optometrists in the UK. The optometry workforce has expanded into independent prescribing and enhanced services.",
    regulator: "General Optical Council (GOC)",
    salaryRange: "£35,000 – £60,000",
    faq: [
      { q: "What qualifications does an Optometrist need in the UK?", a: "A BSc in Optometry from a GOC-approved programme, followed by a pre-registration year and GOC registration examination. Independent Prescribing qualification is increasingly sought." },
      { q: "How much does an Optometrist earn in the UK?", a: "Optometrists typically earn £35,000–£55,000. Those in hospital ophthalmology or with Independent Prescribing qualifications earn more." },
      { q: "Is the optometry sector growing?", a: "Yes. An aging population, increasing rates of myopia, and expansion of enhanced optometry services into glaucoma and medical retina care are all driving growth in optometry roles." },
    ],
  },

  ophthalmic_technician: {
    intro: "Ophthalmic technicians in the UK support optometrists and ophthalmologists by performing diagnostic imaging (OCT, fundus photography, visual fields), refracting, and patient preparation. This technical role is increasingly important as practices invest in diagnostic technology. Most training is on-the-job with manufacturer support.",
    regulator: null,
    salaryRange: "£22,000 – £35,000",
    faq: [
      { q: "What does an Ophthalmic Technician do?", a: "Perform OCT scans, visual field tests, fundus photography, refraction, and patient history taking in support of optometrists and ophthalmologists." },
      { q: "How much does an Ophthalmic Technician earn in the UK?", a: "Typically £22,000–£35,000 depending on experience and the type of practice." },
      { q: "What qualifications does an Ophthalmic Technician need?", a: "No mandatory qualifications are required, though A-levels in science and experience with ophthalmic equipment is valued. Many technicians hold ABDO-affiliated diplomas or complete manufacturer training programmes." },
    ],
  },

  ophthalmologist: {
    intro: "Ophthalmologists are GMC-registered medical specialists in the diagnosis and surgical treatment of eye diseases. Private ophthalmology is a well-established sector covering cataract surgery, refractive surgery (LASIK/LASEK/SMILE), glaucoma, and medical retina. Many ophthalmologists hold parallel NHS consultant posts.",
    regulator: "General Medical Council (GMC) — Ophthalmology Specialist Register",
    salaryRange: "£90,000 – £200,000",
    faq: [
      { q: "What qualifications does an Ophthalmologist need?", a: "Medical degree, GMC registration, completion of ophthalmology specialty training, and FRCOphth qualification from the Royal College of Ophthalmologists." },
      { q: "How much does a Private Ophthalmologist earn?", a: "Private ophthalmologists typically earn £90,000–£200,000+ depending on surgical volume and speciality (refractive surgery is particularly high earning)." },
      { q: "Is private ophthalmology growing in the UK?", a: "Yes. NHS cataract surgery decommissioning in some areas, combined with patient demand for refractive surgery, has driven significant growth in private ophthalmology." },
    ],
  },

  private_hospital_administrator: {
    intro: "Private hospital administrators manage the operational and business functions of independent hospitals and specialist clinics in the UK. This senior role encompasses regulatory compliance, financial management, staff leadership, clinical governance, and strategic planning. The UK private hospital sector has grown as NHS waiting lists extend.",
    regulator: null,
    salaryRange: "£45,000 – £80,000",
    faq: [
      { q: "What does a Private Hospital Administrator do?", a: "Oversee all non-clinical hospital operations, manage department heads, ensure CQC and regulatory compliance, manage financial performance, and support clinical governance alongside medical leadership." },
      { q: "How much does a Private Hospital Administrator earn?", a: "Typically £45,000–£80,000 depending on hospital size and group affiliation." },
      { q: "What qualifications are required for hospital administration?", a: "Healthcare management qualifications (e.g., MHA, MBA with healthcare focus, ACHE) are valued, alongside significant operational management experience in a regulated healthcare environment." },
    ],
  },
}
