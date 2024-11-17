/**
 * Main page component that integrates file upload, query input, and results display.
 * Manages the overall layout and state of the EHR data analysis dashboard.
 */
import { useState } from 'react';
import QueryInput from '../components/QueryInput';
import FileUpload from '../components/FileUpload';
import ResultsDisplay from '../components/ResultsDisplay';

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
        
        <div className="grid gap-8 md:grid-cols-[1fr_auto]">
          <div className="space-y-6">
            <FileUpload />
            <QueryInput onSubmit={handleQueryResult} />
            {result && (
              <ResultsDisplay
                text={result.text}
                visualization={result.visualization}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;