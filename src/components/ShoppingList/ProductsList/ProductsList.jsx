import React, { Component } from "react";

import {
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
  Box,
  Checkbox,
  Collapse,
  TextField,
} from "@mui/material";

import { TransitionGroup } from "react-transition-group";

import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";

export default class ProductsList extends Component {
  state = {
    editingProductId: "",
    editTextValue: "",
  };

  onProductChange = (e) => {
    this.setState({
      editTextValue: e.target.value,
    });
  };

  editBtnClick = (id, text) => {
    this.setState({
      editingProductId: id,
      editTextValue: text,
    });
  };

  saveEditingChanges = () => {
    const { editingProductId, editTextValue } = this.state;
    this.props.onEdit(editingProductId, editTextValue);

    this.setState({
      editingProductId: "",
      editTextValue: "",
    });
  };

  render() {
    const { productsArray, onDelete } = this.props;
    const { editingProductId, editTextValue } = this.state;

    return (
      <List
        sx={{
          width: "100%",
          ml: "20px",
        }}
      >
        <TransitionGroup>
          {productsArray.map((el) => {
            const { id, text, isDone } = el;

            return (
              <Collapse key={id}>
                <ListItem>
                  <Paper
                    elevation={6}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: "5px",
                      px: "15px",
                    }}
                  >
                    {editingProductId === id ? (
                      <TextField
                        autoFocus
                        variant="standard"
                        value={editTextValue}
                        onChange={this.onProductChange}
                        onBlur={this.saveEditingChanges}
                      />
                    ) : (
                      <Typography
                        sx={() => {
                          return isDone
                            ? {
                                textDecoration: "line-through",
                                color: "#00c853",
                              }
                            : {};
                        }}
                      >
                        {text}
                      </Typography>
                    )}

                    <Box>
                      <Checkbox
                        color="success"
                        checked={isDone}
                        onChange={(e) => this.props.onStatusChange(e, id)}
                      />

                      {editingProductId === id ? (
                        <IconButton onClick={this.saveEditingChanges}>
                          <SaveIcon color="success" />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => this.editBtnClick(id, text)}
                          disabled={isDone}
                        >
                          <EditIcon color={isDone ? "disabled" : "primary"} />
                        </IconButton>
                      )}

                      <IconButton onClick={() => onDelete(id)}>
                        <ClearIcon color="error" />
                      </IconButton>
                    </Box>
                  </Paper>
                </ListItem>
              </Collapse>
            );
          })}
        </TransitionGroup>
      </List>
    );
  }
}
