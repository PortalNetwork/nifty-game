import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
} from 'material-ui/Dialog';

export default class extends Component{    


    /*
    *
    *  isOpenAlert 開啟pop的狀態 : bool
    *  handleAlertClose 關閉狀態 : function
    *  errorMessage 要顯示的 Error 訊息 : String
    * 
    */ 

    render() {
        const {isOpenAlert, handleAlertClose, errorMessage } = this.props;
        return (
            <Dialog
              open={isOpenAlert}
              onClose={handleAlertClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {errorMessage}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleAlertClose} color="primary" autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
        )	
    }
}