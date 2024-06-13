import * as React from "react";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import MoreVert from "@mui/icons-material/MoreVert";
import Edit from "@mui/icons-material/Edit";
import DeleteForever from "@mui/icons-material/DeleteForever";
import MenuButton from "@mui/joy/MenuButton";
import Dropdown from "@mui/joy/Dropdown";
import { Link } from "react-router-dom";

export default function PositionedMenu({ handleRemoveStudent, studentId }) {
  return (
    <Dropdown>
      <MenuButton slots={{ root: IconButton }}>
        <MoreVert />
      </MenuButton>
      <Menu placement="bottom-end">
        <MenuItem component={Link} to={`/student/${studentId}/edit`}>
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => handleRemoveStudent(studentId)}
          variant="soft"
          color="danger"
        >
          <ListItemDecorator sx={{ color: "inherit" }}>
            <DeleteForever />
          </ListItemDecorator>
          Remove
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
