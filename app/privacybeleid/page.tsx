import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacybeleid | Meneer Wit",
  description: "Lees het privacybeleid van Meneer Wit. Wij verzamelen geen persoonlijke gegevens.",
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "Welkom",
    content:
      "Dit privacybeleid is van toepassing op de website meneerwit.com. Wij hechten veel waarde aan uw privacy en gaan zorgvuldig om met uw gegevens. Lees dit document aandachtig om te begrijpen hoe wij omgaan met informatie.",
  },
  {
    title: "Geen gegevensverzameling",
    content:
      "Meneer Wit verzamelt geen persoonlijke gegevens van gebruikers. Er worden geen namen, e-mailadressen, IP-adressen of andere identificeerbare informatie opgeslagen op onze servers. Het spel wordt volledig in uw browser uitgevoerd.",
  },
  {
    title: "Lokale opslag (Local Storage)",
    content:
      "Om bepaalde instellingen (zoals thema en geluidsvoorkeuren) te onthouden, kan de applicatie gebruik maken van de lokale opslag van uw browser (localStorage). Deze gegevens worden uitsluitend op uw eigen apparaat opgeslagen en worden nooit naar onze servers verzonden.",
  },
  {
    title: "Cookies",
    content:
      "Meneer Wit maakt geen gebruik van tracking cookies, analytische cookies of advertentiecookies. Er worden geen cookies geplaatst om uw gedrag online te volgen.",
  },
  {
    title: "Externe diensten",
    content:
      "Wij maken geen gebruik van externe analysediensten (zoals Google Analytics), advertentienetwerken of sociale mediapixels. Uw bezoek aan onze website wordt niet gevolgd of gedeeld met derden.",
  },
  {
    title: "Beveiliging",
    content:
      "Omdat wij geen persoonlijke gegevens verzamelen, bestaat er geen risico dat uw gegevens bij ons worden blootgesteld aan een datalek. De verbinding met onze website is beveiligd via HTTPS.",
  },
  {
    title: "Wijzigingen in dit beleid",
    content:
      "Wij behouden ons het recht voor om dit privacybeleid te wijzigen. Eventuele wijzigingen worden op deze pagina gepubliceerd. Wij raden u aan deze pagina periodiek te raadplegen.",
  },
  {
    title: "Contact",
    content:
      "Heeft u vragen over dit privacybeleid? U kunt contact opnemen via het e-mailadres dat vermeld staat op de website.",
  },
];

export default function PrivacybeleidPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-5 py-12 sm:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Terug naar het spel
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60 mb-3">
            Privacybeleid
          </h1>
          <p className="text-sm text-muted-foreground">
            Laatst bijgewerkt: mei 2026 &nbsp;·&nbsp; meneerwit.com
          </p>
        </div>

        <div className="rounded-2xl bg-accent/60 border border-border/60 px-5 py-4 mb-8 flex items-start gap-3">
          <span className="text-primary text-lg leading-none mt-0.5">✦</span>
          <p className="text-sm font-medium text-accent-foreground">
            Korte samenvatting: Meneer Wit slaat <strong>geen</strong> persoonlijke gegevens op, gebruikt <strong>geen</strong> cookies voor tracking en deelt <strong>niets</strong> met derden.
          </p>
        </div>

        <div className="space-y-5">
          {sections.map((section, i) => (
            <div
              key={i}
              className="rounded-2xl bg-card border border-border/60 px-6 py-5"
            >
              <h2 className="text-base font-bold mb-2">{section.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Meneer Wit · Alle rechten voorbehouden
        </p>
      </div>
    </main>
  );
}
