/**
 * Component for displaying query results, including both text and visualizations.
 * Handles different types of result data with appropriate formatting.
 */
import { Card } from "@/components/ui/card";

interface ResultsDisplayProps {
  text?: string;
  visualization?: any;
}

const ResultsDisplay = ({ text, visualization }: ResultsDisplayProps) => {
  if (!text && !visualization) return null;

  return (
    <Card className="p-6 animate-fade-in">
      {text && (
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700">{text}</p>
        </div>
      )}
      
      {visualization && (
        <div className="mt-4">
          <img 
            src={`data:image/png;base64,${visualization}`} 
            alt="Data visualization"
            className="max-w-full h-auto"
          />
        </div>
      )}
    </Card>
  );
};

export default ResultsDisplay;