import axios from "axios"

export async function getAllJobs() {
  const results = await Promise.allSettled([
    fetchYC(),
    fetchRemotive()
  ])

  const jobs = []

  if (results[0].status === "fulfilled") jobs.push(...results[0].value)
  if (results[1].status === "fulfilled") jobs.push(...results[1].value)

  return jobs
}

async function fetchYC() {
  try {
    const { data } = await axios.get("https://api.ycombinator.com/v1/jobs", {
      timeout: 10000
    })

    return data.map(j => ({
      title: j.title,
      company: j.company_name,
      location: j.location || "Remote",
      source: "YC",
      apply_url: j.url
    }))
  } catch (e) {
    console.error("YC failed")
    return []
  }
}

async function fetchRemotive() {
  try {
    const { data } = await axios.get("https://remotive.com/api/remote-jobs", {
      timeout: 10000
    })

    return data.jobs.map(j => ({
      title: j.title,
      company: j.company_name,
      location: "Remote",
      source: "Remotive",
      apply_url: j.url
    }))
  } catch (e) {
    console.error("Remotive failed")
    return []
  }
}