// libraries
import React from 'react';

class Card extends React.Component<any, any> {
    render() {
        let { 
            children,
            style = {}
        } = this.props;

        return (
            <div style={{
                backgroundColor: "#fff",
                height: 'fit-content',
                ...style
            }}>
                {children}
            </div>
        )
    }
}

export default Card;