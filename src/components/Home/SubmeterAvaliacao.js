import React, { Component } from 'react';
import { Col, Row, Modal, Form, Button, Alert } from 'react-bootstrap'
import Axios from '../../config/Axios';
import { fire } from '../../config/Fire';
import Swal from 'sweetalert2'

class SubmeterAvaliacao extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {  
            peso: "",
            imc: "",

            aguaCorporal: "",
            taxaMetabolicaBasal: "",

            idadeMetabolica: "",
            percentagemGorduraCorporal: "",

            perimetroCintura: "",
            perimetroAnca: "",

        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submeterAvaliacao = (event) => {

        const submissao =  {
            "data":                           new Date(),                         // data da submissao
            "atleta":                         fire.auth().currentUser.uid,        // id do user logado
            "peso":                           this.state.peso,
            "IMC":                            this.state.imc,
            "aguaCorporal":                   this.state.aguaCorporal,
            "perimetroCintura":               this.state.perimetroCintura,
            "perimentroAnca":                 this.state.perimetroAnca,
            "idadeMetabolica":                this.state.idadeMetabolica,
            "taxaMetabolicaBasal":            this.state.taxaMetabolicaBasal,
            "percentagemGorduraCorporal":     this.state.percentagemGorduraCorporal
        };


        Axios.post("avaliacoes", submissao)
            .then(res => {

                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'A tua avaliação foi submetida com sucesso!',
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


    render() {
        return (
            <div>
                <Modal
                
                    size="lg"
                    className="p-3"
                    show={this.props.showModal}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>

                        
                        <Modal.Title className="font-weight-bold" id="contained-modal-title-vcenter">
                            Submeter Avaliação
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Alert variant="info">
                            Deverás submeter apenas uma avaliação por mês. Por favor verifica a data da tua última submissão.
                       </Alert>

                        <p className="mb-4">
                        A avaliação consiste numa recolha de dados sobre a composição corporal (peso, IMC, percentagem de massa gorda e percentagem de massa muscular), estilo de vida e experiência de treino, patologias cardíacas e pulmonares, problemas articulares ou musculares e, ainda, sobre os objetivos do treino da pessoa em questão
                        </p>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Peso" name="peso" value={this.state.peso} onChange={this.handleChange} className="form-control" type="number" required />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="IMC" name="imc" value={this.state.imc} onChange={this.handleChange} className="form-control" type="number" required />
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Água Corporal" name="aguaCorporal" value={this.state.aguaCorporal} onChange={this.handleChange} className="form-control" type="number" required />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Taxa Metabólica Basal" name="taxaMetabolicaBasal" value={this.state.taxaMetabolicaBasal} onChange={this.handleChange} className="form-control" type="number" required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Idade Metabólica" name="idadeMetabolica" value={this.state.idadeMetabolica} onChange={this.handleChange} className="form-control" type="number" required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Percentagem Gordura Corporal" name="percentagemGorduraCorporal" value={this.state.percentagemGorduraCorporal} onChange={this.handleChange} className="form-control" type="number" required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Perímetro Cintura" name="perimetroCintura" value={this.state.perimetroCintura} onChange={this.handleChange} className="form-control" type="number" required />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Perímetro Anca" name="perimetroAnca" value={this.state.perimetroAnca} onChange={this.handleChange} className="form-control" type="number" required />
                                </Form.Group>
                            </Col>
                        </Row>          
                      
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.fecharModal}>Fechar</Button>
                        <Button onClick={this.submeterAvaliacao}>Enviar</Button>
                    </Modal.Footer>
                </Modal>
               

           

            </div>
        )
    }
}

export default SubmeterAvaliacao;