import './App.css';
import { useState , useEffect } from 'react';
import Background from './components/background/background';
import Foreground from './components/foreground/foreground';

function App() {
    const [theme , setTheme] = useState("light");
    const toggleTheme = ()=>{
        setTheme(theme => theme==="light" ? "dark" : "light");
    }
    useEffect(()=>{
        const bg = document.getElementById("bg");
        if(bg){
            bg.className = `app ${theme}`;
        };
    },[theme]);

    return(
        <div className={theme}>
            <Background theme={theme}></Background>
            <Foreground
            theme={theme}
            toggleTheme={toggleTheme}></Foreground>
        </div>
    );
};

export default App;
