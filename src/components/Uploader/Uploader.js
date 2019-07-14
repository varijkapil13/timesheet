// @flow
import React from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button';

type Props = {
  title: string,
  dateFormatValue: string,
  dateFormatHandler: (event: any) => void,
  fileUploadHandler: (event: boolean, files: any) => void,
  fileName?: string
};

class Uploader extends React.Component<Props> {
  render() {
    return (
      <Grid>
        {/*// Holidays uploader*/}
        <Paper elevation={7}>
          <Grid container justify={'center'} direction={'row'} spacing={24}>
            <Grid item xs={12} sm={6} md={3}>
              <br />
              <br />
              <Typography variant={'title'}>{this.props.title}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                id="dateFormat"
                label="Date Format"
                value={this.props.dateFormatValue}
                onChange={e => this.props.dateFormatHandler(e)}
                type="text"
                InputLabelProps={{
                  shrink: true
                }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <br />
              <input
                type="file"
                style={{display: 'none'}}
                id="raised-button-file"
                onChange={e => this.props.fileUploadHandler(false, e.target.files[0])}
                onClick={event => {
                  event.target.value = null;
                }}
              />

              <label htmlFor="raised-button-file">
                <Button variant="raised" component="span">
                  Select File
                </Button>
              </label>
            </Grid>
          </Grid>
          <br />
          <br />
        </Paper>
      </Grid>
    );
  }
}

export default Uploader;
