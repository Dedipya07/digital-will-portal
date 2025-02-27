
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import DashboardCard from '@/components/DashboardCard';
import { File, Bitcoin, Users, Phone, Lock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data - in a real app, this would come from an API
  const stats = {
    documents: 3,
    cryptocurrencies: 2,
    nominees: 1,
    contacts: 4
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Navbar />
      <main className="container pt-24 pb-16 page-transition">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome, {user.name}</h1>
          <p className="text-muted-foreground">
            Manage your digital assets and ensure they're passed on according to your wishes
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-6">Your Digital Estate</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Documents"
              description="Store important documents securely"
              icon={<File size={24} />}
              linkTo="/documents"
              linkText="Manage Documents"
              count={stats.documents}
              gradient="from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10"
            />
            <DashboardCard
              title="Cryptocurrencies"
              description="Track and manage your digital assets"
              icon={<Bitcoin size={24} />}
              linkTo="/crypto"
              linkText="Manage Cryptocurrencies"
              count={stats.cryptocurrencies}
              gradient="from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10"
            />
            <DashboardCard
              title="Nominees"
              description="Designate beneficiaries for your assets"
              icon={<Users size={24} />}
              linkTo="/nominees"
              linkText="Manage Nominees"
              count={stats.nominees}
              gradient="from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10"
            />
            <DashboardCard
              title="Contacts"
              description="Important contacts for your estate"
              icon={<Phone size={24} />}
              linkTo="/contacts"
              linkText="Manage Contacts"
              count={stats.contacts}
              gradient="from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10"
            />
          </div>
        </section>

        <section>
          <div className="bg-primary/5 border rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Estate Security</h3>
              <p className="text-muted-foreground mb-4">
                Your digital will is secured with end-to-end encryption. Only you and your designated nominees can access your information.
              </p>
            </div>
            <div className="flex items-center justify-center p-4 rounded-full bg-primary/10">
              <Lock size={32} className="text-primary" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
