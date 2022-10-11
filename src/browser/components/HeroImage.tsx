// libraries
import React from 'react';

// actions
import {
    generateOTP,
    validateOTP
} from '../actions/users';

// UI components
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';

// images
import bgImage from '../images/bg.jpg';

class HeroImage extends React.Component {

    state = {
        email: "",
        code: "",
        sessionId: "",
        userId: "",
        validationError: false,
        sendingEmail: false,
        validatingCode: false
    }

    /**
    * Generates a new OTP code
    */
    async generateOTP() {

        // show loading indicator
        this.setState({ sendingEmail: true }, async () => {

            // generate OTP code
            const otpInfo = await generateOTP({ email: this.state.email });

            // update UI
            this.setState({
                sessionId: otpInfo.sessionId,
                userId: otpInfo.id,
                sendingEmail: false
            })
        });
    }

    /**
    * Validates an OTP code
    */
    async validateOTP() {

        // show loading indicator
        this.setState({ validatingCode: true }, async () => {

            // validate code
            const codeIsValid = await validateOTP(parseInt(this.state.code), this.state.sessionId, this.state.userId);

            // if code is valid {...}
            if (codeIsValid) {

                // redirect user to dashboard
                window.location.href = `${(window.location.origin === "http://localhost:3000") ? '' : '/dev'}/dashboard?session=${this.state.sessionId}`;
            } else {

                // show validation error
                this.setState({
                    validationError: true,
                    validatingCode: false
                })
            }
        });
    }

    render() {

        const {
            email,
            sessionId,
            code,
            validationError,
            sendingEmail,
            validatingCode
        } = this.state;

        return (
            <div style={{
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100vh",
                backgroundImage: `url(${bgImage})`
            }}>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}></div>
                    <div style={{ flex: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h1 style={{ color: "#fff", fontSize: "100px", marginRight: "25px" }}>
                            Build<br />
                            Better<br />
                            Notes.
                        </h1>
                        <Card style={{ padding: "25px 15px", borderRadius: "5px", minWidth: '400px' }}>
                            {(sessionId) ? (
                                <div>
                                    <h4>{(validatingCode) ? "Logging In..." : "Validate Code"}</h4>
                                    {(validationError) ? (
                                        <p style={{ fontSize: "13px", color: 'red' }}>Invalid code, please try again.</p>
                                    ) : (
                                        <p style={{ fontSize: "13px", color: 'green' }}>We just emailed your login code, check your inbox for details.</p>
                                    )}
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Input
                                            fullWidth
                                            type="text"
                                            placeholder="Code"
                                            value={code}
                                            onChange={(e: any) => this.setState({ code: e.target.value })}
                                        />
                                        <div style={{ marginLeft: "10px" }}>
                                            <Button
                                                disabled={!code}
                                                onClick={() => this.validateOTP()}>
                                                Validate
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h4>{(sendingEmail) ? "Sending email..." : "Request Access Code"}</h4>
                                    <p style={{ fontSize: "13px" }}>Want access? Enter your email and we will send you a code to log in.</p>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Input
                                            fullWidth
                                            type="text"
                                            placeholder="Email Address"
                                            value={email}
                                            onChange={(e: any) => this.setState({ email: e.target.value })}
                                        />
                                        <div style={{ marginLeft: "10px" }}>
                                            <Button
                                                fullWidth
                                                disabled={!email}
                                                onClick={() => this.generateOTP()}>
                                                Get Code
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>
                    <div style={{ flex: 1 }}></div>
                </div>
            </div>
        )
    }
}

export default HeroImage;