"use client";
import dynamic from "next/dynamic";

const KeralaChoropleth = dynamic(() => import("./KeralaChoropleth"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full min-h-[260px] place-items-center rounded-xl bg-[rgba(43,58,140,0.04)] text-sm text-slate-400">
      Loading Kerala map…
    </div>
  ),
});

export default KeralaChoropleth;
