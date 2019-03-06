import React, {Component} from 'react';

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'
import ItemAddForm from '../item-add-form';

import './app.css'

export default class App extends Component {

    maxId = 100;

    state = {
        todoData : [
            this.createTodoItem('Drink coffee'),
            this.createTodoItem('Make awesome App'),
            this.createTodoItem('have a launch'),
        ],
        filter: 'all ', // active, all, done
        term: ''
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    };

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0,idx),
                ...todoData.slice(idx+1),
            ];
            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            const newArray = [
                ...todoData,
                newItem
            ];
            return { todoData: newArray }
        });
    };

    toggleProperty(arr, id, propname) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propname] : !oldItem[propname]};
        return [
            ...arr.slice(0,idx),
            newItem,
            ...arr.slice(idx+1),
        ];
    };

    onTogleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    onTogleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    search(items, term){
        if (term ==='')
            return items;

        return items.filter((item)=>{
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    };

    onSearch = (term) => {
        this.setState({ term })
    };

    onFilterItems = (filter) => {
        this.setState({ filter })
    };

    render() {
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(
            this.search(todoData, term), filter
        );
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>

                <div className="search-panel d-flex">
                    <SearchPanel onSearch={this.onSearch}/>
                    <ItemStatusFilter onFilter={this.onFilterItems} filter={filter}/>
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeletedTopApp={this.deleteItem}
                    onTogleImportant={this.onTogleImportant}
                    onTogleDone={this.onTogleDone}
                />

                <ItemAddForm addNewItem={this.addItem}/>
            </div>
        )
    }
}



