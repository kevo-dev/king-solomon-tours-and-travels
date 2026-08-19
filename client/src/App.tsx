import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Admin from "@/pages/Admin";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Operators from "@/pages/Operators";
import Planner from "@/pages/Planner";
import TourDetail from "@/pages/TourDetail";
import Tours from "@/pages/Tours";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/tours" component={Tours} /><Route path="/tours/:slug" component={TourDetail} /><Route path="/operators" component={Operators} /><Route path="/planner" component={Planner} /><Route path="/dashboard/:section?" component={Dashboard} /><Route path="/admin/:section?" component={Admin} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>; }
