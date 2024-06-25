import {
  Apple,
  CakeSlice,
  Ham,
  LucideIcon,
  Milk,
  Salad,
  Sparkles,
  Vegan,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { buttonVariants } from "../../components/Button";

type TCategory = { label: string; icon: LucideIcon; name: string };

const categories: TCategory[] = [
  { label: "All Menu", icon: Sparkles, name: "all" },
  { label: "Bakery", icon: CakeSlice, name: "bakery" },
  { label: "Dairy", icon: Milk, name: "dairy" },
  { label: "Fruit", icon: Apple, name: "fruit" },
  { label: "Meat", icon: Ham, name: "meat" },
  { label: "Vegan", icon: Vegan, name: "vegan" },
  { label: "Vegetable", icon: Salad, name: "vegetable" },
];

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const selected = !search && (category || "all");

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
      {categories.map((category) => (
        <li key={category.name}>
          <Link
            className={buttonVariants({
              variant: category.name !== selected ? "outlined" : "primary",
              className: "w-full",
            })}
            to={`?category=${category.name}`}
          >
            <category.icon />
            {category.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
