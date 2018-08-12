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
import moment           from 'moment';

let totalOvertime     = 0.0;
let totalWorkingHours = 0.0;
let totalWorkingDays  = 0;
let totalLeaves       = 0;

class HoursList extends React.Component {
    componentWillUpdate(nextProps, nextState, nextContext) {
        totalOvertime     = 0.0;
        totalWorkingHours = 0.0;
        totalWorkingDays  = 0;
        totalLeaves       = 0;
    }

    calculateOvertimeHours = (workingDays, workedHours, leavesData, month) => {
        const leavesTaken           = leavesData[month] === undefined ? 0 : leavesData[month];
        const hoursShouldHaveWorked = (workingDays - leavesTaken) * 8;
        const overtime              = workedHours - hoursShouldHaveWorked;
        totalOvertime               = totalOvertime + overtime;
        return convertToHours(overtime);
    };
    calculateWorkingHours  = (hours) => {
        totalWorkingHours = totalWorkingHours + hours;
        return convertToHours(hours);
    };

    calculateLeaves = (leavesData, month) => {
        const numberOfLeaves = leavesData[month];
        if (numberOfLeaves !== undefined) {
            totalLeaves = totalLeaves + numberOfLeaves;
            return numberOfLeaves;
        }
        return "---";
    };

    calculateTotalWorkingDays = (days) => {
        totalWorkingDays = totalWorkingDays + days;
        return days;
    };

    render() {
        const rows                      = this.props.list;
        const {total, holidays, leaves} = this.props;
        const workingDays               = getWorkingDays(holidays);
        const leavesParsed              = {};
        if (leaves) {
            for (let leave of leaves) {
                const extractedDate     = moment(leave);
                const monthYear         = extractedDate.format("MMMM") + " " + extractedDate.format("YYYY");
                const existingValue     = leavesParsed[monthYear] === undefined ? 0 : leavesParsed[monthYear];
                leavesParsed[monthYear] = existingValue + 1;
            }
        }
        return (<Grid>
            <br/>
            <br/>
            <br/>
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
                                        <TableCell>Leaves</TableCell>
                                        <TableCell>Worked Hours</TableCell>
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
                                                    numeric>{this.calculateTotalWorkingDays(workingDays[row.month])}</TableCell>
                                                <TableCell
                                                    numeric>{this.calculateWorkingHours(8 * workingDays[row.month])}</TableCell>
                                                <TableCell
                                                    numeric>{this.calculateLeaves(leavesParsed, row.month)}</TableCell>
                                                <TableCell numeric>{convertToHours(row.hours)}</TableCell>
                                                <TableCell
                                                    numeric>{this.calculateOvertimeHours(workingDays[row.month], row.hours, leavesParsed, row.month)}</TableCell>
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
                                                   numeric>{totalLeaves}</TableCell>
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