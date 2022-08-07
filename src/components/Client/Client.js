import React from "react";
import "./client.css";

class Client extends React.Component {

    render() {
        const { client } = this.props;
        const unixTimestamp = client.clntTimestamp._seconds;
        const date = new Date(unixTimestamp * 1000);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        const formattedTime = `${day}/${month + 1}/${year}     
                                time${hours === 0 ? "00" : hours}:
                                ${minutes.substring(1, 3) < 10 ? '0' + minutes.substring(1, 3) : minutes.substring(1, 3)}:
                                ${seconds.substring(1, 3) < 10 ? '0' + seconds.substring(1, 3) : seconds.substring(1, 3)}`
        return (
            <tr className="tr">
                <td>{formattedTime}</td>
                <td>{client.clntFname}</td>
                <td>{client.clntLname}</td>
                <td>{client.clntBirthday}</td>
                <td>{client.clntDomicl}</td>
                <td>{client.clntNation}</td>
                <td>{client.emailPerson}</td>
                <td>{client.emailPersonSecond}</td>
                <td>{client.emailWork}</td>
                <td>{client.emailWorkSecond}</td>
                <td>{client.mobilePerson}</td>
                <td>{client.mobilePersonSecond}</td>
                <td>{client.mobileWork}</td>
                <td>{client.phoneWork}</td>
            </tr>
        );
    }
}
export default Client