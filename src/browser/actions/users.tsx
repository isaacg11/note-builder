import axios from 'axios';
const url = "https://sg9pwcxzc7.execute-api.us-west-2.amazonaws.com";

/**
* Generates a new otp code and session
* @param {Object} email user email
*/
export async function generateOTP(email:object) {
    try {
        const response = await axios.post(`${url}/users`, email);
        return response.data;
    }

    catch (error) {
        window.alert('Something went wrong. We are working on a fix now!');
    }
}

/**
* validates an otp code
* @param {number} code otp code
* @param {string} sessionId session id
* @param {string} userId user id
*/
export async function validateOTP(code:number, sessionId:string, userId:string) {
    try {
        const response = await axios.get(`${url}/users?code=${code}&sessionId=${sessionId}&userId=${userId}`);
        return response.data;
    }

    catch (error) {
        window.alert('Something went wrong. We are working on a fix now!');
    }
}