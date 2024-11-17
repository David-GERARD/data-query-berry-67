/**
 * Component for displaying query results, including both text and visualizations.
 * Handles different types of result data with appropriate formatting.
 */
import { Card } from "@/components/ui/card";

interface ResultsDisplayProps {
  text?: string;
  image?: boolean;
}

const ResultsDisplay = ({ text, image }: ResultsDisplayProps) => {
  if (!text && !image) return null;

  return (
    <div className="animate-fade-in">
      <div className="prose max-w-none">
        {text && (
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {text}
          </p>
        )}
        {image && (
          <p className="text-medical-blue italic mt-4">
            Image visualization available
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;