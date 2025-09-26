import fs from "node:fs";
import path from "node:path";

type WasteCode = {
  code: string;
  type: string;
  title: string;
  cfr_ref: string;
};

function getData(): WasteCode[] {
  const file = path.join(process.cwd(), "data", "waste_codes.sample.json");
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as WasteCode[];
}

export default function CodesPage() {
  const data = getData();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Waste Code Lookup (sample)</h1>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">CFR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.code} className="border-t">
                <td className="px-4 py-2 font-medium">{row.code}</td>
                <td className="px-4 py-2">{row.type}</td>
                <td className="px-4 py-2">{row.title}</td>
                <td className="px-4 py-2">
                  <a
                    className="underline"
                    href={`https://www.ecfr.gov/current/title-40/chapter-I/subchapter-I/part-261`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {row.cfr_ref}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Sample data only. We’ll replace with a full dataset later.
      </p>
    </main>
  );
}
