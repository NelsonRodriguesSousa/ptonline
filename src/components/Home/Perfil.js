import React, { Component } from 'react';
import { Col, Row, Card, Form, Image, Button } from 'react-bootstrap'
import Axios from '../../config/Axios';
import { fire } from '../../config/Fire';
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading';
import ResetPassword from './ResetPassword'


import CountUp from 'react-countup';

import { IoIosLock } from 'react-icons/io'


class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            atleta: "",

            treinosCount: 0,
            refeicoesCount: 0,
            avaliacoesCount: 0,

            loading: true,
            showModal: false,
        }
    }

    componentDidMount() {

        
        
        
        // Carregar atleta
        Axios.get("users/" + fire.auth().currentUser.uid)
            .then(res => {
                this.setState({ atleta: res.data.userRecord, loading: false })
                console.log(this.state.atleta);

            }).catch(error => {
                console.log(error.message)
            }); 


            Axios.get("users/treinos-count/" + fire.auth().currentUser.uid)
            .then(res => {
                
                this.setState({ treinosCount: res.data.count })
        
    
            }).catch(error => {
                console.log(error.message)
            });

            Axios.get("users/avaliacoes-count/" + fire.auth().currentUser.uid)
            .then(res => {
                
                this.setState({ avaliacoesCount: res.data.count })
    
    
    
            }).catch(error => {
                console.log(error.message)
            });

            Axios.get("users/refeicoes-count/" + fire.auth().currentUser.uid)
            .then(res => {
                
                this.setState({ refeicoesCount: res.data.count })
    
        
            }).catch(error => {
                console.log(error.message)
            });
    
    }

    getTreinosCount() {
        
       
    }

    mostrarModal = () => {
        this.setState({ showModal: true })
    }

    fecharModal = () => {
        this.setState({ showModal: false })
    }

    render() {


        return (
            <div>



                <Card className="shadow border-0">
                    <Card.Body>
                        <Card.Title className="font-weight-bold tab-title" >Perfil</Card.Title>

                        {this.state.loading ?

                            <center>
                                <ReactLoading type='bars' color='#1d87a0' height={'10%'} width={'10%'} />
                            </center>
                            
                            :

                            <Card.Text>

                                <Row className="text-center">

                                    <Col sm={3} className="my-auto">
                                        <Image className="img-fluid p-0 profile-picture" width="200" src={this.state.atleta.imagemPerfil} roundedCircle />

                                    </Col>

                                    <Col sm={9}>

                                        <Row className="px-5 py-3 text-center">

                                            <Col sm={4}>

                                                <CountUp start={0} end={this.state.treinosCount} delay={0}>
                                                    {({ countUpRef }) => (
                                                        <h1 class="font-weight-bold">
                                                            <span ref={countUpRef} />
                                                        </h1>
                                                    )}
                                                </CountUp>



                                                <p>Planos de treino</p>
                                            </Col>

                                            <Col sm={4}>
                                            <CountUp start={0} end={this.state.refeicoesCount} delay={0}>
                                                    {({ countUpRef }) => (
                                                        <h1 class="font-weight-bold">
                                                            <span ref={countUpRef} />
                                                        </h1>
                                                    )}
                                                </CountUp>
                                                <p>Planos Alimentares</p>
                                            </Col>

                                            <Col sm={4}>
                                            <CountUp start={0} end={this.state.avaliacoesCount} delay={0}>
                                                    {({ countUpRef }) => (
                                                        <h1 class="font-weight-bold">
                                                            <span ref={countUpRef} />
                                                        </h1>
                                                    )}
                                                </CountUp>
                                                <p>Avaliações</p>
                                            </Col>

                                        </Row>


                                        <Row className="px-5 py-3 text-left">

                                            <Col sm={8}>

                                                <Form>
                                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                                        <Form.Label className="font-weight-bold" column sm="3">
                                                            Nome
                                                        </Form.Label>
                                                        <Col sm="9">
                                                            <Form.Control type="text" value={this.state.atleta.nome} readOnly />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} controlId="formPlaintextPassword">
                                                        <Form.Label className="font-weight-bold" column sm="3">
                                                            Email
                                                    </Form.Label>
                                                        <Col sm="9">
                                                            <Form.Control type="text" value={this.state.atleta.email} readOnly />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row} controlId="formPlaintextPassword">
                                                        <Form.Label className="font-weight-bold" column sm="3">
                                                            Tipo de atleta
                                                    </Form.Label>
                                                        <Col sm="9">
                                                            <Form.Control type="text" value={this.state.atleta.tipo_atleta} readOnly />
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </Col>
                                        </Row>

                                        <Row className="px-5 py-3">
                                    {this.state.showModal &&
                                        <ResetPassword showModal={this.state.showModal} fecharModal={this.fecharModal} />
                                    }

                                    <center>
                                        <Button onClick={this.mostrarModal} ><IoIosLock /> Mudar Password</Button>
                                    </center>
                                </Row>

                                        
                                    </Col>
                                </Row>

                              
                            </Card.Text>
                        }
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Perfil;