/**
 * Component for handling user input queries and submitting them to the backend.
 * Provides feedback through toast notifications for success and error states.
 */
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

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
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-2">
        <Textarea
          placeholder="Ask a question about your EHR data..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-h-[100px] resize-none"
        />
      </div>

      <Button 
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Processing..." : "Ask Question"}
      </Button>
    </div>
  );
};

export default QueryInput;