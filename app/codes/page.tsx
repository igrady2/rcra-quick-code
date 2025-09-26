"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import wasteJson from "@/data/waste_codes.json";
import Fuse from "fuse.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

type WasteCode = {
  code: string;
  type: string;
  title: string;
  description: string;
  cfr_ref: string;
  cfr_url: string;
  last_updated: string; // YYYY-MM-DD
};

const WASTE_CODES = wasteJson as WasteCode[];

// Derive dataset version (max last_updated)
function datasetVersion(codes: WasteCode[]) {
  const max = codes.reduce<string>((acc, r) => (r.last_updated > acc ? r.last_updated : acc), "0000-00-00");
  return max || "unknown";
}

function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Fallback prompt if clipboard fails
      window.prompt("Copy this text:", textToCopy);
    }
  }
  return (
    <Button variant="outline" size="sm" onClick={handleCopy} aria-label="Copy row">
      <Copy className="h-4 w-4 mr-2" />
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}

export default function CodesPage() {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Ctrl/Cmd+K focuses the search input
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

  // Debounce
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQ(q), 120);
    return () => clearTimeout(id);
  }, [q]);

  // Build Fuse index once (memoized)
  const fuse = useMemo(
    () =>
      new Fuse(WASTE_CODES, {
        keys: ["code", "type", "title", "description", "cfr_ref"],
        threshold: 0.3,
        ignoreLocation: true
      }),
    []
  );

  const data = useMemo(() => {
    const term = debouncedQ.trim();
    if (!term) return WASTE_CODES;
    return fuse.search(term).map((r) => r.item);
  }, [debouncedQ, fuse]);

  const version = datasetVersion(WASTE_CODES);

  return (
    <section aria-labelledby="codes-heading">
      {/* Dataset banner */}
      <div className="w-full bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded mb-4">
        <div className="px-3 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span>
            Dataset version: <strong>{version}</strong>
          </span>
          <span className="opacity-80">
            Source: 40 CFR Part 261 (eCFR) & EPA references
          </span>
        </div>
      </div>

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
          <Button variant="secondary" onClick={() => setQ("")}>Clear</Button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm" role="table">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th scope="col" className="px-4 py-3">Code</th>
              <th scope="col" className="px-4 py-3">Type</th>
              <th scope="col" className="px-4 py-3">Title</th>
              <th scope="col" className="px-4 py-3 hidden md:table-cell">Description</th>
              <th scope="col" className="px-4 py-3">CFR</th>
              <th scope="col" className="px-4 py-3" aria-label="Copy actions"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.code} className="border-t">
                <th scope="row" className="px-4 py-2 font-medium">{row.code}</th>
                <td className="px-4 py-2">{row.type}</td>
                <td className="px-4 py-2">{row.title}</td>
                <td className="px-4 py-2 hidden md:table-cell">{row.description}</td>
                <td className="px-4 py-2">
                  <a
                    className="underline"
                    href={row.cfr_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {row.cfr_ref}
                  </a>
                </td>
                <td className="px-4 py-2 text-right">
                  <CopyButton textToCopy={`${row.code} — ${row.title} — ${row.cfr_ref}`} />
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Sample dataset for development; always consult the current eCFR and applicable state rules.
      </p>
    </section>
  );
}
