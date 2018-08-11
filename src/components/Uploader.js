import * as React       from "react";
import Button           from "@material-ui/core/Button";
import Grid             from "@material-ui/core/Grid/Grid";
import TextField        from "@material-ui/core/TextField/TextField";

// Number.prototype.display_hours_minutes = function () {
//     const remainder     = this % 1;
//     const remainderTime = new Date(remainder * 3600 * 1000);
//     return Math.floor(this) + ':' + ('0' + remainderTime.getMinutes()).slice(-2);
//
// };

class Uploader extends React.Component {
    render() {
        return (
            <Grid container justify={"center"} direction={"row"} spacing={40}>
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
                           id="raised-button-file"
                           onChange={(e) => this.props.fileHandler(e.target.files[0])}/>

                    <label htmlFor="raised-button-file">
                        <Button
                            variant="raised"
                            component="span">
                            Select File
                        </Button>
                    </label>
                </Grid>

            </Grid>

        )
    }
}

export default Uploader;