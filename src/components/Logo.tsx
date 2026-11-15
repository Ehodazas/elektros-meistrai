import { Link } from "react-router";
import { company } from "../data/company.ts";

export default function Logo({ light = false, onClick }: { light?: boolean; onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 font-display font-extrabold tracking-tight ${light ? "text-white" : "text-navy"}`}
      aria-label={`${company.name} – pagrindinis puslapis`}
    >
      <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="4" fill={light ? "#F5B841" : "#101D30"} />
        <path d="M18 5 9 18h6l-1 9 9-13h-6l1-9z" fill={light ? "#101D30" : "#F5B841"} />
      </svg>
      <span className="text-[0.95rem] leading-none sm:text-base">
        ELEKTROS
        <br />
        MEISTRAI
      </span>
    </Link>
  );
}
