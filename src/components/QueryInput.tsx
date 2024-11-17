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
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <div className="space-y-4 p-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Ask a Question</h2>
          <Textarea
            placeholder="What would you like to know about your EHR data?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[120px] resize-none border-medical-blue/20 focus:border-medical-blue/40 bg-white/90"
          />
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-medical-blue to-medical-accent hover:opacity-90 transition-opacity"
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              Ask Question
              <SendHorizontal className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default QueryInput;