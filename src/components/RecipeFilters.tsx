import { Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

export interface RecipeFilters {
  category: string;
  difficulty: string;
  maxTime: number;
  minRating: number;
}

interface RecipeFiltersProps {
  filters: RecipeFilters;
  onFiltersChange: (filters: RecipeFilters) => void;
}

export function RecipeFilters({ filters, onFiltersChange }: RecipeFiltersProps) {
  const categories = [
    "Todas",
    "Massas",
    "Saladas", 
    "Sobremesas",
    "Café da Manhã",
    "Pães e Padaria",
    "Pratos Principais"
  ];

  const difficulties = [
    "Todas",
    "Fácil",
    "Médio", 
    "Difícil"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Categoria</Label>
          <Select 
            value={filters.category} 
            onValueChange={(value) => onFiltersChange({ ...filters, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Dificuldade</Label>
          <Select 
            value={filters.difficulty} 
            onValueChange={(value) => onFiltersChange({ ...filters, difficulty: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a dificuldade" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Tempo máximo</Label>
            <Badge variant="secondary">{filters.maxTime} min</Badge>
          </div>
          <Slider
            value={[filters.maxTime]}
            onValueChange={(value) => onFiltersChange({ ...filters, maxTime: value[0] })}
            max={120}
            min={10}
            step={10}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Avaliação mínima</Label>
            <Badge variant="secondary">{filters.minRating.toFixed(1)} ⭐</Badge>
          </div>
          <Slider
            value={[filters.minRating]}
            onValueChange={(value) => onFiltersChange({ ...filters, minRating: value[0] })}
            max={5}
            min={1}
            step={0.5}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}