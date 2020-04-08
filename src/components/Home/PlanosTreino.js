import React, { Component, useState } from 'react';
import { Card,Button } from 'react-bootstrap'
import Axios from '../../config/Axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { fire } from '../../config/Fire';
import Swal from 'sweetalert2';

class PlanosTreino extends Component {
    constructor(props) {    
        super(props);   
        this.state = {
            show: false,
            treinos: []
        }
    }

    componentDidMount() {
        
          // Carregar atleta
          Axios.get("treinos/" + fire.auth().currentUser.uid)
          .then(res => {
              this.setState({ treinos: res.data.treino })
              console.log(this.state.treinos);
          
            }).catch(error => {
              console.log(error.message)
          });
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
                    <td>` + item.exercicio + `</td>
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

                <Card className="shadow border-0">       
                    <Card.Body>

                        <Card.Title className="font-weight-bold tab-title" >Treino</Card.Title>

                        <Card.Text>

                            <BootstrapTable data={this.state.treinos}>
                                <TableHeaderColumn hidden={true} dataField='id'></TableHeaderColumn>
                                <TableHeaderColumn isKey width={'40%'} dataField='nomePlano'>Nome Plano</TableHeaderColumn>
                                <TableHeaderColumn width={'40%'} dataField='objetivoDoPlano'>Objetivo do Plano</TableHeaderColumn>
                                <TableHeaderColumn width={'20%'} dataField="ecercicios" dataFormat={this.VerExercicios}></TableHeaderColumn>
                            </BootstrapTable>

                        </Card.Text>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default PlanosTreino;