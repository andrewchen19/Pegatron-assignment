import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  label: string;
  name: string;
  value: string;
  size?: string;
}

const SearchInput = ({ label, name, value, size }: Props) => {
  const [inputValue, setInputValue] = useState(value);

  const location = useLocation();
  const navigate = useNavigate();

  let timeoutId: NodeJS.Timeout;

  const debouncedSearchHandler = (value: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const { pathname, search } = location;

      const searchParams = new URLSearchParams(search);

      searchParams.set("search", value);
      searchParams.set("page", "");
      navigate(`${pathname}?${searchParams.toString()}`);
    }, 700);
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedSearchHandler(newValue);
  };

  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text font-montserrat">{label}</span>
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={inputValue}
        onChange={searchHandler}
        className={`input input-bordered ${size || "input-sm lg:input-md"}`}
      />
    </div>
  );
};

export default SearchInput;
