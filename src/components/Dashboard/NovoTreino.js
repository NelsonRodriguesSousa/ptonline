import React, { Component } from 'react';
import { Col, Row, Modal, Form, Button , Table} from 'react-bootstrap'
import Axios from '../../config/Axios';
import { fire } from '../../config/Fire';
import  Swal  from 'sweetalert2';
import { IoMdSad } from 'react-icons/io'

class NovoTreino extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.state = {  

            atleta: "",
            atletaNome: "",
            nomePlano: "",

            objetivoPlano: "",
            aquecimento: "",

            cardio_alongamentos: "",
            observacoesGerais: "",

            // Exercicio
            nome: "",
            reps: "",
            series: "",
            descanso: "",
            observacoes: "",

            // Lista total
            exercicios: [],
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
            atleta: "",
            atletaNome: "",
            nomePlano: "",

            objetivoPlano: "",
            aquecimento: "",

            cardio_alongamentos: "",
            observacoesGerais: "",

            exercicios: []
          });

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



    adicionarExercicio = () => {

        const ex = {
            exercicio:          this.state.nome,
            repeticoes:         this.state.reps,
            series:             this.state.series,
            tempoDescanso:      this.state.descanso,
            observacoes:        this.state.observacoes,
        }

        if(this.state.nome == "") {

            Swal.fire({
                icon: 'warning',
                title: 'Ups!',
                text: 'Insira pelo menos o nome do exercício',
            })

        } else {

            this.setState({ 
                exercicios: [...this.state.exercicios, ex] ,
                reps: "",
                series: "",
                descanso: "",
                observacoes: "",
                nome: "",
            })
    
        }

       
        
    }

    apagarExercicio (index) {

        var array = [...this.state.exercicios]; // make a separate copy of the array
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ exercicios: array });
        }

    }

    adicionarPlano = () => {

        if(this.state.atleta == "" || this.state.observacoesGerais == "" || this.state.objetivoDoPlano == "" || this.state.cardio_alongamentos == "" || this.state.nomePlano == "" || this.state.aquecimento == "" )  {
            
            
            Swal.fire({
                icon: 'warning',
                title: 'Ups!',
                text: 'Por favor preenche os campos em falta',
            })
        
        
        } else  if (this.state.exercicios.length == 0) {

            Swal.fire({
                icon: 'warning',
                title: 'Ups!',
                text: 'Parece que faltam exercícios no plano',
            })
            
        } else {

            const treino = {      
                "observacoes":              this.state.observacoesGerais,          
                "atleta":                   this.state.atleta,       
                "atletaNome":               this.state.atletaNome,          
                "objetivoDoPlano":          this.state.objetivoPlano,
                "cardio_alongamentos":      this.state.cardio_alongamentos,
                "nomePlano":                this.state.nomePlano,          
                "admin_id":                 fire.auth().currentUser.uid,     
                "aquecimento":              this.state.aquecimento,
                "plano":                    this.state.exercicios,   
            }
    
            Axios.post("treinos", treino)
            .then(res => {
    
                // Mensagem de sucesso 
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'O treino foi adicionado com sucesso',
                })
    
    
                // limpar os campos 

                this.limparCampos();
                // fechar Modal
                this.props.fecharModal();
    
                // Voltar a carregar os planos
                this.props.carregarPlanos();
    
                console.log(res.data);
    
            }).catch(error => {
    
                Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: 'Ocorreu um erro' + error.message,
                })
            });

        }


    
    }

    render() {
        return (
            <div>
                <Modal
                    size="lg"
                    className="p-5"
                    show={this.props.showModal}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={this.props.fecharModal}
                >
                      
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Adicionar Novo Plano de treino
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
                                                return <option atleta={item.nome} value={item.id}>
                                                    {item.nome}
                                                </option>
                                            })
                                        }

                                    </Form.Control>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Nome do Plano" name="nomePlano" value={this.state.nomePlano} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Objetivo do Plano" name="objetivoPlano" value={this.state.objetivoPlano} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>

                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Aquecimento" name="aquecimento" value={this.state.aquecimento} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Cardio e alongamentos" name="cardio_alongamentos" value={this.state.cardio_alongamentos} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>

                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Observações" name="observacoesGerais" value={this.state.observacoesGerais} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <h6 class="font-weight-bold my-3" >Exercícios</h6>

                        {
                            this.state.exercicios.length > 0 ?
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Exercicio</th>
                                            <th>Reps</th>
                                            <th>Séries</th>
                                            <th>Observaçoes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.exercicios.map((item, i) => {
                                                return <tr>
                                                    <td>{item.exercicio}</td>
                                                    <td>{item.repeticoes}</td>
                                                    <td>{item.series}</td>
                                                    <td>{item.observacoes}</td>
                                                  
                                                </tr>
                                            })
                                        }

                                    </tbody>

                                   

                                </Table>
                                :
                                <div className="empty-message" >
                                    Não foram adicionados exerícios ainda <IoMdSad  />
                                </div>
                        }


                    
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control ref="nome" placeholder="Nome" name="nome" value={this.state.nom} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>

                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Repetições" name="reps" value={this.state.reps} onChange={this.handleChange} className="form-control" type="number" required />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Séries" name="series" value={this.state.series} onChange={this.handleChange} className="form-control" type="number" required />
                                </Form.Group>
                            </Col>


                           
                        </Row> 

                        <Row>
                        <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Descanso" name="descanso" value={this.state.descanso} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Control placeholder="Observações" name="observacoes" value={this.state.observacoes} onChange={this.handleChange} className="form-control" type="text" required />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Button onClick={this.adicionarExercicio} variant="primary">Adicionar Exercicio</Button>
                                </Form.Group>
                               
                            </Col>


                        </Row>

                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.limparCampos}>Limpar tudo</Button>
                        <Button onClick={this.props.fecharModal}>Fechar</Button>
                        <Button onClick={this.adicionarPlano}>Enviar</Button>
                    </Modal.Footer>

                </Modal>
               
            </div>
        )
    }
}

export default NovoTreino;