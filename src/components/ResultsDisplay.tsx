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
  console.log(text);
  console.log(text.replace(/'/g, ''));
  const out_text = JSON.parse(text.replace(/'/g, ''));
  return (
    <div className="animate-fade-in">
      <div className="prose max-w-none">
        {text && (
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {out_text.text}
          </p>
        )}
        {out_text.image && (
          <img src={plotImage} alt="visualization" className="w-full h-auto" />
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;