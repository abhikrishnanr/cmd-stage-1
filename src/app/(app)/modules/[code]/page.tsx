import { notFound, redirect } from "next/navigation";

const moduleRoutes: Record<string, string> = {
  "M-01": "/indira",
  "M-02": "/sectors/social-security",
  "M-03": "/plan-budget-utilization",
  "M-04": "/delivery-rag",
  "M-05": "/health",
  "M-06": "/sectors/education",
  "M-07": "/sectors/education",
  "M-08": "/sectors/agriculture",
  "M-09": "/sectors/fisheries",
  "M-10": "/sectors/forest-wildlife",
  "M-11": "/sectors/cmdrf",
  "M-12": "/files",
  "M-13": "/public-works",
  "M-14": "/sdg",
  "M-15": "/social",
  "M-16": "/grievances",
  "M-17": "/sectors/environment-climate",
  "M-18": "/revenue",
  "M-19": "/finance",
  "M-20": "/sectors/scholarships-grants",
  "M-21": "/sectors/food-civil-supplies",
  "M-22": "/power",
  "M-23": "/water",
  "M-24": "/sectors/transportation",
  "M-25": "/sectors/municipal-panchayats",
};

export default async function ModulePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const route = moduleRoutes[code.toUpperCase()];
  if (!route) notFound();
  redirect(route);
}
