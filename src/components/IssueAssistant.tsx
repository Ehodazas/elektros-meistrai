import { useEffect, useId, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AlertTriangle, ArrowLeft, ArrowRight, Info, Phone, ShieldAlert } from "lucide-react";
import PhoneLink from "./PhoneLink.tsx";
import { issueById, issues, type IssueLevel } from "../data/issues.ts";
import { formObjectOptions } from "../data/services.ts";

type Step = 1 | 2 | 3;

const levelUi: Record<IssueLevel, { tag: string; cls: string; Icon: typeof Info }> = {
  danger: { tag: "Sauga pirmiausia", cls: "border-red-400/50 bg-red-500/10 text-red-200", Icon: ShieldAlert },
  caution: { tag: "Atkreipkite dėmesį", cls: "border-amber/50 bg-amber/10 text-amber", Icon: AlertTriangle },
  routine: { tag: "Kitas žingsnis", cls: "border-sky-300/40 bg-sky-400/10 text-sky-200", Icon: Info },
};

/**
 * „Kokia elektros problema?“ – a three-step inquiry assistant (not a diagnosis tool):
 *  1. pick the problem, 2. see safe next steps, 3. add a few details →
 * opens the main inquiry form with the problem and details pre-filled.
 */
export default function IssueAssistant() {
  const [step, setStep] = useState<Step>(1);
  const [issueId, setIssueId] = useState<string>("");
  const [objektas, setObjektas] = useState("");
  const [miestas, setMiestas] = useState("");
  const [aprasymas, setAprasymas] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const navigate = useNavigate();
  const uid = useId();
  const issue = issueById(issueId);

  // Move focus to the step heading on step change (not on first render).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const goToForm = () => {
    if (!issue) return;
    const q = new URLSearchParams({ problema: issue.id, paslauga: issue.service });
    if (objektas) q.set("objektas", objektas);
    if (miestas.trim()) q.set("miestas", miestas.trim());
    if (aprasymas.trim()) q.set("aprasymas", aprasymas.trim());
    navigate(`/kontaktai?${q.toString()}#uzklausa`);
  };

  const heading = (text: string) => (
    <h3 ref={headingRef} tabIndex={-1} className="font-display text-xl font-extrabold text-white outline-none sm:text-2xl">
      {text}
    </h3>
  );

  return (
    <div className="overflow-hidden rounded-md border border-white/15 bg-navy-2 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.8)]">
      {/* Header bar: label + step indicator */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3 sm:px-6">
        <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/60">Užklausos asistentas</p>
        <ol className="flex items-center gap-1.5" aria-label={`Žingsnis ${step} iš 3`}>
          {[1, 2, 3].map((n) => (
            <li key={n} aria-hidden="true"
              className={`h-1 rounded-full transition-all duration-300 ${n === step ? "w-7 bg-amber" : n < step ? "w-3 bg-amber/60" : "w-3 bg-white/20"}`} />
          ))}
          <li className="ml-2 font-mono text-[0.7rem] text-white/60" aria-hidden="true">{step}/3</li>
        </ol>
      </div>

      <div key={step} className="assist-in p-5 sm:p-6">
        {/* STEP 1 – choose the problem */}
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); if (issue) setStep(2); }}>
            <fieldset>
              <legend className="contents">{heading("Kokia elektros problema?")}</legend>
              <p className="mt-1 text-sm text-white/65">Pasirinkite, kas labiausiai atitinka situaciją.</p>
              <div className="mt-5 grid gap-2">
                {issues.map((it) => {
                  const checked = issueId === it.id;
                  return (
                    <label key={it.id}
                      className={`group flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border px-3.5 py-2.5 transition-[border-color,background-color] duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-amber ${
                        checked ? "border-amber bg-amber/10" : "border-white/12 hover:border-white/35"
                      }`}>
                      <input type="radio" name={`${uid}-issue`} value={it.id} checked={checked}
                        onChange={() => setIssueId(it.id)} className="sr-only" />
                      <span aria-hidden="true"
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors ${checked ? "border-amber" : "border-white/40"}`}>
                        <span className={`h-2 w-2 rounded-full bg-amber transition-transform duration-200 ${checked ? "scale-100" : "scale-0"}`} />
                      </span>
                      <span className="flex-1 text-[0.95rem] text-white">{it.label}</span>
                      {it.level === "danger" && (
                        <span className="rounded-sm bg-red-500/15 px-1.5 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-wider text-red-200">Pavojinga</span>
                      )}
                      <span className="hidden font-mono text-[0.68rem] text-white/35 sm:inline" aria-hidden="true">{it.code}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link to="/kontaktai#uzklausa" className="inline-flex min-h-11 items-center text-sm text-white/70 underline underline-offset-4 hover:text-white">
                Praleisti ir rašyti tiesiogiai
              </Link>
              <button type="submit" disabled={!issue} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-40">
                Toliau <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2 – safe next steps */}
        {step === 2 && issue && (
          <div>
            <p className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-wider ${levelUi[issue.level].cls}`}>
              {(() => { const I = levelUi[issue.level].Icon; return <I className="h-3.5 w-3.5" aria-hidden="true" />; })()}
              {levelUi[issue.level].tag}
            </p>
            <div className="mt-3">{heading(issue.label)}</div>

            {issue.level === "danger" && (
              <div role="alert" className="mt-4 flex gap-3 rounded-sm border border-red-400/50 bg-red-500/10 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" aria-hidden="true" />
                <p className="text-[0.95rem] text-white">
                  Matote dūmus, ugnį ar kyla tiesioginis pavojus? Nedelsdami išeikite iš patalpos ir skambinkite{" "}
                  <a href="tel:112" className="font-bold text-red-200 underline underline-offset-2">112</a>.
                </p>
              </div>
            )}

            <ul className="mt-4 space-y-2.5">
              {issue.advice.map((a, i) => (
                <li key={a} className="flex gap-3 text-[0.95rem] text-white/85">
                  <span className="mt-0.5 font-mono text-xs text-amber" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-white/50">
              Tai ne gedimo diagnozė – patarimai skirti saugiai sulaukti elektriko. Elektros darbus turi atlikti kvalifikuotas specialistas.
            </p>

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={() => setStep(1)} className="inline-flex min-h-11 items-center gap-1.5 text-sm text-white/70 hover:text-white">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Pakeisti problemą
              </button>
              <div className="flex flex-col gap-3 sm:flex-row">
                <PhoneLink className="btn btn-outline-light" label="Skambinti" iconClassName="h-4 w-4" />
                <button type="button" onClick={() => setStep(3)} className="btn btn-primary">
                  Aprašyti užklausą <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 – a few details, then hand over to the inquiry form */}
        {step === 3 && issue && (
          <form onSubmit={(e) => { e.preventDefault(); goToForm(); }}>
            {heading("Keli trumpi klausimai")}
            <p className="mt-1 text-sm text-white/65">
              Visi laukai neprivalomi – juos perkelsime į užklausos formą, kurią dar galėsite pakeisti.
            </p>

            <fieldset className="mt-5">
              <legend className="text-sm font-semibold text-white">Objekto tipas</legend>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {formObjectOptions.map((o) => (
                  <label key={o}
                    className={`flex min-h-11 cursor-pointer items-center justify-center rounded-sm border px-2 text-center text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-amber ${
                      objektas === o ? "border-amber bg-amber/10 text-white" : "border-white/15 text-white/80 hover:border-white/35"
                    }`}>
                    <input type="radio" name={`${uid}-obj`} value={o} checked={objektas === o} onChange={() => setObjektas(o)} className="sr-only" />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-4">
              <label htmlFor={`${uid}-city`} className="text-sm font-semibold text-white">Miestas / rajonas</label>
              <input id={`${uid}-city`} value={miestas} onChange={(e) => setMiestas(e.target.value)} autoComplete="address-level2"
                className="mt-1.5 block w-full rounded-sm border border-white/15 bg-navy px-3.5 py-3 text-base text-white placeholder:text-white/35 focus:border-amber focus:outline-none" />
            </div>
            <div className="mt-4">
              <label htmlFor={`${uid}-desc`} className="text-sm font-semibold text-white">Trumpas aprašymas</label>
              <textarea id={`${uid}-desc`} rows={3} maxLength={1000} value={aprasymas} onChange={(e) => setAprasymas(e.target.value)}
                placeholder={issue.hint}
                className="mt-1.5 block w-full resize-none rounded-sm border border-white/15 bg-navy px-3.5 py-3 text-base text-white placeholder:text-white/35 focus:border-amber focus:outline-none" />
              <p className="mt-1.5 text-xs text-white/50">Nuotraukas galėsite atsiųsti, kai su jumis susisieksime.</p>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={() => setStep(2)} className="inline-flex min-h-11 items-center gap-1.5 text-sm text-white/70 hover:text-white">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Atgal
              </button>
              <button type="submit" className="btn btn-primary">
                Pereiti į užklausos formą <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-white/10 px-5 py-3 text-xs text-white/55 sm:px-6">
        <Phone className="h-3.5 w-3.5" aria-hidden="true" />
        Norite iškart pasikalbėti?
        <PhoneLink showIcon={false} className="inline-flex min-h-8 items-center gap-1.5 font-semibold text-white/85 hover:text-amber" />
      </div>
    </div>
  );
}
