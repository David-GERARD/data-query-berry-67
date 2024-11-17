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
  image?: boolean;
}

const Index = () => {
  const [result, setResult] = useState<QueryResult | null>(null);

  const handleQueryResult = (data: QueryResult) => {
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-medical-blue to-medical-accent">
          EHR Data Analysis Dashboard
        </h1>
        <p className="text-gray-600 text-center mb-12">Upload your EHR data and ask questions to gain insights</p>
        
        <div className="space-y-8">
          <div className="transform hover:scale-[1.01] transition-transform duration-200">
            <FileUpload />
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="transform hover:scale-[1.01] transition-transform duration-200">
              <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Query Results</h2>
                {result ? (
                  <ResultsDisplay
                    text={result.text}
                    image={result.image}
                  />
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No queries have been made yet. Use the form below to ask questions about your EHR data.
                  </p>
                )}
              </Card>
            </div>

            <div className="transform hover:scale-[1.01] transition-transform duration-200">
              <QueryInput onSubmit={handleQueryResult} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;