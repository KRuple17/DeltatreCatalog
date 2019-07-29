import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DuplicateItemPrompt from './DuplicateItemPrompt';

export default function AddItemDialog(props) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleCancel() {
    setOpen(false)
  }

  function handleItemCheck() {
    var response = props.handleSubmitFn();
    if(response || response === undefined) {
      setOpen(true)
    }
    else {
      setOpen(false)
    }
    return response;
  }

  function hideEditPage() {
    props.hideFormFn();
  }

  return (
    <div id="addItemButtons">
      <Button
        id="submitItemButton" 
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}>
        Submit
      </Button>
      <Button
          id="cancelEditButton" 
          variant="outlined" 
          color="primary" 
          onClick={hideEditPage}>
          Cancel
      </Button>
      <Dialog
        id="addItemDialog"
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please confirm you want to add this item to the catalog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            No
          </Button>
          <DuplicateItemPrompt
            itemCheckFn={handleItemCheck}
            closeDialogFn={handleCancel} />
        </DialogActions>
      </Dialog>
    </div>
  );
}