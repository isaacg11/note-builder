// libraries
import React from 'react';

// UI components
import Alert from '../components/Alert';
import Button from '../components/Button';
import Card from '../components/Card';
import Icon from '../components/Icon';
import Input from '../components/Input';

// actions
import {
    createNote,
    getNotes,
    updateNote
} from '../actions/notes';

class Notes extends React.Component<any, any> {

    state = {
        editing: false,
        editedName: "",
        newNote: false,
        noteName: "",
        notes: [],
        selectedNote: { id: null, text: '' },
        sessionId: "",
        alertIsOpen: false,
        creatingNote: false
    }

    async componentDidMount() {
        // get window search params
        const urlParams = Object.fromEntries(new URLSearchParams(window.location.search));

        // if user session {...}
        if (urlParams.session) {

            // get notes for logged in user
            const notes = await getNotes(urlParams.session);

            // update UI
            this.setState({
                sessionId: urlParams.session,
                notes: notes
            });
        } else {
            // redirect user to log in page
            window.location.href = '/';
        }
    }

    /**
    * Sets a value for a given input
    */
    setValue(e: any) {
        this.setState({ [e.target.name]: e.target.value })
    }

    /**
    * Selects a note to edit
    * @param {Object} selectedNote selected note
    */
    selectNote(selectedNote: any) {
        this.setState({
            selectedNote
        });

        this.props.onSelect(selectedNote, selectedNote.text);
    }

    /**
    * Creates a note
    */
    async createNote() {

        // show loading indicator
        this.setState({ creatingNote: true }, async () => {

            // create note
            const newNote = await createNote({
                name: this.state.noteName,
                sessionId: this.state.sessionId
            });

            // add new note to current list of notes
            let currentNotes: any = this.state.notes;
            currentNotes.push(newNote);

            // update UI
            this.setState({
                notes: currentNotes,
                newNote: false,
                selectedNote: newNote,
                creatingNote: false,
                noteName: ''
            })

            // show note editor
            this.props.onSelect(newNote, '');

            // show success alert
            this.openAlert();
        })

    }

    /**
    * Deletes a note
    * @param {Object} note note to delete
    * @param {Number} index index position of note to delete
    */
    async delete(note: any, index: number) {

        // if user confirms they want to delete the note {...}
        if (window.confirm('Are you sure?')) {

            // add deletedAt timestamp to note
            const deletedNote = {
                ...note,
                ...{ deletedAt: new Date() }
            }

            // update note
            await updateNote(deletedNote);

            // remove note from list of notes
            let currentNotes = this.state.notes;
            currentNotes.splice(index, 1);

            // update UI
            this.setState({
                notes: currentNotes
            });

            // if selected note is the one being deleted {...}
            if(this.state.selectedNote.id === note.id) {
                
                // hide note editor
                this.props.onSelect(null, '');
            }

            // show success alert
            this.openAlert();
        }
    }

    /**
    * Updates a note's name
    * @param {Object} note note with updated name
    */
    async updateName(note: object) {

        // add new name to note
        const updatedNote: object = {
            ...note,
            ...{ name: this.state.editedName }
        }

        // update note with new name
        await updateNote(updatedNote);

        // get updates notes
        const notes = await getNotes(this.state.sessionId);

        // update UI
        this.setState({
            notes,
            editing: false
        });

        // show success alert
        this.openAlert();
    }

    /**
    * Opens an alert
    */
    openAlert() {

        // show alert
        this.setState({ alertIsOpen: true }, () => {

            // after 3 seconds {...}
            setTimeout(() => {

                // hide alert
                this.setState({ alertIsOpen: false });
            }, 3000)
        })
    }

