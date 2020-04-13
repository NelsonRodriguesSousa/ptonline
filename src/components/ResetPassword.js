import React, { Component } from 'react';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap'
import Axios from '../config/Axios';
import Swal from 'sweetalert2'
import {FaArrowLeft } from 'react-icons/fa';


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

    resetPassword = () => {

        let body = {
            "email" : this.state.email,
        }
       
        if(this.state.email == "") {
            
            Swal.fire({
                icon: 'warning',
                title: 'Sucesso!',
                text: 'Por favor insira um email.',
            })


        } else {

            Axios.post("email/reset-password", body)
            .then(res => {

                
    
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Foi enviado um email com uma nova password.',
                }).then(function() {
                    window.location = "/login";
                });
    
                console.log(res.data);


    
            }).catch(error => {
    
                Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: 'Ocorreu um erro ' + error,
                })
            });
    
        }

       


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

                                        <Button onClick={this.resetPassword}>Mudar</Button>

                                            <p>
                                                <small className="p-4">
                                                    <a href="/login">Iniciar sessão</a>
                                                </small>
                                            </p>

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