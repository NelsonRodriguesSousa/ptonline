import React, { Component } from 'react';
import { Col, Row, Modal, Form, Button, Alert } from 'react-bootstrap'
import Axios from '../../config/Axios';
import { fire } from '../../config/Fire';
import Swal from 'sweetalert2'

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          password: "",
          passwordConfirm: "", 
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    mudarPassword = () => {


        if(this.state.password == "" || this.state.passwordConfirm == "") {

            Swal.fire({
                icon: 'warning',
                title: 'ups!',
                text: 'Existem campos por preencher',
            })


        } else if (this.state.password != this.state.passwordConfirm) {

            
            Swal.fire({
                icon: 'warning',
                title: 'ups!',
                text: 'As passwords não coincidem',
            })

        } else if(this.state.password.length < 6 ) {

            Swal.fire({
                icon: 'warning',
                title: 'ups!',
                text: 'A password deve conter pelo menos 6 caracteres',
            })

        } else {

            let body = {
                "password": this.state.password,
            }


    
            Axios.put("users/change-password/" + fire.auth().currentUser.uid, body)
            .then(res => {

                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'A tua password foi alterada com sucesso!',
                })


                this.props.fecharModal();
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
                <Modal

                    size="md"
                    className="p-3"
                    show={this.props.showModal}
                    aria-labelledby="contained-modal-title-vcenter"
                    onHide={this.props.fecharModal}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title className="font-weight-bold" id="contained-modal-title-vcenter">
                            Mudança de Password
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" type="password" required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>

                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Confirmação da password" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.handleChange} className="form-control" type="password" required />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.fecharModal}>Fechar</Button>
                        <Button onClick={this.mudarPassword}>Mudar</Button>
                    </Modal.Footer>
                </Modal>


            </div>
        )
    }
}

export default ResetPassword;