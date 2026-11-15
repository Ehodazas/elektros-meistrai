import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowRight, Check, Info, X } from "lucide-react";
import PageHeader from "../components/PageHeader.tsx";
import Photo from "../components/Photo.tsx";
import CtaBand from "../components/CtaBand.tsx";
import { categoryLabels, projects, type Project, type ProjectCategory } from "../data/projects.ts";
import { company } from "../data/company.ts";
import { stagger } from "../lib/stagger.ts";

const filters: { value: "visi" | ProjectCategory; label: string }[] = [
  { value: "visi", label: "Visi darbai" },
  { value: "instaliacija", label: categoryLabels.instaliacija },
  { value: "skydai", label: categoryLabels.skydai },
  { value: "apsvietimas", label: categoryLabels.apsvietimas },
  { value: "renovacija", label: categoryLabels.renovacija },
];

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const active = (filters.find((f) => f.value === params.get("kategorija"))?.value ?? "visi") as (typeof filters)[number]["value"];
  const openId = params.get("projektas");
  const open = projects.find((p) => p.id === openId) ?? null;
  const visible = active === "visi" ? projects : projects.filter((p) => p.category === active);

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: key === "kategorija", preventScrollReset: true });
  };

  return (
    <>
      <PageHeader
        eyebrow="Atlikti darbai"
        title="Projektų pavyzdžiai"
        lead="Elektros instaliacijos, skydų, apšvietimo ir renovacijos darbų pavyzdžiai. Paspauskite projektą, kad pamatytumėte daugiau."
        crumbs={[{ to: "/", label: "Pagrindinis" }, { label: "Atlikti darbai" }]}
      />

      <section className="py-12 md:py-16">
        <div className="wrap">
          {company.demoMode && (
            <div className="mb-8 flex gap-3 rounded-sm border border-line bg-white p-4 text-sm text-muted">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
              <p>
                <strong className="text-navy">Demonstracinis turinys.</strong> Šie projektai sukurti tik kaip pavyzdžiai, o nuotraukos
                paimtos iš nuotraukų banko Pexels. Tai nėra realūs {company.name} atlikti darbai.
              </p>
            </div>
          )}

          <div role="group" aria-label="Filtruoti pagal kategoriją" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {filters.map((f) => {
              const count = f.value === "visi" ? projects.length : projects.filter((p) => p.category === f.value).length;
              const isActive = active === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => update("kategorija", f.value === "visi" ? null : f.value)}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm border px-4 text-sm font-semibold transition-colors ${
                    isActive ? "border-navy bg-navy text-white" : "border-line bg-white text-ink hover:border-navy"
                  }`}
                >
                  {f.label}
                  <span className={`text-xs ${isActive ? "text-amber" : "text-muted"}`}>{count}</span>
                </button>
              );
            })}
          </div>

          <p className="sr-only" aria-live="polite">Rodoma projektų: {visible.length}</p>

          <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <li key={p.id} data-reveal style={stagger(i % 3)}>
                <button type="button" onClick={() => update("projektas", p.id)} className="img-zoom group block w-full text-left">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-line">
                    <Photo name={p.images[0].key} alt={p.images[0].alt} sizes="(min-width: 1024px) 390px, (min-width: 640px) 50vw, 100vw" />
                    {company.demoMode && (
                      <span className="absolute top-3 left-3 rounded-sm bg-white/90 px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-navy">
                        Pavyzdys
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-blue">{categoryLabels[p.category]} · {p.objectType}</p>
                  <h2 className="mt-1 text-xl font-bold group-hover:text-blue">{p.title}</h2>
                  <p className="mt-2 text-[0.95rem] text-muted">{p.summary}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-bold text-navy">
                    Peržiūrėti <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProjectDialog project={open} onClose={() => update("projektas", null)} />

      <CtaBand title="Turite panašų projektą?" photo="cablesHands" photoAlt="Elektriko rankos rūšiuoja ir karpo spalvotus laidus" />
    </>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      aria-labelledby="project-dialog-title"
      className="m-auto max-h-[92dvh] w-[min(960px,calc(100vw-1.5rem))] overflow-y-auto rounded-md bg-white p-0 text-ink shadow-2xl backdrop:bg-navy/70"
    >
      {project && (
        <div>
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-white px-5 py-3 sm:px-7">
            <p className="text-sm font-semibold text-blue">{categoryLabels[project.category]} · {project.objectType}</p>
            <button type="button" onClick={onClose} className="-mr-2 grid h-11 w-11 place-items-center rounded-sm hover:bg-paper" aria-label="Uždaryti projektą">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="grid gap-2 p-2 sm:grid-cols-[1.4fr_1fr]">
            {project.images.map((img, i) => (
              <div key={img.key} className={`overflow-hidden rounded-sm ${i === 0 ? "aspect-[4/3]" : "aspect-[4/3] sm:aspect-auto"}`}>
                <Photo name={img.key} alt={img.alt} sizes="(min-width: 640px) 560px, 100vw" />
              </div>
            ))}
          </div>
          <div className="grid gap-8 px-5 pt-5 pb-8 sm:px-7 md:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 id="project-dialog-title" className="text-2xl font-extrabold sm:text-3xl">{project.title}</h2>
              <p className="mt-4 text-muted">{project.details}</p>
              {company.demoMode && (
                <p className="mt-4 text-sm text-muted italic">Pavyzdinis projektas – iliustruoja darbų tipą, o ne realų objektą.</p>
              )}
            </div>
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-navy">Darbų apimtis</h3>
              <ul className="mt-3 space-y-2">
                {project.scope.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-[0.95rem]">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-blue" aria-hidden="true" /> {s}
                  </li>
                ))}
              </ul>
              <Link to="/kontaktai#uzklausa" className="btn btn-primary mt-6 w-full">Gauti pasiūlymą panašiam darbui</Link>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
