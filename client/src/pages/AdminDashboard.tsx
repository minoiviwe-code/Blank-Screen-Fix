import React from 'react';
import { Card, Badge } from '@/components/PremiumUI';
import { Users, AlertTriangle, ShieldCheck } from 'lucide-react';
import { usePools } from '@/hooks/use-pools';

const AdminDashboard: React.FC = () => {
  const { data: pools } = usePools();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold">Admin Governance</h1>
        <p className="text-muted-foreground mt-2">Platform oversight and risk management panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-l-blue-500">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-muted-foreground">Total Users</h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold">1,248</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-green-500">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-muted-foreground">Verified Nodes</h3>
            <ShieldCheck className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold">1,092</p>
        </Card>
        <Card className="p-6 border-l-4 border-l-red-500">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-muted-foreground">Flagged Accounts</h3>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold">3</p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b border-border/50 bg-muted/10">
          <h2 className="text-xl font-bold">Platform Pools Directory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-semibold">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Currency</th>
                <th className="px-6 py-4">Target</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {pools?.map(pool => (
                <tr key={pool.id} className="hover:bg-muted/20">
                  <td className="px-6 py-4 font-mono text-muted-foreground">#{pool.id}</td>
                  <td className="px-6 py-4 font-medium">{pool.name}</td>
                  <td className="px-6 py-4"><Badge variant="outline">{pool.currency}</Badge></td>
                  <td className="px-6 py-4 font-bold">{pool.targetAmount}</td>
                  <td className="px-6 py-4"><Badge variant="success">Active</Badge></td>
                </tr>
              ))}
              {(!pools || pools.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No pools registered on the network.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
