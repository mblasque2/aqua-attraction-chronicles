
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Clock } from 'lucide-react';
import { TimeOption } from '@/types/attraction';

// Generate time options in 30-minute intervals
const generateTimeOptions = (): TimeOption[] => {
  const options: TimeOption[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 30]) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      const value = `${formattedHour}:${formattedMinute}`;
      const period = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour % 12 || 12;
      const label = `${displayHour}:${formattedMinute} ${period}`;
      options.push({ value, label });
    }
  }
  return options;
};

const TIME_OPTIONS = generateTimeOptions();

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  label: string;
  required?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({ 
  value, 
  onChange, 
  label, 
  required = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Find the display label for the current value
  const selectedOption = TIME_OPTIONS.find(option => option.value === value);
  const displayValue = selectedOption?.label || value;

  // Filter options based on search input
  const filteredOptions = searchValue
    ? TIME_OPTIONS.filter(option => 
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    : TIME_OPTIONS;

  const handleSelectTime = (option: TimeOption) => {
    onChange(option.value);
    setSearchValue('');
    setIsOpen(false);
  };

  // Clear search when popover closes
  useEffect(() => {
    if (!isOpen) {
      setSearchValue('');
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-start text-left font-normal"
            onClick={() => setIsOpen(true)}
          >
            <Clock className="mr-2 h-4 w-4" />
            {value ? displayValue : <span className="text-muted-foreground">Select time</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0" align="start">
          <div className="p-2">
            <Input
              placeholder="Search time..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="mb-2"
              ref={inputRef}
              autoFocus
            />
          </div>
          <div className="time-picker-dropdown py-2">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-primary hover:text-white ${
                  option.value === value ? 'bg-primary text-white' : ''
                }`}
                onClick={() => handleSelectTime(option)}
              >
                {option.label}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-4 py-2 text-muted-foreground">No times found</div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimePicker;
