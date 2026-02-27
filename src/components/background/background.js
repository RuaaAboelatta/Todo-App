import "./background.css"
function Background({theme}){
    return(
        <div className={`bg ${theme==="light" ? "bg-light" : "bg-dark"}`}></div>
    );
};
export default Background;
