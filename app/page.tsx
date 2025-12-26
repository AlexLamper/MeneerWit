export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-bold text-xl tracking-tighter">Meneer Wit</a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#hoe-werkt-het" className="hover:text-black transition-colors">Hoe werkt het?</a>
            <a href="#het-idee" className="hover:text-black transition-colors">Het Idee</a>
            <a href="#waarom" className="hover:text-black transition-colors">Waarom?</a>
            <a href="#download" className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-all">Download</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-20 pb-16 md:pt-32 md:pb-24 max-w-5xl mx-auto text-center animate-float-in">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest uppercase bg-black text-white rounded-full">
          100% Gratis
        </div>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
          Meneer Wit
        </h1>
        <p className="text-xl md:text-2xl font-medium text-gray-600 mb-4">
          De Nederlandse &quot;Mister White&quot;
        </p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Eindelijk een volledig Nederlandse versie van de populaire partygame. 
          Ontmasker de indringers, bluf je eruit als Meneer Wit en win het spel. 
          <strong> Geen kosten, geen accounts, gewoon spelen.</strong>
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#" 
            className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-2xl font-semibold text-lg hover:bg-gray-800 transition-all active:scale-95"
          >
            Download voor iOS
          </a>
          <a 
            href="#" 
            className="w-full sm:w-auto px-8 py-4 border-2 border-black text-black rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all active:scale-95"
          >
            Download voor Android
          </a>
        </div>
      </section>

      {/* Hoe werkt het? */}
      <section id="hoe-werkt-het" className="px-6 py-20 bg-gray-200 scroll-mt-16">
        <div className="max-w-5xl mx-auto animate-float-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Hoe werkt het?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold mb-3">Start een spel</h3>
              <p className="text-gray-600">Pak je telefoon en start een nieuw spel met je vrienden in de kamer.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold mb-3">Ontvang je rol</h3>
              <p className="text-gray-600">Krijg in het geheim je rol: ben jij een Burger, de Afwijker of Meneer Wit?</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold mb-3">Ontmasker & win</h3>
              <p className="text-gray-600">Stel vragen, geef hints en probeer de anderen te ontmaskeren voor ze jou vinden.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Het Idee */}
      <section id="het-idee" className="px-6 py-20 max-w-4xl mx-auto text-center border-b border-gray-100 scroll-mt-16 animate-float-in">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Het Idee</h2>
        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
          <p>
            Net als in <strong>Undercover</strong> of <strong>Mister White</strong> draait alles om subtiele hints en scherpe observaties. 
            In deze Nederlandse versie krijgt iedereen een geheim woord, behalve Meneer Wit zelf. 
            De Afwijker krijgt een woord dat er erg op lijkt, wat voor extra verwarring zorgt.
          </p>
          <p>
            Om de beurt geeft iedereen één woord als hint dat te maken heeft met hun geheime woord. 
            Meneer Wit moet proberen niet op te vallen en het woord van de Burgers te raden door goed te luisteren naar de hints.
          </p>
          <p>
            Na elke ronde stemmen de spelers wie zij denken dat Meneer Wit is. 
            Kunnen de Burgers de indringer ontmaskeren, of weet Meneer Wit iedereen te slim af te zijn?
          </p>
        </div>
      </section>

      {/* Waarom Meneer Wit? */}
      <section id="waarom" className="px-6 py-20 max-w-5xl mx-auto scroll-mt-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center animate-float-in">Waarom Meneer Wit?</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="p-8 border-2 border-black rounded-3xl bg-black text-white animate-float-in">
            <h3 className="text-xl font-bold mb-2">100% Gratis</h3>
            <p className="text-gray-300">Geen in-app aankopen, geen advertenties die je spel onderbreken. Gewoon echt gratis.</p>
          </div>
          <div className="p-8 border border-gray-100 rounded-3xl hover:border-gray-200 transition-colors animate-float-in">
            <h3 className="text-xl font-bold mb-2">Geen accounts</h3>
            <p className="text-gray-600">Geen gedoe met inloggen of e-mailadressen. Open de app en begin direct.</p>
          </div>
          <div className="p-8 border border-gray-100 rounded-3xl hover:border-gray-200 transition-colors animate-float-in">
            <h3 className="text-xl font-bold mb-2">Volledig Nederlands</h3>
            <p className="text-gray-600">Alle woorden en categorieën zijn zorgvuldig gekozen voor de Nederlandse taal.</p>
          </div>
          <div className="p-8 border border-gray-100 rounded-3xl hover:border-gray-200 transition-colors animate-float-in">
            <h3 className="text-xl font-bold mb-2">Perfect voor groepen</h3>
            <p className="text-gray-600">Ideaal voor feestjes, vakanties of gewoon een avondje op de bank.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="download" className="px-6 py-20 bg-black text-white text-center scroll-mt-16 animate-float-in">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Direct gratis spelen?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Download Meneer Wit nu en begin direct. Geen verborgen kosten, geen accounts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all active:scale-95"
            >
              Download voor iOS
            </a>
            <a 
              href="#" 
              className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all active:scale-95"
            >
              Download voor Android
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500 font-medium uppercase tracking-widest">
            Altijd Gratis • Geen Accounts • Direct Plezier
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t bg-black text-center">
        <p className="font-bold text-lg mb-2 text-gray-400">Meneer Wit - Door: Alex Lamper</p>
        <p className="text-gray-500 text-sm">
          Niet-commercieel, gemaakt voor plezier. &copy; 2024 Meneer Wit. Alle rechten voorbehouden.
        </p>
      </footer>
    </div>
  );
}
