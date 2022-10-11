// libraries
import React from 'react';

class Button extends React.Component<any, any> {

    getVariantColor(variant: string) {
        switch (variant) {
            case 'primary':
                return {
                    bg: "#0099ff",
                    color: "#ffffff"
                }
            case 'secondary':
                return {
                    bg: "#ffffff",
                    color: "#000000"
                }
            default:
                return {
                    bg: "#0099ff",
                    color: "#ffffff"
                }
        }
    }

    render() {
        const {
            children,
            style = {},
            onClick,
            fullWidth,
            disabled,
            variant = "primary"
        } = this.props;

        const colorInfo = this.getVariantColor(variant);
        const width = (fullWidth) ? { width: "100%" } : { width: (style.width) ? style.width : "initial" };
        const defaultStyles = {
            height: "40px",
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
            backgroundColor: (disabled) ? "gray" : colorInfo.bg,
            color: colorInfo.color,
            fontWeight: "bold"
        }

        return (
            <button
                disabled={disabled}
                style={{
                    ...style,
                    ...width,
                    ...defaultStyles
                }}
                onClick={() => onClick()}>
                {children}
            </button>
        )
    }
}

export default Button;