interface RulesModalProps {
  onClose: () => void;
  playSound: (type: 'click' | 'win' | 'lose') => void;
}

export default function RulesModal({ onClose, playSound }: RulesModalProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in pt-24 sm:pt-4">
      <div className="bg-card text-card-foreground rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-border flex flex-col">
        <div className="flex justify-between items-center mb-4 sm:mb-6 shrink-0">
          <h2 className="text-2xl sm:text-3xl font-black">Spelregels</h2>
          <button onClick={() => { playSound('click'); onClose(); }} className="w-8 h-8 flex items-center justify-center bg-secondary rounded-full hover:bg-secondary/80 transition-colors">✕</button>
        </div>
        <div className="space-y-4 sm:space-y-6 text-left overflow-y-auto pr-1">
          <section>
            <h3 className="font-bold text-foreground uppercase tracking-wider text-xs mb-2">De Rollen</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="p-3 sm:p-4 bg-secondary rounded-2xl">
                <p className="font-bold text-sm">🍔 Burgers</p>
                <p className="text-xs text-muted-foreground">Krijgen het geheime woord. Moeten de indringers vinden.</p>
              </div>
              <div className="p-3 sm:p-4 bg-secondary rounded-2xl">
                <p className="font-bold text-sm">🕵️ Undercovers</p>
                <p className="text-xs text-muted-foreground">Krijgen een woord dat lijkt op dat van de burgers. Moeten onopgemerkt blijven.</p>
              </div>
              <div className="p-3 sm:p-4 bg-secondary rounded-2xl">
                <p className="font-bold text-sm">⚪ Mister White</p>
                <p className="text-xs text-muted-foreground">Krijgt geen woord. Moet het woord van de burgers raden door goed te luisteren.</p>
              </div>
            </div>
          </section>
          <section>
            <h3 className="font-bold text-foreground uppercase tracking-wider text-xs mb-2">Het Verloop</h3>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1 sm:space-y-2 ml-1">
              <li>Iedereen bekijkt in het geheim zijn kaart.</li>
              <li>Om de beurt geeft iedereen één woord als hint.</li>
              <li>Na een ronde wordt er gestemd wie eruit moet.</li>
              <li>Mister White mag het woord raden als hij wordt ontmaskerd.</li>
            </ol>
          </section>
        </div>
        <button 
          onClick={() => { playSound('click'); onClose(); }}
          className="mt-6 sm:mt-8 w-full py-3 sm:py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg active:scale-95 hover:scale-[1.02] transition-all shrink-0"
        >
          Begrepen!
        </button>
      </div>
    </div>
  );
}
