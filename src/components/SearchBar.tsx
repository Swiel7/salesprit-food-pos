import { Form, useSearchParams } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const value = searchParams.get("search") || "";

  return (
    <Form className="flex [&>div]:w-full">
      <Input
        type="search"
        name="search"
        placeholder="Search"
        className="rounded-r-none"
        defaultValue={value}
      />
      <Button className="rounded-l-none">
        <Search />
      </Button>
    </Form>
  );
};

export default SearchBar;
