"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WASTE_CODES, type WasteCode } from "@/data/waste_codes.sample";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * CodesPage
 * - Accessible label for the search input
 * - Ctrl/Cmd+K focuses the search field
 * - Simple client-side filtering
 * - Table uses semantic headers (scope attributes)
 * - Ready to extend with actions (e.g., Copy, Print Label)
 */
export default function CodesPage() {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Ctrl/Cmd + K focuses search
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const meta = isMac ? e.metaKey : e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
    <section aria-labelledby="codes-heading">
      <h1 id="codes-heading" className="text-2xl font-semibold mb-4">
        Waste Code Lookup
      </h1>

      <div className="mb-4">
        <label htmlFor="code-search" className="block text-sm font-medium mb-1">
          Search codes or keywords <span className="text-gray-500">(Ctrl/⌘ + K)</span>
        </label>
        <div className="flex gap-2">
          <Input
            id="code-search"
            ref={inputRef}
            placeholder="e.g., D001, ignitable, acetone"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button variant="secondary" onClick={() => setQ("")}>
            Clear
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm" role="table">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th scope="col" className="px-4 py-3">Code</th>
              <th scope="col" className="px-4 py-3">Type</th>
              <th scope="col" className="px-4 py-3">Title</th>
              <th scope="col" className="px-4 py-3">CFR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.code} className="border-t">
                <th scope="row" className="px-4 py-2 font-medium">{row.code}</th>
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
    </section>
  );
}
