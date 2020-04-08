import React, { Component } from 'react';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap'

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendemail = () => {
        alert("email enviado")
    }


    render() {
        return (

            <div>

                <div className="login-page">

                    <div class="container d-flex h-100">
                        <div class="row align-self-center w-100">
                            <div class="offset-3 col-6 ">

                                <Card className="border-0 shadow p-5 login-card text-center">
                                    <h3>Reset da Password</h3>
                                    <hr />

                                    <p>Insira o seu email para realizar o reset da password.</p>

                                    <Form>
                                        <Form.Group>
                                            <Form.Control placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" type="email" required />
                                        </Form.Group>

                                        <div class="text-center">


                                            <Button type="submit" onClick={this.sendEmail} className="btn btn-lg btn-primary font-weight-bold mb-2" variant="primary" >
                                                Enviar Email
                                         </Button>
                                        </div>

                                    </Form>

                                    <hr />


                                </Card>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default ResetPassword;