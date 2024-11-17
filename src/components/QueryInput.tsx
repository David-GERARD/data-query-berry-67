/**
 * Component for handling user input queries and submitting them to the backend.
 * Provides feedback through toast notifications for success and error states.
 */
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { SendHorizontal } from "lucide-react";

interface QueryInputProps {
  onSubmit: (data: { text?: string; image?: boolean }) => void;
}

const QueryInput = ({ onSubmit }: QueryInputProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: query.trim()
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const responseText = await response.text();
      console.log('Raw response:', responseText); // Debug log

      let data;
      try {
        // First, try to parse the response as JSON
        data = JSON.parse(responseText);
        console.log('Parsed JSON data:', data); // Debug log
      } catch (e) {
        // If parsing fails, treat the entire response as text
        console.log('Failed to parse JSON, using raw text');
        data = { text: responseText };
      }

      // If data.text is a string that looks like JSON, try to parse it again
      if (typeof data.text === 'string' && data.text.startsWith('{')) {
        try {
          const parsedText = JSON.parse(data.text);
          data.text = parsedText.text || parsedText.output || data.text;
        } catch (e) {
          console.log('Failed to parse nested JSON');
        }
      }

      onSubmit({
        text: data.text || data.output || 'No response text available',
        image: data.image || false
      });

      setQuery(''); // Clear the input after successful submission
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process query. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl border-0">
      <div className="space-y-6 p-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ask a Question</h2>
          <Textarea
            placeholder="What would you like to know about your EHR data?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[140px] resize-none border-medical-blue/10 focus:border-medical-blue/30 bg-white/80 rounded-xl text-base placeholder:text-gray-400 transition-all duration-300 focus:shadow-inner"
          />
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-medical-blue via-medical-accent to-indigo-600 hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg text-base py-6 rounded-xl"
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              Ask Question
              <SendHorizontal className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default QueryInput;