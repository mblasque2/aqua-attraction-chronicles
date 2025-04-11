
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAttractions } from '@/context/AttractionContext';
import AttractionForm from '@/components/AttractionForm';
import { AttractionFormData } from '@/types/attraction';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

const EditAttraction: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getAttraction, updateAttraction } = useAttractions();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [attractionData, setAttractionData] = useState<AttractionFormData | null>(null);

  useEffect(() => {
    if (id) {
      const attraction = getAttraction(id);
      if (attraction) {
        // Transform to form data
        const formData: AttractionFormData = {
          name: attraction.name,
          description: attraction.description,
          location: attraction.location,
          image: attraction.image,
          schedules: attraction.schedules,
        };
        setAttractionData(formData);
      } else {
        toast.error('Attraction not found');
        navigate('/');
      }
    }
    setLoading(false);
  }, [id, getAttraction, navigate]);

  const handleSubmit = (data: AttractionFormData) => {
    if (id) {
      updateAttraction(id, data);
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 w-3/4 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!attractionData) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Button
        variant="ghost"
        className="mb-4 pl-0 flex items-center gap-2 hover:bg-transparent"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={16} /> Back to attractions
      </Button>
      <h1 className="text-3xl font-bold mb-6 text-primary">Edit Attraction</h1>
      <AttractionForm
        initialData={attractionData}
        onSubmit={handleSubmit}
        buttonText="Update Attraction"
      />
    </div>
  );
};

export default EditAttraction;
