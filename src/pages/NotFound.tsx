import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <div className="wrap max-w-2xl text-center">
        <p className="font-display text-7xl font-extrabold text-line">404</p>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">Puslapis nerastas</h1>
        <p className="mt-4 text-lg text-muted">
          Gali būti, kad nuoroda pasenusi arba adresas įvestas su klaida.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn btn-primary">Į pagrindinį puslapį</Link>
          <Link to="/paslaugos" className="btn btn-outline text-navy">
            Paslaugos <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
