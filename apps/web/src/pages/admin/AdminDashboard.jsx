
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, BookOpen, CheckCircle, Activity, Plus } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPrograms: 0,
    totalMissionsCompleted: 0,
    activeUsers: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [topPrograms, setTopPrograms] = useState([]);

  // Mock data for charts since we don't have full historical data in DB yet
  const userGrowthData = [
    { name: 'Week 1', users: 120 },
    { name: 'Week 2', users: 150 },
    { name: 'Week 3', users: 210 },
    { name: 'Week 4', users: 280 },
  ];

  const programEnrollmentData = [
    { name: 'AI Basics', value: 400 },
    { name: 'Business Strategy', value: 300 },
    { name: 'Creative AI', value: 300 },
    { name: 'Advanced Prompting', value: 200 },
  ];
  const COLORS = ['#14b8a6', '#f59e0b', '#3b82f6', '#8b5cf6'];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const [usersRes, programsRes, missionsRes] = await Promise.all([
        pb.collection('users').getList(1, 5, { sort: '-created', $autoCancel: false }),
        pb.collection('programs').getList(1, 5, { sort: '-enrollment_count', $autoCancel: false }),
        pb.collection('user_missions').getList(1, 1, { filter: 'status="completed"', $autoCancel: false })
      ]);

      setStats({
        totalUsers: usersRes.totalItems,
        totalPrograms: programsRes.totalItems,
        totalMissionsCompleted: missionsRes.totalItems,
        activeUsers: Math.floor(usersRes.totalItems * 0.4) // Mock active users
      });

      setRecentUsers(usersRes.items);
      setTopPrograms(programsRes.items);

    } catch (error) {
      console.error("Error fetching admin dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[400px] rounded-xl" />
          <Skeleton className="h-[400px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Learnfinity</title>
      </Helmet>

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[hsl(var(--admin-text))] tracking-tight">Dashboard Overview</h1>
            <p className="text-[hsl(var(--admin-muted))] mt-1">Welcome to the Learnfinity admin control center.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/admin/programs/new')} className="gap-2">
              <Plus className="w-4 h-4" /> New Program
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-[hsl(var(--admin-muted))]">Total Users</p>
                <h3 className="text-2xl font-bold text-[hsl(var(--admin-text))]">{stats.totalUsers}</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-[hsl(var(--admin-muted))]">Total Programs</p>
                <h3 className="text-2xl font-bold text-[hsl(var(--admin-text))]">{stats.totalPrograms}</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-[hsl(var(--admin-muted))]">Missions Completed</p>
                <h3 className="text-2xl font-bold text-[hsl(var(--admin-text))]">{stats.totalMissionsCompleted}</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-[hsl(var(--admin-muted))]">Active Users (7d)</p>
                <h3 className="text-2xl font-bold text-[hsl(var(--admin-text))]">{stats.activeUsers}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">User Growth (30 Days)</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--admin-border))" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--admin-muted))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--admin-muted))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--admin-card))', borderColor: 'hsl(var(--admin-border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--admin-text))' }}
                  />
                  <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Enrollment by Category</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={programEnrollmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {programEnrollmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--admin-card))', borderColor: 'hsl(var(--admin-border))', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Signups</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/users')}>View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[hsl(var(--admin-hover))] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                        {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[hsl(var(--admin-text))]">{user.name || 'Unknown'}</p>
                        <p className="text-xs text-[hsl(var(--admin-muted))]">{user.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-[hsl(var(--admin-muted))]">
                      {new Date(user.created).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Top Programs</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/programs')}>View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPrograms.map(program => (
                  <div key={program.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[hsl(var(--admin-hover))] transition-colors">
                    <div>
                      <p className="text-sm font-medium text-[hsl(var(--admin-text))]">{program.title}</p>
                      <p className="text-xs text-[hsl(var(--admin-muted))]">{program.category || 'General'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[hsl(var(--admin-text))]">{program.enrollment_count || 0}</p>
                      <p className="text-xs text-[hsl(var(--admin-muted))]">Enrollments</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
