
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

function MissionEditor() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const programId = searchParams.get('programId');
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    day_number: 1,
    objective: '',
    instructions: '',
    expected_output: '',
    difficulty_level: 'easy',
    ai_prompt_template: '',
    program_id: programId || ''
  });

  useEffect(() => {
    if (isEdit) {
      fetchMission();
    } else if (programId) {
      // Auto-assign next day number
      pb.collection('missions').getFullList({
        filter: `program_id = "${programId}"`,
        sort: '-day_number',
        limit: 1,
        $autoCancel: false
      }).then(res => {
        if (res.length > 0) {
          setFormData(prev => ({ ...prev, day_number: res[0].day_number + 1 }));
        }
      });
    }
  }, [id, programId]);

  const fetchMission = async () => {
    try {
      const mission = await pb.collection('missions').getOne(id, { $autoCancel: false });
      setFormData({
        title: mission.title || '',
        day_number: mission.day_number || 1,
        objective: mission.objective || '',
        instructions: mission.instructions || '',
        expected_output: mission.expected_output || '',
        difficulty_level: mission.difficulty_level || 'easy',
        ai_prompt_template: mission.ai_prompt_template || '',
        program_id: mission.program_id || ''
      });
    } catch (error) {
      console.error("Error fetching mission:", error);
      toast.error("Failed to load mission details");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.program_id) {
      toast.error("Title and Program ID are required");
      return;
    }

    try {
      setSaving(true);
      if (isEdit) {
        await pb.collection('missions').update(id, formData, { $autoCancel: false });
        toast.success("Mission updated successfully");
      } else {
        await pb.collection('missions').create(formData, { $autoCancel: false });
        toast.success("Mission created successfully");
      }
      navigate(`/admin/programs/${formData.program_id}/edit`);
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save mission");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this mission?')) return;
    try {
      await pb.collection('missions').delete(id, { $autoCancel: false });
      toast.success("Mission deleted");
      navigate(`/admin/programs/${formData.program_id}/edit`);
    } catch (error) {
      toast.error("Failed to delete mission");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <>
      <Helmet>
        <title>{isEdit ? 'Edit Mission' : 'New Mission'} - Admin</title>
      </Helmet>

      <div className="space-y-6 max-w-4xl mx-auto pb-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-[hsl(var(--admin-text))]">
              {isEdit ? 'Edit Mission' : 'Create New Mission'}
            </h1>
          </div>
          <div className="flex gap-3">
            {isEdit && (
              <Button variant="destructive" onClick={handleDelete} className="gap-2">
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
            )}
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              <Save className="w-4 h-4" /> Save Mission
            </Button>
          </div>
        </div>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader>
            <CardTitle>Mission Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <label className="text-sm font-medium mb-1 block">Title *</label>
                <Input 
                  value={formData.title} 
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="bg-[hsl(var(--admin-bg))]"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Day Number</label>
                <Input 
                  type="number"
                  value={formData.day_number} 
                  onChange={(e) => handleChange('day_number', parseInt(e.target.value) || 1)}
                  className="bg-[hsl(var(--admin-bg))]"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Objective</label>
              <Textarea 
                value={formData.objective} 
                onChange={(e) => handleChange('objective', e.target.value)}
                className="h-20 bg-[hsl(var(--admin-bg))]"
                maxLength={200}
              />
              <div className="text-right text-xs text-[hsl(var(--admin-muted))] mt-1">
                {formData.objective.length}/200
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Instructions (Markdown supported)</label>
              <Textarea 
                value={formData.instructions} 
                onChange={(e) => handleChange('instructions', e.target.value)}
                className="h-40 bg-[hsl(var(--admin-bg))]"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Expected Output</label>
              <Textarea 
                value={formData.expected_output} 
                onChange={(e) => handleChange('expected_output', e.target.value)}
                className="h-24 bg-[hsl(var(--admin-bg))]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Difficulty Level</label>
                <Select value={formData.difficulty_level} onValueChange={(v) => handleChange('difficulty_level', v)}>
                  <SelectTrigger className="bg-[hsl(var(--admin-bg))]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
          <CardHeader>
            <CardTitle>AI Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">AI Prompt Template</label>
              <p className="text-xs text-[hsl(var(--admin-muted))] mb-2">System instructions for the AI coach when evaluating this mission.</p>
              <Textarea 
                value={formData.ai_prompt_template} 
                onChange={(e) => handleChange('ai_prompt_template', e.target.value)}
                className="h-32 bg-[hsl(var(--admin-bg))]"
                placeholder="You are an expert AI coach evaluating a user's response to..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default MissionEditor;
