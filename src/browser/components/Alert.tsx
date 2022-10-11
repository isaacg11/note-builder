// libraries
import React, { CSSProperties } from 'react';

// UI components
import Icon from '../components/Icon';

class Alert extends React.Component<any, any> {

    getBackgroundColor(type: string) {
        switch (type) {
            case 'success':
                return "green"
            default:
                return "green"
        }
    }

    render() {
        const {
            isOpen,
            message = "Success!",
            onClose,
            type
        } = this.props;

        const backgroundColor = this.getBackgroundColor(type);
        const defaultStyles: CSSProperties = {
            position: "absolute",
            top: "100px",
            left: "25px",
            color: "#fff",
            width: "200px",
            padding: "25px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: backgroundColor
        };

        if (isOpen) {
            return (
                <div style={{
                    ...defaultStyles
                }}>
                    <p style={{margin: "0px"}}><b>{message}</b></p>
                    <div 
                        style={{cursor: "pointer"}}
                        onClick={() => onClose()}>
                        <Icon url="https://isaacs-code-challenge-images.s3.us-west-2.amazonaws.com/cancel-white.png" />
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }


    }
}

export default Alert;