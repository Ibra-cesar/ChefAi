import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RateLimitRecord {
  identifier: string;
  count: number;
  abusive: boolean;
}

export default function RateLimitDashboard() {
  const [endpoint, setEndpoint] = useState("");
  const [limit, setLimit] = useState(20);
  const [data, setData] = useState<RateLimitRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/rate-limit-logs?endpoint=${encodeURIComponent(
          endpoint
        )}&limit=${limit}`
      );
      const json = await res.json();
      if (json.success) setData(json.records);
    } catch (err) {
      console.error("Failed to fetch rate limit logs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endpoint) fetchData();
  },[]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Rate Limit Dashboard</h1>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          placeholder="Enter endpoint (e.g., /api/chat)"
          className="border p-2 rounded w-full text-black"
        />
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value))}
          className="w-24 border p-2 rounded text-black"
        />
        <button
          onClick={fetchData}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Loading..." : "Fetch Logs"}
        </button>
      </div>

      {data.length > 0 ? (
        <div className="bg-white p-4 rounded shadow">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="identifier" width={200} />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#0ea5e9"
                name="Requests"
                label={{ position: "right" }}
              />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-2 text-sm text-gray-500">
            Abusive identifiers are highlighted with ⚠️.
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {data.map((entry) =>
              entry.abusive ? (
                <li key={entry.identifier} className="text-red-500">
                  ⚠️ {entry.identifier} marked abusive
                </li>
              ) : null
            )}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No data to display.</p>
      )}
    </div>
  );
}
