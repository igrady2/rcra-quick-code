import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="mx-auto max-w-4xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          RCRA Quick Code
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-4 text-sm">
            <li><Link className="hover:underline" href="/codes">Codes</Link></li>
            <li><Link className="hover:underline" href="/citations">Citations</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
