import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap'
import { IoIosAddCircleOutline } from "react-icons/io";
import NovoTreino from './NovoTreino';
import Axios from '../../config/Axios';
import { fire } from '../../config/Fire';
import { TiArrowUnsorted } from "react-icons/ti";
import Swal from 'sweetalert2';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class Treino extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            treinos: [],
            exercicios: [],
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
        
// Carregar os treinos daquele admin
Axios.get("treinos/byAdmin/" + fire.auth().currentUser.uid)
.then(res => {
    this.setState({ treinos: res.data.treino })
    console.log(this.state.treinos);
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

                  Axios.delete("treinos/" + row.id)
                      .then(res => {

                          Swal.fire({
                              title: 'Sucesso!',
                              text: "O plano foi eliminado com sucesso.",
                              icon: 'success',
                              confirmButtonText: 'Fechar',

                          })

                          // voltar a carregar os planos, para atualziar a lista!
                          this.carregarPlanos();

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
            Exercícios            
        </Button>
         )
     }

     abrirPopUp = (cell, row) => {


        var html = "";

        html += `
        <div class="row text-left my-5 pop-up" >
        <div class="col">
            <h4>Aquecimento</h4>`
            + row.aquecimento +
            `
        </div>
        <div class="col">
        <h4>Cardio Alongamentos</h4>`
        + row.cardio_alongamentos +
        `
        </div>
        <div class="col">
            <h4>Observações</h4>
            `
        + row.observacoes +
        `
        </div>
        
        </div>`;
        
         Axios.get("treinos/exercicios/" + row.id)
             .then(res => {

                 this.setState({ exercicios: res.data.exercicios }, () => {

                     html += '<table class="table plano-treino-individual-tabela">'
                     html += `
        <thead>
            <tr>
                <th>Exercicio</th>
                <th>Series</th>
                <th>reps</th>
                <th>descanso</th>
                <th>observações</th>
            </tr>
        </thead>`

                     this.state.exercicios.forEach(function (item) {

                         html += `
            <tbody>
                <tr>
                    <td class="text-left">` + item.exercicio + `</td>
                    <td>` + item.series + `</td>
                    <td>` + item.repeticoes + `</td>
                    <td>` + item.tempoDescanso + `</td>
                    <td>` + item.observacoes + `</td>
                </tr>
            </tbody>`
                     });

                     html += "</table>"

                     Swal.fire({
                         html: html,
                         confirmButtonText: "Fechar",
                         customClass: 'swal-wide slow-animation',
                         
                     });

                 });


        }).catch(error => {

            console.log(error.message)
        });

    }

    render() {


        return (
            <div>
                <Button onClick={this.mostrarModal.bind(this)} className="m-4 p-3 mr-0" ><IoIosAddCircleOutline /> Adicionar Plano de Treino</Button>

                <NovoTreino 
                    showModal={this.state.showModal} 
                    carregarPlanos={this.carregarPlanos} 
                    fecharModal={this.fecharModal}
                    
                />

                <Card className="shadow border-0">
                    <Card.Body>

                        <Card.Title className="font-weight-bold tab-title" >Planos</Card.Title>

                        <Card.Text>

                            <BootstrapTable searchPlaceholder={"Pesquisar plano"} data={this.state.treinos} search>
                                <TableHeaderColumn width={'20%'} dataSort={true} isKey dataField='atletaNome'>Atleta <TiArrowUnsorted/></TableHeaderColumn>
                                <TableHeaderColumn width={'20%'} hidden={true}  dataField='atleta'></TableHeaderColumn>
                                <TableHeaderColumn width={'20%'} dataField='nomePlano'>Nome Plano</TableHeaderColumn>
                                <TableHeaderColumn width={'30%'} dataField='objetivoDoPlano'>Objetivo do Plano</TableHeaderColumn>
                                <TableHeaderColumn width={'15%'} dataField="exericicos" dataFormat={this.VerExercicios}></TableHeaderColumn>
                                <TableHeaderColumn width={'15%'} dataField="remover" dataFormat={this.BotaoRemover}></TableHeaderColumn>
                            </BootstrapTable>

                        </Card.Text>

                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default Treino;