import { Clock, Users, Star, Heart, ChefHat, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Recipe } from "./RecipeCard";

interface RecipeDetailsProps {
  recipe: Recipe;
  onBack: () => void;
  onToggleFavorite?: (id: string) => void;
}

export function RecipeDetails({ recipe, onBack, onToggleFavorite }: RecipeDetailsProps) {
  const difficultyColors = {
    "Fácil": "bg-green-100 text-green-800",
    "Médio": "bg-yellow-100 text-yellow-800", 
    "Difícil": "bg-red-100 text-red-800"
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button onClick={onBack} variant="ghost" className="flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative">
            <ImageWithFallback
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 lg:h-80 object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className={difficultyColors[recipe.difficulty]}>
                {recipe.difficulty}
              </Badge>
              {onToggleFavorite && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/80 hover:bg-white"
                  onClick={() => onToggleFavorite(recipe.id)}
                >
                  <Heart 
                    className={`w-4 h-4 ${recipe.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                  />
                </Button>
              )}
            </div>
            <Badge className="absolute top-4 left-4 bg-black/70 text-white">
              {recipe.category}
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
            <p className="text-muted-foreground">{recipe.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-sm font-medium">{recipe.cookTime} min</p>
              <p className="text-xs text-muted-foreground">Tempo</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-sm font-medium">{recipe.servings}</p>
              <p className="text-xs text-muted-foreground">Porções</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Star className="w-5 h-5 mx-auto mb-1 text-yellow-500 fill-yellow-500" />
              <p className="text-sm font-medium">{recipe.rating.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">Avaliação</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              Ingredientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modo de Preparo</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <Badge variant="outline" className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <p className="text-sm leading-relaxed">{instruction}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}