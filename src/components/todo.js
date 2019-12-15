import React from 'react';
import { add_todo, } from '../store/action';
import { connect } from 'react-redux';
import { IoIosPaper, IoIosAddCircle, IoMdDoneAll,IoIosTrash } from 'react-icons/io';
import * as moment from 'moment';
class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: '',
            todos: [],
            text: '',
            result: [],
        }
        this.addData = this.addData.bind(this);
    }
    addData() {
        const { task } = this.state;
        if (this.props.todos) {
            const postedTodos = this.props.todos;
            const todoToAdd = {
                name: task,
                status: "notFulfilled",
                postedTime: Date.now(),
                id: postedTodos.length
            }
            postedTodos.push(todoToAdd)
            this.props.set_todo(postedTodos)
            this.setState({ todos: this.props.todos, task:'' })

        }
        else {
            this.props.set_todo([{ name: task, status: "notFulfilled", postedTime: Date.now(), id:0 }]);
            this.setState({ todos: this.props.todos, task:'' })
        }
    }
    removeTodo(v, i) {
        console.log(v)
        const postedTodos = this.props.todos;
        for(var z =0; z<postedTodos.length; z++){
            if(postedTodos[z].name==v.name&&postedTodos[z].postedTime === v.postedTime){
                postedTodos.splice(z, 1)
                this.props.set_todo(postedTodos)
            }
        }
        const {result} = this.state;
        if(result.length){
            for(var x =0; x<result.length; x++){
                if(result[x].name===v.name&&result[x].postedTime===v.postedTime){
                    result.splice(x,1)
                }
            }
        }
        this.setState({ todos: this.props.todos, result })
    }
    checkTodo(v, i) {
        const postedTodos = this.props.todos;
        postedTodos[i].status = "fulfilled";
        this.props.set_todo(postedTodos)
        const {result} = this.state;
        if(result.length){
            for(var z =0; z<result.length; z++){
                if(result[z].id===i){
                    result[z].status = "fulfilled";
                }
            }
        }
        this.setState({ todos: this.props.todos, result })
    }
    search(e) {
        const { todos } = this.props;
        const text = e.target.value;

        const result = todos.filter((elem) => {
            return elem.name.substring(0, text.length).toLowerCase().indexOf(text.toLowerCase()) !== -1
        })
        this.setState({ result, text });
    }
    render() {
        const { result, todos, text } = this.state;
        return (
            <div>
                <div className={'header'}>
                    <p><span><IoIosPaper /></span> <span style={{color:"#333233"}}>to</span>dos</p>
                    <div><input onChange={(e) => { this.setState({ task: e.target.value }) }} value={this.state.task} placeholder='enter todos' />
                    <button onClick={this.addData}><span title='Add Todo'><IoIosAddCircle /></span></button></div>
                    <input onChange={this.search.bind(this)} placeholder='search todos' />
                </div>
                <div className={'body'}>
                    {!this.props.todos && <p className={'noWork'}>Cheers! No Work.</p>}
                    {this.props.todos && text==="" && this.props.todos.map((v, i) => {
                        return <div> <div>{v.status!=="fulfilled" ? <span>{v.name.toUpperCase()}</span>: <span style={{textDecoration:"line-through"}}>{v.name.toUpperCase()}</span>} <br /><small syle={{color:"color: rgba(255, 111, 95, 0.76);"}}>{moment().calendar(`${v.postedTime}`)}</small></div> {v.status !== "fulfilled" && <p onClick={() => { this.checkTodo(v, v.id) }} style={{color:"#17A2B8"}} title='Check Todo'><IoMdDoneAll /> </p>} <p style={{color:"#E74C3C"}} onClick={() => { this.removeTodo(v, v.id) }} title='Delete Todo'><IoIosTrash /></p></div>
                    })}
                    {result!==[] && text!=="" && result.map((v, i) => {
                        return <div> <div>{v.status!=="fulfilled" ? <span>{v.name.toUpperCase()}</span>: <span style={{textDecoration:"line-through"}}>{v.name.toUpperCase()}</span>} <br /><small syle={{color:"color: rgba(255, 111, 95, 0.76);"}}>{moment().calendar(`${v.postedTime}`)}</small></div> {v.status !== "fulfilled" && <p onClick={() => { this.checkTodo(v, v.id) }} style={{color:"#17A2B8"}} title='Check Todo'><IoMdDoneAll /> </p>} <p style={{color:"#E74C3C"}} onClick={() => { this.removeTodo(v, v.id) }} title='Delete Todo'><IoIosTrash /></p></div>
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        set_todo: (todoList) => dispatch(add_todo(todoList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
