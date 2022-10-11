import axios from 'axios';
const url = "https://sg9pwcxzc7.execute-api.us-west-2.amazonaws.com";

/**
* Creates a new note
* @param {Object} note note info
*/
export async function createNote(note:object) {
    try {
        const response = await axios.post(`${url}/notes`, note);
        return response.data;
    }

    catch (error) {
        window.alert('Something went wrong. We are working on a fix now!');
    }
}

/**
* Gets notes
* @param {String} ownerId owner id
*/
export async function getNotes(ownerId:string) {
    try {
        const response = await axios.get(`${url}/notes?owner=${ownerId}`);
        return response.data;
    }

    catch (error) {
        window.alert('Something went wrong. We are working on a fix now!');
    }
}

/**
* Updates a note
* @param {Object} note note info
*/
export async function updateNote(note:object) {
    try {
        const response = await axios.put(`${url}/notes`, note);
        return response.data;
    }

    catch (error) {
        window.alert('Something went wrong. We are working on a fix now!');
    }
}