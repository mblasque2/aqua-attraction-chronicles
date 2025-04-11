
import React, { useState } from 'react';
import { useAttractions } from '@/context/AttractionContext';
import AttractionCard from '@/components/AttractionCard';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';
import { Skeleton } from '@/components/ui/skeleton';

const Index: React.FC = () => {
  const { attractions, deleteAttraction } = useAttractions();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Filter attractions based on search term
  const filteredAttractions = attractions.filter(
    (attraction) =>
      attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attraction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attraction.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteAttraction(deleteId);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-primary">Aqua Attractions Management</h1>
        <Link to="/add">
          <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90">
            <Plus size={16} /> Add Attraction
          </Button>
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Search attractions by name, description or location"
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredAttractions.length === 0 && !searchTerm && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-7xl mb-4">🏄‍♂️</div>
          <h2 className="text-2xl font-medium mb-2">No attractions yet</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            Get started by adding your first attraction. You'll be able to manage schedules, descriptions, and more.
          </p>
          <Link to="/add">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add First Attraction
            </Button>
          </Link>
        </div>
      )}

      {filteredAttractions.length === 0 && searchTerm && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-7xl mb-4">🔍</div>
          <h2 className="text-2xl font-medium mb-2">No attractions found</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            We couldn't find any attractions matching your search. Try different keywords or clear your search.
          </p>
          <Button variant="outline" onClick={() => setSearchTerm('')}>
            Clear Search
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAttractions.map((attraction) => (
          <AttractionCard
            key={attraction.id}
            attraction={attraction}
            onEdit={() => window.location.href = `/edit/${attraction.id}`}
            onDelete={() => handleDeleteClick(attraction.id)}
          />
        ))}
      </div>

      <DeleteConfirmationDialog
        isOpen={!!deleteId}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Attraction"
        description="Are you sure you want to delete this attraction? This action cannot be undone."
      />
    </div>
  );
};

export default Index;
