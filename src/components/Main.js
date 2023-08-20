import React, { Component } from 'react';
import Form from './Form'
import Tarefas from './Tarefas';
import './Main.css'



export default class Main extends Component {



  state = {
    novaTarefa: '',
    tarefa: [],
    index: -1,
  };

  componentDidMount(){
    const tarefa = JSON.parse(localStorage.getItem('tarefa'));

    if(!tarefa) return;

    this.setState({tarefa});

  }

  componentDidUpdate(prevProps, prevState){
    const { tarefa } = this.state;

    if(tarefa === prevState.tarefa) return;
    localStorage.setItem('tarefa', JSON.stringify(tarefa) );
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const { tarefa, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefa.indexOf(novaTarefa) !== -1) return;

    const novaTarefas = [... tarefa];


    if (index === -1){
      this.setState({
        tarefa: [... novaTarefas, novaTarefa],
        novaTarefa: '',
      });

    } else {

      this.setState({
        tarefa: [...novaTarefas],
        index: -1,
      });
    }


  }



  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });

  }

  handleEdit = (e, index) => {
    const { tarefa } = this.state;
    this.setState({
      index,
      novaTarefa: tarefa[index],
    });

  }

  handleDelete = (e, index) => {
    const { tarefa } = this.state;
    const novaTarefas = [...tarefa];
    novaTarefas.splice(index, 1);

    this.setState({
      tarefa : [...novaTarefas],
    });

   }


    render() {

      const { novaTarefa, tarefa } = this.state;

      return (
        <div className="main">
          <h1>Lista de tarefa</h1>
          <Form
          handleSubmit = {this.handleSubmit}
          handleChange = {this.handleChange}
          novaTarefa = {novaTarefa}
          />

        <Tarefas

        tarefa={tarefa}
        handleEdit = {this.handleEdit}
        handleDelete={this.handleDelete}

        />
        </div>
      );

    }


 }



