"use client";

export default function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
    >
      Copy
    </button>
  );
}
