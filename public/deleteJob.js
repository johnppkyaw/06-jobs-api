import { showJobs } from "./jobs.js";
import {  token, message } from "./index.js";

export const deleteJob = async(id) => {
  const url = `/api/v1/jobs/${id}`;
  const method = 'DELETE';
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    if (response.status === 200) {
      message.textContent = "Job posting deleted successfully!";
      showJobs();
    }
  } catch(err) {
    console.error(err);
    message.textContent = "A communication error occurred.";
  }
}
