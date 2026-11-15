import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router";
import { AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";
import {
  emptyInquiry,
  isDemoForm,
  sendInquiry,
  validateInquiry,
  type InquiryData,
  type InquiryErrors,
} from "../lib/inquiry.ts";
import { formObjectOptions, formServiceOptions } from "../data/services.ts";
import PhoneLink from "./PhoneLink.tsx";

type Status = "idle" | "sending" | "success" | "error" | "demo";

const MIN_FILL_MS = 2500;

export default function InquiryForm() {
  const [params] = useSearchParams();
  const preset = params.get("paslauga") ?? "";
  const [data, setData] = useState<InquiryData>(emptyInquiry);

  // Preselect the service from ?paslauga=… after hydration (the prerendered HTML has no query).
  useEffect(() => {
    if ((formServiceOptions as readonly string[]).includes(preset)) {
      setData((d) => (d.paslauga ? d : { ...d, paslauga: preset }));
    }
  }, [preset]);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof InquiryData, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(Date.now());
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  useEffect(() => {
    if (status !== "idle" && status !== "sending") statusRef.current?.focus();
  }, [status]);

  const set = <K extends keyof InquiryData>(key: K, value: InquiryData[K]) => {
    const next = { ...data, [key]: value };
    setData(next);
    if (touched[key]) setErrors((prev) => ({ ...prev, [key]: validateInquiry(next)[key] }));
  };

  const blur = (key: keyof InquiryData) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateInquiry(data)[key] }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validateInquiry(data);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(data).map((k) => [k, true])));
    const firstInvalid = Object.keys(errs)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // Spam protection: hidden field filled or form submitted inhumanly fast → silently ignore.
    if (honeypot || Date.now() - startedAt.current < MIN_FILL_MS) {
      setStatus(isDemoForm ? "demo" : "success");
      return;
    }
    if (isDemoForm) {
      setStatus("demo");
      return;
    }
    setStatus("sending");
    const result = await sendInquiry(data);
    if (result.ok) {
      setStatus("success");
      setData(emptyInquiry);
      setTouched({});
    } else {
      setStatus("error");
    }
  }

  const id = (k: string) => `${uid}-${k}`;
  const field = (k: keyof InquiryData) => ({
    id: id(k),
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? id(`${k}-err`) : undefined,
    onBlur: () => blur(k),
  });
  const inputCls = (k: keyof InquiryData) =>
    `mt-1.5 block w-full rounded-sm border bg-white px-3.5 py-3 text-base text-ink placeholder:text-slate-400 transition-colors focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25 ${
      errors[k] ? "border-red-600" : "border-slate-300 hover:border-slate-400"
    }`;

  return (
    <div>
      {isDemoForm && (
        <div className="mb-6 flex gap-3 rounded-sm border border-amber/60 bg-amber/15 p-4 text-sm text-ink">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-dark" aria-hidden="true" />
          <p>
            <strong>Demonstracinis režimas.</strong> Forma tikrina įvestus duomenis, tačiau jų niekur nesiunčia –
            siuntimo paslauga dar neprijungta.
          </p>
        </div>
      )}

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status === "success" && (
          <Notice tone="success" title="Užklausa išsiųsta">
            Ačiū! Gavome jūsų užklausą ir susisieksime artimiausiu darbo metu.
          </Notice>
        )}
        {status === "demo" && (
          <Notice tone="info" title="Duomenys užpildyti teisingai">
            Kadangi forma veikia demonstraciniu režimu, užklausa <strong>nebuvo išsiųsta</strong>. Realioje svetainėje ji
            būtų perduota įmonei.
          </Notice>
        )}
        {status === "error" && (
          <Notice tone="error" title="Nepavyko išsiųsti užklausos">
            Patikrinkite interneto ryšį ir bandykite dar kartą. Jei nepavyksta, susisiekite telefonu:{" "}
            <PhoneLink className="inline-flex items-center gap-1 font-semibold underline" showIcon={false} />
          </Notice>
        )}
      </div>

      <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-label="Užklausos forma">
        <p className="text-sm text-muted sm:col-span-2">
          Laukai, pažymėti <span className="text-red-600" aria-hidden="true">*</span>
          <span className="sr-only">žvaigždute</span>, yra privalomi.
        </p>

        <Field label="Vardas" required error={errors.vardas} errId={id("vardas-err")} htmlFor={id("vardas")}>
          <input {...field("vardas")} type="text" autoComplete="name" required value={data.vardas}
            onChange={(e) => set("vardas", e.target.value)} className={inputCls("vardas")} />
        </Field>

        <Field label="Telefono numeris" required error={errors.telefonas} errId={id("telefonas-err")} htmlFor={id("telefonas")}>
          <input {...field("telefonas")} type="tel" inputMode="tel" autoComplete="tel" required placeholder="+370 6XX XXXXX"
            value={data.telefonas} onChange={(e) => set("telefonas", e.target.value)} className={inputCls("telefonas")} />
        </Field>

        <Field label="El. paštas" hint="neprivaloma" error={errors.elPastas} errId={id("elPastas-err")} htmlFor={id("elPastas")}>
          <input {...field("elPastas")} type="email" inputMode="email" autoComplete="email" value={data.elPastas}
            onChange={(e) => set("elPastas", e.target.value)} className={inputCls("elPastas")} />
        </Field>

        <Field label="Miestas / rajonas" required error={errors.miestas} errId={id("miestas-err")} htmlFor={id("miestas")}>
          <input {...field("miestas")} type="text" autoComplete="address-level2" required value={data.miestas}
            onChange={(e) => set("miestas", e.target.value)} className={inputCls("miestas")} />
        </Field>

        <Field label="Paslaugos tipas" required error={errors.paslauga} errId={id("paslauga-err")} htmlFor={id("paslauga")}>
          <select {...field("paslauga")} required value={data.paslauga}
            onChange={(e) => set("paslauga", e.target.value)} className={inputCls("paslauga")}>
            <option value="">Pasirinkite…</option>
            {formServiceOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>

        <Field label="Objekto tipas" required error={errors.objektas} errId={id("objektas-err")} htmlFor={id("objektas")}>
          <select {...field("objektas")} required value={data.objektas}
            onChange={(e) => set("objektas", e.target.value)} className={inputCls("objektas")}>
            <option value="">Pasirinkite…</option>
            {formObjectOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Darbų aprašymas" required error={errors.aprasymas} errId={id("aprasymas-err")} htmlFor={id("aprasymas")}>
            <textarea {...field("aprasymas")} rows={5} required maxLength={3000}
              placeholder="Pvz.: reikia pakeisti seną skydą ir instaliaciją 2 kambarių bute, sienos tinkuotos."
              value={data.aprasymas} onChange={(e) => set("aprasymas", e.target.value)}
              className={`${inputCls("aprasymas")} resize-y`} />
          </Field>
        </div>

        {/* Honeypot – hidden from people and assistive tech, bots tend to fill it. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Svetainė
            <input type="text" name="svetaine" tabIndex={-1} autoComplete="off" value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)} />
          </label>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("sutikimas")} className="flex cursor-pointer gap-3 text-sm text-ink">
            <input {...field("sutikimas")} type="checkbox" checked={data.sutikimas}
              onChange={(e) => { set("sutikimas", e.target.checked); setTouched((t) => ({ ...t, sutikimas: true })); }}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-blue" />
            <span>
              Sutinku, kad mano pateikti duomenys būtų naudojami atsakyti į šią užklausą, kaip aprašyta{" "}
              <Link to="/privatumo-politika" className="text-blue underline underline-offset-2">privatumo politikoje</Link>.
              <span className="text-red-600" aria-hidden="true"> *</span>
            </span>
          </label>
          {errors.sutikimas && <ErrorText id={id("sutikimas-err")}>{errors.sutikimas}</ErrorText>}
        </div>

        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" className="btn btn-blue w-full sm:w-auto" disabled={status === "sending"}>
            {status === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Siunčiama…
              </>
            ) : isDemoForm ? (
              "Patikrinti užklausą (demo)"
            ) : (
              "Siųsti užklausą"
            )}
          </button>
          <p className="text-sm text-muted">Įprastai atsakome per vieną darbo dieną.</p>
        </div>
      </form>
    </div>
  );
}

function Field({
  label, required, hint, error, errId, htmlFor, children,
}: {
  label: string; required?: boolean; hint?: string; error?: string; errId: string; htmlFor: string; children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-navy">
        {label}
        {required && <span className="text-red-600" aria-hidden="true"> *</span>}
        {hint && <span className="ml-1 font-normal text-muted">({hint})</span>}
      </label>
      {children}
      {error && <ErrorText id={errId}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm text-red-700">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

function Notice({ tone, title, children }: { tone: "success" | "info" | "error"; title: string; children: ReactNode }) {
  const styles = {
    success: "border-emerald-600/40 bg-emerald-50 text-emerald-900",
    info: "border-blue/40 bg-blue/5 text-ink",
    error: "border-red-600/40 bg-red-50 text-red-900",
  }[tone];
  const Icon = tone === "error" ? AlertCircle : tone === "success" ? CheckCircle2 : Info;
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`mb-6 flex gap-3 rounded-sm border p-4 ${styles}`}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm">{children}</p>
      </div>
    </div>
  );
}
