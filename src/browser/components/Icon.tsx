// libraries
import React from 'react';

class Icon extends React.Component<any, any> {
    render() {
        const { 
            style = {
                height: '15px',
                width: '15px',
            },
            url,
            title
        } = this.props;

        return (
            <img 
                title={title}
                src={url} 
                style={{...style}}
            />
        )
    }
}

export default Icon;