"use client";

import { useState } from "react";

const CODE_RE = /^[A-Za-z0-9]{6,8}$/;

export default function AddLinkForm({ onAdded }: { onAdded: () => void }) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    if (!url) {
      setError("URL is required");
      return;
    }

    if (code && !CODE_RE.test(code)) {
      setError("Code must be 6–8 alphanumeric characters.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_url: url, code }),
      });

      if (res.status === 409) {
        setError("Short code already exists.");
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
        return;
      }

      setUrl("");
      setCode("");
      onAdded(); // refresh list
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg mb-6 bg-white shadow"
    >
      <h2 className="text-xl font-semibold mb-3">Create New Short Link</h2>

      <input
        type="text"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />

      <input
        type="text"
        placeholder="Optional custom code (6-8 alphanumeric)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />

      {error && <div className="text-red-500 mb-3">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Creating..." : "Create Short Link"}
      </button>
    </form>
  );
}
