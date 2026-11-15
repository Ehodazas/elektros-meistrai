import { Link } from "react-router";
import { ClipboardList } from "lucide-react";
import PhoneLink from "./PhoneLink.tsx";
import { hasPhone } from "../data/company.ts";

/** Sticky contact bar on phones and tablets. */
export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-2 gap-2 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <PhoneLink
          label={hasPhone ? "Skambinti" : "Telefonas"}
          className="btn btn-outline min-h-12 px-3 text-navy"
        />
        <Link to="/kontaktai#uzklausa" className="btn btn-primary min-h-12 px-3">
          <ClipboardList className="h-4 w-4" aria-hidden="true" />
          Užklausa
        </Link>
      </div>
    </div>
  );
}
