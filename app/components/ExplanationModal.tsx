import { useState } from "react";

interface ExplanationModalProps {
  onClose: () => void;
  playSound: (type: 'click' | 'win' | 'lose') => void;
}

export default function ExplanationModal({ onClose, playSound }: ExplanationModalProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welkom bij Meneer Wit",
      content: (
        <div className="space-y-4 text-center">
          <div className="text-6xl mb-4">🕵️</div>
          <p>
            Meneer Wit is een spel van misleiding en deductie.
            Er zijn <strong>Burgers</strong>, <strong>Undercovers</strong> en één <strong>Mister White</strong>.
          </p>
        </div>
      ),
    },
    {
      title: "De Rollen",
      content: (
        <div className="space-y-4">
          <div className="bg-secondary p-3 rounded-xl">
            <p className="font-bold">🍔 Burgers</p>
            <p className="text-sm text-muted-foreground">Krijgen het geheime woord. (bijv. &quot;Koffie&quot;)</p>
          </div>
          <div className="bg-secondary p-3 rounded-xl">
            <p className="font-bold">🕵️ Undercovers</p>
            <p className="text-sm text-muted-foreground">Krijgen een woord dat erop lijkt. (bijv. &quot;Thee&quot;)</p>
          </div>
          <div className="bg-secondary p-3 rounded-xl">
            <p className="font-bold">⚪ Mister White</p>
            <p className="text-sm text-muted-foreground">Krijgt <strong>geen</strong> woord.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Het Spelverloop",
      content: (
        <div className="space-y-4 text-sm">
          <p>1. Iedereen bekijkt zijn geheime woord.</p>
          <p>2. Om de beurt noemt iedereen één woord dat met hun geheime woord te maken heeft.</p>
          <p>3. <strong>Mister White</strong> moet proberen niet op te vallen en tegelijkertijd het woord van de Burgers raden.</p>
        </div>
      ),
    },
    {
      title: "De Stemming",
      content: (
        <div className="space-y-4 text-center">
          <div className="text-6xl mb-4">🗳️</div>
          <p>
            Na de ronde stemt iedereen op wie ze denken dat <strong>Mister White</strong> of een <strong>Undercover</strong> is.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Als Mister White wordt betrapt, krijgt hij nog één kans om het woord van de Burgers te raden en alsnog te winnen!
          </p>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    playSound('click');
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    playSound('click');
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-card text-card-foreground rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl border border-border flex flex-col min-h-[400px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black">{steps[step].title}</h2>
          <button onClick={() => { playSound('click'); onClose(); }} className="w-8 h-8 flex items-center justify-center bg-secondary rounded-full hover:bg-secondary/80 transition-colors">✕</button>
        </div>

        <div className="flex-grow flex flex-col justify-center">
          {steps[step].content}
        </div>

        <div className="mt-8">
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-colors ${i === step ? "bg-primary" : "bg-secondary"}`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {step > 0 && (
              <button 
                onClick={handleBack}
                className="flex-1 py-3 bg-secondary text-secondary-foreground rounded-xl font-bold active:scale-95 transition-all"
              >
                Vorige
              </button>
            )}
            <button 
              onClick={handleNext}
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold active:scale-95 transition-all shadow-lg"
            >
              {step === steps.length - 1 ? "Begrepen!" : "Volgende"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
