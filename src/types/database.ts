export type UserRole = "practice" | "candidate"
export type JobStatus = "draft" | "active" | "expired" | "filled"
export type JobType = "permanent" | "part_time" | "locum" | "contract"
export type ApplicationStatus = "pending" | "viewed" | "shortlisted" | "rejected"
export type SubscriptionStatus = "inactive" | "active" | "cancelled" | "past_due"

export interface Profile {
  id: string
  role: UserRole
  created_at: string
}

export interface Practice {
  id: string
  user_id: string
  name: string
  practice_type: string
  address_line1: string | null
  city: string | null
  postcode: string | null
  website: string | null
  phone: string | null
  stripe_customer_id: string | null
  subscription_status: SubscriptionStatus
  subscription_end: string | null
  created_at: string
}

export interface Candidate {
  id: string
  user_id: string
  full_name: string
  profession: string
  registration_number: string | null
  location: string | null
  region: string | null
  bio: string | null
  cv_url: string | null
  available: boolean
  years_experience: number | null
  created_at: string
}

export interface Job {
  id: string
  practice_id: string
  title: string
  profession: string
  job_type: JobType
  region: string
  city: string | null
  salary_min: number | null
  salary_max: number | null
  description: string
  requirements: string | null
  slug: string
  status: JobStatus
  payment_status: "unpaid" | "paid"
  published_at: string | null
  expires_at: string | null
  created_at: string
  source?: "practice" | "aggregated"
  source_url?: string | null
  external_org_name?: string | null
  external_org_url?: string | null
  noindex?: boolean
  practices?: Pick<Practice, "name" | "practice_type" | "city">
}

export interface Clinic {
  id: string
  slug: string
  name: string
  category: string | null
  vertical: string | null
  city: string | null
  region: string | null
  street: string | null
  website: string | null
  phone: string | null
  rating: number | null
  reviews_count: number | null
  is_hiring: boolean
  careers_url: string | null
  claimed_by_practice_id: string | null
  source: string
  created_at: string
}

export interface Application {
  id: string
  job_id: string
  candidate_id: string
  cover_letter: string | null
  status: ApplicationStatus
  created_at: string
  candidates?: Pick<Candidate, "full_name" | "profession" | "region" | "years_experience" | "cv_url">
  jobs?: Pick<Job, "title" | "slug">
}
