import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from 'uuid';

const EmailInput = ({ id, value, type, setEmail, setEmailType, onAddEmailInput, clntEmailsInputs, onDeleteEmailInput, errors }) => {

    const handleInputChange = (e) => {
        setEmail(id, e.target.value);
    }

    const handleSelectChange = (e) => {
        setEmailType(id, e.target.value);
    }

    const handleSelectAdd = (e) => {
        if (clntEmailsInputs.length < 4) {
            onAddEmailInput(e.target.value, e.target.type)
        }
    }

    const options = [
        { value: "Primary" },
        { value: "Secondary" },
        { value: "Corporate" },
        { value: "Corporate Secondary" }
    ]

    return (
        <Form.Group size="lg" controlId="clntEmails">
            <Form.Label>Email</Form.Label>
            <select
                id="emailSelect"
                value={type}
                onChange={handleSelectChange}
            >
                {options.map(opt => <option key={uuidv4()} value={opt.value}>{opt.value}</option>)}
            </select>
            {(id === 1) ? <button type="button" onClick={handleSelectAdd}>+</button> : ""}
            {(id === 1) ? "" : <button type="button" onClick={() => onDeleteEmailInput(id)}>-</button>}
            <Form.Control
                autoFocus
                type="email"
                value={value}
                onChange={handleInputChange}
            />
        </Form.Group>
    );
}

export default EmailInput;