
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Attraction, Schedule, AttractionFormData } from '../types/attraction';
import { toast } from '@/components/ui/sonner';
import { v4 as uuidv4 } from 'uuid';

interface AttractionContextType {
  attractions: Attraction[];
  addAttraction: (attraction: AttractionFormData) => void;
  updateAttraction: (id: string, attraction: AttractionFormData) => void;
  deleteAttraction: (id: string) => void;
  getAttraction: (id: string) => Attraction | undefined;
}

const AttractionContext = createContext<AttractionContextType | undefined>(undefined);

export function AttractionProvider({ children }: { children: ReactNode }) {
  const [attractions, setAttractions] = useState<Attraction[]>([
    // Sample data for initial rendering
    {
      id: '1',
      name: 'Dolphin Show',
      description: 'An amazing show featuring trained dolphins performing incredible tricks.',
      location: 'Main Aquarium',
      image: 'https://images.unsplash.com/photo-1564591111131-48529da5cdb6?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3',
      schedules: [
        { id: '1-1', openTime: '10:00', closeTime: '11:00' },
        { id: '1-2', openTime: '14:00', closeTime: '15:00' },
        { id: '1-3', openTime: '18:00', closeTime: '19:00' },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Shark Feeding',
      description: 'Watch our trained staff feed our shark collection from a safe viewing area.',
      location: 'Shark Tank',
      image: 'https://images.unsplash.com/photo-1564379976409-79bd0786fff1?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3',
      schedules: [
        { id: '2-1', openTime: '12:00', closeTime: '12:30' },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Underwater Tunnel Tour',
      description: 'Walk through our 100-meter underwater tunnel surrounded by marine life.',
      location: 'Ocean Gallery',
      image: 'https://images.unsplash.com/photo-1683009427479-c7e36bcd7b62?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3',
      schedules: [
        { id: '3-1', openTime: '09:00', closeTime: '20:00' },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const addAttraction = (attraction: AttractionFormData) => {
    const newAttraction: Attraction = {
      ...attraction,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      schedules: attraction.schedules.map(schedule => ({
        ...schedule,
        id: uuidv4(),
      })),
    };

    setAttractions([...attractions, newAttraction]);
    toast.success('Attraction added successfully!');
  };

  const updateAttraction = (id: string, updatedAttraction: AttractionFormData) => {
    const attractionExists = attractions.find(attraction => attraction.id === id);
    
    if (!attractionExists) {
      toast.error('Attraction not found!');
      return;
    }

    const updated: Attraction = {
      ...updatedAttraction,
      id,
      createdAt: attractionExists.createdAt,
      updatedAt: new Date(),
      schedules: updatedAttraction.schedules.map(schedule => ({
        ...schedule,
        id: schedule.id || uuidv4(),
      })),
    };

    setAttractions(attractions.map(attraction => 
      attraction.id === id ? updated : attraction
    ));
    toast.success('Attraction updated successfully!');
  };

  const deleteAttraction = (id: string) => {
    setAttractions(attractions.filter(attraction => attraction.id !== id));
    toast.success('Attraction deleted successfully!');
  };

  const getAttraction = (id: string) => {
    return attractions.find(attraction => attraction.id === id);
  };

  return (
    <AttractionContext.Provider value={{ 
      attractions, 
      addAttraction, 
      updateAttraction, 
      deleteAttraction, 
      getAttraction 
    }}>
      {children}
    </AttractionContext.Provider>
  );
}

export function useAttractions() {
  const context = useContext(AttractionContext);
  if (context === undefined) {
    throw new Error('useAttractions must be used within an AttractionProvider');
  }
  return context;
}
