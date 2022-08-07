import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import EmailInput from "../EmailInput/EmailInput";
import { v4 as uuidv4 } from 'uuid';
import "./addClient.css";
import PhoneInput from "../PhoneInput/PhoneInput";


class AddClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clntFname: "",
            clntLname: "",            
            clntBirthday: "",
            clntDomicl: "",
            clntNation: "",
            clntEmailsInputs: [
                {
                    id:1,
                    value:"",
                    type :""
                }],
            clntPhonesInputs: [
                {
                    id:1,
                    value:"",
                    type :""
                }],
            errors: {},
            isClientAdded:false          
        };
    }
    
    handleValidation() {
        const firstName = this.state.clntFname;
        const lastName = this.state.clntLname;
        let errors = {};
        let formIsValid = true;
        
        //First name
        if (firstName.length === 0) {
          formIsValid = false;
          errors["clntFname"] = "Field is required";
        } else {
            if (!firstName.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["clntFname"] = "Field must contain only letters";
            }
        }

        //Last name
        if (lastName.length === 0) {
            formIsValid = false;
            errors["clntLname"] = "Field is required";
        } else{
            if (!lastName.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["clntLname"] = "Field must contain only letters";
            }
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    handleFormSubmit = (event) =>{
        event.preventDefault();
        if(this.handleValidation()){
            let clntEmails = {};
            let clntPhones = {};
            const clntEmailsInputs = this.state.clntEmailsInputs;
            const clntPhonesInputs = this.state.clntPhonesInputs;

            for(let i = 0; i < clntEmailsInputs.length; i++ ){
                if(clntEmailsInputs[i].type === "Primary"){
                    clntEmails.emailPerson = clntEmailsInputs[i].value
                } else if(clntEmailsInputs[i].type === "Secondary"){
                    clntEmails.emailPersonSecond = clntEmailsInputs[i].value
                } else if(clntEmailsInputs[i].type === "Corporate"){
                    clntEmails.emailWork = clntEmailsInputs[i].value
                } else if(clntEmailsInputs[i].type === "Corporate Secondary"){
                    clntEmails.emailWorkSecond = clntEmailsInputs[i].value
                } else clntEmails.emailPerson = clntEmailsInputs[i].value      
            }
            for(let i = 0; i < clntPhonesInputs.length; i++ ){
                if(clntPhonesInputs[i].type === "Mobile"){
                    clntPhones.mobilePerson = clntPhonesInputs[i].value
                } else if(clntPhonesInputs[i].type === "Mobile second"){
                    clntPhones.mobilePersonSecond = clntPhonesInputs[i].value
                } else if(clntPhonesInputs[i].type === "Mobile Work"){
                    clntPhones.mobileWork = clntPhonesInputs[i].value
                } else if(clntPhonesInputs[i].type === "Phone Work"){
                    clntPhones.phoneWork = clntPhonesInputs[i].value
                } else clntPhones.mobilePerson = clntPhonesInputs[i].value             
            }

            const data = {
                clntFname : this.state.clntFname,
                clntLname : this.state.clntLname,
                clntBirthday : this.state.clntBirthday,
                clntDomicl : this.state.clntDomicl,
                clntNation : this.state.clntNation,
                clntEmails : clntEmails,
                clntPhones : clntPhones
            }

            //send data as the POST request
            fetch('http://localhost:5000/add', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                // We convert the React state to JSON and send it as the POST body
                body: JSON.stringify(data)
                }).then(function(response) {
                    return response.json();
            });

            this.setState({
                clntFname: "",
                clntLname: "",            
                clntBirthday: "",
                clntDomicl: "",
                clntNation: "",
                clntEmailsInputs: [
                    {
                        id:1,
                        value:"",
                        type :""
                    }],
                clntPhonesInputs: [
                    {
                        id:1,
                        value:"",
                        type :""
                    }],
                errors: {},
                isClientAdded: true,
            })
        }
    }

    handleInputChange = (event) => {
        event.preventDefault();        
        const { name, value } = event.target;
        
        

        this.setState({ [name] : value });
    }

    onPhoneChange = clntPhones => {
        this.setState({clntPhones: clntPhones});
    }

    setEmail = (id, value) => {
        const emailInputs = this.state.clntEmailsInputs;
        const updClntEmails = emailInputs.map(input => {
            if (input.id === id) {
                return {...input, value};
            } else {
                return input;
            }
        });

        this.setState({clntEmailsInputs: updClntEmails});
    }

    setPhone = (id, value) => {
        const phoneInputs = this.state.clntPhonesInputs;
        const updClntPhones = phoneInputs.map(input => {
            if (input.id === id) {
                return {...input, value};
            } else {
                return input;
            }
        });

        this.setState({clntPhonesInputs: updClntPhones});
    }

    setEmailType = (id, type) => {
        const emailInputs = this.state.clntEmailsInputs;
        const updClntEmails = emailInputs.map(input => {
            if (input.id === id) {
                return {...input, type};
            } else {
                return input;
            }
        });

        this.setState({clntEmailsInputs: updClntEmails});
    }

    setPhoneType = (id, type) => {
        const phoneInputs = this.state.clntPhonesInputs;
        const updClntPhones = phoneInputs.map(input => {
            if (input.id === id) {
                return {...input, type};
            } else {
                return input;
            }
        });

        this.setState({clntPhonesInputs: updClntPhones});
    }

    onAddEmailInput = (value, type) => {
        const emailInputs = this.state.clntEmailsInputs;
        emailInputs.push({
                id: uuidv4(),
                value: value,
                type: type
            }
        )
        this.setState({emailInputs : emailInputs})        
    }

    onAddPhoneInput = (value, type) => {
        const phoneInputs = this.state.clntPhonesInputs;
        phoneInputs.push({
                id: uuidv4(),
                value: value,
                type: type
            }
        )
        this.setState({phoneInputs : phoneInputs})        
    }
    
    onDeleteEmailInput = (id) => {
        let emailInputs = this.state.clntEmailsInputs;
        let updatedInputs = emailInputs.filter(emailInput => emailInput.id !== id);
        this.setState({clntEmailsInputs: updatedInputs}) 
    }

    onDeletePhoneInput = (id) => {
        let phoneInputs = this.state.clntPhonesInputs;
        let updatedInputs = phoneInputs.filter(phoneInput => phoneInput.id !== id);
        this.setState({clntPhonesInputs: updatedInputs})
    }
    
    
    render() {
        return (
            <div className="addClient"> 
                <Form >
                    {this.state.isClientAdded?<div><h2>Thanks, you added client</h2></div>:<></>}
                    <Form.Group size="lg" controlId="clntFname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            autoFocus
                            name="clntFname"
                            type="text"
                            value={this.state.clntFname}
                            onChange={this.handleInputChange}
                        />
                        <span style={{ color: "red" }}>{this.state.errors["clntFname"]}</span>
                    </Form.Group>
                    
                    <Form.Group size="lg" controlId="clntLname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            autoFocus
                            name="clntLname"
                            type="text"
                            value={this.state.clntLname}
                            onChange={this.handleInputChange}
                        />
                        <span style={{ color: "red" }}>{this.state.errors["clntLname"]}</span>
                    </Form.Group>    

                    <Form.Group size="lg" controlId="clntBirthday">
                        <Form.Label>Birthday date</Form.Label>
                        <Form.Control
                            autoFocus                                
                            name="clntBirthday"
                            type="date"
                            value={this.state.clntBirthday}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group size="lg" controlId="domicledCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            autoFocus
                            name="clntDomicl"
                            type="text"
                            value={this.state.clntDomicl}
                            onChange={this.handleInputChange}
                        />
                        <span style={{ color: "red" }}>{this.state.errors["clntDomicl"]}</span>

                    </Form.Group>

                    <Form.Group size="lg" controlId="clntNation">
                        <Form.Label>Nationality </Form.Label>
                        <Form.Control
                            autoFocus                                
                            name="clntNation"
                            type="text"
                            value={this.state.clntNation}                                
                            onChange={this.handleInputChange}
                        />                            
                        <span style={{ color: "red" }}>{this.state.errors["clntNation"]}</span>
                    </Form.Group>

                    {this.state.clntEmailsInputs.map((input)=>
                        <EmailInput
                            key={input.id}
                            id={input.id}
                            value={input.value}
                            type={input.type} 
                            setEmail={this.setEmail}
                            setEmailType={this.setEmailType}    
                            onAddEmailInput={this.onAddEmailInput} 
                            clntEmailsInputs={this.state.clntEmailsInputs}  
                            onDeleteEmailInput={this.onDeleteEmailInput}        
                        />
                    )}

                    {this.state.clntPhonesInputs.map((input)=>
                        <PhoneInput
                            key={input.id}
                            id={input.id}
                            value={input.value}
                            type={input.type} 
                            setPhone={this.setPhone}
                            setPhoneType={this.setPhoneType}    
                            onAddPhoneInput={this.onAddPhoneInput} 
                            clntPhonesInputs={this.state.clntPhonesInputs}  
                            onDeletePhoneInput={this.onDeletePhoneInput}        
                        />
                    )}
                    <Button onClick = {this.handleFormSubmit}  size="lg" type="submit" >
                        Add
                    </Button>
                </Form>
            </div>
        );
    }
}
export default AddClient