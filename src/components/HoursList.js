import Table            from '@material-ui/core/Table';
import TableBody        from '@material-ui/core/TableBody';
import TableCell        from '@material-ui/core/TableCell';
import TableHead        from '@material-ui/core/TableHead';
import TableRow         from '@material-ui/core/TableRow';
import Paper            from '@material-ui/core/Paper';
import * as React       from "react";
import Grid             from "@material-ui/core/Grid/Grid";
import {getWorkingDays} from "../utils/WorkingDay";
import Typography       from "@material-ui/core/Typography";
import Grow             from '@material-ui/core/Grow';
import Card             from "@material-ui/core/Card/Card";
import {convertToHours} from "../utils/Utils";

let totalOvertime     = 0.0;
let totalWorkingHours = 0.0;
let totalWorkingDays  = 0;

class HoursList extends React.Component {
    calculateOvertimeHours = (hours) => {
        totalOvertime = totalOvertime + hours;
        return convertToHours(hours);
    };
    calculateWorkingHours  = (hours) => {
        totalWorkingHours = totalWorkingHours + hours;
        return convertToHours(hours);
    };

    calculateTotalWorkingDays = (days) => {
        totalWorkingDays = totalWorkingDays + days;
        return days;
    };

    render() {
        const rows        = this.props.list;
        const workingDays = getWorkingDays();
        const total       = this.props.total;

        return (<Grid>
            {rows.length > 0 &&
            <Grid container justify={"center"} direction={"row"} spacing={8}>
                <Grid item xs={12} sm={4}>
                    <Grow in={true} {...{timeout: 1000}}>
                        <Card raised={true}>
                            <br/>
                            <br/>
                            <Typography align={"center"} variant='headline' component={'h2'}>
                                Total Hours
                            </Typography>
                            <br/>
                            <br/>
                            <br/>

                            <Typography align={"center"} variant='display3' component={'h1'}>
                                {convertToHours(total)}
                            </Typography>
                            <br/>
                            <br/>
                            <br/>
                        </Card>
                    </Grow>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Grow in={true}>
                        <Paper elevation={6}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Month</TableCell>
                                        <TableCell>Total Working Days</TableCell>
                                        <TableCell>Total Working Hours</TableCell>
                                        <TableCell>Hours</TableCell>
                                        <TableCell>Overtime Hours</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => {
                                        return (
                                            <TableRow key={row.month}>
                                                <TableCell component="th" scope="row">
                                                    {row.month}
                                                </TableCell>
                                                <TableCell
                                                    numeric>{this.calculateTotalWorkingDays(workingDays[row.month].days)}</TableCell>
                                                <TableCell
                                                    numeric>{this.calculateWorkingHours(workingDays[row.month].hours)}</TableCell>
                                                <TableCell numeric>{convertToHours(row.hours)}</TableCell>
                                                <TableCell
                                                    numeric>{this.calculateOvertimeHours(row.hours - workingDays[row.month].hours)}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                    <TableRow key={'total'}>
                                        <TableCell component="th" scope="row" variant={"head"}>
                                            Total:
                                        </TableCell>
                                        <TableCell variant={"head"}
                                                   numeric>{totalWorkingDays}</TableCell>
                                        <TableCell variant={"head"}
                                                   numeric>{convertToHours(totalWorkingHours)}</TableCell>
                                        <TableCell variant={"head"}
                                                   numeric>{convertToHours(total)}</TableCell>
                                        <TableCell variant={"head"}
                                                   numeric>{convertToHours(totalOvertime)}</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </Paper>
                    </Grow>
                </Grid>
            </Grid>
            }
        </Grid>)
            ;
    }
}

export default HoursList