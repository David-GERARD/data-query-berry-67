/**
 * Main page component that integrates file upload, query input, and results display.
 * Manages the overall layout and state of the EHR data analysis dashboard.
 */
import { useState } from 'react';
import QueryInput from '../components/QueryInput';
import FileUpload from '../components/FileUpload';
import ResultsDisplay from '../components/ResultsDisplay';
import { Card } from "@/components/ui/card";

interface QueryResult {
  text?: string;
  visualization?: any;
}

const Index = () => {
  const [result, setResult] = useState<QueryResult | null>(null);

  /**
   * Handles the results from a query submission.
   * @param data - The query result data containing text and/or visualization
   */
  const handleQueryResult = (data: QueryResult) => {
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          EHR Data Analysis Dashboard
        </h1>
        
        <div className="space-y-8">
          <FileUpload />
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Query Results</h2>
            {result ? (
              <ResultsDisplay
                text={result.text}
                visualization={result.visualization}
              />
            ) : (
              <p className="text-gray-500 text-center py-8">
                No queries have been made yet. Use the form below to ask questions about your EHR data.
              </p>
            )}
          </Card>

          <QueryInput onSubmit={handleQueryResult} />
        </div>
      </div>
    </div>
  );
};

export default Index;