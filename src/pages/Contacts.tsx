
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
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar';
import {
  Briefcase,
  Edit,
  Mail,
  Phone as PhoneIcon,
  Plus,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  company?: string;
}

const Contacts = () => {
  // Mock contacts - in a real app, this would come from an API
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Robert Smith',
      email: 'robert.smith@law.com',
      phone: '+1 (555) 234-5678',
      type: 'Attorney',
      company: 'Smith & Associates'
    },
    {
      id: '2',
      name: 'Jessica Taylor',
      email: 'jessica.taylor@finance.com',
      phone: '+1 (555) 345-6789',
      type: 'Financial Advisor',
      company: 'Taylor Financial Group'
    },
    {
      id: '3',
      name: 'Michael Davis',
      email: 'michael.davis@tax.com',
      phone: '+1 (555) 456-7890',
      type: 'Accountant',
      company: 'Davis Tax Services'
    },
    {
      id: '4',
      name: 'Emily Wilson',
      email: 'emily.wilson@insurance.com',
      phone: '+1 (555) 567-8901',
      type: 'Insurance Agent',
      company: 'Wilson Insurance'
    }
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    company: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newContact: Contact = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      type: formData.type,
      company: formData.company || undefined
    };
    
    setContacts(prev => [...prev, newContact]);
    
    toast({
      title: "Contact added",
      description: `${formData.name} has been added to your contacts`
    });
    
    // Reset form and close dialog
    setFormData({
      name: '',
      email: '',
      phone: '',
      type: '',
      company: ''
    });
    setIsAddDialogOpen(false);
  };
  
  const handleDelete = (id: string) => {
    const contactToDelete = contacts.find(contact => contact.id === id);
    
    if (contactToDelete) {
      setContacts(contacts.filter(contact => contact.id !== id));
      
      toast({
        title: "Contact removed",
        description: `${contactToDelete.name} has been removed from your contacts`
      });
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Navbar />
      <main className="container pt-24 pb-16 page-transition">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Contacts</h1>
            <p className="text-muted-foreground">
              Manage important contacts related to your digital will and estate
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                <span>Add Contact</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Contact</DialogTitle>
                <DialogDescription>
                  Add a professional contact associated with your estate
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
                    <Label htmlFor="type">Role/Type</Label>
                    <Input
                      id="type"
                      name="type"
                      placeholder="Attorney, Accountant, Financial Advisor, etc."
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Company or organization name"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit">Add Contact</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <Card key={contact.id} className="card-hover">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                      <AvatarImage src="" alt={contact.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(contact.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base font-medium">{contact.name}</CardTitle>
                      <CardDescription>{contact.type}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Edit size={16} />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pb-3 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={16} className="text-muted-foreground" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <PhoneIcon size={16} className="text-muted-foreground" />
                  <span>{contact.phone}</span>
                </div>
                {contact.company && (
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase size={16} className="text-muted-foreground" />
                    <span>{contact.company}</span>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="pt-3 border-t">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 ml-auto"
                  onClick={() => handleDelete(contact.id)}
                >
                  <Trash2 size={16} className="mr-1" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {contacts.length === 0 && (
            <div className="lg:col-span-3 flex flex-col items-center justify-center py-16 text-center">
              <div className="p-6 rounded-full bg-muted mb-4">
                <PhoneIcon size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No contacts yet</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Add important contacts like attorneys, financial advisors, and accountants related to your estate
              </p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                <span>Add Your First Contact</span>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Contacts;
