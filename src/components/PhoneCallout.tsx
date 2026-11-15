import { Link } from "react-router";
import { Clock, Phone } from "lucide-react";
import PhoneLink from "./PhoneLink.tsx";
import { company, hasPhone } from "../data/company.ts";

/** Phone contact section used on service pages. */
export default function PhoneCallout() {
  return (
    <section aria-labelledby="phone-callout-h" className="border-y border-line bg-white">
      <div className="wrap grid gap-8 py-12 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10">
        <span className="grid h-16 w-16 place-items-center rounded-md bg-amber text-navy" aria-hidden="true">
          <Phone className="h-7 w-7" />
        </span>
        <div>
          <h2 id="phone-callout-h" className="text-2xl font-extrabold">Greičiausia – paskambinti</h2>
          <p className="mt-2 text-muted">
            Trumpai papasakokite situaciją – pasakysime, ar reikia apžiūros, ir suderinsime laiką.
            <span className="mt-1 flex items-center gap-1.5 text-sm">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {company.hours[0].days}: {company.hours[0].time}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <PhoneLink className="btn btn-blue" />
          {!hasPhone && (
            <Link to="/kontaktai#uzklausa" className="btn btn-outline text-navy">Rašyti užklausą</Link>
          )}
        </div>
      </div>
    </section>
  );
}
