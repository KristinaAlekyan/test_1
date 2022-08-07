import React from "react";
import Client from "../Client/Client.js";
import "./clients.css";
import 'bootstrap/dist/css/bootstrap.css';
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";

class Clients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            searchText: "",
            sort: false,
        };
    }
    componentDidMount() {
        fetch('http://localhost:5000/get-clients', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        })
            .then((response) => response.json())
            .then((res) => {
                this.setState({ clients: res.data })
                console.log("response", res.data)
            });
    }

    sort = () => {
        const sortedArr = this.state.clients.reverse();
        console.log("sorted", sortedArr)
        this.setState({
            clients: sortedArr,
            sort: !this.state.sort
        });
    }
    render() {
        let filteredData = this.state.clients;

        if (this.state.searchText) {
            filteredData = this.state.clients.filter(element => element.clntFname.toLowerCase().includes(this.state.searchText.toLowerCase()))
        }

        return (
            <div className="clientsContainer">
                <h1>All clients </h1>
                <div className="sortSearchDiv">
                    <div className="sort">
                        <p>Sort by bate</p>
                        <button
                            type="button"
                            className='btn'
                            onClick={this.sort}
                        >
                            {this.state.sort ? <span><BsFillArrowUpCircleFill /></span> : <span><BsFillArrowDownCircleFill /></span>}
                        </button>
                    </div>
                    <input placeholder="Search by name..." onChange={event => this.setState({ searchText: event.target.value })} value={this.state.searchText} />
                </div>
                <table>
                    <thead className="thead">
                        <tr>
                            <th rowSpan="2">Date</th>
                            <th rowSpan="2">First Name</th>
                            <th rowSpan="2">Last Name</th>
                            <th rowSpan="2">Birthday date</th>
                            <th rowSpan="2">Country</th>
                            <th rowSpan="2">Nationality</th>
                            <th colSpan="4">Email </th>
                            <th colSpan="4">Phone</th>
                        </tr>
                        <tr>
                            <th>Primary</th>
                            <th>Secondary</th>
                            <th>Corporate</th>
                            <th>Corporate Secondary</th>
                            <th>Mobile</th>
                            <th>Mobile second</th>
                            <th>Mobile Work</th>
                            <th>Phone Work</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((client, index) =>
                                <Client
                                    key={index}
                                    client={client}
                                />
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }
}
export default Clients