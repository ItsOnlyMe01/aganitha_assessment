"use client";

import AddLinkForm from "@/components/AddLinkForm";
import LinkTable from "@/components/LinkTable";
import { useEffect, useState } from "react";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchLinks() {
    setLoading(true);
    const res = await fetch("/api/links");
    const data = await res.json();
    setLinks(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        TinyLink Dashboard
      </h1>

      <AddLinkForm onAdded={fetchLinks} />

      {loading ? (
        <p className="text-center p-4 text-gray-500">Loading...</p>
      ) : (
        <LinkTable links={links} refresh={fetchLinks} />
      )}
    </main>
  );
}
