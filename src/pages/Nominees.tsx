
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  CheckCircle, 
  Clock, 
  Mail, 
  Phone as PhoneIcon, 
  Plus, 
  Trash2, 
  User, 
  Users 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Nominee {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  status: 'pending' | 'confirmed';
}

const Nominees = () => {
  // Mock nominees - in a real app, this would come from an API
  const [nominees, setNominees] = useState<Nominee[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      relationship: 'Daughter',
      status: 'confirmed'
    }
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newNominee: Nominee = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      relationship: formData.relationship,
      status: 'pending'
    };
    
    setNominees(prev => [...prev, newNominee]);
    
    toast({
      title: "Nominee added",
      description: `${formData.name} has been added as a nominee`
    });
    
    // Reset form and close dialog
    setFormData({
      name: '',
      email: '',
      phone: '',
      relationship: ''
    });
    setIsAddDialogOpen(false);
  };
  
  const handleDelete = (id: string) => {
    const nomineeToDelete = nominees.find(nominee => nominee.id === id);
    
    if (nomineeToDelete) {
      setNominees(nominees.filter(nominee => nominee.id !== id));
      
      toast({
        title: "Nominee removed",
        description: `${nomineeToDelete.name} has been removed from your nominees`
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Navbar />
      <main className="container pt-24 pb-16 page-transition">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Nominees</h1>
            <p className="text-muted-foreground">
              Designate trusted individuals who will inherit your digital assets
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                <span>Add Nominee</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Nominee</DialogTitle>
                <DialogDescription>
                  Add a trusted individual who will have access to your digital will
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input
                      id="relationship"
                      name="relationship"
                      placeholder="Spouse, Child, Friend, etc."
                      value={formData.relationship}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit">Add Nominee</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card className="glass-panel">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Users size={20} className="text-primary" />
              Your Nominees
            </CardTitle>
            <CardDescription>
              These individuals will have access to your digital will and assets according to your instructions
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {nominees.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <User size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No nominees added yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add trusted individuals who will inherit your digital assets
                </p>
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  <span>Add Your First Nominee</span>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name & Relationship</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nominees.map((nominee) => (
                    <TableRow key={nominee.id} className="transition-colors hover:bg-muted/30">
                      <TableCell>
                        <div className="font-medium">{nominee.name}</div>
                        <div className="text-sm text-muted-foreground">{nominee.relationship}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Mail size={14} className="text-muted-foreground" />
                          {nominee.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <PhoneIcon size={14} className="text-muted-foreground" />
                          {nominee.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        {nominee.status === 'confirmed' ? (
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-500">
                            <CheckCircle size={16} />
                            <span>Confirmed</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-500">
                            <Clock size={16} />
                            <span>Pending</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                          onClick={() => handleDelete(nominee.id)}
                        >
                          <Trash2 size={16} className="mr-1" />
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Nominees;
