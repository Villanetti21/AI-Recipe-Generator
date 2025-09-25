import { Clock, Users, Heart, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: number;
  servings: number;
  difficulty: "Fácil" | "Médio" | "Difícil";
  category: string;
  ingredients: string[];
  instructions: string[];
  rating: number;
  isFavorite?: boolean;
}

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite?: (id: string) => void;
  onViewDetails?: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, onToggleFavorite, onViewDetails }: RecipeCardProps) {
  const difficultyColors = {
    "Fácil": "bg-green-100 text-green-800",
    "Médio": "bg-yellow-100 text-yellow-800", 
    "Difícil": "bg-red-100 text-red-800"
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
      <div className="relative">
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge className={`${difficultyColors[recipe.difficulty]} shadow-sm`}>
            {recipe.difficulty}
          </Badge>
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/90 hover:bg-white shadow-sm transition-all hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(recipe.id);
              }}
            >
              <Heart 
                className={`w-4 h-4 transition-colors ${recipe.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-400'}`} 
              />
            </Button>
          )}
        </div>
        <Badge className="absolute top-3 left-3 bg-black/80 text-white shadow-sm">
          {recipe.category}
        </Badge>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-5" onClick={() => onViewDetails?.(recipe)}>
        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">{recipe.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {recipe.cookTime} min
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {recipe.servings} porções
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {recipe.rating.toFixed(1)}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails?.(recipe);
          }} 
          className="w-full transition-all hover:scale-105"
          size="sm"
        >
          Ver Receita Completa
        </Button>
      </CardFooter>
    </Card>
  );
}