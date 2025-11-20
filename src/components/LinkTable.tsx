"use client";

import { useState } from "react";

export default function LinkTable({ links, refresh }: any) {
  const [deleting, setDeleting] = useState("");

  async function deleteLink(code: string) {
    setDeleting(code);
    await fetch(`/api/links/${code}`, { method: "DELETE" });
    setDeleting("");
    refresh();
  }

  function copyLink(code: string) {
    const shortUrl = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(shortUrl);
    alert("Copied: " + shortUrl);
  }

  if (links.length === 0) {
    return (
      <div className="text-gray-500 text-center p-4">No links created yet.</div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3">Code</th>
            <th className="p-3">Target URL</th>
            <th className="p-3">Clicks</th>
            <th className="p-3">Last Clicked</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link: any) => (
            <tr key={link.code} className="border-b hover:bg-gray-50">
              <td className="p-3 text-blue-600 underline cursor-pointer">
                <a href={`/code/${link.code}`}>{link.code}</a>
              </td>

              <td className="p-3 max-w-xs truncate">{link.targetUrl}</td>

              <td className="p-3">{link.clicks}</td>

              <td className="p-3">
                {link.lastClicked
                  ? new Date(link.lastClicked).toLocaleString()
                  : "Never"}
              </td>

              <td className="p-3 space-x-2">
                <button
                  onClick={() => copyLink(link.code)}
                  className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                >
                  Copy
                </button>

                <button
                  onClick={() => deleteLink(link.code)}
                  className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                  disabled={deleting === link.code}
                >
                  {deleting === link.code ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
