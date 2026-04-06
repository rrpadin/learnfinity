
import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { WorkflowService } from '@/lib/WorkflowService.js';

export function WorkflowExecutionHistory({ workflowId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = useCallback(async () => {
    if (!workflowId) return;
    setLoading(true);
    try {
      const result = await WorkflowService.getWorkflowExecutionHistory(workflowId, { page, perPage: 10 });
      setHistory(result.items);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to fetch execution history", error);
    } finally {
      setLoading(false);
    }
  }, [workflowId, page]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const getStatusBadge = (status) => {
    const config = {
      pending: { className: 'bg-slate-500/15 text-slate-700' },
      running: { className: 'bg-amber-500/15 text-amber-700' },
      completed: { className: 'bg-emerald-500/15 text-emerald-700' },
      failed: { className: 'bg-destructive/15 text-destructive' }
    };
    const c = config[status] || config.pending;
    return <Badge variant="secondary" className={`capitalize ${c.className}`}>{status}</Badge>;
  };

  if (loading) {
    return <Skeleton className="h-64 w-full rounded-md" />;
  }

  if (history.length === 0) {
    return (
      <div className="border rounded-md p-8 text-center bg-card">
        <p className="text-muted-foreground">No execution history found for this workflow.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-md bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Execution Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Error Message</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((record) => {
              const start = new Date(record.started_at);
              const end = record.completed_at ? new Date(record.completed_at) : new Date();
              const durationSecs = Math.max(0, Math.round((end - start) / 1000));

              return (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    {format(start, 'MMM d, yyyy h:mm:ss a')}
                  </TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>{durationSecs}s</TableCell>
                  <TableCell className="text-destructive text-sm max-w-[200px] truncate">
                    {record.error_message || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}
