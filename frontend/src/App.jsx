import { useEffect, useState } from "react"
import "./index.css"

export default function App() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState("")
  const [filteredJobs, setFilteredJobs] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then(res => res.json())
      .then(data => {
        setJobs(data)
        setFilteredJobs(data)
      })
  }, [])

  useEffect(() => {
    const term = search.toLowerCase().trim()
    if (!term) {
      setFilteredJobs(jobs)
    } else {
      const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term)
      )
      setFilteredJobs(filtered)
    }
  }, [search, jobs])

  return (
    <div className="container">
      <h1>Job Portal</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or company"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filteredJobs.map((job, i) => (
        <div className="card" key={i}>
          <h2>{job.title}</h2>
          <p>{job.company} | {job.location}</p>
          <a href={job.apply_url} target="_blank">Apply</a>
        </div>
      ))}
    </div>
  )
}