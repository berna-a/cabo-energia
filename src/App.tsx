import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LeadPanelProvider } from "@/components/brand/LeadPanelContext";
import Index from "./pages/Index.tsx";
import Residencial from "./pages/Residencial.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LeadPanelProvider>
          <div className="min-h-screen w-full bg-brand-green-deep">
            <div className="mx-auto w-full max-w-[1920px] bg-background shadow-2xl">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/residencial" element={<Residencial />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </LeadPanelProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
