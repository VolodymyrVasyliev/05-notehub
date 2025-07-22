import css from "./SearchBox.module.css";

// interface SearchBoxProps {
//   value: string;
//   onSearch: (newSearchQuery: string) => void;
// }

export default function SearchBox() {
  return <input className={css.input} type="text" placeholder="Search notes" />;
}
