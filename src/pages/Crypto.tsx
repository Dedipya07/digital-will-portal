
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Bitcoin, Wallet, Plus, Trash2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Types
interface CryptoAsset {
  id: string;
  name: string;
  type: string;
  address: string;
  notes?: string;
}

const Crypto = () => {
  // Mock crypto assets - in a real app, this would come from an API
  const [assets, setAssets] = useState<CryptoAsset[]>([
    {
      id: '1',
      name: 'Bitcoin Wallet',
      type: 'Bitcoin',
      address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
      notes: 'Hardware wallet stored in safe'
    },
    {
      id: '2',
      name: 'Ethereum Investment',
      type: 'Ethereum',
      address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
    }
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: '',
    notes: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, type: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAsset: CryptoAsset = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.name,
      type: formData.type,
      address: formData.address,
      notes: formData.notes || undefined
    };
    
    setAssets(prev => [...prev, newAsset]);
    
    toast({
      title: "Asset added",
      description: `${formData.type} wallet has been added to your assets`
    });
    
    // Reset form and close dialog
    setFormData({
      name: '',
      type: '',
      address: '',
      notes: ''
    });
    setIsAddDialogOpen(false);
  };
  
  const handleDelete = (id: string) => {
    const assetToDelete = assets.find(asset => asset.id === id);
    
    if (assetToDelete) {
      setAssets(assets.filter(asset => asset.id !== id));
      
      toast({
        title: "Asset removed",
        description: `${assetToDelete.name} has been removed from your assets`
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Navbar />
      <main className="container pt-24 pb-16 page-transition">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Cryptocurrencies</h1>
            <p className="text-muted-foreground">
              Manage your digital assets and ensure they are passed on securely
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                <span>Add Asset</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Cryptocurrency Asset</DialogTitle>
                <DialogDescription>
                  Enter the details of your cryptocurrency wallet or exchange account
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Asset Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="My Bitcoin Wallet"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Asset Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={handleSelectChange}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select cryptocurrency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bitcoin">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="Ethereum">Ethereum (ETH)</SelectItem>
                        <SelectItem value="Binance Coin">Binance Coin (BNB)</SelectItem>
                        <SelectItem value="Solana">Solana (SOL)</SelectItem>
                        <SelectItem value="Cardano">Cardano (ADA)</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Wallet Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Enter public wallet address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Input
                      id="notes"
                      name="notes"
                      placeholder="Additional information about this asset"
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit">Add Asset</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        {assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-6 rounded-full bg-muted mb-4">
              <Bitcoin size={48} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No cryptocurrency assets</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Add your cryptocurrency wallets and exchange accounts to ensure they are passed on to your nominees
            </p>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Add Your First Asset</span>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assets.map((asset) => (
              <CryptoCard key={asset.id} asset={asset} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// Crypto Card component
const CryptoCard: React.FC<{
  asset: CryptoAsset;
  onDelete: (id: string) => void;
}> = ({ asset, onDelete }) => {
  const getCryptoIcon = (type: string) => {
    // In a real app, you would use specific icons for each cryptocurrency
    return <Bitcoin size={24} />;
  };
  
  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{asset.name}</CardTitle>
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {getCryptoIcon(asset.type)}
          </div>
        </div>
        <CardDescription>{asset.type}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Wallet Address</Label>
            <div className="flex items-center mt-1">
              <code className="bg-muted px-2 py-1 rounded text-xs font-mono flex-1 truncate">
                {asset.address}
              </code>
              <Button variant="ghost" size="icon" className="ml-1" title="View on explorer">
                <ExternalLink size={14} />
              </Button>
            </div>
          </div>
          
          {asset.notes && (
            <div>
              <Label className="text-sm text-muted-foreground">Notes</Label>
              <p className="text-sm mt-1">{asset.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t bg-muted/30 pt-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center text-muted-foreground text-sm">
            <Wallet size={14} className="mr-1" />
            Stored Securely
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 -mr-2"
            onClick={() => onDelete(asset.id)}
          >
            <Trash2 size={16} className="mr-1" />
            Remove
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Crypto;
