import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import TimePicker from './TimePicker';
import { AttractionFormData, Schedule } from '@/types/attraction';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface AttractionFormProps {
  initialData?: AttractionFormData;
  onSubmit: (data: AttractionFormData) => void;
  buttonText: string;
}

const AttractionForm: React.FC<AttractionFormProps> = ({
  initialData,
  onSubmit,
  buttonText,
}) => {
  const [formData, setFormData] = useState<AttractionFormData>(
    initialData || {
      name: '',
      description: '',
      location: '',
      image: '',
      schedules: [{ id: uuidv4(), openTime: '', closeTime: undefined }],
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    let schedulesValid = true;
    formData.schedules.forEach((schedule, index) => {
      if (!schedule.openTime) {
        newErrors[`schedule-${index}-openTime`] = 'Opening time is required';
        schedulesValid = false;
      }
    });

    if (formData.schedules.length === 0) {
      newErrors.schedules = 'At least one schedule is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleScheduleChange = (index: number, field: keyof Schedule, value: string) => {
    const updatedSchedules = [...formData.schedules];
    updatedSchedules[index] = { ...updatedSchedules[index], [field]: value };
    setFormData({ ...formData, schedules: updatedSchedules });
  };

  const addSchedule = () => {
    setFormData({
      ...formData,
      schedules: [...formData.schedules, { id: uuidv4(), openTime: '', closeTime: undefined }],
    });
  };

  const removeSchedule = (index: number) => {
    if (formData.schedules.length <= 1) {
      toast.error('At least one schedule is required');
      return;
    }
    const updatedSchedules = formData.schedules.filter((_, i) => i !== index);
    setFormData({ ...formData, schedules: updatedSchedules });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    } else {
      toast.error('Please fill all required fields');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'border-red-500' : ''}
            placeholder="Attraction name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`min-h-[120px] ${errors.description ? 'border-red-500' : ''}`}
            placeholder="Attraction description"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={errors.location ? 'border-red-500' : ''}
            placeholder="Attraction location"
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <Input
            name="image"
            value={formData.image || ''}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">
              Schedules <span className="text-red-500">*</span>
            </label>
            <Button 
              type="button" 
              onClick={addSchedule} 
              size="sm" 
              variant="outline"
              className="h-8"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Schedule
            </Button>
          </div>
          {errors.schedules && <p className="text-red-500 text-xs mb-2">{errors.schedules}</p>}

          <div className="space-y-3">
            {formData.schedules.map((schedule, index) => (
              <Card key={schedule.id || index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <TimePicker
                        label="Opening Time"
                        value={schedule.openTime}
                        onChange={(value) => handleScheduleChange(index, 'openTime', value)}
                        required
                      />
                      {errors[`schedule-${index}-openTime`] && (
                        <p className="text-red-500 text-xs -mt-2">{errors[`schedule-${index}-openTime`]}</p>
                      )}

                      <TimePicker
                        label="Closing Time (optional)"
                        value={schedule.closeTime || ''}
                        onChange={(value) => handleScheduleChange(index, 'closeTime', value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSchedule(index)}
                      className="mt-6"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
        {buttonText}
      </Button>
    </form>
  );
};

export default AttractionForm;
