import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from '../../common/Wording.js';
import { closeTakebackAcceptDialog } from '../../features/dialog/takebackAcceptDialogSlice';
import WsAction from '../../ws/WsAction';

const TakebackAcceptDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleTakebackAccept = (event) => {
    event.preventDefault();
    WsAction.takeback(state, Wording.verb.ACCEPT.toLowerCase()).then(() => {
      WsAction.undo(state).then(() => {
        dispatch(closeTakebackAcceptDialog());
      });
    });
  };

  const handleTakebackDecline = (event) => {
    event.preventDefault();
    WsAction.takeback(state, Wording.verb.DECLINE.toLowerCase()).then(() => {
      dispatch(closeTakebackAcceptDialog());
    });
  };

  return (
    <Dialog
      open={state.takebackAcceptDialog.open}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>A takeback is being proposed</DialogTitle>
      <DialogContent>
        <form onSubmit={handleTakebackAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={() => dispatch(closeTakebackAcceptDialog())}>
              Decline
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TakebackAcceptDialog;
