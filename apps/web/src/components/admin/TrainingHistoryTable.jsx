
import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AIManagementService } from '@/lib/AIManagementService.js';
import { TrainingStatusBadge } from './TrainingStatusBadge.jsx';

export function TrainingHistoryTable({ organizationId, refreshTrigger }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = useCallback(async () => {
    if (!organizationId) return;
    setLoading(true);
    try {
      const result = await AIManagementService.getAITrainingHistory(organizationId, page, 10);
      setHistory(result.items);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to fetch training history", error);
    } finally {
      setLoading(false);
    }
  }, [organizationId, page, refreshTrigger]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (loading) {
    return (
      <div className="border rounded-md bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Training Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data Points</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-48" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="border rounded-md p-12 text-center bg-card">
        <h3 className="text-lg font-medium mb-2">No training history yet</h3>
        <p className="text-muted-foreground">
          Click "Train AI" to get started with model training.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-md bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Training Date</TableHead>
              <TableHead className="w-[150px]">Status</TableHead>
              <TableHead className="w-[120px]">Data Points</TableHead>
              <TableHead className="w-[120px]">Duration</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  {format(new Date(record.training_date || record.created), 'MMM d, yyyy h:mm a')}
                </TableCell>
                <TableCell>
                  <TrainingStatusBadge status={record.status} />
                </TableCell>
                <TableCell>
                  {record.data_points_used?.toLocaleString() || 0}
                </TableCell>
                <TableCell>
                  {record.training_duration ? `${record.training_duration} seconds` : '-'}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm max-w-[300px] truncate" title={record.notes}>
                  {record.notes || '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
