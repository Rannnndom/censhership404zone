import React, { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Archive from "@/pages/Archive";
import Share from "@/pages/Share";
import About from "@/pages/About";
import ArchiveDetail from "@/pages/ArchiveDetail";
import CAPHERGate from "@/components/CAPHERGate";

function Router({ isVerified, onVerified }: { isVerified: boolean; onVerified: () => void }) {
  const [location, setLocation] = useLocation();

  const handleVerified = () => {
    onVerified();
    setLocation("/");
  };

  if (!isVerified) {
    return <CAPHERGate onVerified={handleVerified} />;
  }

  return (
    <Switch>
      <Route path="/" component={() => <Home onNavigate={() => setLocation("/archive")} />} />
      <Route path="/archive" component={Archive} />
      <Route path="/archive/:id" component={ArchiveDetail} />
      <Route path="/share" component={Share} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isVerified, setIsVerified] = React.useState(() => {
    const saved = sessionStorage.getItem("censhership_verified");
    return saved === "true";
  });

  const handleVerified = () => {
    setIsVerified(true);
    sessionStorage.setItem("censhership_verified", "true");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router isVerified={isVerified} onVerified={handleVerified} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
