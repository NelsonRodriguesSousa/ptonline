import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap'
import { IoIosAddCircleOutline } from "react-icons/io";
import Axios from '../../config/Axios';
import { fire } from '../../config/Fire';
import { TiArrowUnsorted } from "react-icons/ti";
import Swal from 'sweetalert2';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import NovaAlimentacao from './NovaAlimentacao';


class Alimentacao extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            planos: [],
            refeicoes: [],
        }
    }

    mostrarModal = () => {
        this.setState({ showModal: true })
    }

    fecharModal = () => {
        this.setState({ showModal: false })
        this.carregarPlanos();
    }


    componentDidMount() {
        this.carregarPlanos(); 
    }

    carregarPlanos() {
        Axios.get("refeicoes/byAdmin/" + fire.auth().currentUser.uid)
        .then(res => {

            this.setState({ planos: res.data.refeicoes })

            console.log(this.state.planos);

        }).catch(error => {

            console.log(error.message)
        });
    }

    BotaoRemover = (cell, row) => {
        return (
           <Button 
              variant="danger"
              onClick={() => 
              this.removerPlano(cell, row)}
           >
           Remover
           </Button>
        )
     }

     removerPlano(cell, row){
        Swal.fire({
            title: 'Tem a certeza?',
            text: "Esta ação não pode ser revertida.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, apagar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.value) {

                
                  // Chamar aqui a funcao de apagar

                  Axios.delete("refeicoes/" + row.id)
                      .then(res => {

                          Swal.fire({
                              title: 'Sucesso!',
                              text: "O plano foi eliminado com sucesso.",
                              icon: 'success',
                              confirmButtonText: 'Fechar',

                          })

                          // voltar a carregar os planos, para atualziar a lista!
                          this.componentDidMount();

                      }).catch(error => {

                          console.log(error.message)
                      });

            }
          })
     }

     VerExercicios = (cell, row) => {
        
        return (
            <Button 
               variant="primary"
               onClick={() => 
               this.abrirPopUp(cell, row)}
            >
            Refeições            
        </Button>
         )
     }

     abrirPopUp = (cell, row) => {

        var html = "";

        html += `
        <div class="row text-left my-5 pop-up" >
       
        <div class="col">
            <h4>Observações</h4>
            `
        + row.observacoes +
        `
        </div>
        
        </div>`;
        
         Axios.get("refeicoes/refeicoes/" + row.id)
             .then(res => {

                 this.setState({ refeicoes: res.data.exercicios }, () => {

                     html += '<table class="table plano-treino-individual-tabela">'
                     html += `
        <thead>
            <tr>
                <th>Refeição</th>
                <th>Opção 1</th>
                <th>Opção 2</th>
                <th>Observações</th>
            </tr>
        </thead>`

                     this.state.refeicoes.forEach(function (item) {

                         html += `
            <tbody>
                <tr>
                    <td>` + item.refeicao + `</td>
                    <td>` + item.alimentacaoOp1 + `</td>
                    <td>` + item.alimentacaoOp2 + `</td>
                    <td>` + item.suplementacao_observacoes + `</td>
                </tr>
            </tbody>`
                     });

                     html += "</table>"

                     Swal.fire({
                         html: html,
                         confirmButtonText: "Fechar",
                         customClass: 'swal-wide',
                     });

                 });


        }).catch(error => {

            console.log(error.message)
        });




    }

    render() {


        return (
            <div>
                <Button onClick={this.mostrarModal.bind(this)} className="m-4 p-3 mr-0" ><IoIosAddCircleOutline /> Adicionar Plano Alimentar</Button>

                <NovaAlimentacao  
                showModal={this.state.showModal} 
                fecharModal={this.fecharModal}
                 />

                <Card className="shadow border-0">
                    <Card.Body>

                        <Card.Title className="font-weight-bold tab-title" >Planos Alimentares</Card.Title>

                        <Card.Text>

                            <BootstrapTable data={this.state.planos} search striped>
                                <TableHeaderColumn width={'20%'} dataSort={true} isKey dataField='atletaNome'>Atleta <TiArrowUnsorted/></TableHeaderColumn>
                                <TableHeaderColumn width={'20%'} hidden={true}  dataField='atleta'></TableHeaderColumn>
                                <TableHeaderColumn width={'30%'} dataField='nomePlano'>Nome Plano</TableHeaderColumn>
                                <TableHeaderColumn width={'10%'} dataField="exericicos" dataFormat={this.VerExercicios}></TableHeaderColumn>
                                <TableHeaderColumn width={'10%'} dataField="remover" dataFormat={this.BotaoRemover}></TableHeaderColumn>
                            </BootstrapTable>

                        </Card.Text>

                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default Alimentacao;