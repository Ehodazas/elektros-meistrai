import { useId, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { AlertCircle, CheckCircle2, Info, Loader2, PhoneCall } from "lucide-react";
import { isDemoForm, sendCallback, validateCallback, type CallbackData, type CallbackErrors } from "../lib/inquiry.ts";

const empty: CallbackData = { vardas: "", telefonas: "", problema: "" };

/** Short "call me back" form for the hero. Same delivery/demo rules as the main inquiry form. */
export default function QuickCallback() {
  const [data, setData] = useState(empty);
  const [errors, setErrors] = useState<CallbackErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "demo">("idle");
  const [trap, setTrap] = useState("");
  // Phones/tablets: the form starts collapsed to keep the hero short (always open on desktop).
  const [expanded, setExpanded] = useState(false);
  const startedAt = useRef(Date.now());
  const uid = useId();

  const set = (k: keyof CallbackData, v: string) => {
    const next = { ...data, [k]: v };
    setData(next);
    if (errors[k]) setErrors((p) => ({ ...p, [k]: validateCallback(next)[k] }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateCallback(data);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (trap || Date.now() - startedAt.current < 2000 || isDemoForm) {
      setStatus(isDemoForm ? "demo" : "success");
      return;
    }
    setStatus("sending");
    const r = await sendCallback(data);
    setStatus(r.ok ? "success" : "error");
    if (r.ok) setData(empty);
  }

  const input = (k: keyof CallbackData) =>
    `mt-1 block w-full rounded-sm border bg-white px-3.5 py-3 text-base text-ink placeholder:text-slate-400 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/25 ${
      errors[k] ? "border-red-600" : "border-slate-300"
    }`;

  return (
    <div className="rounded-md bg-white p-6 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-7">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-amber text-navy" aria-hidden="true">
          <PhoneCall className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-extrabold">Perskambinsime jums</h2>
          <p className="text-sm text-muted">Palikite numerį – susisieksime darbo metu.</p>
        </div>
      </div>

      {status === "success" && (
        <p role="status" className="mt-5 flex gap-2 rounded-sm bg-emerald-50 p-3 text-sm text-emerald-900">
          <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" /> Ačiū! Netrukus perskambinsime.
        </p>
      )}
      {status === "demo" && (
        <p role="status" className="mt-5 flex gap-2 rounded-sm bg-blue/5 p-3 text-sm">
          <Info className="h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
          <span>Demonstracinis režimas: duomenys teisingi, bet prašymas <strong>nebuvo išsiųstas</strong>.</span>
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-5 flex gap-2 rounded-sm bg-red-50 p-3 text-sm text-red-900">
          <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" /> Nepavyko išsiųsti. Bandykite dar kartą arba
          naudokite <Link to="/kontaktai#uzklausa" className="underline">užklausos formą</Link>.
        </p>
      )}

      {!expanded && (
        <button
          type="button"
          onClick={() => {
            setExpanded(true);
            setTimeout(() => document.getElementById(`${uid}-v`)?.focus(), 0);
          }}
          className="btn btn-blue mt-5 w-full lg:hidden"
          aria-controls={`${uid}-form`}
          aria-expanded={false}
        >
          Palikti numerį
        </button>
      )}
      <form id={`${uid}-form`} noValidate onSubmit={onSubmit} className={`relative mt-5 gap-4 lg:grid ${expanded ? "grid" : "hidden"}`} aria-label="Prašymas perskambinti">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-v`} className="text-sm font-semibold text-navy">Vardas</label>
            <input id={`${uid}-v`} name="vardas" autoComplete="name" value={data.vardas}
              aria-invalid={errors.vardas ? true : undefined} aria-describedby={errors.vardas ? `${uid}-ve` : undefined}
              onChange={(e) => set("vardas", e.target.value)} className={input("vardas")} />
            {errors.vardas && <p id={`${uid}-ve`} className="mt-1 text-sm text-red-700">{errors.vardas}</p>}
          </div>
          <div>
            <label htmlFor={`${uid}-t`} className="text-sm font-semibold text-navy">Telefono numeris</label>
            <input id={`${uid}-t`} name="telefonas" type="tel" inputMode="tel" autoComplete="tel" placeholder="+370 6XX XXXXX"
              value={data.telefonas} aria-invalid={errors.telefonas ? true : undefined}
              aria-describedby={errors.telefonas ? `${uid}-te` : undefined}
              onChange={(e) => set("telefonas", e.target.value)} className={input("telefonas")} />
            {errors.telefonas && <p id={`${uid}-te`} className="mt-1 text-sm text-red-700">{errors.telefonas}</p>}
          </div>
        </div>
        <div>
          <label htmlFor={`${uid}-p`} className="text-sm font-semibold text-navy">
            Kas nutiko? <span className="font-normal text-muted">(neprivaloma)</span>
          </label>
          <textarea id={`${uid}-p`} name="problema" rows={2} maxLength={1000}
            placeholder="Pvz.: išmuša automatą, neveikia lizdai virtuvėje"
            value={data.problema} onChange={(e) => set("problema", e.target.value)} className={`${input("problema")} resize-none`} />
        </div>
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <input tabIndex={-1} autoComplete="off" name="imone" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-blue w-full" disabled={status === "sending"}>
          {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Siunčiama…</> : "Prašyti perskambinti"}
        </button>
        <p className="text-xs text-muted">
          Pateikdami numerį sutinkate, kad jį naudosime tik atsakyti į šį prašymą.{" "}
          <Link to="/privatumo-politika" className="underline">Privatumo politika</Link>
        </p>
      </form>
    </div>
  );
}
