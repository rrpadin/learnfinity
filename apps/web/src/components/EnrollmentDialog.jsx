
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/contexts/AuthContext.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function EnrollmentDialog({ program, open, onOpenChange }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (!currentUser || !program) return;

    try {
      setLoading(true);
      
      // Get current enrolled programs array
      const user = await pb.collection('users').getOne(currentUser.id, { $autoCancel: false });
      const enrolled = user.enrolled_programs || [];
      
      if (!enrolled.includes(program.id)) {
        enrolled.push(program.id);
      }

      // Update user record
      await pb.collection('users').update(currentUser.id, {
        current_program_id: program.id,
        current_day: 1,
        streak_count: 0,
        enrolled_programs: enrolled
      }, { $autoCancel: false });

      // Update program enrollment count
      await pb.collection('programs').update(program.id, {
        enrollment_count: (program.enrollment_count || 0) + 1
      }, { $autoCancel: false });

      toast.success(`Successfully enrolled in ${program.title}!`);
      onOpenChange(false);
      navigate('/'); // Redirect to dashboard to start
      
    } catch (error) {
      console.error("Enrollment error:", error);
      toast.error("Failed to enroll. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!program) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Enrollment</DialogTitle>
          <DialogDescription className="pt-2">
            You are about to enroll in <strong>{program.title}</strong>. 
            This will set it as your active program and reset your current day progress to Day 1.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleEnroll} disabled={loading}>
            {loading ? "Enrolling..." : "Confirm & Start"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EnrollmentDialog;
