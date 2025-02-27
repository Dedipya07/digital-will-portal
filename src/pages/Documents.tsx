
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import DocumentUploader from '@/components/DocumentUploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { File, FileText, FilePlus, Clock, Download, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Document type
interface Document {
  id: string;
  name: string;
  type: string;
  date: Date;
}

const Documents = () => {
  // Mock initial documents - in a real app, this would come from an API
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Last Will and Testament',
      type: 'File Upload',
      date: new Date(2023, 5, 15)
    },
    {
      id: '2',
      name: 'Property Deed',
      type: 'Scan',
      date: new Date(2023, 6, 22)
    },
    {
      id: '3',
      name: 'Insurance Policy',
      type: 'File Upload',
      date: new Date(2023, 8, 7)
    }
  ]);
  
  const [showUploader, setShowUploader] = useState(false);
  const { toast } = useToast();

  const handleUploadComplete = (document: Document) => {
    setDocuments([document, ...documents]);
    setShowUploader(false);
  };

  const handleDeleteDocument = (id: string) => {
    const documentToDelete = documents.find(doc => doc.id === id);
    
    if (documentToDelete) {
      setDocuments(documents.filter(doc => doc.id !== id));
      
      toast({
        title: "Document deleted",
        description: `"${documentToDelete.name}" has been removed`
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Navbar />
      <main className="container pt-24 pb-16 page-transition">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Documents</h1>
            <p className="text-muted-foreground">
              Store and manage important documents for your digital will
            </p>
          </div>
          
          <Dialog open={showUploader} onOpenChange={setShowUploader}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <FilePlus size={16} />
                <span>Add Document</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DocumentUploader onUploadComplete={handleUploadComplete} />
            </DialogContent>
          </Dialog>
        </div>

        <Card className="glass-panel">
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3 mb-2">
              <TabsTrigger value="all">All Documents</TabsTrigger>
              <TabsTrigger value="uploaded">Uploaded</TabsTrigger>
              <TabsTrigger value="scanned">Scanned</TabsTrigger>
            </TabsList>
            
            <CardContent className="p-0">
              <TabsContent value="all" className="m-0">
                <DocumentsTable 
                  documents={documents} 
                  onDelete={handleDeleteDocument} 
                />
              </TabsContent>
              
              <TabsContent value="uploaded" className="m-0">
                <DocumentsTable 
                  documents={documents.filter(doc => doc.type === 'File Upload')} 
                  onDelete={handleDeleteDocument} 
                />
              </TabsContent>
              
              <TabsContent value="scanned" className="m-0">
                <DocumentsTable 
                  documents={documents.filter(doc => doc.type === 'Scan')} 
                  onDelete={handleDeleteDocument} 
                />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

// Documents table component
const DocumentsTable: React.FC<{
  documents: Document[];
  onDelete: (id: string) => void;
}> = ({ documents, onDelete }) => {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-4 rounded-full bg-muted mb-4">
          <FileText size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-1">No documents found</h3>
        <p className="text-muted-foreground">
          Add documents by uploading files or scanning documents
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Document</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.id} className="transition-colors hover:bg-muted/30">
            <TableCell className="font-medium flex items-center gap-2">
              <File size={16} className="text-primary" />
              {doc.name}
            </TableCell>
            <TableCell>{doc.type}</TableCell>
            <TableCell className="flex items-center gap-2">
              <Clock size={16} className="text-muted-foreground" />
              {format(doc.date, 'MMM d, yyyy')}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" title="Download">
                  <Download size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10" 
                  title="Delete"
                  onClick={() => onDelete(doc.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Documents;
