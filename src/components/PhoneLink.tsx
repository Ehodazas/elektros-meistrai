import { Link } from "react-router";
import { Phone } from "lucide-react";
import { company, hasPhone, placeholders } from "../data/company.ts";

type Props = {
  className?: string;
  /** Show the number as text (default) or only a label. */
  label?: string;
  showIcon?: boolean;
  iconClassName?: string;
};

/**
 * Click-to-call link. While no real number is configured in company.ts, it does NOT
 * render a tel: link – it shows the placeholder marked as demo and leads to the
 * contact page instead, so there is never a dead or fake call button.
 */
export default function PhoneLink({ className = "", label, showIcon = true, iconClassName = "h-4 w-4" }: Props) {
  if (hasPhone) {
    return (
      <a href={`tel:${company.phone}`} className={className} aria-label={`Skambinti ${company.phoneDisplay || company.phone}`}>
        {showIcon && <Phone className={iconClassName} aria-hidden="true" />}
        <span>{label ?? (company.phoneDisplay || company.phone)}</span>
      </a>
    );
  }
  return (
    <Link
      to="/kontaktai"
      className={className}
      aria-label="Telefono numeris dar nenurodytas – pereiti į kontaktų puslapį"
      title="Demonstracinis numeris – skambinimas išjungtas"
    >
      {showIcon && <Phone className={iconClassName} aria-hidden="true" />}
      <span>{label ?? placeholders.phone}</span>
      <span className="rounded-sm bg-current/15 px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider opacity-80">
        demo
      </span>
    </Link>
  );
}
