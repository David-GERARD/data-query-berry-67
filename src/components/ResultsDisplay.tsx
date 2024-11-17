import { Card } from "@/components/ui/card";

interface ResultsDisplayProps {
  text?: string;
  image?: boolean;
}

const ResultsDisplay = ({ text, image }: ResultsDisplayProps) => {
  if (!text && !image) return null;
  
  const out_text = JSON.parse(text!.replace(/'/g, ''));
  
  return (
    <div className="animate-fade-in space-y-8">
      <div className="prose max-w-none">
        {text && (
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed font-light text-lg tracking-wide">
            {out_text.text}
          </p>
        )}
        {out_text.image && (
          <Card className="mt-10 rounded-2xl overflow-hidden shadow-lg border-0 bg-white/60">
            <img 
              src="/plot-placeholder.png"
              alt="visualization" 
              className="w-full h-auto transform hover:scale-[1.02] transition-transform duration-500"
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;