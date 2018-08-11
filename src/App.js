import React, {Component, Fragment} from 'react';
import './App.css';
import Grid                         from '@material-ui/core/Grid/Grid'
import * as XLSX                    from 'xlsx';
import AppBar                       from '@material-ui/core/AppBar';
import Toolbar                      from '@material-ui/core/Toolbar';
import Typography                   from '@material-ui/core/Typography';
import Uploader                     from "./components/Uploader";
import moment                       from 'moment';
import HoursList                    from "./components/HoursList";
import {sortByMonth}                from "./utils/Utils";
import logo                         from './timesheet-logo.png';
import CssBaseline                  from "@material-ui/core/CssBaseline/CssBaseline";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSheet          : null,
            timeSheetDateFormat: 'DD/MM/YYYY',
            totalRow           : undefined,
            startRow           : undefined
        }
    }

    handleFileUploadChange = timeSheet => {
        let worksheetData = null;
        if (timeSheet != null) {
            const name = timeSheet.name;
            console.log("name", name);
            const reader = new FileReader();

            reader.onload = (evt) => {
                /* Parse data */
                const bstr = evt.target.result;
                const wb   = XLSX.read(bstr, {type: 'binary'});
                /* Get the worksheet */
                const ws = wb.Sheets[wb.SheetNames[1]];
                /* Convert array of arrays */
                worksheetData = XLSX.utils.sheet_to_json(ws, {header: 1});

                /* Update state */
                this.setState({timeSheet, worksheetData});
            };
            reader.readAsBinaryString(timeSheet);
        }

    };

    handleDateFormatChange = (event) => {
        const timeSheetDateFormat = event.target.value;
        this.setState({timeSheetDateFormat})
    };


    render() {
        let totalHoursLogged = 0.0;
        let monthHours       = [];
        if (this.state.worksheetData != null) {
            const worksheetData = this.state.worksheetData;

            const rowNames    = worksheetData[0];
            const dateColumn  = rowNames.indexOf("Date");
            const hoursColumn = rowNames.indexOf("Logged");
            const dateFormat  = this.state.timeSheetDateFormat;

            totalHoursLogged      = parseFloat(worksheetData[1][hoursColumn]);
            const relevantArray   = worksheetData.slice(2);
            const parsedWorksheet = relevantArray.map(element => {
                return {
                    date : moment((element[dateColumn]), dateFormat),
                    hours: parseFloat(element[hoursColumn])
                };
            });

            const monthHoursList = {};
            for (let i = 0; i < parsedWorksheet.length; i++) {

                const objectOfInterest    = parsedWorksheet[i];
                const monthYear           = objectOfInterest.date.format("MMMM") + " " + objectOfInterest.date.format("YYYY");
                const existingValue       = monthHoursList[monthYear] === undefined ? 0 : monthHoursList[monthYear];
                monthHoursList[monthYear] = existingValue + objectOfInterest.hours;
            }


            for (const key of Object.keys(monthHoursList)) {
                monthHours.push({month: key, hours: monthHoursList[key]});
            }

            sortByMonth(monthHours);

        }
        return (
            <React.Fragment>
                <CssBaseline/>
                <AppBar color={"default"}>
                    <Toolbar>
                        <img src={logo} alt={'TimeSheet'} height={'40px'}/>
                    </Toolbar>
                </AppBar>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Grid item xs={12}>
                    <Uploader fileHandler={this.handleFileUploadChange}
                              dateFormat={this.state.timeSheetDateFormat}
                              startRow={this.state.startRow}
                              totalRow={this.state.totalRow}
                              handleDateFormat={this.handleDateFormatChange}
                              handleStartRow={this.handleDateFormatChange}
                              handleTotalRow={this.handleDateFormatChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <HoursList total={totalHoursLogged} list={monthHours}/>
                </Grid>

            </React.Fragment>
    );
    }
    }

    export default App;
