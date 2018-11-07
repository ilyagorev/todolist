import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';


import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createItem('Drink Coffee'),
            this.createItem('Learn React'),
            this.createItem('Make Awesome App')
        ]
    };

    createItem(label) {
        return {
            id: ++this.maxId,
            label,
            important: false,
            done: false
        };
    }

    deleteItem = (id) => {
        this.setState(({ todoData })=>{
            const  idx = todoData.findIndex((el) => el.id === id);

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }

        });
    };

    addItem = (text) => {
        const newItem = this.createItem(text);

        this.setState(({ todoData }) => {
            const newArr = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArr
            };
        });
    };


    onToggleDone = (id) => {
        console.log("onToggleDone", id);
    };

    onToggleImportant = (id) => {
        console.log("onToggleImportant", id);
    };

    render () {
        return (
            <div className="todo-app">
                <AppHeader />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>
                <TodoList
                    todos={this.state.todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    };
};