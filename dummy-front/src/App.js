import "./App.css";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

class App extends Component {
  state = {
    loaded: false,
    packages: [],
    selectedTab: 0,
    barcode: "",
    driverId: "",
    voucher: "",
    postcode: "",
  };
  componentDidMount() {
    if (this.state.loaded === false) {
      axios.get("http://localhost:8000/api/packages/", headers).then((res) =>
        this.setState({
          loaded: true,
          packages: res.data,
        })
      );
    }
  }

  All() {
    axios.get("http://localhost:8000/api/packages/", headers).then((res) =>
      this.setState({
        loaded: true,
        packages: res.data,
      })
    );
  }

  Scan() {
    let id = parseInt(this.state.barcode);
    axios.put(`http://localhost:8000/api/packages/scan/${id}`);
  }

  Deliver() {
    let id = parseInt(this.state.barcode);
    axios.put(`http://localhost:8000/api/packages/deliver/${id}`);
  }

  Remain() {
    let id = parseInt(this.state.driverId);
    console.log(id);
    axios
      .get(`http://localhost:8000/api/drivers/driver_reamaining_packages/${id}`)
      .then((res) => {
        console.log(res);
        this.setState({
          packages: res.data,
        });
      });
  }

  CreatePackage() {
    let data = {
      voucher: this.state.voucher,
      postcode: parseInt(this.state.postcode),
      scanned: false,
      delivered: false,
    };
    axios.post("http://localhost:8000/api/packages/", data).then((res) => {
      console.log(res);
    });
  }

  TotalRemain() {
    axios
      .get(`http://localhost:8000/api/packages/remaining/all`)
      .then((res) => {
        console.log(res);
        this.setState({
          packages: res.data,
        });
      });
  }

  Search() {
    let id = parseInt(this.state.driverId);
    console.log(id);
    axios
      .get(`http://localhost:8000/api/drivers/driver_packages/${id}`)
      .then((res) => {
        console.log(res);
        this.setState({
          packages: res.data,
        });
      });
  }

  Reset() {
    axios
      .post(`http://localhost:8000/api/packages/reset`, headers)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.state.packages.length);
    return (
      <Container>
        <Paper>
          <Grid container>
            <Grid item xs={4}>
              <TextField
                name="barcode"
                label="Barcode"
                onChange={this.onChange}
              />

              <Button onClick={() => this.Scan()}>Scan</Button>
              <Button onClick={() => this.Deliver()}>Deliver</Button>
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="voucher"
                label="Voucher"
                onChange={this.onChange}
              />
              <TextField
                name="postcode"
                label="Postcode"
                onChange={this.onChange}
              />

              <Button onClick={() => this.CreatePackage()}>
                Create package
              </Button>
            </Grid>
            <Grid item xs={4}>
              INFO: <br /> -Insert barcode (package ID) and press scan to scan
              an item <br /> -Insert barcode (package ID) and press deliver to
              deliver an item
            </Grid>
          </Grid>
          <hr />

          <Grid container>
            <Grid item xs={4}>
              <TextField
                name="driverId"
                label="Drivers id"
                onChange={this.onChange}
              />
              <Button onClick={() => this.Search()}>Search</Button>
              <Button onClick={() => this.Remain()}>Remain</Button>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              INFO: <br /> -Insert drivers id (index starts from 2) and press
              search to see all drivers packages
              <br /> -Insert drivers id (index starts from 2) and press reamain
              to see all unscanned drivers packages
            </Grid>
          </Grid>
          <hr />

          <Grid container>
            <Grid item xs={4}>
              <Button onClick={() => this.All()}>All</Button>
              <Button onClick={() => this.TotalRemain()}>Remaining</Button>
              <Button onClick={() => this.Reset()}>Reset</Button>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              INFO: <br /> -Press all to see all the packages
              <br /> -Press remaining to see all the unscanned packages
              <br /> -Press resset to reset the in-memory list of the
              server(scanned/delivered)
            </Grid>
          </Grid>
          <hr />
        </Paper>
        <Grid>
          <Paper style={{ textAlign: "center" }}>
            *****{" "}
            <b>
              INFO: After a scan/deliver of a package or a RESET, you must
              resfresh the page or make a search/remain request to refresh the
              state of the packages
            </b>{" "}
            *****
          </Paper>
        </Grid>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Packages </TableCell>
                <TableCell align="right">Package ID</TableCell>
                <TableCell align="right">Package Voucher</TableCell>
                <TableCell align="right">Package PostCode</TableCell>
                <TableCell align="right">Package Delivered</TableCell>
                <TableCell align="right">Package Scanned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.packages.length > 0 ? (
                this.state.packages.map((item, index) => {
                  let color;
                  if (item) {
                    if (item.scanned && item.delivered) {
                      color = "green";
                    } else if (item.scanned && !item.deliverd) {
                      color = "yellow";
                    }
                    return (
                      <TableRow key={index} style={{ backgroundColor: color }}>
                        <TableCell>{index} </TableCell>
                        <TableCell align="right">{item.id}</TableCell>
                        <TableCell align="right">{item.voucher}</TableCell>
                        <TableCell align="right">{item.postcode}</TableCell>
                        <TableCell align="right">
                          {item.delivered ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="right">
                          {item.scanned ? "Yes" : "No"}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })
              ) : (
                <TableRow></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}

export default App;
