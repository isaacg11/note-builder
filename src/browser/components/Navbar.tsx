// libraries
import React from 'react';

// UI components
import Button from '../components/Button';
import Card from '../components/Card';

class Navbar extends React.Component<any, any> {

    state = {
        sessionId: null
    }

    async componentDidMount() {
        // get window search params
        const urlParams = Object.fromEntries(new URLSearchParams(window.location.search));
        if (urlParams.session) {
            this.setState({
                sessionId: urlParams.session,
            });
        }
    }
    
    render() {

        const { sessionId } = this.state;

        return (
            <Card style={{padding: "5px 25px", boxShadow: "0 6px 12px gray", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h2 style={{margin: 'none'}}>Isaac's Note Builder</h2>
                {(sessionId) && (
                    <Button variant="secondary" onClick={() => window.location.href = (window.location.origin === "http://localhost:3000") ? '/' : '/dev'}>Logout</Button>
                )}
            </Card>
        )
    }
}

export default Navbar;