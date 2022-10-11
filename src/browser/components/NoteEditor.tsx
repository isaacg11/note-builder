// libraries
import React from 'react';

// UI components
import Alert from '../components/Alert';
import Button from '../components/Button';
import Icon from '../components/Icon';

// actions
import { updateNote } from '../actions/notes';

class NoteEditor extends React.Component<any, any> {

    state = {
        savingNote: false,
        alertIsOpen: false
    }

    /**
    * Updates a note
    */
    async updateNote() {

        // show loading indicator
        this.setState({ savingNote: true }, async () => {

            // update note
            await updateNote({
                id: this.props.selectedNote.id,
                name: this.props.selectedNote.name,
                owner: this.props.selectedNote.owner,
                text: this.props.text
            });

            // update UI
            this.setState({ savingNote: false });

            // show success alert
            this.openAlert();
        })
    }

    /**
    * Resets textarea
    */
    reset() {
        this.props.onChange("");
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

    render() {

        const {
            onChange,
            selectedNote,
            text
        } = this.props;

        const {
            alertIsOpen,
            savingNote
        } = this.state;

        return (
            <div>
                {/* alert toaster (dynamically visible) */}
                <Alert
                    isOpen={alertIsOpen}
                    onClose={() => this.setState({ alertIsOpen: false })}
                    type="success"
                />

                {/* note editor */}
                <div style={{ padding: "25px" }}>
                    {(selectedNote) ? (
                        <div>
                            <div style={{ marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                {(savingNote) ? (
                                    <p>Saving changes...</p>
                                ) : (
                                    <Button
                                        style={{ width: "100px" }}
                                        onClick={() => this.updateNote()}>
                                        Save
                                    </Button>
                                )}
                                <div style={{ cursor: "pointer" }} onClick={() => this.reset()}>
                                    <Icon title="Reset" url="https://isaacs-code-challenge-images.s3.us-west-2.amazonaws.com/refresh.png" />
                                </div>
                            </div>
                            <textarea
                                value={text}
                                onChange={(e) => onChange(e.target.value)}
                                rows={25}
                                style={{
                                    width: "100%",
                                    border: "1px solid #EEEEEE",
                                    backgroundColor: "#EEEEEE",
                                    padding: "15px",
                                    borderRadius: "5px"
                                }}
                                placeholder="Write your note here..."
                            />
                        </div>
                    ) : (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "400px" }}>
                            <h4>Select a note to start writing!</h4>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default NoteEditor;