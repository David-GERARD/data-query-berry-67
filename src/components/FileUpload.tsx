import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Upload, Sparkles } from "lucide-react";
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

      await response.json();
      
      toast({
        title: "Success!",
        description: "Your file has been uploaded successfully",
        className: "bg-gradient-to-r from-medical-blue/90 to-medical-accent/90 text-white border-none",
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
    <Card className="backdrop-blur-xl bg-white/80 rounded-3xl border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex justify-center items-center w-full">
        <div className="space-y-8 w-full max-w-2xl p-12">
          <div className="flex flex-col items-center p-12 border-2 border-dashed border-medical-blue/10 rounded-2xl bg-gradient-to-b from-medical-light/20 to-white/30 hover:from-medical-light/30 hover:to-white/40 transition-all duration-500 group">
            <div className="relative">
              <Upload className="h-16 w-16 text-medical-blue/60 mb-8 animate-fade-in group-hover:scale-110 transition-transform duration-500" />
              <Sparkles className="absolute -right-2 -top-2 w-6 h-6 text-medical-accent/70 animate-pulse" />
            </div>
            <p className="text-lg text-gray-600 mb-8 text-center font-light tracking-wide">
              Upload your EHR data file
            </p>
            <Button 
              variant="outline" 
              className="bg-white/60 hover:bg-white border-medical-blue/5 hover:border-medical-blue/20 text-medical-blue hover:text-medical-dark transition-all duration-300 shadow-sm hover:shadow-md rounded-xl py-6 px-8"
              asChild
            >
              <label className="cursor-pointer flex items-center gap-3">
                <span>Select File</span>
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
            <div className="space-y-4 animate-fade-in">
              <Progress value={progress} className="h-2 bg-medical-light/30" />
              <p className="text-sm text-gray-500 text-center font-light">
                Uploading your file...
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FileUpload;