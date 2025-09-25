import { useState } from "react";
import { Search, Plus, X, Sparkles } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface RecipeSearchProps {
  onSearch: (ingredients: string[]) => void;
  onGenerateRandom: () => void;
}

export function RecipeSearch({ onSearch, onGenerateRandom }: RecipeSearchProps) {
  const [ingredientInput, setIngredientInput] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const popularIngredients = [
    // Proteínas mais usadas
    "Frango", "Carne bovina", "Ovos", "Camarão", "Peixe", "Bacon",
    // Carboidratos básicos  
    "Arroz", "Macarrão", "Batata", "Farinha", "Pão", "Mandioca",
    // Vegetais essenciais
    "Tomate", "Cebola", "Alho", "Pimentão", "Cenoura", "Brócolis",
    // Laticínios
    "Queijo", "Leite", "Manteiga", "Requeijão", "Iogurte", "Nata",
    // Doces e temperos
    "Açúcar", "Chocolate", "Mel", "Azeite", "Limão", "Coentro",
    // Grãos e legumes
    "Feijão", "Milho", "Ervilha", "Lentilha", "Castanha", "Coco"
  ];

  const addIngredient = (ingredient: string) => {
    if (ingredient.trim() && !selectedIngredients.includes(ingredient.trim())) {
      setSelectedIngredients([...selectedIngredients, ingredient.trim()]);
      setIngredientInput("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
  };

  const handleSearch = () => {
    if (selectedIngredients.length > 0) {
      onSearch(selectedIngredients);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Search className="w-6 h-6 text-primary" />
          Buscar Receitas por Ingredientes
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Digite os ingredientes que você tem disponível e encontre receitas perfeitas!
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-3">
          <Input
            placeholder="Digite um ingrediente (ex: frango, arroz, tomate)..."
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addIngredient(ingredientInput)}
            className="flex-1 h-12 text-base"
          />
          <Button 
            onClick={() => addIngredient(ingredientInput)}
            disabled={!ingredientInput.trim()}
            className="h-12 px-6 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {selectedIngredients.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Ingredientes selecionados:</p>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient) => (
                <Badge key={ingredient} variant="secondary" className="flex items-center gap-1">
                  {ingredient}
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm font-medium">Ingredientes populares:</p>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {popularIngredients.map((ingredient) => (
              <Button
                key={ingredient}
                variant="outline"
                size="sm"
                onClick={() => addIngredient(ingredient)}
                disabled={selectedIngredients.includes(ingredient)}
                className="transition-all hover:scale-105 hover:shadow-sm"
              >
                {ingredient}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            onClick={handleSearch}
            disabled={selectedIngredients.length === 0}
            className="flex-1 h-12 text-base transition-all hover:scale-105"
          >
            <Search className="w-5 h-5 mr-2" />
            Buscar Receitas ({selectedIngredients.length} ingredientes)
          </Button>
          <Button 
            onClick={onGenerateRandom}
            variant="outline"
            className="flex items-center gap-2 h-12 px-6 transition-all hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            Surpresa
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}