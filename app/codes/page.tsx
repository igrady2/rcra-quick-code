"use client";

import { useMemo, useState } from "react";
import { WASTE_CODES, type WasteCode } from "@/data/waste_codes.sample";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CodesPage() {
  const [q, setQ] = useState("");

  const data = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return WASTE_CODES;
    return WASTE_CODES.filter(
      (r: WasteCode) =>
        r.code.toLowerCase().includes(term) ||
        r.type.toLowerCase().includes(term) ||
        r.title.toLowerCase().includes(term) ||
        r.cfr_ref.toLowerCase().includes(term)
    );
  }, [q]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Waste Code Lookup (sample)</h1>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search codes or keywords (e.g., D001, ignitable, acetone)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button onClick={() => setQ("")} variant="secondary">
          Clear
        </Button>
      </div>

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
                    href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-I/part-261"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {row.cfr_ref}
                  </a>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Sample data only. We’ll replace with a full dataset later.
      </p>
    </main>
  );
}
