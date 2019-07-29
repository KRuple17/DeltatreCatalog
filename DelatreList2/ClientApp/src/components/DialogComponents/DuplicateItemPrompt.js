import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DuplicateItemPrompt(props) {
  const [open, setOpen] = React.useState(false);

  function handleOk() {
    props.closeDialogFn();
    setOpen(false)
  }

  function handleCancel() {
    setOpen(false)
  }

  async function openPrompt() {
    var itemIsDuplicate = await props.itemCheckFn();
    if(itemIsDuplicate) {
        setOpen(true);
    }
  }

    return (
        <div>
            <Button onClick={openPrompt} color="primary" autoFocus>
                Yes
            </Button>
            <Dialog
                id="duplicateItemPrompt"
                open={open}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Duplicate Item Name"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    The Item you are trying to add is already in the catalog.
                    Please choose a different name.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleOk} color="primary" autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
