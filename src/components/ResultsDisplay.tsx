/**
 * Component for displaying query results, including both text and visualizations.
 * Handles different types of result data with appropriate formatting.
 */
import { Card } from "@/components/ui/card";

interface ResultsDisplayProps {
  text?: string;
  image?: boolean;
}
import plotImage from "../../../EF_Hackathon/src/data/plot.png";

const ResultsDisplay = ({ text, image }: ResultsDisplayProps) => {
  if (!text && !image) return null;
  
  const out_text = JSON.parse(text!.replace(/'/g, ''));
  
  return (
    <div className="animate-fade-in space-y-6">
      <div className="prose max-w-none">
        {text && (
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed font-light text-lg">
            {out_text.text}
          </p>
        )}
        {out_text.image && (
          <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={plotImage} 
              alt="visualization" 
              className="w-full h-auto transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;