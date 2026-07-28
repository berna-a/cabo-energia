import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LeadPanelProvider } from "@/components/brand/LeadPanelContext";
import { useSeo } from "@/seo/useSeo";
import Index from "./pages/Index.tsx";
import Residencial from "./pages/Residencial.tsx";
import Empresarial from "./pages/Empresarial.tsx";
import NotFound from "./pages/NotFound.tsx";
import Privacidade from "./pages/Privacidade.tsx";

// Ferramenta interna: carregada só quando /proposta é aberta, para não pesar
// no bundle do site público (arrasta jspdf, html2canvas e recharts).
const PropostasPage = lazy(() => import("./pages/PropostasPage.tsx"));

const queryClient = new QueryClient();

/** Sincroniza as meta tags com a rota. Tem de viver dentro do Router. */
function SeoSync() {
  useSeo();
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LeadPanelProvider>
          <SeoSync />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/residencial" element={<Residencial />} />
            <Route path="/empresarial" element={<Empresarial />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route
              path="/proposta"
              element={
                <Suspense fallback={null}>
                  <PropostasPage />
                </Suspense>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LeadPanelProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
