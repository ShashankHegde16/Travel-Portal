import React from 'react';
import { Dropdown, Label } from 'semantic-ui-react';


const Select = ({ options, value, multiple, handleChange, label, color }) => {


    return (
        <React.Fragment>
            <Label as='a' color={color} ribbon>
                {label}
            </Label>
            <Dropdown
                placeholder={label}
                onChange={handleChange}
                closeOnChange
                fluid
                multiple={multiple}
                selection
                options={options}
                value={value}
            />
        </React.Fragment>
    );

}


export default Select;
