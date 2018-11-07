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
            const idx = todoData.findIndex((el) => el.id === id);

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
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            // 1. update object
            const oldItem = todoData[idx];
            const newItem = {...oldItem,
                done: !oldItem.done};

            // 2. construct new array
            const newArray = [
                ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    onToggleImportant = (id) => {
        console.log("onToggleImportant", id);
    };

    render () {

        const doneCount = this.state.todoData.filter((el) => el.done).length;
        const toDoCount = this.state.todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={toDoCount} done={doneCount}/>

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