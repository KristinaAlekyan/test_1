import Form from "react-bootstrap/Form";
import { v4 as uuidv4 } from 'uuid';

const PhoneInput = ({ id, value, type, setPhone, setPhoneType, onAddPhoneInput, clntPhonesInputs, onDeletePhoneInput }) => {

    const handlePhoneChange = (e) => {
        setPhone(id, e.target.value);
    }

    const handleSelectChange = (e) => {
        setPhoneType(id, e.target.value);
    }
    const handleSelectAdd = (e) =>{
        if(clntPhonesInputs.length<4){
            onAddPhoneInput(e.target.value, e.target.type)
        }
    }

    const options = [
        {value: "Mobile"},
        {value: "Mobile second"},
        {value: "Mobile Work"},
        {value: "Phone Work"}
    ]

    return (
        
        <Form.Group size="lg" controlId="clntPhones">
            <Form.Label>Phone</Form.Label>
            <select
                id="phoneSelect"
                value={type}
                onChange={handleSelectChange}
            > 
                {options.map(opt => <option key={uuidv4()} value={opt.value}>{opt.value}</option>)}
            </select>
            {(id === 1)?<button type="button" onClick={handleSelectAdd}>+</button>:""}
            {(id === 1)? "":<button type="button" onClick={() => onDeletePhoneInput(id)}>-</button>}
            <Form.Control
                autoFocus
                type="text"
                value={value}
                onChange={handlePhoneChange}
            />
        </Form.Group>
    );
}

export default PhoneInput;