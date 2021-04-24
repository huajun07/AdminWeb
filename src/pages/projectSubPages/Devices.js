import React, { useState, useContext, useEffect } from "react";
import { Form, Row, Col, Button, Breadcrumb } from "react-bootstrap";
import {Tooltip, TableFooter, TablePagination, TableContainer, TableCell, TableBody, Table, IconButton, TableHead, TableRow, Paper } from '@material-ui/core';
import { PencilSquare, Trash, Cpu } from "react-bootstrap-icons";

import { useHistory, useParams, useLocation } from "react-router-dom";
import { ConfirmModal, DeviceModal, TablePaginationActions } from "../../components/index.js";
import {getDevice, alertService, delDevice} from '../../services/index.js';
import { Directions } from "@material-ui/icons";
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import SignalCellularConnectedNoInternet0BarIcon from '@material-ui/icons/SignalCellularConnectedNoInternet0Bar';

export function Devices (){
    let { projectID, gateID }= useParams();
    let history = useHistory();
    let {pathname} = useLocation();
  const [rows, setRows] = useState([]);
  const [toggle, setToggle] = useState({
    delete: false,
    edit: false
  });
  const [modal, setModal] = useState(true);
  const [curID, setCurID] = useState("");
  const [dummy, setDummy] = useState(false);
  const reload = () =>{
    getDevice(gateID, ["deviceID", "deviceName", "deviceType", "deviceStatus"])
      .then(async (data) => {
        console.log(data.content);
        setRows(data.content);
      })
      .catch((error) => {
        console.error("Get Device, there was an error!", error);
      });
  }
  useEffect(() => {
    reload();
  }, [dummy]);

  const toggleModal = (modal) => {
    let prevVal = toggle[modal];
    setToggle((prevState) => ({
      ...prevState,
      [modal]: !prevVal
    }));
  };

  const del = async (deviceID) => {
    delDevice(deviceID)
    .then(async (data) => {
      reload();
      toggleModal("delete");
      alertService.success("Device Deleted");
    })
    .catch((error) => {
      console.error("Delete Device, There was an error!", error);
    });
  };

  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <ConfirmModal
        hide={toggle.delete}
        success={() => {
          del(curID);
        }}
        toggleModal={() => {
          toggleModal("delete");
        }}
        title="Confirm Deletion"
        body="Delete this device?"
      />
      <DeviceModal
        hide={toggle.edit}
        deviceID = {curID}
        newState = {modal}
        gateID = {gateID}
        success={() => {
            reload();
            toggleModal("edit");
        }}
        toggleModal={() => {
          toggleModal("edit");
        }}
      />

      <div className="content">
      <Breadcrumb>
        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/project">Projects</Breadcrumb.Item>
        <Breadcrumb.Item href={"/project/"+projectID+"/gate"}>Gates</Breadcrumb.Item>
        <Breadcrumb.Item active>Devices</Breadcrumb.Item>
      </Breadcrumb>
        <Form inline className="rightFlex" onSubmit={(e)=>{e.preventDefault();}}>
          <Row>
            <Col sm="auto">
              <Button
                className="btn btn-success"
                type="button"
                onClick={() => {
                    setModal(true);
                  toggleModal("edit");
                }}
              >
                + Add
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="content">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell align="left"><b>ID</b></TableCell>
                <TableCell align="center"><b>Name</b></TableCell>
                <TableCell align="center"><b>Type</b></TableCell>
                <TableCell align="center"><b>Status</b></TableCell>
                <TableCell align="right"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows).map((row, index) => (
                <TableRow key={row.gateName}>
                <TableCell align="left">{row.deviceID}</TableCell>
                  <TableCell align="center">{row.deviceName}</TableCell>
                  <TableCell align="center">{row.deviceType}</TableCell>
                  <TableCell align="center">{row.deviceStatus?
                  <SignalCellularAltIcon style={{ color: "#4caf50" }}/>:<SignalCellularConnectedNoInternet0BarIcon style={{ color: "#f44336" }}/>
                  }</TableCell>
                  <TableCell align="right" style={{padding:0}}>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => {
                        setCurID(row.deviceID);
                        setModal(false);
                        toggleModal("edit");
                    }}>
                      <PencilSquare
                        size={21}
                        color="gold"
                      />
                    </IconButton>
                    </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => {
                        setCurID(row.deviceID);
                        toggleModal("delete");
                    }}>
                      <Trash color="red" size={21} />
                    </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                colSpan={4}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default { Devices };