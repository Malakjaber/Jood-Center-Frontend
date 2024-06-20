import Dropdown from "@mui/joy/Dropdown";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";
import IconButton from "@mui/joy/IconButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Menu from "@mui/joy/Menu";
import { DeleteForever, Edit, MoreVert } from "@mui/icons-material";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { useState } from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

function AlertDialogModal({ open, setOpen, id, handleConfirmRemove }) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog size="lg" variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon />
          Confirmation
        </DialogTitle>
        <Divider />
        <DialogContent>
          Are you sure you want to remove this class?
        </DialogContent>
        <DialogActions>
          <Button
            variant="solid"
            color="danger"
            onClick={() => {
              setOpen(false);
              handleConfirmRemove(id);
            }}
          >
            Remove
          </Button>
          <Button
            variant="plain"
            color="neutral"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}

const PositionedMenu = ({ id, handleConfirmRemove }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown>
      <AlertDialogModal
        open={isOpen}
        setOpen={setIsOpen}
        id={id}
        handleConfirmRemove={handleConfirmRemove}
      />
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "outlined", color: "neutral" } }}
      >
        <MoreVert />
      </MenuButton>
      <Menu placement="bottom-end">
        <MenuItem component={Link} to={`/edit-class/${id}`}>
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>
          Edit
        </MenuItem>
        <MenuItem
          variant="soft"
          color="danger"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <ListItemDecorator sx={{ color: "inherit" }}>
            <DeleteForever />
          </ListItemDecorator>
          Remove
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default function ClassCard({ classData, handleConfirmRemove }) {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          pt: 2,
          pr: 2,
          zIndex: 44,
        }}
      >
        <PositionedMenu
          id={classData.class_id}
          handleConfirmRemove={handleConfirmRemove}
        />
      </Box>
      <Card
        component={Link}
        to={`/class/${classData.class_id}`}
        className="class-card"
        sx={{
          border: "unset",
          padding: 4,
          boxShadow:
            "rgba(60, 60, 60, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
        }}
      >
        <Typography level="h3" sx={{ color: "#23A6F0", fontWeight: "bold" }}>
          {classData.className}
        </Typography>

        <Box>
          <Typography
            level="title-md"
            sx={{ color: "#888888", fontWeight: "bold" }}
          >
            Teacher: {classData.teacherName}
          </Typography>
          <Typography
            level="title-md"
            sx={{ color: "#888888", fontWeight: "bold" }}
          >
            <Typography sx={{ color: "#666666", fontWeight: "bold" }}>
              {classData.studentCount}
            </Typography>{" "}
            Students
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
