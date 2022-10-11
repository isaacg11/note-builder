// libraries
import React from 'react';

// UI components
import Navbar from '../components/Navbar';
import NoteEditor from '../components/NoteEditor';
import Notes from '../components/Notes';

class Dashboard extends React.Component {

    state = {
        text: '',
        selectedNote: null
    }

    render() {

        const { 
            text,
            selectedNote
        } = this.state;

        return (
            <div>
                {/* navbar */}
                <Navbar />

                <div style={{display: "flex"}}>
                    <div style={{flex: 3}}>

                        {/* node editor */}
                        <NoteEditor 
                            text={text}
                            selectedNote={selectedNote}
                            onChange={(text:string) => this.setState({ text })}
                        />
                    </div>
                    <div style={{flex: 2}}>

                        {/* notes */}
                        <Notes 
                            onSelect={(n:any, t:string) => this.setState({ selectedNote: n, text: t })} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;