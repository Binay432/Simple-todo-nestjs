<template>
    <div class="todoContainer grid place-items-center bg-emerald-900 p-16 min-h-screen border-4 w-full bg-black">
        <h1 class="text-white">ToDo App</h1>
        <div class="inputAddField flex justify-center items-center mt-3">
            <input v-model="todoNote" class="h-12 rounded-lg border-emerald-500 indent-4 text-emerald-900 shadow-lg focus:outline-none focus:ring focus:ring-emerald-600" type="text" placeholder="Add" />
            <button class="h-12 rounded-lg border-2 w-24 m-2 text-white" @click="handleAddEditToDo">{{requestForEdit ? "Edit" : "Add" }}</button>
        </div>
        <div class="w-full flex justify-center items-center">
            <div class="todoList flex justify-center items-center">
                <ul class="w-full">
                    <li class="bg-white mt-3 flex justify-between items-center h-12 w-full" v-for="todo in ToDos" :key="todo">
                        <div class="checkbox flex justify-between items-center">
                            <input type="checkbox" class="ml-1" v-model="todo.done">
                            <div class="todoContent">
                                <span :class="{ 'strike-through': todo.done }" class="ml-2 text-xl">{{ todo.text }}</span>
                            </div>
                        </div>
                        <div class="editDeletePortion flex justify-between items-center">
                            <div @click="handleEditRequest(todo)">
                                <img src="/editing.png">
                            </div>
                            <div @click="deleteToDo(todo)">
                                <img src="/delete.png">
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default{
    setup(){
        const ToDos = ref([]);
        const todoNote = ref('');
        const requestForEdit = ref(false);
        const id = ref('');

        axios.get('http://localhost:3000/todos')
        .then(response => {
            ToDos.value = response.data;
            console.log(ToDos.value);
        })
        .catch(error => {
            alert("There was an error fetching the todos:", + error);
        });

        const fetchToDos = async() => {
            console.log("fetching dataa...");
            axios.get('http://localhost:3000/todos')
            .then(response => {
                ToDos.value = response.data;
                console.log(ToDos.value);
            })
            .catch(error => {
                alert("There was an error fetching the todos:", + error);
            });
        };
        const addToDo = async() => {
            const todo = {
                text: todoNote.value
            }
            return axios.post('http://localhost:3000/todos',todo)
            .then(response => {
                response.data,
                todoNote.value= '';
                fetchToDos();
            })
            .catch(error =>  console.log("There was an error creating todo: " + error));
        }
        const editToDo = async() => {
            const newtodo = {
                text:todoNote.value,
            }
            return axios.put(`http://localhost:3000/todos/${id.value}`, newtodo)
            .then(response => {
                response.data,
                id.value = '';
                todoNote.value = '';
                requestForEdit.value = false; 
                fetchToDos();
            })
            .catch(error => console.log("There was an error updating todo: " +  error));    
        };
        const deleteToDo =async(todo) => {
            const _id = todo._id;
            return axios.delete(`http://localhost:3000/todos/${_id}`)
            .then(response => {
                response.data,
                fetchToDos();
            })
            .catch(error => console.log("There was an error deleting todo: " + error));
        };
        const handleEditRequest = async(todo) =>{
            requestForEdit.value= true;
            todoNote.value = todo.text;
            id.value = todo._id;
        };
        const handleAddEditToDo = async() => {
            if(requestForEdit.value){
                editToDo();
            }else{
                addToDo();
            }
        }
        return {
            ToDos,
            todoNote,
            requestForEdit,
            id,
            fetchToDos,
            addToDo,
            editToDo,
            deleteToDo,
            handleEditRequest,
            handleAddEditToDo,
        }
    }
}
</script>

<style scoped>
    .strike-through{
        text-decoration: line-through;
    }
    .todoList .editDeletePortion div{
        margin-right:10px;
    }
    .todoList .editDeletePortion img{
        width:20px;
        color: white;
        margin-left:10px;
        margin-right:10px;
    }
    .todoList{
        width: 50%;
    }
</style>