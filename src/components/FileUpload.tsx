/**
 * Component for handling file uploads to the server.
 * Supports PDF file uploads with progress tracking and status notifications.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filesCount, setFilesCount] = useState(0);
  const { toast } = useToast();

 /**
   * Handles the submission of a query to the backend API.
   * Processes the response and updates the UI accordingly.
   */
  const handleSubmit = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query.trim())
      });

      if (!response.ok) throw new Error('Query failed');

      const data = await response.json();
      onSubmit(data);
    } catch (error) {
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
    <div className="space-y-4 w-full max-w-md">
      <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-lg">
        <Upload className="h-10 w-10 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 mb-4">Upload your EHR file (PDF format)</p>
        <Button asChild variant="secondary">
          <label className="cursor-pointer">
            Choose File
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </Button>
      </div>
      
      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-600 text-center">
            Uploading file...
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
