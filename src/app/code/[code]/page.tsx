import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const dynamic = "force-dynamic";

async function getLink(code: string) {
  return await prisma.link.findUnique({
    where: { code },
  });
}

export default async function CodeStatsPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const link = await getLink(code);

  if (!link) {
    return (
      <main className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Code Not Found</h1>
        <p className="mb-4 text-gray-600">
          The link you are trying to view does not exist or has been deleted.
        </p>
        <Link href="/" className="text-blue-600 underline">
          Return to Dashboard
        </Link>
      </main>
    );
  }

  const shortUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/${link.code}`;

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Stats for: {link.code}</h1>

      <div className="p-4 bg-white shadow rounded-lg space-y-4">
        <div>
          <p className="text-gray-600">Short URL</p>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{shortUrl}</span>
            <CopyButton text={shortUrl} />
          </div>
        </div>

        <div>
          <p className="text-gray-600">Target URL</p>
          <p className="truncate">{link.targetUrl}</p>
        </div>

        <div>
          <p className="text-gray-600">Total Clicks</p>
          <p className="font-semibold">{link.clicks}</p>
        </div>

        <div>
          <p className="text-gray-600">Last Clicked</p>
          <p>
            {link.lastClicked
              ? new Date(link.lastClicked).toLocaleString()
              : "Never"}
          </p>
        </div>

        <div>
          <p className="text-gray-600">Created At</p>
          <p>{new Date(link.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/" className="text-blue-600 underline">
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
