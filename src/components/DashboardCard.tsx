
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  linkText: string;
  count?: number;
  gradient?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  linkTo,
  linkText,
  count,
  gradient = 'from-primary/20 to-primary/5'
}) => {
  return (
    <Card className={`overflow-hidden card-hover border bg-gradient-to-br ${gradient}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-primary">
            {icon}
          </div>
        </div>
        {count !== undefined && (
          <Badge variant="outline" className="ml-auto">
            {count} {count === 1 ? 'item' : 'items'}
          </Badge>
        )}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        {/* Card content goes here if needed */}
      </CardContent>
      <CardFooter className="pt-4">
        <Button asChild variant="outline" className="w-full">
          <Link to={linkTo}>{linkText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
