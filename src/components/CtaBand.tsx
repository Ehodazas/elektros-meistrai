import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import PhoneLink from "./PhoneLink.tsx";
import Photo from "./Photo.tsx";
import type { PhotoKey } from "../data/photos.ts";

export default function CtaBand({
  title = "Aprašykite darbus – pasiūlysime sprendimą",
  text = "Užpildykite trumpą užklausą arba paskambinkite. Suderinsime apžiūros laiką ir po jos pateiksime aiškią sąmatą.",
  photo = "socketsPliers",
  photoAlt = "Elektrikas montuoja lizdus ir jungiklius naujame bute",
  query = "",
}: {
  title?: string;
  text?: string;
  photo?: PhotoKey;
  photoAlt?: string;
  /** Query string for the contact form, e.g. "?paslauga=Apšvietimo%20montavimas". */
  query?: string;
}) {
  return (
    <section className="py-16 md:py-24">
      <div className="wrap">
        <div className="grid overflow-hidden rounded-md bg-blue text-white md:grid-cols-[1.2fr_1fr]">
          <div className="p-8 sm:p-10 lg:p-14">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-lg text-white/85">{text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={`/kontaktai${query}#uzklausa`} className="btn btn-primary">
                Gauti pasiūlymą <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <PhoneLink className="btn btn-outline-light" />
            </div>
          </div>
          <div className="relative hidden min-h-[17.5rem] md:block">
            <Photo name={photo} alt={photoAlt} sizes="(min-width: 768px) 45vw, 100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
