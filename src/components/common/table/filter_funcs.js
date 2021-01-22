import React from "react";
import { matchSorter } from "match-sorter";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

// const useInputStyles = makeStyles((theme) => ({
//   input: {
//     paddingBottom: "20px",
//   },
// }));

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  // const classes = useInputStyles();
  const count = preFilteredRows.length;

  return (
    <Input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      // placeholder={`Search ${count} records...`}
      placeholder={`Search...`}
      startAdornment={<SearchIcon style={{ color: "#A6A6A6" }} />}
    />
  );
}
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      className="form-control "
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
export { DefaultColumnFilter, fuzzyTextFilterFn, SelectColumnFilter };
