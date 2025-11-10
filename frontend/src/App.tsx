import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("Error connecting to backend"));
  }, []);

  return (
    <div>
      <h1>Palekouran</h1>
      <p>Backend status: {status}</p>
    </div>
  );
}

export default App;
