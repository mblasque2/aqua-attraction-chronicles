
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAttractions } from '@/context/AttractionContext';
import AttractionForm from '@/components/AttractionForm';
import { AttractionFormData } from '@/types/attraction';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AddAttraction: React.FC = () => {
  const { addAttraction } = useAttractions();
  const navigate = useNavigate();

  const handleSubmit = (data: AttractionFormData) => {
    addAttraction(data);
    navigate('/');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Button
        variant="ghost"
        className="mb-4 pl-0 flex items-center gap-2 hover:bg-transparent"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={16} /> Back to attractions
      </Button>
      <h1 className="text-3xl font-bold mb-6 text-primary">Add New Attraction</h1>
      <AttractionForm
        onSubmit={handleSubmit}
        buttonText="Create Attraction"
      />
    </div>
  );
};

export default AddAttraction;
