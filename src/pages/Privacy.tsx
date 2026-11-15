import { Link } from "react-router";
import PageHeader from "../components/PageHeader.tsx";
import { company, hasEmail, placeholders } from "../data/company.ts";
import { photos } from "../data/photos.ts";
import { isDemoForm } from "../lib/inquiry.ts";

export default function Privacy() {
  const controller = company.legalName || company.name;
  const email = hasEmail ? company.email : placeholders.email;
  const credits = [...new Map(Object.values(photos).map((p) => [p.source, p])).values()];

  return (
    <>
      <PageHeader
        title="Privatumo politika"
        lead="Kaip tvarkome per šią svetainę pateiktus asmens duomenis."
        crumbs={[{ to: "/", label: "Pagrindinis" }, { label: "Privatumo politika" }]}
      />
      <section className="py-12 md:py-20">
        <div className="wrap">
          <div className="prose-lt max-w-3xl text-[1.02rem] text-ink">
            {company.demoMode && (
              <p className="rounded-sm border border-amber/60 bg-amber/15 p-4 text-sm">
                <strong>Pastaba:</strong> tai pavyzdinis privatumo politikos tekstas demonstracinei svetainei. Prieš naudojant
                realiai įmonei, jį būtina papildyti tikrais duomenimis ir, jei reikia, pasikonsultuoti su teisininku.
              </p>
            )}

            <h2>1. Duomenų valdytojas</h2>
            <p>
              Duomenų valdytojas – {controller}
              {company.companyCode ? `, įmonės kodas ${company.companyCode}` : " (rekvizitai bus nurodyti)"}
              {company.address ? `, ${company.address}` : ""}. Klausimais dėl duomenų tvarkymo rašykite el. paštu {email}.
            </p>

            <h2>2. Kokius duomenis renkame</h2>
            <p>Duomenis renkame tik tada, kai juos pateikiate patys užklausos formoje:</p>
            <ul>
              <li>vardą, telefono numerį ir, jei nurodote, el. pašto adresą;</li>
              <li>miestą ar rajoną, paslaugos ir objekto tipą;</li>
              <li>darbų aprašymą ir kitą informaciją, kurią įrašote laisvai.</li>
            </ul>
            {isDemoForm && (
              <p>
                Šiuo metu forma veikia demonstraciniu režimu – įvesti duomenys niekur neperduodami ir nesaugomi.
              </p>
            )}

            <h2>3. Kokiais tikslais ir kokiu pagrindu</h2>
            <p>
              Duomenis naudojame tik atsakyti į jūsų užklausą, suderinti apžiūrą ir pateikti pasiūlymą. Teisinis pagrindas –
              veiksmai jūsų prašymu prieš sudarant sutartį (BDAR 6 straipsnio 1 dalies b punktas).
            </p>

            <h2>4. Kiek laiko saugome</h2>
            <p>
              Užklausų duomenis saugome tiek, kiek reikia atsakyti į užklausą ir suteikti paslaugą, bet ne ilgiau kaip 12 mėnesių
              nuo paskutinio bendravimo, nebent sudaroma sutartis ir teisės aktai reikalauja saugoti ilgiau.
            </p>

            <h2>5. Kam perduodame duomenis</h2>
            <p>
              Duomenų neparduodame. Užklausos formos duomenys gali būti perduodami el. pašto ar formų paslaugos teikėjui, kuris
              juos tvarko mūsų vardu ir pagal mūsų nurodymus.
            </p>

            <h2>6. Jūsų teisės</h2>
            <p>Turite teisę:</p>
            <ul>
              <li>susipažinti su savo duomenimis ir gauti jų kopiją;</li>
              <li>prašyti ištaisyti netikslius ar ištrinti duomenis;</li>
              <li>apriboti duomenų tvarkymą ar nesutikti su juo;</li>
              <li>
                pateikti skundą Valstybinei duomenų apsaugos inspekcijai (
                <a href="https://vdai.lrv.lt" target="_blank" rel="noopener noreferrer">vdai.lrv.lt</a>).
              </li>
            </ul>

            <h2>7. Slapukai</h2>
            <p>
              Ši svetainė nenaudoja slapukų ir lankytojų stebėjimo įrankių (pvz., analitikos ar reklamos), todėl slapukų sutikimo
              juosta nerodoma. Šriftai įkeliami iš pačios svetainės. Jei ateityje bus įdiegta analitika ar kiti neprivalomi slapukai,
              ši politika bus atnaujinta ir prieš juos įrašant bus prašoma jūsų sutikimo.
            </p>
            <p>
              Nuotraukos įkeliamos iš Pexels serverių (images.pexels.com), todėl jūsų naršyklė, kaip ir lankantis bet kurioje svetainėje,
              perduoda šiam paslaugų teikėjui IP adresą ir techninę užklausos informaciją.
            </p>

            <h2 id="nuotraukos">8. Nuotraukų šaltiniai</h2>
            <p>
              Svetainėje naudojamos nuotraukos iš <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a>{" "}
              (Pexels licencija ir CC0). Autoriai:
            </p>
            <ul className="!grid gap-x-6 sm:grid-cols-2 text-sm">
              {credits.map((p) => (
                <li key={p.source}>
                  <a href={p.source} target="_blank" rel="noopener noreferrer">{p.author}</a>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-sm text-muted">
              Atnaujinta: {new Date(2026, 10, 15).toLocaleDateString("lt-LT")}. Klausimų? <Link to="/kontaktai">Susisiekite</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
