import React, { Component, useState } from 'react';
import { Card,Button , Tooltip, OverlayTrigger} from 'react-bootstrap'
import Axios from '../../config/Axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { fire } from '../../config/Fire';
import Swal from 'sweetalert2';
import { IoIosAddCircle} from "react-icons/io";
import SubemeterAvaliacao from './SubmeterAvaliacao'
import {IoIosHelpCircle} from 'react-icons/io'

class Avaliacao extends Component {
    constructor(props) {    
        super(props);   
        this.state = {
            showModal: false,
            avaliacoes: []
        }
    }

    componentDidMount() {
        
          Axios.get("avaliacoes/" + fire.auth().currentUser.uid)
          .then(res => {
              this.setState({ avaliacoes: res.data.avaliacoes })
              
              console.log(this.state.avaliacoes);
          
            }).catch(error => {
              console.log(error.message)
          });
    }

    mostrarModal = () => {
        this.setState({ showModal: true })
    }

    fecharModal = () => {
        this.setState({ showModal: false })
    }


     dateFormatter(cell) {
    
        return new Date(cell).toLocaleDateString();
    }

    render() {


        return (
            <div>

                {this.state.showModal &&

                    <SubemeterAvaliacao showModal={this.state.showModal} fecharModal={this.fecharModal} />
                }

                <Button onClick={this.mostrarModal} className="m-4"><IoIosAddCircle /> Submeter Avaliação</Button>

                <Card className="shadow border-0">
                    <Card.Body>

                        <Card.Title className="font-weight-bold tab-title" >Histórico de avaliações</Card.Title>

                        <Card.Text>

                            <BootstrapTable data={this.state.avaliacoes}>

                            <TableHeaderColumn width={'20%'} dataField='data' dataSort={true} dataFormat={this.dateFormatter}  >Data</TableHeaderColumn>

                                <TableHeaderColumn isKey hidden={true} dataField='id'></TableHeaderColumn>
                                <TableHeaderColumn width={'10%'} dataField='taxaMetabolicaBasal'>
                                    
                                    TMB
                                    <OverlayTrigger

                                        key={"top"}
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>

                                               Taxa Metabólica Basal
                                            </Tooltip>
                                        }
                                    >
                                        <IoIosHelpCircle className="mx-1" />
                                    </OverlayTrigger>
                                   
                                
                                </TableHeaderColumn>
                                <TableHeaderColumn width={'10%'} dataField='percentagemGorduraCorporal'>

                                PGC
                                    <OverlayTrigger

                                        key={"top"}
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>
                                               Percentagem Gordura Corporal
                                            </Tooltip>
                                        }
                                    >
                                        <IoIosHelpCircle className="mx-1" />
                                    </OverlayTrigger>
                                
                                </TableHeaderColumn>
                                <TableHeaderColumn width={'10%'} dataField='idadeMetabolica'>

                                IM
                                    <OverlayTrigger

                                        key={"top"}
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>

                                               Idade Metabólica
                                            </Tooltip>
                                        }
                                    >
                                        <IoIosHelpCircle className="mx-1" />
                                    </OverlayTrigger>
                                
                                </TableHeaderColumn>
                                <TableHeaderColumn width={'10%'} dataField='perimetroCintura'>
                                

                                PC
                                    <OverlayTrigger

                                        key={"top"}
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>

                                             Perímetro Cintura
                                            </Tooltip>
                                        }
                                    >
                                        <IoIosHelpCircle className="mx-1" />
                                    </OverlayTrigger>
                                
                                </TableHeaderColumn>
                                <TableHeaderColumn width={'10%'} dataField='perimentroAnca'>
                                
                                
                                PA
                                    <OverlayTrigger

                                        key={"top"}
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>

                                             Perímetro Anca
                                            </Tooltip>
                                        }
                                    >
                                        <IoIosHelpCircle className="mx-1" />
                                    </OverlayTrigger>
                                
                                </TableHeaderColumn>
                                <TableHeaderColumn width={'10%'} dataField='peso'>Peso</TableHeaderColumn>
                                <TableHeaderColumn width={'10%'} dataField='IMC'>
                                
                                IMC
                                    <OverlayTrigger

                                        key={"top"}
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>

                                           Índice de Massa Corporal
                                            </Tooltip>
                                        }
                                    >
                                        <IoIosHelpCircle className="mx-1" />
                                    </OverlayTrigger>
                                
                                
                                </TableHeaderColumn>
                                <TableHeaderColumn width={'10%'} dataField='aguaCorporal'>Água corporal</TableHeaderColumn>

                            </BootstrapTable>

                        </Card.Text>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default Avaliacao;