import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { RecipeSearch } from "./components/RecipeSearch";
import { RecipeCard, Recipe } from "./components/RecipeCard";
import { RecipeDetails } from "./components/RecipeDetails";
import { Categories } from "./components/Categories";
import { RecipeFilters, RecipeFilters as FilterType } from "./components/RecipeFilters";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Sparkles, TrendingUp, Clock, Heart } from "lucide-react";

export default function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [filters, setFilters] = useState<FilterType>({
    category: "Todas",
    difficulty: "Todas",
    maxTime: 60,
    minRating: 1
  });

  // Mock data de receitas
  const mockRecipes: Recipe[] = [
    {
      id: "1",
      title: "Macarrão à Carbonara",
      description: "Um clássico italiano cremoso e delicioso, perfeito para um jantar especial.",
      image: "https://images.unsplash.com/photo-1604367285668-73d5dea642de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwcGFzdGElMjBpdGFsaWFuJTIwZm9vZHxlbnwxfHx8fDE3NTg4Mjg4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: 25,
      servings: 4,
      difficulty: "Médio",
      category: "Massas",
      rating: 4.8,
      ingredients: [
        "400g de macarrão espaguete",
        "200g de bacon em cubos",
        "4 ovos inteiros",
        "100g de queijo parmesão ralado",
        "2 dentes de alho",
        "Sal e pimenta-do-reino a gosto",
        "Azeite extravirgem"
      ],
      instructions: [
        "Cozinhe o macarrão em água salgada até ficar al dente.",
        "Enquanto isso, frite o bacon até ficar crocante.",
        "Bata os ovos com o queijo parmesão, sal e pimenta.",
        "Escorra o macarrão e misture imediatamente com o bacon quente.",
        "Retire do fogo e adicione a mistura de ovos, mexendo rapidamente.",
        "Sirva imediatamente com mais queijo parmesão."
      ]
    },
    {
      id: "2",
      title: "Salada Caesar Completa",
      description: "Salada fresca e crocante com molho caesar caseiro e croutons dourados.",
      image: "https://images.unsplash.com/photo-1643750182373-b4a55a8c2801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc1ODczNTc0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: 15,
      servings: 2,
      difficulty: "Fácil",
      category: "Saladas",
      rating: 4.5,
      ingredients: [
        "1 pé de alface romana",
        "100g de queijo parmesão",
        "4 fatias de pão para croutons",
        "2 filés de anchova",
        "2 dentes de alho",
        "1 limão",
        "3 colheres de maionese",
        "Azeite extravirgem"
      ],
      instructions: [
        "Lave e corte a alface em pedaços médios.",
        "Prepare os croutons torrando o pão cortado em cubos com azeite.",
        "Faça o molho caesar misturando maionese, alho, anchova e limão.",
        "Misture a alface com o molho caesar.",
        "Adicione os croutons e o queijo parmesão.",
        "Sirva imediatamente."
      ]
    },
    {
      id: "3",
      title: "Bolo de Chocolate Cremoso",
      description: "Sobremesa irresistível com cobertura de chocolate e textura aveludada.",
      image: "https://images.unsplash.com/photo-1644158776192-2d24ce35da1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2hvY29sYXRlJTIwY2FrZXxlbnwxfHx8fDE3NTg4MDA3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: 60,
      servings: 8,
      difficulty: "Médio",
      category: "Sobremesas",
      rating: 4.9,
      ingredients: [
        "200g de chocolate meio amargo",
        "200g de manteiga",
        "4 ovos",
        "200g de açúcar",
        "100g de farinha de trigo",
        "50g de cacau em pó",
        "1 colher de chá de fermento",
        "200ml de leite"
      ],
      instructions: [
        "Preaqueça o forno a 180°C.",
        "Derreta o chocolate com a manteiga em banho-maria.",
        "Bata os ovos com o açúcar até ficar esbranquiçado.",
        "Adicione o chocolate derretido à mistura de ovos.",
        "Peneire e adicione a farinha, cacau e fermento.",
        "Adicione o leite e misture bem.",
        "Asse por 40-45 minutos em forma untada."
      ]
    },
    {
      id: "4",
      title: "Feijoada Tradicional Brasileira",
      description: "O prato mais tradicional do Brasil, com feijão preto e carnes defumadas.",
      image: "https://images.unsplash.com/photo-1709229851054-a09c8f7bd7e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWxpYW4lMjBmZWlqb2FkYSUyMGJsYWNrJTIwYmVhbnN8ZW58MXx8fHwxNzU4ODI5NTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: 180,
      servings: 8,
      difficulty: "Médio",
      category: "Pratos Principais",
      rating: 4.9,
      ingredients: [
        "500g de feijão preto",
        "300g de linguiça calabresa",
        "200g de bacon",
        "200g de costela defumada",
        "200g de carne seca",
        "1 pé de porco",
        "2 cebolas grandes",
        "4 dentes de alho",
        "2 folhas de louro",
        "Sal e pimenta a gosto"
      ],
      instructions: [
        "Deixe o feijão de molho na véspera.",
        "Cozinhe o feijão com as carnes salgadas por 1 hora.",
        "Em panela separada, refogue cebola e alho.",
        "Adicione linguiça e bacon ao refogado.",
        "Misture tudo com o feijão e tempere.",
        "Cozinhe por mais 1 hora em fogo baixo.",
        "Sirva com arroz, couve e farinha de mandioca."
      ]
    },
    {
      id: "5",
      title: "Pão de Açúcar",
      description: "Pão doce brasileiro tradicional, macio e levemente adocicado.",
      image: "https://images.unsplash.com/photo-1710857389315-2648c72c6ee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lbWFkZSUyMGJyZWFkJTIwYmFraW5nfGVufDF8fHx8MTc1ODc2MDEwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: 120,
      servings: 6,
      difficulty: "Médio",
      category: "Pães e Padaria",
      rating: 4.6,
      ingredients: [
        "500g de farinha de trigo",
        "300ml de leite morno",
        "100g de açúcar",
        "100g de manteiga",
        "2 ovos",
        "10g de fermento biológico seco",
        "1 colher de chá de sal",
        "1 gema para pincelar"
      ],
      instructions: [
        "Dissolva o fermento no leite morno com 1 colher de açúcar.",
        "Misture farinha, açúcar restante e sal.",
        "Adicione ovos, manteiga derretida e o fermento.",
        "Sove por 10 minutos até ficar lisa.",
        "Deixe crescer por 1 hora.",
        "Modele os pães, pincele com gema e asse por 25 minutos."
      ]
    },
    {
      id: "6",
      title: "Risotto de Cogumelos",
      description: "Prato italiano cremoso com cogumelos variados e queijo parmesão.",
      image: "https://images.unsplash.com/photo-1665088127661-83aeff6104c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGluZ3JlZGllbnRzJTIwdmVnZXRhYmxlcyUyMGNvb2tpbmd8ZW58MXx8fHwxNzU4NzYwMzU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: 35,
      servings: 4,
      difficulty: "Médio",
      category: "Massas",
      rating: 4.4,
      ingredients: [
        "320g de arroz arbóreo",
        "300g de cogumelos variados",
        "1 litro de caldo de legumes",
        "1 cebola pequena",
        "2 dentes de alho",
        "100ml de vinho branco",
        "100g de queijo parmesão",
        "Manteiga e azeite"
      ],
      instructions: [
        "Refogue a cebola e alho no azeite até dourarem.",
        "Adicione o arroz e refogue por 2 minutos.",
        "Adicione o vinho branco e deixe evaporar.",
        "Vá adicionando o caldo quente aos poucos, mexendo sempre.",
        "Em outra panela, salteie os cogumelos.",
        "Misture os cogumelos ao risotto com queijo e manteiga."
      ]
    },
    {
      id: "7",
      title: "Brigadeiro Gourmet",
      description: "O doce mais amado do Brasil em versão sofisticada e cremosa.",
      image: "https://images.unsplash.com/photo-1664505360997-2e42104797c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWxpYW4lMjBicmlnYWRlaXJvJTIwY2hvY29sYXRlfGVufDF8fHx8MTc1ODgyOTU4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: 20,
      servings: 30,
      difficulty: "Fácil",
      category: "Sobremesas",
      rating: 4.8,
      ingredients: [
        "1 lata de leite condensado",
        "3 colheres de sopa de cacau em pó",
        "2 colheres de sopa de manteiga",
        "200g de chocolate granulado",
        "1 pitada de sal",
        "1 colher de chá de essência de baunilha"
      ],
      instructions: [
        "Em panela antiaderente, misture leite condensado, cacau e manteiga.",
        "Cozinhe em fogo médio, mexendo sempre, por 10-15 minutos.",
        "O ponto certo é quando a mistura desgruda do fundo da panela.",
        "Adicione baunilha e sal, misture bem.",
        "Deixe esfriar completamente.",
        "Faça bolinhas e passe no chocolate granulado."
      ]
    },
    {
      id: "8",
      title: "Moqueca de Peixe Capixaba",
      description: "Prato tradicional do Espírito Santo com peixe, tomate e coentro.",
      image: "https://images.unsplash.com/photo-1609611181722-ae5de85a1f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWxpYW4lMjBtb3F1ZWNhJTIwZmlzaCUyMHN0ZXd8ZW58MXx8fHwxNzU4ODI5NTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: 30,
      servings: 4,
      difficulty: "Médio",
      category: "Pratos Principais",
      rating: 4.7,
      ingredients: [
        "800g de peixe badejo em postas",
        "3 tomates grandes maduros",
        "1 cebola grande",
        "1 pimentão vermelho",
        "200ml de leite de coco",
        "3 colheres de sopa de azeite de dendê",
        "Coentro fresco picado",
        "Limão, sal e pimenta"
      ],
      instructions: [
        "Tempere o peixe com limão, sal e pimenta.",
        "Refogue cebola e pimentão no azeite comum.",
        "Adicione tomate picado e cozinhe por 5 minutos.",
        "Coloque o peixe e o leite de coco.",
        "Cozinhe por 15 minutos em fogo baixo.",
        "Finalize com dendê e coentro fresco."
      ]
    },
    {
      id: "9",
      title: "Tacos Mexicanos Autênticos",
      description: "Tacos tradicionais com carne marinada, guacamole e pico de gallo.",
      image: "https://images.unsplash.com/photo-1579630941962-435bc3e43df6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjBhdXRoZW50aWN8ZW58MXx8fHwxNzU4NzcyOTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: 45,
      servings: 6,
      difficulty: "Médio",
      category: "Pratos Principais",
      rating: 4.6,
      ingredients: [
        "500g de carne bovina em tiras",
        "12 tortillas de milho",
        "2 abacates maduros",
        "3 tomates",
        "1 cebola roxa",
        "2 limas",
        "Coentro fresco",
        "Cominho e páprica",
        "Queijo mexicano"
      ],
      instructions: [
        "Marine a carne com lime, cominho e páprica por 30 minutos.",
        "Faça o guacamole amassando abacate com lima e sal.",
        "Prepare pico de gallo com tomate, cebola e coentro.",
        "Grelhe a carne em fogo alto.",
        "Aqueça as tortillas.",
        "Monte os tacos com carne, guacamole e pico de gallo."
      ]
    },
    {
      id: "10",
      title: "Pudim de Leite Condensado",
      description: "Sobremesa clássica brasileira cremosa com calda de caramelo.",
      image: "https://images.unsplash.com/photo-1702728109878-c61a98d80491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWxpYW4lMjBwdWRkaW5nJTIwZGVzc2VydHxlbnwxfHx8fDE3NTg4Mjk2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: 90,
      servings: 8,
      difficulty: "Médio",
      category: "Sobremesas",
      rating: 4.8,
      ingredients: [
        "1 lata de leite condensado",
        "1 lata de leite (use a lata do condensado)",
        "3 ovos inteiros",
        "1 xícara de açúcar para a calda",
        "1/2 xícara de água"
      ],
      instructions: [
        "Faça a calda derretendo açúcar com água até dourar.",
        "Despeje a calda na forma e espalhe.",
        "Bata no liquidificador leite condensado, leite e ovos.",
        "Despeje sobre a calda na forma.",
        "Cozinhe em banho-maria no forno por 1 hora.",
        "Deixe esfriar e desenforme gelado."
      ]
    },
    {
      id: "11",
      title: "Coxinha de Frango Caseira",
      description: "O salgadinho mais querido do Brasil, crocante por fora e cremoso por dentro.",
      image: "https://images.unsplash.com/photo-1647901102099-e5cbaba072cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWxpYW4lMjBjb3hpbmhhJTIwc25hY2t8ZW58MXx8fHwxNzU4ODI5NjA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      cookTime: 60,
      servings: 20,
      difficulty: "Médio",
      category: "Café da Manhã",
      rating: 4.9,
      ingredients: [
        "500g de peito de frango",
        "2 xícaras de farinha de trigo",
        "2 xícaras de caldo de frango",
        "2 ovos batidos",
        "1 xícara de farinha de rosca",
        "1 cebola média",
        "2 dentes de alho",
        "Cheiro-verde picado",
        "Óleo para fritar"
      ],
      instructions: [
        "Cozinhe e desfie o frango temperado.",
        "Refogue com cebola, alho e temperos.",
        "Faça a massa com farinha e caldo quente.",
        "Deixe a massa esfriar.",
        "Modele as coxinhas com recheio.",
        "Passe no ovo e farinha de rosca, frite até dourar."
      ]
    },
    {
      id: "12",
      title: "Sushi Califórnia Roll",
      description: "Sushi americano-japonês com salmão, abacate e pepino.",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGZvb2QlMjBzdXNoaXxlbnwxfHx8fDE3NTg4Mjg4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: 45,
      servings: 4,
      difficulty: "Difícil",
      category: "Pratos Principais",
      rating: 4.5,
      ingredients: [
        "2 xícaras de arroz japonês",
        "200g de salmão fresco",
        "1 abacate maduro",
        "1 pepino japonês",
        "4 folhas de nori",
        "2 colheres de vinagre de arroz",
        "1 colher de açúcar",
        "Gergelim branco",
        "Wasabi e shoyu"
      ],
      instructions: [
        "Cozinhe o arroz e tempere com vinagre e açúcar.",
        "Corte salmão, abacate e pepino em tiras.",
        "Coloque nori na esteira de bambu.",
        "Espalhe arroz sobre o nori.",
        "Adicione os ingredientes e enrole.",
        "Corte em fatias e sirva com wasabi."
      ]
    },
    {
      id: "13",
      title: "Paella Valenciana",
      description: "Prato espanhol tradicional com arroz, frutos do mar e açafrão.",
      image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFuaXNoJTIwZm9vZCUyMHBhZWxsYXxlbnwxfHx8fDE3NTg4Mjg4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: 50,
      servings: 6,
      difficulty: "Médio",
      category: "Pratos Principais",
      rating: 4.7,
      ingredients: [
        "400g de arroz bomba ou arbóreo",
        "300g de camarão",
        "300g de lulas",
        "200g de mexilhões",
        "1 frango cortado em pedaços",
        "1 pimentão vermelho",
        "200g de vagem",
        "Açafrão em fios",
        "Caldo de peixe"
      ],
      instructions: [
        "Doure o frango na paelleira com azeite.",
        "Adicione pimentão e vagem, refogue.",
        "Coloque o arroz e misture bem.",
        "Adicione caldo quente com açafrão.",
        "Cozinhe por 15 minutos sem mexer.",
        "Adicione frutos do mar nos últimos 10 minutos."
      ]
    },
    {
      id: "14",
      title: "Cheesecake de Frutas Vermelhas",
      description: "Sobremesa cremosa americana com base de biscoito e cobertura de frutas.",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbiUyMGRlc3NlcnQlMjBjaGVlc2VjYWtlfGVufDF8fHx8MTc1ODgyODg2NHww&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: 180,
      servings: 10,
      difficulty: "Médio",
      category: "Sobremesas",
      rating: 4.8,
      ingredients: [
        "300g de cream cheese",
        "200g de açúcar",
        "3 ovos",
        "200ml de creme de leite",
        "200g de biscoito maisena",
        "100g de manteiga derretida",
        "300g de frutas vermelhas variadas",
        "2 colheres de sopa de geleia de morango"
      ],
      instructions: [
        "Misture biscoito triturado com manteiga para a base.",
        "Bata cream cheese com açúcar até ficar cremoso.",
        "Adicione ovos um por vez, depois o creme de leite.",
        "Despeje sobre a base de biscoito.",
        "Asse em banho-maria por 1 hora a 160°C.",
        "Cubra com frutas e geleia derretida."
      ]
    },
    {
      id: "15",
      title: "Curry Tailandês de Frango",
      description: "Prato tailandês aromático com leite de coco e especiarias exóticas.",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwZm9vZCUyMGN1cnJ5fGVufDF8fHx8MTc1ODgyODg2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: 35,
      servings: 4,
      difficulty: "Médio",
      category: "Pratos Principais",
      rating: 4.6,
      ingredients: [
        "500g de peito de frango em cubos",
        "400ml de leite de coco",
        "2 colheres de pasta de curry verde",
        "1 berinjela pequena",
        "1 pimentão vermelho",
        "100g de vagem",
        "2 folhas de lima kaffir",
        "1 colher de açúcar de palma",
        "Manjericão tailandês"
      ],
      instructions: [
        "Refogue a pasta de curry no óleo até perfumar.",
        "Adicione parte do leite de coco e misture.",
        "Coloque o frango e cozinhe por 10 minutos.",
        "Adicione vegetais e resto do leite de coco.",
        "Tempere com açúcar e folhas de lima.",
        "Finalize com manjericão tailandês fresco."
      ]
    },
    {
      id: "16",
      title: "Açaí na Tigela Gourmet",
      description: "Sobremesa brasileira nutritiva com frutas frescas e granola crocante.",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWxpYW4lMjBhY2FpJTIwYm93bHxlbnwxfHx8fDE3NTg4Mjg4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: 10,
      servings: 2,
      difficulty: "Fácil",
      category: "Sobremesas",
      rating: 4.7,
      ingredients: [
        "200g de polpa de açaí congelada",
        "1 banana congelada",
        "100ml de guaraná natural",
        "1 colher de mel",
        "Granola caseira",
        "Morangos frescos",
        "Banana em fatias",
        "Coco ralado",
        "Castanhas variadas"
      ],
      instructions: [
        "Bata no liquidificador açaí, banana e guaraná.",
        "Adicione mel e bata até ficar cremoso.",
        "Despeje em tigelas geladas.",
        "Decore com frutas frescas em fileiras.",
        "Adicione granola e coco ralado.",
        "Finalize with castanhas picadas."
      ]
    },
    {
      id: "17",
      title: "Pasta Italiana al Pomodoro",
      description: "Macarrão clássico italiano com molho de tomate fresco e manjericão.",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc9d3c52b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGFzdGElMjB0b21hdG98ZW58MXx8fHwxNzU4ODI4ODcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: 25,
      servings: 4,
      difficulty: "Fácil",
      category: "Massas",
      rating: 4.5,
      ingredients: [
        "400g de espaguete",
        "6 tomates maduros",
        "4 dentes de alho",
        "1 cebola pequena",
        "100ml de azeite extravirgem",
        "Manjericão fresco",
        "Queijo parmesão ralado",
        "Sal e pimenta-do-reino",
        "Açúcar cristal"
      ],
      instructions: [
        "Escalde os tomates e retire a pele, pique grosso.",
        "Refogue alho e cebola no azeite até dourar.",
        "Adicione tomates e cozinhe por 15 minutos.",
        "Tempere com sal, pimenta e uma pitada de açúcar.",
        "Cozinhe a massa al dente.",
        "Misture com o molho e manjericão fresco."
      ]
    },
    {
      id: "18",
      title: "Hambúrguer Artesanal Gourmet",
      description: "Hambúrguer caseiro com carne de qualidade e ingredientes frescos.",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwaGFtYnVyZ2VyfGVufDF8fHx8MTc1ODgyODg3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: 30,
      servings: 4,
      difficulty: "Médio",
      category: "Pratos Principais",
      rating: 4.8,
      ingredients: [
        "600g de carne moída (acém + patinho)",
        "4 pães de hambúrguer artesanais",
        "4 fatias de queijo cheddar",
        "2 tomates grandes",
        "1 cebola roxa",
        "Folhas de alface",
        "4 fatias de bacon",
        "Maionese temperada",
        "Molho barbecue"
      ],
      instructions: [
        "Tempere a carne com sal e pimenta, forme os hambúrguers.",
        "Grelhe os hambúrguers por 4 minutos de cada lado.",
        "Frite o bacon até ficar crocante.",
        "Torre levemente os pães.",
        "Monte: pão, maionese, alface, hambúrguer, queijo.",
        "Complete com tomate, cebola, bacon e molho barbecue."
      ]
    },
    {
      id: "19",
      title: "Tiramisu Clássico Italiano",
      description: "Sobremesa italiana sofisticada com café, mascarpone e cacau.",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwZGVzc2VydCUyMHRpcmFtaXN1fGVufDF8fHx8MTc1ODgyODg3NHww&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: 30,
      servings: 8,
      difficulty: "Médio",
      category: "Sobremesas",
      rating: 4.9,
      ingredients: [
        "300g de biscoito champagne",
        "500g de mascarpone",
        "4 gemas de ovo",
        "100g de açúcar",
        "300ml de café expresso forte",
        "3 colheres de licor de café",
        "3 claras em neve",
        "Cacau em pó para polvilhar"
      ],
      instructions: [
        "Bata gemas com açúcar até ficar esbranquiçado.",
        "Misture delicadamente com mascarpone.",
        "Incorpore as claras em neve.",
        "Misture café com licor em prato fundo.",
        "Molhe rapidamente cada biscoito no café.",
        "Alterne camadas de biscoito e creme, polvilhe cacau."
      ]
    },
    {
      id: "20",
      title: "Bobó de Camarão Baiano",
      description: "Prato tradicional da Bahia cremoso com camarão e mandioca.",
      image: "https://images.unsplash.com/photo-1562059390-a761a084768e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWxpYW4lMjBzZWFmb29kJTIwc3Rld3xlbnwxfHx8fDE3NTg4Mjg4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: 45,
      servings: 6,
      difficulty: "Médio",
      category: "Pratos Principais",
      rating: 4.8,
      ingredients: [
        "800g de camarão grande",
        "500g de mandioca",
        "200ml de leite de coco",
        "3 colheres de azeite de dendê",
        "2 tomates maduros",
        "1 cebola grande",
        "1 pimentão amarelo",
        "3 dentes de alho",
        "Coentro e cebolinha"
      ],
      instructions: [
        "Cozinhe a mandioca e amasse até virar purê.",
        "Tempere o camarão e reserve.",
        "Refogue cebola, alho, tomate e pimentão.",
        "Adicione o purê de mandioca e leite de coco.",
        "Cozinhe até engrossar, adicione o camarão.",
        "Finalize com dendê e cheiro-verde."
      ]
    }
  ];

  const handleToggleFavorite = (recipeId: string) => {
    setFavorites(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleSearch = (ingredients: string[]) => {
    // Simula busca por ingredientes
    const results = mockRecipes.filter(recipe => 
      ingredients.some(ingredient => 
        recipe.ingredients.some(recipeIngredient => 
          recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
        )
      )
    );
    setSearchResults(results);
    setCurrentSection("search-results");
  };

  const handleGenerateRandom = () => {
    const randomRecipe = mockRecipes[Math.floor(Math.random() * mockRecipes.length)];
    setSelectedRecipe({...randomRecipe, isFavorite: favorites.includes(randomRecipe.id)});
  };

  const handleSelectCategory = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
    setCurrentSection("recipes");
  };

  const getFilteredRecipes = () => {
    return mockRecipes.filter(recipe => {
      if (filters.category !== "Todas" && recipe.category !== filters.category) return false;
      if (filters.difficulty !== "Todas" && recipe.difficulty !== filters.difficulty) return false;
      if (recipe.cookTime > filters.maxTime) return false;
      if (recipe.rating < filters.minRating) return false;
      return true;
    }).map(recipe => ({
      ...recipe,
      isFavorite: favorites.includes(recipe.id)
    }));
  };

  const getFavoriteRecipes = () => {
    return mockRecipes.filter(recipe => favorites.includes(recipe.id))
      .map(recipe => ({ ...recipe, isFavorite: true }));
  };

  const getRandomIngredients = () => {
    const allIngredients = [
      // Proteínas
      "Frango", "Carne bovina", "Peixe", "Camarão", "Ovos", "Linguiça", "Bacon", "Presunto",
      "Peito de peru", "Salmão", "Sardinha", "Atum", "Costela", "Picanha", "Coxão mole",
      
      // Laticínios
      "Leite", "Queijo", "Requeijão", "Cream cheese", "Iogurte", "Manteiga", "Nata",
      "Queijo prato", "Mussarela", "Parmesão", "Ricota", "Leite condensado",
      
      // Carboidratos
      "Arroz", "Macarrão", "Batata", "Batata doce", "Mandioca", "Pão", "Aveia",
      "Quinoa", "Tapioca", "Farinha de trigo", "Polenta", "Nhoque",
      
      // Vegetais salgados
      "Tomate", "Cebola", "Alho", "Cenoura", "Brócolis", "Pimentão", "Abobrinha",
      "Berinjela", "Couve", "Espinafre", "Rúcula", "Alface", "Pepino", "Beterraba",
      "Couve-flor", "Vagem", "Ervilha", "Milho", "Chuchu", "Abóbora",
      
      // Frutas doces
      "Banana", "Maçã", "Morango", "Abacaxi", "Manga", "Uva", "Laranja", "Limão",
      "Abacate", "Coco", "Mamão", "Pêra", "Kiwi", "Maracujá", "Açaí", "Pitanga",
      
      // Doces e açúcares
      "Açúcar", "Mel", "Chocolate", "Cacau", "Açúcar mascavo", "Açúcar cristal",
      "Doce de leite", "Nutella", "Geleia", "Coco ralado",
      
      // Temperos e ervas
      "Azeite", "Vinagre", "Sal", "Pimenta", "Orégano", "Manjericão", "Salsa",
      "Cebolinha", "Coentro", "Alecrim", "Tomilho", "Páprica", "Cominho",
      
      // Grãos e castanhas
      "Feijão", "Lentilha", "Grão-de-bico", "Castanha", "Amendoim", "Nozes",
      "Amêndoas", "Castanha do Pará", "Gergelim", "Chia", "Linhaça",
      
      // Outros
      "Cogumelos", "Azeitona", "Palmito", "Shoyu", "Mostarda", "Ketchup",
      "Maionese", "Vinagre balsâmico", "Vinho", "Cerveja"
    ];
    
    const shuffled = allIngredients.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  };

  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header onNavigate={setCurrentSection} currentSection={currentSection} />
        <main className="container mx-auto px-6 py-10 max-w-7xl">
          <RecipeDetails 
            recipe={selectedRecipe}
            onBack={() => setSelectedRecipe(null)}
            onToggleFavorite={handleToggleFavorite}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={setCurrentSection} currentSection={currentSection} />
      
      <main className="container mx-auto px-6 py-10 max-w-7xl">
        {currentSection === "home" && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-8 py-16">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Descubra Receitas Incríveis para 
                <span className="text-primary"> Qualquer Ocasião</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Olá! Sou seu assistente de IA para receitas. Transformo os ingredientes que você tem 
                em casa em pratos extraordinários. Rápido, fácil e sempre delicioso!
              </p>
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Receitas testadas
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  IA inteligente
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Sempre grátis
                </div>
              </div>
            </div>

            {/* Search Section */}
            <div className="flex justify-center">
              <RecipeSearch 
                onSearch={handleSearch}
                onGenerateRandom={handleGenerateRandom}
              />
            </div>

            {/* Random Ingredients Suggestion */}
            <Card className="max-w-4xl mx-auto shadow-lg border-2 border-dashed border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-xl">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  Inspiração do Dia
                </CardTitle>
                <p className="text-muted-foreground">
                  Que tal criar algo especial com estes ingredientes?
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {getRandomIngredients().map((ingredient) => (
                    <Badge 
                      key={ingredient} 
                      variant="outline" 
                      className="justify-center py-2 text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      {ingredient}
                    </Badge>
                  ))}
                </div>
                <div className="text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.reload()}
                    className="transition-all hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar Nova Inspiração
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Categories onSelectCategory={handleSelectCategory} />

            {/* Quick Recipes */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-semibold">Receitas Populares</h2>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Descubra as receitas mais queridas pela nossa comunidade
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockRecipes.slice(0, 8).map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={{...recipe, isFavorite: favorites.includes(recipe.id)}}
                    onToggleFavorite={handleToggleFavorite}
                    onViewDetails={setSelectedRecipe}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentSection === "recipes" && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold">Explore Todas as Receitas</h1>
              <p className="text-muted-foreground text-lg">
                Encontre a receita perfeita usando nossos filtros inteligentes
              </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
              <div className="xl:col-span-1">
                <div className="sticky top-24">
                  <RecipeFilters filters={filters} onFiltersChange={setFilters} />
                </div>
              </div>
              <div className="xl:col-span-4">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">
                      {getFilteredRecipes().length} receitas encontradas
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {getFilteredRecipes().map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onToggleFavorite={handleToggleFavorite}
                        onViewDetails={setSelectedRecipe}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSection === "favorites" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              <h1 className="text-3xl font-bold">Minhas Receitas Favoritas</h1>
            </div>
            {getFavoriteRecipes().length === 0 ? (
              <Card className="text-center p-12">
                <CardContent>
                  <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma receita favorita ainda</h3>
                  <p className="text-muted-foreground mb-4">
                    Comece explorando receitas e adicione suas favoritas clicando no coração.
                  </p>
                  <Button onClick={() => setCurrentSection("recipes")}>
                    Explorar Receitas
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getFavoriteRecipes().map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onToggleFavorite={handleToggleFavorite}
                    onViewDetails={setSelectedRecipe}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {currentSection === "search" && (
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Busca Inteligente</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Nossa IA analisa seus ingredientes e encontra as receitas mais compatíveis. 
                Quanto mais ingredientes você adicionar, melhores serão as sugestões!
              </p>
            </div>
            
            <div className="flex justify-center">
              <RecipeSearch 
                onSearch={handleSearch}
                onGenerateRandom={handleGenerateRandom}
              />
            </div>
          </div>
        )}

        {currentSection === "search-results" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Resultados da Busca</h1>
              <Button variant="outline" onClick={() => setCurrentSection("search")}>
                Nova Busca
              </Button>
            </div>
            
            {searchResults.length === 0 ? (
              <Card className="text-center p-12">
                <CardContent>
                  <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma receita encontrada</h3>
                  <p className="text-muted-foreground mb-4">
                    Tente com outros ingredientes ou explore nossas receitas populares.
                  </p>
                  <Button onClick={() => setCurrentSection("search")}>
                    Tentar Novamente
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    {searchResults.length} receitas encontradas
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {searchResults.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={{...recipe, isFavorite: favorites.includes(recipe.id)}}
                      onToggleFavorite={handleToggleFavorite}
                      onViewDetails={setSelectedRecipe}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}