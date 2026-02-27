import {Sortable} from "@spfxappdev/sortable"
import useTodos from "../../hooks/useTodos";
import "./foreground.css"

function Foreground({theme,toggleTheme}){
    const {
        todos,
        todoItem ,
        setTodos,
        handleChange , 
        handleKeyDown , 
        checkItem ,
        deleteItem , 
        total , 
        displayed , 
        handleDisplay , 
        filter , 
        clearCompleted
    } = useTodos();

    const handleReorder = (reorderedItems) =>{
        const otherTodos = todos.filter(todo => !displayed.some(d => d.id === todo.id)
        );
        const reorderedList = reorderedItems.map(item => todos.find(todo => todo.id === item.id))
        setTodos([...reorderedList , ...otherTodos])
    }

    return(
        <div className="container">
            <div className="todo-head">
                <h2>T O D O</h2>
                <button onClick={toggleTheme}>
                    <img src={theme ==="light" ? "/icon-moon.svg" : "/icon-sun.svg"} width="30px" alt="theme"></img>
                </button>
            </div>
            <div className="todo-input">
                {/* <div className="circle"></div> */}
                <button className="circle"></button>
                <input 
                type="text"
                className={`${theme === "light" ? "light" : "dark"}`}
                placeholder="Create a new todo..." 
                value={todoItem}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                >
                </input>
            </div>
            <div className={`todo-items ${theme === "light" ? "light" : "dark"}`}>
               
                <div className="todo-footer">
                    <span>{total} items left</span>
                    <div>            
                        <span className={`span-hov ${filter === "all" ? "active" : ""}`} onClick={()=> handleDisplay("all")}>All</span>
                        <span className={`span-hov ${filter === "active" ? "active" : ""}`} onClick={()=> handleDisplay("active")}>Active</span>
                        <span className={`span-hov ${filter === "completed" ? "active" : ""}`} onClick={()=> handleDisplay("completed")}>Completed</span>
                    </div>
                    <span className ="span-hov" onClick={clearCompleted}>Clear Completed</span>
                </div>
                 <Sortable 
                items={displayed}
                onChange={handleReorder}  
                containerProps={{className: "items-container"}}
                visualizationCssClasses={{top: "drop-above" , bottom: "drop-below" ,target:"drop-here"}} >
                        {displayed.map((item)=> (
                            <div className="item-container" key={item.id}>  
                                <li className="item">
                                    <div className="item-text">
                                        <button className={`${item.checked ? "circle checked":"circle check-circle"}`} onClick={()=> checkItem(item)}>
                                            <img src="/icon-check.svg" className={`${item.checked ? "check-img" : "uncheck-img"}`} alt="check"></img>
                                        </button>
                                        <span className={`${item.checked ? "check-text" : ""}`}> {item.text}</span>
                                    </div>
                                    <button className="cross"  onClick={()=> deleteItem(item)} >
                                        <img src="/icon-cross.svg" alt="cross"></img>
                                    </button>
                                </li>
                            </div>
                        ))}
                </Sortable>
            </div>
            <p>Drag and drop to render list</p>
        </div>
    );
};
export default Foreground;
