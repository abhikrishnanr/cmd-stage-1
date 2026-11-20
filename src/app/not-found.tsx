import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-mark">404</div>
        <p className="eyebrow">CM Dashboard - Stage 1</p>
        <h1>This page is outside the Stage 1 portal.</h1>
        <p>Use the dashboard to open one of the ten confirmed modules.</p>
        <Link href="/dashboard" className="primary-button">
          <ArrowLeft size={17} /> Return to dashboard <LayoutDashboard size={17} />
        </Link>
      </div>
    </main>
  );
}
