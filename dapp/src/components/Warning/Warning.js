import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export const Warning = (props) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    autoHideDuration={6000}
    open={props.warning.open}
    onRequestClose={props.handleWarningClose}
    SnackbarContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{props.warning.message}</span>}
  />
)

export default Warning;