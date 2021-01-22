import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
  useRowSelect,
} from "react-table";
import { DefaultColumnFilter, fuzzyTextFilterFn } from "./filter_funcs";
import makeData from "./makeData";
import Styles from "./TableStyle";
import { setColor } from "../../styles/global";
import Actions from "./actionsForm";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" className="" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.white.main,

    textAlign: "center",
    // borderCollapse: "collapse",
    "& > thead tr:first-child": {
      // background: theme.palette.primary.main,
      color: theme.palette.primary.main,
      "& th": {
        border: ".0625rem solid #dee2e6",
        borderBottom: "none",
      },
    },
    "& td, & th": {
      verticalAlign: "middle !important",
    },
  },
}));
function Table({
  columns,
  data,
  push,
  redirect,
  redirect_create,
  actionButtonName,
  numberOfColumns,
  archive_essentials,
  un_archive_essentials,
  get_essentials,
  query_essentials,
  redirect_createsub,
}) {
  const classes = useStyles();
  const [showSearch, setShowSearch] = useState(false);
  const data_val = React.useMemo(() => makeData(1000), []);
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data: data || [],
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => {
              return (
                <div className="text-center">
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              );
            },
          },
          ...columns,
        ];
      });
    }
  );

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  return (
    // <Styles className="table-responsive container-fluid ">
    <>
      <Actions
        selectedFlatRows={selectedFlatRows}
        push={push}
        redirect={redirect}
        redirect_create={redirect_create}
        actionButtonName={actionButtonName}
        handleSearchClick={handleSearchClick}
        archive_essentials={archive_essentials}
        un_archive_essentials={un_archive_essentials}
        get_essentials={get_essentials}
        query_essentials={query_essentials}
        redirect_createsub={redirect_createsub}
      />
      <table
        {...getTableProps()}
        className={clsx("table table-bordered table-hover", classes.root)}
      >
        {/* <table {...getTableProps()} className={clsx("", classes.root)}> */}
        <thead>
          {headerGroups.map((headerGroup, indexOfHeaderGroup) => {
            return (
              <>
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                      {/* Render the columns filter UI */}

                      {/* <div style={{ maxWidth: "100%" }}>
                        {column.canFilter && showSearch
                          ? column.render("Filter")
                          : null}
                        </div> */}
                    </th>
                  ))}
                </tr>
                {/* numberOfColumns is the number of columns of childs (if there's not parent group). This is necessary not to render parent twice. We only need to add a new row. */}
                {headerGroup.headers.length === numberOfColumns ? (
                  // <tr {...headerGroup.getHeaderGroupProps()}>
                  // Need to provide a unique key for this tr
                  <tr
                    key={`${headerGroup.getHeaderGroupProps()} ${indexOfHeaderGroup}`}
                    role="row"
                  >
                    {headerGroup.headers.map((column, indexOfColumn) => (
                      <th {...column.getHeaderProps()}>
                        {/* We only want to show search in the first column */}
                        {indexOfColumn === 0 ? "" : undefined}
                        {column.canFilter ? column.render("Filter") : null}
                      </th>
                    ))}
                  </tr>
                ) : null}
              </>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        className="pagination"
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "5px",

          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <button
            className="btn btn-sm "
            style={{
              color: "#fff",
              backgroundColor: setColor.primaryColor,
            }}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>{" "}
          <button
            className="btn btn-sm "
            style={{
              color: "#fff",
              backgroundColor: setColor.primaryColor,
            }}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"<"}
          </button>{" "}
          <button
            className="btn btn-sm "
            style={{
              color: "#fff",
              backgroundColor: setColor.primaryColor,
            }}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {">"}
          </button>{" "}
          <button
            className="btn btn-sm "
            style={{
              color: "#fff",
              backgroundColor: setColor.primaryColor,
            }}
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
        </div>

        <span
          className="p-1"
          style={{
            fontSize: "0.9rem",
          }}
        >
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        {/* <span>
            | Go to page:{" "}
            <input
              className=""
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "} */}
      </div>
    </>
    // </Styles>
  );
}

Table.propTypes = {};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = { push };

export default connect(null, mapDispatchToProps)(Table);
