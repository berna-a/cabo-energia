import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LeadPanelProvider } from "@/components/brand/LeadPanelContext";
import { useSeo } from "@/seo/useSeo";
import Index from "./pages/Index.tsx";
const Residencial = lazy(() => import("./pages/Residencial.tsx"));
const Empresarial = lazy(() => import("./pages/Empresarial.tsx"));
import NotFound from "./pages/NotFound.tsx";
const Privacidade = lazy(() => import("./pages/Privacidade.tsx"));

// Ferramenta interna: carregada só quando /proposta é aberta, para não pesar
// no bundle do site público (arrasta jspdf, html2canvas e recharts).
const PropostasPage = lazy(() => import("./pages/PropostasPage.tsx"));



/** Sincroniza as meta tags com a rota. Tem de viver dentro do Router. */
function SeoSync() {
  useSeo();
  return null;
}

const App = () => (
      <BrowserRouter>
        <LeadPanelProvider>
          <SeoSync />
          <Suspense fallback={<div className="min-h-screen grid place-items-center" role="status">Cabo Energia…</div>}>
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
          </Suspense>
        </LeadPanelProvider>
      </BrowserRouter>
);

export default App;
