
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, XCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ImportPreviewTable({ validRows, invalidRows }) {
  const allRows = [...validRows.map(r => ({ ...r, isValid: true })), ...invalidRows.map(r => ({ ...r.row, isValid: false, errors: r.errors }))];
  
  // Sort by original index to maintain order
  allRows.sort((a, b) => a._originalIndex - b._originalIndex);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
          <CheckCircle2 className="w-4 h-4" />
          {validRows.length} valid records
        </div>
        {invalidRows.length > 0 && (
          <div className="flex items-center gap-1.5 text-destructive font-medium">
            <XCircle className="w-4 h-4" />
            {invalidRows.length} errors
          </div>
        )}
      </div>

      <div className="border rounded-md bg-card">
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
              <TableRow>
                <TableHead className="w-[60px]">Row</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allRows.map((row, idx) => (
                <TableRow key={idx} className={!row.isValid ? "bg-destructive/5" : ""}>
                  <TableCell className="text-muted-foreground">{row._originalIndex}</TableCell>
                  <TableCell>
                    {row.isValid ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                  </TableCell>
                  <TableCell>{row.first_name}</TableCell>
                  <TableCell>{row.last_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell className="capitalize">{row.role}</TableCell>
                  <TableCell>
                    {!row.isValid && (
                      <ul className="text-xs text-destructive list-disc list-inside pl-2">
                        {row.errors.map((err, i) => <li key={i}>{err}</li>)}
                      </ul>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
