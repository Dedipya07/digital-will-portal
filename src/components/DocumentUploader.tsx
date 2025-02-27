
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Camera, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentUploaderProps {
  onUploadComplete: (document: { id: string; name: string; type: string; date: Date }) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onUploadComplete }) => {
  const [documentName, setDocumentName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const { toast } = useToast();
  
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!documentName.trim()) {
      toast({
        title: "Error",
        description: "Please provide a document name",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      const newDocument = {
        id: Math.random().toString(36).substring(2, 9),
        name: documentName,
        type: activeTab === 'upload' ? 'File Upload' : 'Scan',
        date: new Date()
      };
      
      onUploadComplete(newDocument);
      
      toast({
        title: "Success",
        description: `Document "${documentName}" has been ${activeTab === 'upload' ? 'uploaded' : 'scanned'} successfully`
      });
      
      setDocumentName('');
      setIsUploading(false);
    }, 1500);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <Card className="glass-panel w-full max-w-md animate-fade-in">
      <CardHeader>
        <CardTitle>Add Document</CardTitle>
        <CardDescription>
          Upload or scan a document to add to your Digital Will
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="upload" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload File</TabsTrigger>
          <TabsTrigger value="scan">Scan Document</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleUpload}>
          <TabsContent value="upload">
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="documentName">Document Name</Label>
                <Input
                  id="documentName"
                  placeholder="Enter a name for your document"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  required
                />
              </div>
              
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-2">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Upload size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Drag files here or click to upload</p>
                  <p className="text-xs text-muted-foreground">
                    Support for PDF, JPG, PNG documents
                  </p>
                </div>
                <Input
                  id="fileUpload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('fileUpload')?.click()}
                >
                  Select File
                </Button>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="scan">
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="scanName">Document Name</Label>
                <Input
                  id="scanName"
                  placeholder="Enter a name for your scan"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  required
                />
              </div>
              
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-2">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Camera size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Use camera to scan document</p>
                  <p className="text-xs text-muted-foreground">
                    Position your document in good lighting
                  </p>
                </div>
                <Button type="button" variant="outline">
                  Open Camera
                </Button>
              </div>
            </CardContent>
          </TabsContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full flex items-center space-x-2" 
              disabled={isUploading || !documentName.trim()}
            >
              {isUploading ? (
                <>Processing...</>
              ) : (
                <>
                  <FileText size={16} />
                  <span>{activeTab === 'upload' ? 'Upload' : 'Scan'} Document</span>
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Tabs>
    </Card>
  );
};

export default DocumentUploader;
