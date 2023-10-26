import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [jobDescription, setjobDescription] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription: jobDescription }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setjobDescription("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Cover letter Generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Enter the job Description"
            value={jobDescription}
            onChange={(e) => setjobDescription(e.target.value)}
          />
          <input type="submit" value="Generate cover letter" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
