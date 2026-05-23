export const PROFESSION_CATEGORIES = [
  "Dentistry",
  "Aesthetics & MedSpa",
  "Private Medical",
  "Allied Health",
  "Operations & Management",
  "Veterinary & Optometry",
] as const

export type ProfessionCategory = typeof PROFESSION_CATEGORIES[number]

export const PROFESSIONS = [
  // Dentistry
  { value: "general_dentist",         label: "General Dentist",              category: "Dentistry" },
  { value: "associate_dentist",        label: "Associate Dentist",            category: "Dentistry" },
  { value: "specialist_dentist",       label: "Specialist Dentist",           category: "Dentistry" },
  { value: "orthodontist",             label: "Orthodontist",                 category: "Dentistry" },
  { value: "endodontist",              label: "Endodontist",                  category: "Dentistry" },
  { value: "periodontist",             label: "Periodontist",                 category: "Dentistry" },
  { value: "prosthodontist",           label: "Prosthodontist",               category: "Dentistry" },
  { value: "oral_surgeon",             label: "Oral Surgeon",                 category: "Dentistry" },
  { value: "implantologist",           label: "Implantologist",               category: "Dentistry" },
  { value: "sedation_dentist",         label: "Sedation Dentist",             category: "Dentistry" },
  { value: "cosmetic_dentist",         label: "Cosmetic Dentist",             category: "Dentistry" },
  { value: "dental_hygienist",         label: "Dental Hygienist",             category: "Dentistry" },
  { value: "dental_therapist",         label: "Dental Therapist",             category: "Dentistry" },
  { value: "dental_nurse",             label: "Dental Nurse",                 category: "Dentistry" },
  { value: "lead_dental_nurse",        label: "Lead Dental Nurse",            category: "Dentistry" },
  { value: "dental_receptionist",      label: "Dental Receptionist",          category: "Dentistry" },
  { value: "treatment_coordinator",    label: "Treatment Coordinator",        category: "Dentistry" },
  { value: "dental_practice_manager",  label: "Practice Manager (Dental)",    category: "Dentistry" },
  { value: "dental_technician",        label: "Dental Technician",            category: "Dentistry" },
  { value: "lab_technician",           label: "Lab Technician",               category: "Dentistry" },
  { value: "lab_manager",              label: "Lab Manager",                  category: "Dentistry" },

  // Aesthetics & MedSpa
  { value: "aesthetic_doctor",         label: "Aesthetic Doctor",             category: "Aesthetics & MedSpa" },
  { value: "cosmetic_doctor",          label: "Cosmetic Doctor",              category: "Aesthetics & MedSpa" },
  { value: "aesthetic_nurse",          label: "Aesthetic Nurse",              category: "Aesthetics & MedSpa" },
  { value: "nurse_injector",           label: "Nurse Injector",               category: "Aesthetics & MedSpa" },
  { value: "advanced_aesthetic_practitioner", label: "Advanced Aesthetic Practitioner", category: "Aesthetics & MedSpa" },
  { value: "injector_practitioner",    label: "Injector Practitioner",        category: "Aesthetics & MedSpa" },
  { value: "laser_technician",         label: "Laser Technician",             category: "Aesthetics & MedSpa" },
  { value: "skin_therapist",           label: "Skin Therapist",               category: "Aesthetics & MedSpa" },
  { value: "skin_specialist",          label: "Skin Specialist",              category: "Aesthetics & MedSpa" },
  { value: "medical_aesthetician",     label: "Medical Aesthetician",         category: "Aesthetics & MedSpa" },
  { value: "body_contouring_specialist", label: "Body Contouring Specialist", category: "Aesthetics & MedSpa" },
  { value: "hair_restoration_technician", label: "Hair Restoration Technician", category: "Aesthetics & MedSpa" },
  { value: "hair_transplant_technician", label: "Hair Transplant Technician", category: "Aesthetics & MedSpa" },
  { value: "iv_therapy_nurse",         label: "IV Therapy Nurse",             category: "Aesthetics & MedSpa" },
  { value: "weight_loss_practitioner", label: "Weight Loss Practitioner",     category: "Aesthetics & MedSpa" },
  { value: "wellness_practitioner",    label: "Wellness Practitioner",        category: "Aesthetics & MedSpa" },
  { value: "clinic_manager",           label: "Clinic Manager",               category: "Aesthetics & MedSpa" },
  { value: "clinic_director",          label: "Clinic Director",              category: "Aesthetics & MedSpa" },
  { value: "patient_coordinator",      label: "Patient Coordinator",          category: "Aesthetics & MedSpa" },

  // Private Medical
  { value: "private_gp",              label: "Private GP",                   category: "Private Medical" },
  { value: "consultant_specialist",    label: "Consultant Specialist",        category: "Private Medical" },
  { value: "dermatologist",            label: "Dermatologist",                category: "Private Medical" },
  { value: "ent_consultant",           label: "ENT Consultant",               category: "Private Medical" },
  { value: "fertility_specialist",     label: "Fertility Specialist",         category: "Private Medical" },
  { value: "surgical_consultant",      label: "Surgical Consultant",          category: "Private Medical" },
  { value: "practice_nurse",           label: "Practice Nurse",               category: "Private Medical" },
  { value: "specialist_nurse",         label: "Specialist Nurse",             category: "Private Medical" },
  { value: "theatre_nurse",            label: "Theatre Nurse",                category: "Private Medical" },
  { value: "scrub_nurse",              label: "Scrub Nurse",                  category: "Private Medical" },
  { value: "recovery_nurse",           label: "Recovery Nurse",               category: "Private Medical" },
  { value: "anaesthetic_practitioner", label: "Anaesthetic Practitioner",     category: "Private Medical" },
  { value: "surgical_assistant",       label: "Surgical Assistant",           category: "Private Medical" },
  { value: "healthcare_assistant",     label: "Healthcare Assistant (HCA)",   category: "Private Medical" },
  { value: "phlebotomist",             label: "Phlebotomist",                 category: "Private Medical" },
  { value: "radiographer",             label: "Radiographer",                 category: "Private Medical" },
  { value: "sonographer",              label: "Sonographer",                  category: "Private Medical" },
  { value: "medical_receptionist",     label: "Medical Receptionist",         category: "Private Medical" },
  { value: "medical_secretary",        label: "Medical Secretary",            category: "Private Medical" },
  { value: "clinic_coordinator",       label: "Clinic Coordinator",           category: "Private Medical" },
  { value: "admissions_coordinator",   label: "Admissions Coordinator",       category: "Private Medical" },

  // Allied Health
  { value: "physiotherapist",          label: "Physiotherapist",              category: "Allied Health" },
  { value: "osteopath",                label: "Osteopath",                    category: "Allied Health" },
  { value: "chiropractor",             label: "Chiropractor",                 category: "Allied Health" },
  { value: "podiatrist",               label: "Podiatrist",                   category: "Allied Health" },
  { value: "occupational_therapist",   label: "Occupational Therapist",       category: "Allied Health" },
  { value: "speech_language_therapist",label: "Speech & Language Therapist",  category: "Allied Health" },
  { value: "dietitian",                label: "Dietitian",                    category: "Allied Health" },
  { value: "nutritionist",             label: "Nutritionist",                 category: "Allied Health" },
  { value: "cbt_therapist",            label: "CBT Therapist",                category: "Allied Health" },
  { value: "counsellor",               label: "Counsellor",                   category: "Allied Health" },
  { value: "mental_health_therapist",  label: "Mental Health Therapist",      category: "Allied Health" },

  // Operations & Management
  { value: "operations_manager",       label: "Operations Manager",           category: "Operations & Management" },
  { value: "area_manager",             label: "Area Manager",                 category: "Operations & Management" },
  { value: "regional_manager",         label: "Regional Manager",             category: "Operations & Management" },
  { value: "hr_manager",               label: "HR Manager",                   category: "Operations & Management" },
  { value: "compliance_manager",       label: "Compliance Manager",           category: "Operations & Management" },
  { value: "cqc_compliance_lead",      label: "CQC Compliance Lead",          category: "Operations & Management" },
  { value: "marketing_manager",        label: "Marketing Manager",            category: "Operations & Management" },
  { value: "patient_experience_manager", label: "Patient Experience Manager", category: "Operations & Management" },
  { value: "treatment_coordinator_lead", label: "Treatment Coordinator Lead", category: "Operations & Management" },
  { value: "business_development_manager", label: "Business Development Manager", category: "Operations & Management" },

  // Veterinary & Optometry
  { value: "veterinarian",             label: "Veterinarian",                 category: "Veterinary & Optometry" },
  { value: "vet_nurse",                label: "Veterinary Nurse",             category: "Veterinary & Optometry" },
  { value: "optometrist",              label: "Optometrist",                  category: "Veterinary & Optometry" },
  { value: "ophthalmic_technician",    label: "Ophthalmic Technician",        category: "Veterinary & Optometry" },
  { value: "ophthalmologist",          label: "Ophthalmologist",              category: "Veterinary & Optometry" },
  { value: "private_hospital_administrator", label: "Private Hospital Administrator", category: "Veterinary & Optometry" },
] as const

export const JOB_TYPES = [
  { value: "permanent", label: "Permanent" },
  { value: "part_time", label: "Part-Time" },
  { value: "locum", label: "Locum" },
  { value: "contract", label: "Contract" },
] as const

export const UK_REGIONS = [
  "London", "South East", "South West", "East of England",
  "East Midlands", "West Midlands", "Yorkshire", "North West",
  "North East", "Scotland", "Wales", "Northern Ireland",
] as const

export const PRACTICE_TYPES = [
  { value: "dental",          label: "Dental Practice" },
  { value: "aesthetic",       label: "Aesthetic Clinic / MedSpa" },
  { value: "private_medical", label: "Private Medical Clinic" },
  { value: "allied_health",   label: "Allied Health Practice" },
  { value: "veterinary",      label: "Veterinary Practice" },
  { value: "optician",        label: "Optician / Ophthalmology" },
] as const

export const LISTING_PRICE_GBP = 149
export const SUBSCRIPTION_PRICE_GBP = 249
