
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Plus, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';

function ProgramEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [missions, setMissions] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    duration_days: 30,
    description: '',
    difficulty: 'beginner',
    status: 'draft',
    program_format: 'standard',
    ai_mode: 'static',
    visual_theme: 'ocean',
    visual_icon: 'spark',
    cover_image: '',
    jordy_personalization_hint: '',
    learning_outcomes: ['']
  });

  useEffect(() => {
    if (isEdit) {
      fetchProgram();
    }
  }, [id]);

  const fetchProgram = async () => {
    try {
      const program = await pb.collection('programs').getOne(id, { $autoCancel: false });
      setFormData({
        title: program.title || '',
        category: program.category || '',
        duration_days: program.duration_days || 30,
        description: program.description || '',
        difficulty: program.difficulty || 'beginner',
        status: program.status || 'draft',
        program_format: program.program_format || 'standard',
        ai_mode: program.ai_mode || 'static',
        visual_theme: program.visual_theme || 'ocean',
        visual_icon: program.visual_icon || 'spark',
        cover_image: program.cover_image || '',
        jordy_personalization_hint: program.jordy_personalization_hint || '',
        learning_outcomes: program.learning_outcomes?.length ? program.learning_outcomes : ['']
      });

      const missionsData = await pb.collection('missions').getFullList({
        filter: `program_id = "${id}"`,
        sort: 'day_number',
        $autoCancel: false
      });
      setMissions(missionsData);
    } catch (error) {
      console.error("Error fetching program:", error);
      toast.error("Failed to load program details");
      navigate('/admin/programs');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOutcomeChange = (index, value) => {
    const newOutcomes = [...formData.learning_outcomes];
    newOutcomes[index] = value;
    setFormData(prev => ({ ...prev, learning_outcomes: newOutcomes }));
  };

  const addOutcome = () => {
    setFormData(prev => ({ ...prev, learning_outcomes: [...prev.learning_outcomes, ''] }));
  };

  const removeOutcome = (index) => {
    const newOutcomes = formData.learning_outcomes.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, learning_outcomes: newOutcomes.length ? newOutcomes : [''] }));
  };

  const handleSave = async (statusOverride = null) => {
    if (!formData.title) {
      toast.error("Title is required");
      return;
    }

    try {
      setSaving(true);
      const dataToSave = {
        ...formData,
        learning_outcomes: formData.learning_outcomes.filter(o => o.trim() !== ''),
        status: statusOverride || formData.status
      };

      if (isEdit) {
        await pb.collection('programs').update(id, dataToSave, { $autoCancel: false });
        toast.success("Program updated successfully");
      } else {
        const created = await pb.collection('programs').create(dataToSave, { $autoCancel: false });
        toast.success("Program created successfully");
        navigate(`/admin/programs/${created.id}/edit`);
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save program");
    } finally {
      setSaving(false);
    }
  };

  const moveMission = async (index, direction) => {
    if (direction === 'up' && index > 0) {
      const newMissions = [...missions];
      const temp = newMissions[index].day_number;
      newMissions[index].day_number = newMissions[index - 1].day_number;
      newMissions[index - 1].day_number = temp;
      
      // Swap in array
      [newMissions[index], newMissions[index - 1]] = [newMissions[index - 1], newMissions[index]];
      setMissions(newMissions);
      
      // Update DB
      await Promise.all([
        pb.collection('missions').update(newMissions[index].id, { day_number: newMissions[index].day_number }, { $autoCancel: false }),
        pb.collection('missions').update(newMissions[index - 1].id, { day_number: newMissions[index - 1].day_number }, { $autoCancel: false })
      ]);
    } else if (direction === 'down' && index < missions.length - 1) {
      const newMissions = [...missions];
      const temp = newMissions[index].day_number;
      newMissions[index].day_number = newMissions[index + 1].day_number;
      newMissions[index + 1].day_number = temp;
      
      // Swap in array
      [newMissions[index], newMissions[index + 1]] = [newMissions[index + 1], newMissions[index]];
      setMissions(newMissions);
      
      // Update DB
      await Promise.all([
        pb.collection('missions').update(newMissions[index].id, { day_number: newMissions[index].day_number }, { $autoCancel: false }),
        pb.collection('missions').update(newMissions[index + 1].id, { day_number: newMissions[index + 1].day_number }, { $autoCancel: false })
      ]);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <>
      <Helmet>
        <title>{isEdit ? 'Edit Program' : 'New Program'} - Admin</title>
      </Helmet>

      <div className="space-y-6 max-w-5xl mx-auto pb-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/programs')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-[hsl(var(--admin-text))]">
              {isEdit ? 'Edit Program' : 'Create New Program'}
            </h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => handleSave('draft')} disabled={saving}>
              Save as Draft
            </Button>
            <Button onClick={() => handleSave('active')} disabled={saving} className="gap-2">
              <Save className="w-4 h-4" /> Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
              <CardHeader>
                <CardTitle>Program Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Title *</label>
                  <Input 
                    value={formData.title} 
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g., 30 Days to AI Mastery"
                    className="bg-[hsl(var(--admin-bg))]"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Textarea 
                    value={formData.description} 
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Brief overview of the program..."
                    className="h-32 bg-[hsl(var(--admin-bg))]"
                    maxLength={500}
                  />
                  <div className="text-right text-xs text-[hsl(var(--admin-muted))] mt-1">
                    {formData.description.length}/500
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Cover Image URL</label>
                    <Input
                      value={formData.cover_image}
                      onChange={(e) => handleChange('cover_image', e.target.value)}
                      placeholder="https://..."
                      className="bg-[hsl(var(--admin-bg))]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Jordy Personalization Hint</label>
                    <Input
                      value={formData.jordy_personalization_hint}
                      onChange={(e) => handleChange('jordy_personalization_hint', e.target.value)}
                      placeholder="Who is this best for?"
                      className="bg-[hsl(var(--admin-bg))]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Learning Outcomes</label>
                  <div className="space-y-2">
                    {formData.learning_outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input 
                          value={outcome} 
                          onChange={(e) => handleOutcomeChange(idx, e.target.value)}
                          placeholder="e.g., Master prompt engineering"
                          className="bg-[hsl(var(--admin-bg))]"
                        />
                        <Button variant="ghost" size="icon" onClick={() => removeOutcome(idx)} className="text-red-500 shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addOutcome} className="mt-2 gap-2">
                      <Plus className="w-4 h-4" /> Add Outcome
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Missions Section (Only show if editing) */}
            {isEdit && (
              <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Missions</CardTitle>
                  <Button size="sm" onClick={() => navigate(`/admin/missions/new?programId=${id}`)} className="gap-2">
                    <Plus className="w-4 h-4" /> Add Mission
                  </Button>
                </CardHeader>
                <CardContent>
                  {missions.length === 0 ? (
                    <div className="text-center py-8 text-[hsl(var(--admin-muted))] border border-dashed border-[hsl(var(--admin-border))] rounded-lg">
                      No missions added yet.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {missions.map((mission, idx) => (
                        <div key={mission.id} className="flex items-center gap-3 p-3 bg-[hsl(var(--admin-bg))] border border-[hsl(var(--admin-border))] rounded-lg">
                          <div className="flex flex-col gap-1">
                            <button onClick={() => moveMission(idx, 'up')} disabled={idx === 0} className="text-[hsl(var(--admin-muted))] hover:text-primary disabled:opacity-30">▲</button>
                            <button onClick={() => moveMission(idx, 'down')} disabled={idx === missions.length - 1} className="text-[hsl(var(--admin-muted))] hover:text-primary disabled:opacity-30">▼</button>
                          </div>
                          <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                            {mission.day_number}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-[hsl(var(--admin-text))] truncate">{mission.title}</p>
                            <p className="text-xs text-[hsl(var(--admin-muted))] truncate">{mission.objective}</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/missions/${mission.id}/edit`)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            <Card className="bg-[hsl(var(--admin-card))] border-[hsl(var(--admin-border))]">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Select value={formData.status} onValueChange={(v) => handleChange('status', v)}>
                    <SelectTrigger className="bg-[hsl(var(--admin-bg))]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Program Format</label>
                  <Select value={formData.program_format} onValueChange={(v) => handleChange('program_format', v)}>
                    <SelectTrigger className="bg-[hsl(var(--admin-bg))]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Program</SelectItem>
                      <SelectItem value="sprint">Sprint</SelectItem>
                      <SelectItem value="adaptive">Adaptive Path</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">AI Mode</label>
                  <Select value={formData.ai_mode} onValueChange={(v) => handleChange('ai_mode', v)}>
                    <SelectTrigger className="bg-[hsl(var(--admin-bg))]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="static">Static</SelectItem>
                      <SelectItem value="jordy_guided">Jordy Guided</SelectItem>
                      <SelectItem value="jordy_generated">Jordy Generated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Visual Theme</label>
                  <Select value={formData.visual_theme} onValueChange={(v) => handleChange('visual_theme', v)}>
                    <SelectTrigger className="bg-[hsl(var(--admin-bg))]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ocean">Ocean</SelectItem>
                      <SelectItem value="sunrise">Sunrise</SelectItem>
                      <SelectItem value="forest">Forest</SelectItem>
                      <SelectItem value="midnight">Midnight</SelectItem>
                      <SelectItem value="citrus">Citrus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Visual Icon</label>
                  <Select value={formData.visual_icon} onValueChange={(v) => handleChange('visual_icon', v)}>
                    <SelectTrigger className="bg-[hsl(var(--admin-bg))]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spark">Spark</SelectItem>
                      <SelectItem value="target">Target</SelectItem>
                      <SelectItem value="brain">Brain</SelectItem>
                      <SelectItem value="bolt">Bolt</SelectItem>
                      <SelectItem value="mountain">Mountain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Select value={formData.category} onValueChange={(v) => handleChange('category', v)}>
                    <SelectTrigger className="bg-[hsl(var(--admin-bg))]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AI Learning">AI Learning</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Creative">Creative</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Difficulty</label>
                  <Select value={formData.difficulty} onValueChange={(v) => handleChange('difficulty', v)}>
                    <SelectTrigger className="bg-[hsl(var(--admin-bg))]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Duration (Days)</label>
                  <Input 
                    type="number" 
                    min="1"
                    value={formData.duration_days} 
                    onChange={(e) => handleChange('duration_days', parseInt(e.target.value) || 1)}
                    className="bg-[hsl(var(--admin-bg))]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgramEditor;
