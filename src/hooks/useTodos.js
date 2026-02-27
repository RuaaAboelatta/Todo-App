import { useState,useEffect } from "react"
function useTodos(){
    const [todoItem , setTodoItem] = useState('');
    const [todos , setTodos] = useState([]);

    const addItem =()=>{
        if(todoItem.trim() !== ""){
            setTodos([...todos , {
                id:Date.now(),
                text:todoItem , 
                checked:false
            }]);
            setTodoItem("");
        }
    };

    const handleChange = (e)=>{setTodoItem(e.target.value)};
    const handleKeyDown = (e)=>{
        if (todoItem.trim() !== "" && e.key ==="Enter" ){
            addItem();
        };
    };

    const checkItem = (displayeditem)=>{
      setTodos(todos.map((item)=>{
            if (item.id === displayeditem.id ){
                return{ ...item , checked:!item.checked};
            }else{
                return item;
            };
        }));
    };

    const deleteItem =(displayeditem)=>{
        setTodos(todos.filter((item) => item.id !== displayeditem.id));
    };
  
    const total = todos.filter((item)=> item.checked === false).length;

    const [filter , setFilter] = useState('all');
    const [displayed , setDisplayed] = useState([]);
    useEffect(()=>{
      let filterd = [];
      switch (filter){
            case "active":
                filterd = todos.filter((item)=> item.checked === false);
                break;
            case "completed":
                filterd = todos.filter((item)=> item.checked === true);
                break;
            default :
                filterd = todos;
        };
      setDisplayed(filterd);
    }, [todos , filter]);

    const handleDisplay = (filter)=>{
      setFilter(filter);
    };

    const clearCompleted = ()=>{
      setTodos(todos.filter((item)=> item.checked === false));
    };
    return {
        todos ,
        todoItem ,
        setTodos,
        addItem ,
        handleChange , 
        handleKeyDown , 
        checkItem ,
        deleteItem , 
        total , 
        displayed , 
        handleDisplay , 
        filter , 
        clearCompleted
    };
};

export default useTodos;
