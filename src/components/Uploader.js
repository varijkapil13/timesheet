import * as React from "react";
import Paper      from "@material-ui/core/Paper/Paper";
import Grid       from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import TextField  from "@material-ui/core/TextField/TextField";
import Button     from "@material-ui/core/Button";

class Uploader extends React.Component {
    render() {
        return (
            <Grid>
                {/*// Holidays uploader*/}
                <Paper elevation={7}>
                    <Grid container justify={"center"} direction={"row"} spacing={24}>
                        <Grid item xs={12} sm={6} md={3}>
                            <br/>
                            <br/>
                            <Typography variant={"title"}>
                                Holidays + Leaves Upload:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                id="dateFormat"
                                label="Date Format"
                                value={this.props.holidayDateFormat}
                                onChange={(e) => this.props.handleHolidayDateFormat(e)}
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <br/>
                            <input type="file" style={{display: 'none'}}
                                   id="raised-button-file"
                                   onChange={(e) => this.props.fileUploadHandler(false, e.target.files[0])}
                                   onClick={(event) => {
                                       event.target.value = null
                                   }}/>

                            <label htmlFor="raised-button-file">
                                <Button
                                    variant="raised"
                                    component="span">
                                    Select File
                                </Button>
                            </label>
                        </Grid>

                    </Grid>
                    <br/>
                    <br/>

                </Paper>
                {/*// Timesheet uploader*/}
                <Paper elevation={5}>
                    <Grid container justify={"center"} direction={"row"} spacing={40}>
                        <Grid item xs={12} sm={6} md={2}>
                            <br/>
                            <br/>
                            <Typography variant={"title"}>
                                Timely Sheet Upload:
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                id="dateFormat"
                                label="Date Format"
                                value={this.props.dateFormat}
                                onChange={(e) => this.props.handleDateFormat(e)}
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                id="startRow"
                                label="Starting Row"
                                value={this.props.startRow}
                                onChange={(e) => this.props.handleStartRow(e)}
                                type="Number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                id="startRow"
                                label="Total Row"
                                value={this.props.totalRow}
                                onChange={(e) => this.props.handleTotalRow(e)}
                                type="Number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <br/>
                            <input type="file" style={{display: 'none'}}
                                   id="raised-button-file-timesheet"
                                   onChange={(e) => this.props.fileUploadHandler(true, e.target.files[0])}
                                   onClick={(event) => {
                                       event.target.value = null
                                   }}/>

                            <label htmlFor="raised-button-file-timesheet">
                                <Button
                                    variant="raised"
                                    component="span">
                                    Select File
                                </Button>
                            </label>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>
        )
    };
}

export default Uploader;