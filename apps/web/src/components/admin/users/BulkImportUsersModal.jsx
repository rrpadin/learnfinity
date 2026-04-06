
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Papa from 'papaparse';
import { UserService } from '@/lib/UserService.js';
import { ImportPreviewTable } from './ImportPreviewTable.jsx';

export function BulkImportUsersModal({ isOpen, onClose, onSuccess, orgId }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef(null);

  const resetState = () => {
    setFile(null);
    setPreviewData(null);
    setIsImporting(false);
  };

  const handleClose = () => {
    if (!isImporting) {
      resetState();
      onClose();
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setPreviewData(null);
    } else {
      toast.error("Please select a valid CSV file");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      setFile(droppedFile);
      setPreviewData(null);
    } else {
      toast.error("Please drop a valid CSV file");
    }
  };

  const handlePreview = () => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0 && results.errors[0].code === 'TooFewFields') {
           toast.error("Invalid CSV format. Please use the template.");
           return;
        }
        const validationResults = UserService.validateCSVData(results.data);
        setPreviewData(validationResults);
      },
      error: (error) => {
        toast.error(`Error parsing CSV: ${error.message}`);
      }
    });
  };

  const handleImport = async () => {
    if (!previewData || previewData.invalid.length > 0 || !orgId) return;

    setIsImporting(true);
    try {
      const result = await UserService.bulkImportUsers(orgId, previewData.valid, file.name);
      toast.success(`Import completed: ${result.successCount} users added.`);
      if (result.failCount > 0) {
        toast.warning(`${result.failCount} users failed to import. Check logs.`);
      }
      onSuccess();
      handleClose();
    } catch (error) {
      toast.error("An error occurred during import.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Bulk Import Users</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          {!previewData ? (
            <>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Upload a CSV file to import multiple users at once.
                </p>
                <Button variant="outline" size="sm" onClick={UserService.downloadCSVTemplate} className="gap-2">
                  <Download className="w-4 h-4" /> Download Template
                </Button>
              </div>

              <div 
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  accept=".csv" 
                  className="hidden" 
                />
                
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Drag & drop your CSV file here</h3>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse from your computer</p>
                    <Button onClick={() => fileInputRef.current?.click()} variant="secondary">
                      Select File
                    </Button>
                  </div>
                </div>
              </div>

              {file && (
                <div className="flex items-center gap-3 p-4 border rounded-lg bg-card">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <Button onClick={handlePreview}>Preview Import</Button>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Import Preview</h3>
                <Button variant="ghost" size="sm" onClick={() => setPreviewData(null)} disabled={isImporting}>
                  Choose Different File
                </Button>
              </div>
              <ImportPreviewTable validRows={previewData.valid} invalidRows={previewData.invalid} />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isImporting}>
            Cancel
          </Button>
          {previewData && (
            <Button 
              onClick={handleImport} 
              disabled={previewData.invalid.length > 0 || isImporting}
              className="gap-2"
            >
              {isImporting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Importing...</>
              ) : (
                `Import ${previewData.valid.length} Users`
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
