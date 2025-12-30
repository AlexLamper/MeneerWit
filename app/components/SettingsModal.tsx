interface SettingsModalProps {
  onClose: () => void;
  settings: {
    soundEffects: boolean;
    misterWhiteStarts: boolean;
  };
  onSettingsChange: (newSettings: { soundEffects: boolean; misterWhiteStarts: boolean }) => void;
  playSound: (type: 'click' | 'win' | 'lose') => void;
}

export default function SettingsModal({ onClose, settings, onSettingsChange, playSound }: SettingsModalProps) {
  const toggleSetting = (key: keyof typeof settings) => {
    playSound('click');
    onSettingsChange({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-card text-card-foreground rounded-4xl sm:rounded-[2.5rem] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-border">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black">Instellingen</h2>
          <button onClick={() => { playSound('click'); onClose(); }} className="w-8 h-8 flex items-center justify-center bg-secondary rounded-full hover:bg-secondary/80 transition-colors">✕</button>
        </div>
        <div className="space-y-6">
          <div 
            onClick={() => toggleSetting("soundEffects")}
            className="flex items-center justify-between p-4 bg-secondary rounded-2xl hover:bg-secondary/80 transition-colors cursor-pointer"
          >
            <span className="font-bold">Geluidseffecten</span>
            <div className={`w-12 h-6 rounded-full relative transition-colors ${settings.soundEffects ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-background rounded-full shadow-sm transition-all ${settings.soundEffects ? 'right-1' : 'left-1'}`} />
            </div>
          </div>

          <div 
            onClick={() => toggleSetting("misterWhiteStarts")}
            className="flex items-center justify-between p-4 bg-secondary rounded-2xl hover:bg-secondary/80 transition-colors cursor-pointer"
          >
            <div>
              <div className="font-bold">Mister White begint</div>
              <div className="text-xs text-muted-foreground">Mister White start met raden</div>
            </div>
            <div className={`w-12 h-6 rounded-full relative transition-colors ${settings.misterWhiteStarts ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-background rounded-full shadow-sm transition-all ${settings.misterWhiteStarts ? 'right-1' : 'left-1'}`} />
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest font-bold">Versie 1.0.0 • Meneer Wit - Door Alex Lamper</p>
        </div>
        <button 
          onClick={onClose}
          className="mt-8 w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg active:scale-95 hover:scale-[1.02] transition-all"
        >
          Opslaan
        </button>
      </div>
    </div>
  );
}
