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
    <Card className="p-6 animate-fade-in">
      <div className="prose max-w-none">
        <p className="text-gray-700 mb-2">Data received</p>
        {text && <p className="text-gray-700 whitespace-pre-wrap">{text}</p>}
        {image && <p className="text-gray-500">Image visualization available</p>}
      </div>
    </Card>
  );
};

export default ResultsDisplay;