/**
 * Component for handling file uploads to the server.
 * Supports PDF file uploads with progress tracking and status notifications.
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filesCount, setFilesCount] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    setUploading(true);
    setFilesCount(files.length);
    
    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      
      toast({
        title: "Success!",
        description: `Successfully uploaded file`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload file. Please try again.",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
      <div className="flex justify-center items-center w-full">
        <div className="space-y-4 w-full max-w-md p-8">
          <div className="flex flex-col items-center p-8 border-2 border-dashed border-medical-blue/30 rounded-lg bg-medical-light/50 hover:bg-medical-light/70 transition-colors">
            <Upload className="h-12 w-12 text-medical-blue mb-4" />
            <p className="text-sm text-gray-600 mb-6 text-center">Upload your EHR file (PDF format)</p>
            <Button 
              variant="outline" 
              className="bg-white hover:bg-medical-light border-medical-blue/20 text-medical-blue hover:text-medical-dark transition-colors"
              asChild
            >
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
      </div>
    </Card>
  );
};

export default FileUpload;