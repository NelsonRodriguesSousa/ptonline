import React, { Component } from 'react';
import { Card, Button , Image } from 'react-bootstrap'
import { IoIosAddCircleOutline } from "react-icons/io";
import Axios from '../../config/Axios';
import { TiArrowUnsorted } from "react-icons/ti";
import Swal from 'sweetalert2';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactLoading from 'react-loading';
import { fire } from '../../config/Fire';

import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import NovoAtleta from './NovoAtleta';


class Atletas extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            atletas: [],
            isDataFetched: false,

        }
    }

    mostrarModal = () => {
        this.setState({ showModal: true })
    }

    fecharModal = () => {
        this.setState({ showModal: false })
        this.carregarAtletas();
    }


    imageFormatter(cell, row){
        return ( <Image width="60" src={cell} roundedCircle/>
        ) 
    }

    BotaoRemover = (cell, row, rowIndex) => {
        return (
           <Button 
              variant="danger"
              onClick={() => 
              this.removerAtleta(cell, row, rowIndex)}
           >
           Remover
           </Button>
        )
     }

     removerAtleta(cell, row, rowIndex){

        Swal.fire({
            title: 'Tem a certeza?',
            text: "Todos os planos e avaliações associados a este atleta irão ser apagados. <br/>Esta ação não pode ser revertida.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, apagar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
              if (result.value) {

                  Axios.delete("users/" + row.id)
                      .then(res => {

                          Swal.fire({
                              title: 'Sucesso!',
                              text: "O atleta foi eliminado com sucesso.",
                              icon: 'success',
                              confirmButtonText: 'Fechar',

                          })

                          // voltar a carregar os users, para atualziar a lista!
                          this.carregarAtletas();

                      }).catch(error => {

                          console.log(error.message)
                      });
              }
          })
    }

    image = (cell, row, rowIndex) => {
          return (<img src={cell} height="60"/>)
         
    }

    renderPaginationShowsTotal(start, to, total) {
        return (
            <p >
                {total} Atletas
          </p>
        );
    }

    carregarAtletas() {
        // carregar os users do admin

        Axios.get("users/byAdmin/" + fire.auth().currentUser.uid)
            .then(res => {


                this.setState({ atletas: res.data.users , isDataFetched : true})
                

                console.log(this.state.atletas)

            }).catch(error => {

                console.log(error.message)
            });
    }
    
    componentDidMount() {
       this.carregarAtletas();
    }

    _setTableOption() {
        if (this.state.isDataFetched) {
            return (
            
                <div class="m-3">
                    <b>Não existem atletas</b>
                </div>
                );
        } else {
            return (

               <center>
                <ReactLoading type='bars' color='#1d87a0' height={'10%'} width={'10%'} />
               </center>
                
            );
        }
    }


    render() {

        let tableOtions = {
            noDataText: this._setTableOption(),
        };

        return (
            <div>


                <Button onClick={this.mostrarModal.bind(this)} className="m-4 p-3 mr-0" ><IoIosAddCircleOutline /> Adicionar Atleta</Button>

                {this.state.showModal &&

                    <NovoAtleta carregarAtletas={this.carregarAtletas} showModal={this.state.showModal} fecharModal={this.fecharModal} />

                }


                <Card className="shadow border-0">
                    <Card.Body>
                        <Card.Title className="font-weight-bold tab-title" >Atletas</Card.Title>
                        <Card.Text>
                            <BootstrapTable options={tableOtions} searchPlaceholder={"Pesquisar atleta"} data={this.state.atletas} search striped >
                                <TableHeaderColumn width={'10%'} dataFormat={this.imageFormatter} sort={true} isKey dataField='imagemPerfil'>Avatar</TableHeaderColumn>
                                <TableHeaderColumn width={'22%'} dataSort={true} dataField='nome'>Nome <TiArrowUnsorted /></TableHeaderColumn>
                                <TableHeaderColumn width={'26%'} dataSort={true} dataField='email'>Email <TiArrowUnsorted /></TableHeaderColumn>
                                <TableHeaderColumn width={'22%'} dataSort={true} dataField='tipo_atleta'>Tipo de Atleta <TiArrowUnsorted /></TableHeaderColumn>
                                <TableHeaderColumn width={'10%'} dataField="remover" dataFormat={this.BotaoRemover}></TableHeaderColumn>
                            </BootstrapTable>

                        </Card.Text>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default Atletas;