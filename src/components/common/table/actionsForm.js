import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.white.main,
  },
  deleteButton: {
    background: theme.palette.red.main,
    color: theme.palette.white.main,
    "&:hover": {
      background: theme.palette.red.dark,
    },
  },
}));

function Actions({
  selectedFlatRows,
  push,
  redirect,
  redirect_create,
  actionButtonName,
  handleSearchClick,
  archive_essentials,
  un_archive_essentials,
  get_essentials,
  query_essentials,
  redirect_createsub,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const editDisabled =
    selectedFlatRows.length === 0 || selectedFlatRows.length > 1;
  const deleteDisabled = selectedFlatRows.length <= 0;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const render_actions = () => {
    if (selectedFlatRows.length > 0) {
      const edit_disabled = selectedFlatRows.length > 1;
      return (
        <>
          <Button
            color="primary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            stye={{
              letterSpace: "1px",
            }}
          >
            Actions
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                let _id = selectedFlatRows[0].original._id;
                handleClose();
                push(`${redirect}?_id=${_id}`);
              }}
              disabled={edit_disabled}
            >
              EDIT
            </MenuItem>
            <MenuItem onClick={handleClose}>DELETE </MenuItem>
          </Menu>
        </>
      );
    } else {
      return;
    }
  };

  return (
    <div
      className="mb-2"
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineOutlinedIcon />}
        onClick={() => {
          push(`${redirect_create}`);
        }}
        className={clsx("mr-2", classes.button)}
      >
        Add {actionButtonName}
      </Button>

      {actionButtonName === "Category" && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => {
            push(`${redirect_createsub}`);
          }}
          className={clsx("mr-2", classes.button)}
        >
          Add Sub {actionButtonName}
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        disabled={editDisabled}
        startIcon={<EditIcon />}
        onClick={() => {
          let _id = selectedFlatRows[0].original._id;
          handleClose();
          push(`${redirect}?_id=${_id}`);
        }}
        className={clsx("mr-2", classes.button)}
      >
        Edit {actionButtonName}
      </Button>
      {/* We might want to toggle search later. If so add column.canFilter && showSearch in Table.js and uncomment the button */}
      {/* <Button
        variant="contained"
        startIcon={<SearchIcon />}
        color="primary"
        onClick={handleSearchClick}
        className={clsx("mr-2", classes.button)}
      >
        Search {actionButtonName}
      </Button> */}
      <Button
        variant="contained"
        disabled={deleteDisabled}
        startIcon={<DeleteIcon />}
        className={classes.deleteButton}
        onClick={() => {
          let _ids = selectedFlatRows.map((item) => {
            return item.original._id;
          });

          handleClose();
          archive_essentials({ _ids, type: actionButtonName }, () => {
            query_essentials(actionButtonName);
            get_essentials(actionButtonName);
          });
        }}
      >
        Archive{" "}
        {actionButtonName === "Category"
          ? "Categories"
          : `${actionButtonName}s`}
      </Button>
    </div>
  );
}

Actions.propTypes = {};

export default Actions;
