import React, { Component } from 'react';
import { Col, Row, Modal, Form, Button , Table} from 'react-bootstrap'
import Axios from '../../config/Axios';
import { fire } from '../../config/Fire';
import  Swal  from 'sweetalert2';
import { IoMdSad } from 'react-icons/io'


class NovaAlimentacao extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        ;
        this.state = {  

            atleta: "",   
            atletaNome: "",     
            nomePlano: "",
            observacoesGerais: "",

            // Refeicao
            ref: "",
            op1: "",
            op2: "",
            observacoes: "",

            // Lista total
            refeicoes: [],

            // encher para mostar os atletas daquele user
            atletas: [],       
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });     
    }
    

    handleChangeSelect(event) {

        this.setState({ 
            atleta: event.target.selectedOptions[0].value ,
            atletaNome: event.target.selectedOptions[0].label
        
        });

    }

    limparCampos = () => {

        this.setState({
            observacoesGerais: "",
            nomePlano: "",
            ref: "",
            op1: "",
            op2 :"",
            observacoes: "",
            refeicoes : [],
          });

    }

    gerarPassword = () => {
        var randomstring = Math.random().toString(36).slice(-8);
        
        this.setState({
            password: randomstring
        })
    }

    componentDidMount() {
          // Carregar os atletas daquele admin

          Axios.get("users/byAdmin/" + fire.auth().currentUser.uid)
          .then(res => {

              this.setState({ atletas: res.data.users })

              console.log(this.state.atletas);

          }).catch(error => {

              console.log(error.message)
          });
    }



    adicionarRefeicao = () => {

        const ref = {
            "refeicao":                         this.state.ref,
            "alimentacaoOp1":                   this.state.op1,
            "alimentacaoOp2":                   this.state.op2,
            "suplementacao_observacoes":        this.state.observacoes,
        }

        this.setState({ refeicoes: [...this.state.refeicoes, ref] }) 
    }

    adicionarPlano = () => {

        const plano = {          
            "observacoes":       this.state.observacoesGerais,          
            "atleta":            this.state.atleta, 
            "atletaNome":        this.state.atletaNome, 
            "admin_id":          fire.auth().currentUser.uid,     
            "nomePlano":         this.state.nomePlano,
            "plano":             this.state.refeicoes,         
        }

        Axios.post("refeicoes", plano)
        .then(res => {

            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'O plano alimentar foi adicionado com sucesso',
            })


            this.props.fecharModal();

            console.log(res.data);

        }).catch(error => {

            Swal.fire({
                icon: 'error',
                title: 'Ups!',
                text: 'Ocorreu um erro' + error.message,
            })
        });
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
                            Adicionar Novo Plano Alimentar
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6 class="font-weight-bold my-3" >Informação</h6>
                        <Row>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Control name="atleta" onChange={this.handleChangeSelect} as="select">
                                        <option selected>Selecione o atleta</option>

                                        {
                                            this.state.atletas.map(function (item, i) {
                                                return <option value={item.id}>
                                                    {item.nome}
                                                </option>
                                            })
                                        }


                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control ref="nomePlano" placeholder="Nome do Plano" name="nomePlano" value={this.state.nomePlano} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control ref="observacoesGerais" as="textarea" rows="3" placeholder="Observações" name="observacoesGerais" value={this.state.observacoesGerais} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>

                            </Col>
                        </Row>

                        <h6 class="font-weight-bold my-3" >Refeições</h6>


                        {
                            this.state.refeicoes.length > 0 ?

                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Refeição</th>
                                            <th>Opção 1</th>
                                            <th>Opção 2</th>
                                            <th>Observaçoes/Suplementação</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.refeicoes.map(function (item, i) {
                                                console.log('test');
                                                return <tr>
                                                    <td>{item.refeicao}</td>
                                                    <td>{item.alimentacaoOp1}</td>
                                                    <td>{item.alimentacaoOp2}</td>
                                                    <td>{item.suplementacao_observacoes}</td>
                                                    <td><Button variant="danger" >Apagar</Button></td>
                                                </tr>
                                            })
                                        }

                                    </tbody>
                                </Table>

                                : 

                                <div className="empty-message" >
                                    Não foram adicionadas refeições ainda <IoMdSad  />
                                </div>


                                }

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control ref="ref" placeholder="Refeição" name="ref" value={this.state.ref} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>
                            </Col>                         
                        </Row>                    
                        <Row>                          
                            <Col>
                                <Form.Group>
                                    <Form.Control ref="op1" placeholder="Opção 1" name="op1" value={this.state.op1} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>                       
                            <Col>
                                <Form.Group>
                                    <Form.Control ref="op2" placeholder="Opção 2" name="op2" value={this.state.op2} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Form.Group>
                                    <Form.Control ref="observacoes" placeholder="Observacoes" name="observacoes" value={this.state.observacoes} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>
                            </Col>                        
                            <Col>
                                <Form.Group>
                                    <Button onClick={this.adicionarRefeicao} variant="primary">Adicionar Refeição</Button>
                                </Form.Group>
                            </Col>                          
                        </Row>                  
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.limparCampos}>Limpar campos</Button>
                        <Button onClick={this.props.fecharModal}>Fechar</Button>
                        <Button onClick={this.adicionarPlano}>Enviar</Button>
                    </Modal.Footer>

                </Modal>
               
            </div>
        )
    }
}

export default NovaAlimentacao;