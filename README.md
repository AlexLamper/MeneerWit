#  Meneer Wit - De Nederlandse Mister White

Een digitale versie van het populaire gezelschapsspel "Mr. White" (ook wel bekend als *Undercover*). Dit project is gebouwd als een snelle, mobiel-vriendelijke webapplicatie.

Met meer dan **1000+ unieke woordenparen** is het spel praktisch onbeperkt speelbaar. De kans dat je hetzelfde woord snel opnieuw krijgt is minimaal!

##  Hoe werkt het spel?

Het doel is simpel: ontmasker de **Mister White** voordat hij het geheime woord raadt.

### De Rollen
1.  **Burgers**: Krijgen het geheime woord (bijv. "Koffie").
2.  **Undercovers**: Krijgen een woord dat er erg op lijkt (bijv. "Thee"). Zij denken vaak dat ze een Burger zijn!
3.  **Mister White**: Krijgt **geen** woord. Hij moet bluffen en proberen te achterhalen wat het woord is door goed te luisteren naar de anderen.

### Het Spelverloop
1.  **Rollen verdelen**: Iedereen bekijkt stiekem zijn rol op de telefoon. Niemand weet elkaars rol.
2.  **Beschrijven**: Een willekeurige speler begint (niet Mister White in ronde 1). Om de beurt noemt elke speler één woord dat met hun geheime woord te maken heeft.
3.  **Stemmen**: Na de ronde stemt de groep wie ze denken dat Mister White is.
4.  **Ontknoping**:
    *   **Mister White wint** als hij geëlimineerd wordt maar het woord van de Burgers goed raadt.
    *   **Burgers winnen** (2 punten) als ze alle Undercovers en Mister Whites elimineren.
    *   **Infiltranten winnen** (Undercover 10 pnt, Mr White 6 pnt) als ze overleven tot er nog maar 1 Burger over is.

##  Waarom heb ik het spel 'opnieuw' gemaakt als het al bestaat?

Na het vaak spelen van het spel 'Undercover' met familie en vrienden kende ik uiteindelijk alle woorden/woordenparen. Dit maakte het spel een stuk minder leuk. Vervolgens was er de optie om te betalen voor extra woordenparen. Daarom heb ik een eigen versie gemaakt die gratis is en een onbeperkt aantal woordenparen bevat. De woorden zijn niet letterlijk “onbeperkt”, maar met meer dan 1000+ woordenparen is de kans zeer klein dat je hetzelfde woordenpaar meerdere keren krijgt.

##  Technologieën

Dit project is gebouwd met de nieuwste webtechnologieën voor snelheid en gebruiksgemak:

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **UI Library**: [React 19](https://react.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Taal**: TypeScript

##  Installatie & Lokaal Draaien

Wil je dit project zelf draaien of aanpassen? Volg deze stappen:

1.  **Clone de repository:**
    ```bash
    git clone https://github.com/AlexLamper/MeneerWit.git
    cd MeneerWit
    ```

2.  **Installeer dependencies:**
    ```bash
    npm install
    ```

3.  **Start de development server:**
    ```bash
    npm run dev
    ```

4.  Open je browser en ga naar `http://localhost:3000`.

##  Mobiel Gebruik

De applicatie is geoptimaliseerd voor mobiel gebruik. Je kunt het toevoegen aan je startscherm (als PWA) voor een app-achtige ervaring zonder adresbalk.

---
*Veel plezier met spelen! Pas op voor Mister White...* 
