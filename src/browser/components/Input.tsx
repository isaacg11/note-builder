// libraries
import React from 'react';

class Input extends React.Component<any, any> {
    render() {
        const {
            style = {},
            onChange,
            fullWidth,
            type = "text",
            placeholder = "",
            value = "",
            name = ""
        } = this.props;

        const width = (fullWidth) ? { width: "98%" } : { width: "initial" };
        const defaultStyles = {
            height: "40px",
            cursor: "pointer",
            border: "1px solid gray",
            borderRadius: "5px",
        }

        return (
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                style={{
                    ...style,
                    ...width,
                    ...defaultStyles
                }}
                onChange={(val) => onChange(val)} />
        )
    }
}

export default Input;