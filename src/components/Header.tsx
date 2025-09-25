import { ChefHat, Search, Heart, BookOpen, Home } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export function Header({ onNavigate, currentSection }: HeaderProps) {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate("home")}>
          <ChefHat className="w-9 h-9 text-red-500" />
          <div>
            <h1 className="text-xl font-bold">IA Receitas</h1>
            <p className="text-xs text-muted-foreground">Seu assistente culinário</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-2">
          <Button
            variant={currentSection === "home" ? "default" : "ghost"}
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 px-4 py-2 transition-all hover:scale-105"
          >
            <Home className="w-4 h-4" />
            Início
          </Button>
          <Button
            variant={currentSection === "recipes" ? "default" : "ghost"}
            onClick={() => onNavigate("recipes")}
            className="flex items-center gap-2 px-4 py-2 transition-all hover:scale-105"
          >
            <BookOpen className="w-4 h-4" />
            Receitas
          </Button>
          <Button
            variant={currentSection === "favorites" ? "default" : "ghost"}
            onClick={() => onNavigate("favorites")}
            className="flex items-center gap-2 px-4 py-2 transition-all hover:scale-105"
          >
            <Heart className="w-4 h-4" />
            Favoritos
          </Button>
          <Button
            variant={currentSection === "search" ? "default" : "ghost"}
            onClick={() => onNavigate("search")}
            className="flex items-center gap-2 px-4 py-2 transition-all hover:scale-105"
          >
            <Search className="w-4 h-4" />
            Buscar
          </Button>
        </nav>

        <div className="md:hidden">
          <Button variant="ghost" size="sm">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}