    /**
    * Renders a list of saved notes
    */
    renderNotes() {

        return (
            <div style={{ minHeight: "500px" }}>
                <h4>Notes</h4>
                <div style={{ border: "1px solid #DDDDDD" }}></div>
                {this.state.notes.map((note: any, index: number) => (
                    <div key={index}>
                        {(this.state.editing === note.id) ? (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #DDDDDD" }}>
                                <Input
                                    fullWidth
                                    style={{ marginRight: "15px" }}
                                    type="text"
                                    placeholder="Note name"
                                    name="editedName"
                                    value={this.state.editedName}
                                    onChange={(e: any) => this.setValue(e)}
                                />
                                <div style={{ cursor: "pointer", marginRight: "15px" }} onClick={() => this.updateName(note)}>
                                    <Icon title="Save Changes" url="https://isaacs-code-challenge-images.s3.us-west-2.amazonaws.com/check.png" />
                                </div>
                                <div style={{ cursor: "pointer" }} onClick={() => this.setState({ editing: false })}>
                                    <Icon title="Cancel" url="https://isaacs-code-challenge-images.s3.us-west-2.amazonaws.com/cancel.png" />
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #DDDDDD" }}>
                                <p
                                    onClick={() => this.selectNote(note)}
                                    style={{
                                        color: "#0072E5",
                                        cursor: "pointer",
                                        fontWeight: (this.state.selectedNote.id === note.id) ? 'bold' : 'initial'
                                    }}>
                                    {note.name}
                                </p>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ cursor: "pointer", marginRight: "15px" }} onClick={() => this.setState({ editing: note.id, editedName: note.name })}>
                                        <Icon title="Edit Name" url="https://isaacs-code-challenge-images.s3.us-west-2.amazonaws.com/edit.png" />
                                    </div>
                                    <div style={{ cursor: "pointer" }} onClick={() => this.delete(note, index)}>
                                        <Icon title="Delete Note" url="https://isaacs-code-challenge-images.s3.us-west-2.amazonaws.com/trash.png" />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                ))}
                <Button
                    fullWidth
                    variant="secondary"
                    style={{ marginTop: "15px" }}
                    onClick={() => this.setState({ newNote: true })}>
                    <span style={{ display: "flex", justifyContent: "center" }}>
                        <span style={{ marginRight: "10px" }}>New Note</span><Icon url={"https://isaacs-code-challenge-images.s3.us-west-2.amazonaws.com/plus.png"} />
                    </span>
                </Button>
            </div>
        )
    }

    /**
    * Renders a form to create a new note
    */
    renderNewNote() {
        return (
            <div>
                <div>
                    <h4>Name</h4>
                    <Input
                        fullWidth
                        type="text"
                        placeholder="Note name"
                        name="noteName"
                        value={this.state.noteName}
                        onChange={(e: any) => this.setValue(e)}
                    />
                    {(this.state.creatingNote) ? (
                        <div style={{ textAlign: "center" }}>
                            <p>Creating note...</p>
                        </div>
                    ) : (
                        <div>
                            <Button
                                fullWidth
                                disabled={!this.state.noteName}
                                style={{ marginTop: "15px" }}
                                onClick={() => this.createNote()}>
                                Create Note
                            </Button>
                            <Button
                                fullWidth
                                variant="secondary"
                                style={{ marginTop: "15px" }}
                                onClick={() => this.setState({ newNote: false })}>
                                Cancel
                            </Button>
                        </div>
                    )}

                </div>
            </div>
        )
    }

    render() {

        const {
            alertIsOpen,
            newNote
        } = this.state;

        return (
            <div>
                {/* alert toaster (dynamically visible) */}
                <Alert
                    isOpen={alertIsOpen}
                    onClose={() => this.setState({ alertIsOpen: false })}
                    type="success"
                />

                {/* notes */}
                <div style={{ padding: "25px", height: "100%" }}>
                    <Card style={{ padding: "10px 20px", boxShadow: "0 6px 12px gray", height: "100%", borderRadius: "5px" }}>
                        {(newNote) ? this.renderNewNote() : this.renderNotes()}
                    </Card>
                </div>
            </div>
        )
    }
}

export default Notes;