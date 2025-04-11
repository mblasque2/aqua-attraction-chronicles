
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AttractionProvider } from '@/context/AttractionContext';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AddAttraction from "./pages/AddAttraction";
import EditAttraction from "./pages/EditAttraction";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AttractionProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/add" element={<AddAttraction />} />
            <Route path="/edit/:id" element={<EditAttraction />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AttractionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
