import express from "express"
import cors from "cors"
import { getAllJobs } from "./jobFetcher.js"

const app = express()
app.use(cors())

app.get("/", (req, res) => {
  res.send("Backend alive")
})

app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await getAllJobs()
    res.json(jobs)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Job fetch failed" })
  }
})

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000")
})