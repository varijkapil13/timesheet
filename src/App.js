import React, {Component} from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid/Grid';
import * as XLSX from 'xlsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import moment from 'moment';
import HoursList from './components/HoursList';
import {sortByMonth} from './utils/Utils';
import logo from './timesheet-logo.png';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import IconButton from '@material-ui/core/IconButton/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse/Collapse';
import Uploader from './components/Uploader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {...this.setInitialState()};
  }

  handleShowMenu = () => {
    this.setState(...this.setInitialState(!this.state.showMenu));
  };

  setInitialState = (showMenu = true) => {
    return {
      timeSheet: null,
      holidaySheet: null,
      timeSheetDateFormat: 'DD/MM/YYYY',
      holidayDateFormat: 'DD/MM/YYYY',
      totalRow: undefined,
      startRow: undefined,
      showMenu,
      holidayData: null,
      leavesData: null,
      worksheetData: null
    };
  };

  fileUploadHandler = (timeSheet, file) => {
    if (file != null) {
      const reader = new FileReader();

      reader.onload = evt => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type: 'binary'});
        /* Get the worksheet */

        if (timeSheet) {
          const ws = wb.Sheets[wb.SheetNames[1]];
          /* Convert array of arrays */
          const worksheetData = XLSX.utils.sheet_to_json(ws, {header: 1});

          /* Update state */
          this.setState({timeSheet: file, worksheetData, showMenu: false});
        } else {
          const holidaysEntries = wb.Sheets[wb.SheetNames[0]];
          const leaves = wb.Sheets[wb.SheetNames[1]];
          /* Convert array of arrays */
          const holidayData = XLSX.utils.sheet_to_json(holidaysEntries, {header: 1});
          const leavesData = XLSX.utils.sheet_to_json(leaves, {header: 1});

          /* Update state */
          this.setState({
            holidaySheet: file,
            holidayData: this.convertToDatesArray(holidayData),
            leavesData: this.convertToDatesArray(leavesData)
          });
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  convertToDatesArray = stringArray => {
    if (stringArray !== null) {
      return stringArray.map(element => {
        return moment(element[0], this.state.holidayDateFormat).format();
      });
    }
    return [];
  };

  handleDateFormatChange = event => {
    const timeSheetDateFormat = event.target.value.toUpperCase();
    this.setState({timeSheetDateFormat});
  };
  handleHolidayDateFormatChange = event => {
    const holidayDateFormat = event.target.value.toUpperCase();
    this.setState({holidayDateFormat});
  };

  render() {
    let totalHoursLogged = 0.0;
    let monthHours = [];
    if (this.state.worksheetData != null) {
      const worksheetData = this.state.worksheetData;

      const rowNames = worksheetData[0];
      const dateColumn = rowNames.indexOf('Date');
      const hoursColumn = rowNames.indexOf('Logged');
      const dateFormat = this.state.timeSheetDateFormat;

      totalHoursLogged = parseFloat(worksheetData[1][hoursColumn]);
      const relevantArray = worksheetData.slice(2);
      const parsedWorksheet = relevantArray.map(element => {
        return {
          date: moment.utc(element[dateColumn], dateFormat),
          hours: parseFloat(element[hoursColumn])
        };
      });

      const monthHoursList = {};
      for (let i = 0; i < parsedWorksheet.length; i++) {
        const objectOfInterest = parsedWorksheet[i];
        const monthYear = objectOfInterest.date.format('MMMM') + ' ' + objectOfInterest.date.format('YYYY');
        const existingValue = monthHoursList[monthYear] === undefined ? 0 : monthHoursList[monthYear];
        monthHoursList[monthYear] = existingValue + objectOfInterest.hours;
      }

      for (const key of Object.keys(monthHoursList)) {
        monthHours.push({month: key, hours: monthHoursList[key]});
      }

      sortByMonth(monthHours);
    }
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar color={'default'}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={e => this.handleShowMenu()}>
              {this.state.showMenu || <MenuIcon />}
              {this.state.showMenu && <CloseIcon />}
            </IconButton>
            <img src={logo} alt={'TimeSheet'} height={'40px'} />
          </Toolbar>
        </AppBar>

        <br />
        <br />
        <br />
        <br />
        <Collapse in={this.state.showMenu}>
          <Uploader
            fileUploadHandler={this.fileUploadHandler}
            holidayDateFormat={this.state.holidayDateFormat}
            handleHolidayDateFormat={this.handleHolidayDateFormatChange}
            dateFormat={this.state.timeSheetDateFormat}
            startRow={this.state.startRow}
            totalRow={this.state.totalRow}
            handleDateFormat={this.handleDateFormatChange}
            handleStartRow={this.handleDateFormatChange}
            handleTotalRow={this.handleDateFormatChange}
          />
        </Collapse>

        <Grid item xs={12}>
          <HoursList total={totalHoursLogged} list={monthHours} holidays={this.state.holidayData} leaves={this.state.leavesData} />
        </Grid>
      </React.Fragment>
    );
  }
}

export default App;
