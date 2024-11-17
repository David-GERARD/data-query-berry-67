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
  if (!text) return null;

  return (
    <Card className="p-6 animate-fade-in">
      <div className="prose max-w-none mb-6">
        <p className="text-gray-700">{text}</p>
      </div>
    </Card>
  );
};

export default ResultsDisplay;