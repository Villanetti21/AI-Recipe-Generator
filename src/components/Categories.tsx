import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
  description: string;
}

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
}

export function Categories({ onSelectCategory }: CategoriesProps) {
  const categories: Category[] = [
    {
      id: "massas",
      name: "Massas",
      image: "https://images.unsplash.com/photo-1604367285668-73d5dea642de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwcGFzdGElMjBpdGFsaWFuJTIwZm9vZHxlbnwxfHx8fDE3NTg4Mjg4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      count: 24,
      description: "Pratos saborosos com massas variadas"
    },
    {
      id: "saladas",
      name: "Saladas",
      image: "https://images.unsplash.com/photo-1643750182373-b4a55a8c2801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc1ODczNTc0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      count: 18,
      description: "Opções saudáveis e refrescantes"
    },
    {
      id: "sobremesas",
      name: "Sobremesas",
      image: "https://images.unsplash.com/photo-1644158776192-2d24ce35da1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2hvY29sYXRlJTIwY2FrZXxlbnwxfHx8fDE3NTg4MDA3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      count: 15,
      description: "Doces irresistíveis para finalizar"
    },
    {
      id: "cafe-da-manha",
      name: "Café da Manhã",
      image: "https://images.unsplash.com/photo-1645802733740-50f48729d151?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBlZ2dzJTIwdG9hc3R8ZW58MXx8fHwxNzU4ODI4ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      count: 20,
      description: "Comece o dia com energia"
    },
    {
      id: "paes",
      name: "Pães e Padaria",
      image: "https://images.unsplash.com/photo-1710857389315-2648c72c6ee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lbWFkZSUyMGJyZWFkJTIwYmFraW5nfGVufDF8fHx8MTc1ODc2MDEwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      count: 12,
      description: "Pães artesanais e deliciosos"
    },
    {
      id: "pratos-principais",
      name: "Pratos Principais",
      image: "https://images.unsplash.com/photo-1665088127661-83aeff6104c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGluZ3JlZGllbnRzJTIwdmVnZXRhYmxlcyUyMGNvb2tpbmd8ZW58MXx8fHwxNzU4NzYwMzU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      count: 35,
      description: "Refeições completas e nutritivas"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Explore por Categorias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            onClick={() => onSelectCategory(category.name)}
          >
            <div className="relative">
              <ImageWithFallback
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white font-semibold text-xl text-center drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{category.name}</h3>
              </div>
              <Badge className="absolute top-3 right-3 bg-white/90 text-black shadow-sm">
                {category.count} receitas
              </Badge>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground text-center">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}