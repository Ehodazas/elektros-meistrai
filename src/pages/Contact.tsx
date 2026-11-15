import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "../components/PageHeader.tsx";
import PhoneLink from "../components/PhoneLink.tsx";
import InquiryForm from "../components/InquiryForm.tsx";
import { company, hasEmail, hasPhone, placeholders } from "../data/company.ts";

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Kontaktai"
        title="Užsakykite elektros darbus"
        lead="Aprašykite, ką reikia atlikti, arba paskambinkite. Suderinsime apžiūros laiką ir po jos pateiksime sąmatą."
        crumbs={[{ to: "/", label: "Pagrindinis" }, { label: "Kontaktai" }]}
      />

      <section className="py-12 md:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <aside aria-labelledby="contact-info-h" className="lg:sticky lg:top-28 lg:self-start">
            <h2 id="contact-info-h" className="text-2xl font-extrabold">Kontaktinė informacija</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              <div className="flex gap-4 py-5">
                <dt className="sr-only">Telefonas</dt>
                <Phone className="mt-1 h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
                <dd>
                  <p className="text-sm text-muted">Telefonas</p>
                  <PhoneLink showIcon={false} className="inline-flex items-center gap-2 font-display text-xl font-bold text-navy hover:text-blue" />
                  {!hasPhone && <p className="mt-1 text-sm text-muted">Numeris bus nurodytas, kai bus sukonfigūruotas.</p>}
                </dd>
              </div>
              <div className="flex gap-4 py-5">
                <dt className="sr-only">El. paštas</dt>
                <Mail className="mt-1 h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
                <dd>
                  <p className="text-sm text-muted">El. paštas</p>
                  {hasEmail ? (
                    <a href={`mailto:${company.email}`} className="font-semibold text-navy hover:text-blue">{company.email}</a>
                  ) : (
                    <p className="font-semibold text-navy">{placeholders.email} <span className="font-normal text-muted">(pavyzdys)</span></p>
                  )}
                </dd>
              </div>
              <div className="flex gap-4 py-5">
                <dt className="sr-only">Aptarnaujama teritorija</dt>
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
                <dd>
                  <p className="text-sm text-muted">Aptarnaujama teritorija</p>
                  <p className="font-semibold text-navy">{company.serviceArea || placeholders.serviceArea}</p>
                  {company.address && <p className="mt-1 text-muted">{company.address}</p>}
                  {company.serviceAreas.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {company.serviceAreas.map((a) => (
                        <li key={a} className="rounded-full bg-paper px-2.5 py-1 text-xs font-semibold text-navy">{a}</li>
                      ))}
                    </ul>
                  )}
                </dd>
              </div>
              <div className="flex gap-4 py-5">
                <dt className="sr-only">Darbo laikas</dt>
                <Clock className="mt-1 h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
                <dd className="w-full">
                  <p className="text-sm text-muted">Darbo laikas</p>
                  <table className="mt-1 w-full text-[0.95rem]">
                    <caption className="sr-only">Darbo laikas</caption>
                    <tbody>
                      {company.hours.map((h) => (
                        <tr key={h.days}>
                          <th scope="row" className="py-0.5 pr-4 text-left font-normal text-ink">{h.days}</th>
                          <td className="py-0.5 text-right font-semibold text-navy">{h.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </dd>
              </div>
            </dl>

            <div className="mt-8 rounded-md bg-navy p-6 text-white">
              <h3 className="text-lg font-bold text-white">Ką verta nurodyti užklausoje?</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.95rem] text-white/75 marker:text-amber">
                <li>Objekto tipą ir apytikslį plotą</li>
                <li>Kokius darbus reikia atlikti</li>
                <li>Ar vyksta remontas, kokios sienos</li>
                <li>Pageidaujamą darbų laiką</li>
              </ul>
            </div>
          </aside>

          <div id="uzklausa" className="scroll-mt-28 rounded-md border border-line bg-white p-5 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Užklausos forma</h2>
            <p className="mt-2 mb-7 text-muted">Užpildykite formą ir susisieksime dėl darbų bei apžiūros laiko.</p>
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
