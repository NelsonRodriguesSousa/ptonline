import React, { Component } from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap'
import Axios from '../../config/Axios';
import { fire }  from '../../config/Fire';
import Swal from 'sweetalert2';

class NovoAtleta extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {  
            nome: "",
            apelido: "",
            email: "",
            password: "",   
            contacto: "",
            tipoAtleta: "",
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    gerarPassword = () => {
        var randomstring = Math.random().toString(36).slice(-8);
        
        this.setState({
            password: randomstring
        })
    }

    createUser = (event) => {

        let uid = fire.auth().currentUser.uid;

        const user = {
            "email": this.state.email,
            "name": this.state.nome + " " + this.state.apelido,
            "password": this.state.password,
            "phone": "+351" + this.state.contacto,
            "photo": "https://i.imgur.com/D11Q66u.png",
            "admin_id": uid,
            "tipo_atleta": this.state.tipoAtleta
        };

        
        if(this.state.email == "" || this.state.name == "" || this.state.apelido == "" || this.state.password == "" || this.state.contacto == "") {

            Swal.fire({
                icon: 'warning',
                title: 'Ups!',
                text: 'Por favor preencha todos os dados.',

            })

        } else if(this.state.contacto.toString().length < 9) {

            Swal.fire({
                icon: 'warning',
                title: 'Ups!',
                text: 'Número de telefone inválido.',

            })

        } else if (this.state.password.toString().length < 6 ) {

            Swal.fire({
                icon: 'warning',
                title: 'Ups!',
                text: 'Pasword deve conter pelo menos 6 caracteres.',

            })
        } else {

             
        Axios.post("users", user)
        .then(res => {

            // fechar Modal 
            this.props.fecharModal();

            // Mensagem de sucesso
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Atleta registado com sucesso. Enviado um email para ' + this.state.email + " com as credenciais.",
            })


            console.log(res.data);


        }).catch(error => {

            console.log(error)

            Swal.fire({
                icon: 'error',
                title: 'Ups!',
                text: 'Ocorreu um erro com o servidor. Por favor contacte o administrador.'
            })
        });


    // Request para enviar email ao mesmo

    
    Axios.post("send-credencials",
        {
            "email": this.state.email,
            "password": this.state.password
        })
        .then(res => {

            console.log(res.data);
        });
        

        }


       
    }

    render() {
        return (
            <div>
                <Modal
                    size="lg"
                    show={this.props.showModal}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={this.props.fecharModal}
                >
                      
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Adicionar Atleta
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Nome" name="nome" value={this.state.nome} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Apelido" name="apelido" value={this.state.apelido} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" type="email" required />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Contacto" name="contacto" value={this.state.contacto}  onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>
                                <Button onClick={this.gerarPassword}>Gerar</Button>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control as="select" name="tipoAtleta" value={this.state.tipoAtleta} onChange={this.handleChange} >
                                        <option selected >Tipo de atleta here</option>
                                        <option>Online</option>
                                        <option>Presencial</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            </Row>

                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.fecharModal}>Fechar</Button>
                        <Button onClick={this.createUser}>Enviar</Button>
                    </Modal.Footer>

                </Modal>
               
            </div>
        )
    }
}

export default NovoAtleta;