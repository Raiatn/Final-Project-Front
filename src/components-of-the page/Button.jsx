import "../index.css";

function Button({ text, event }) {
  return <>
    <button className="p-3 px-7 flex bg-project-green w-fit rounded-xl font-bold text-white text-xl transition-all  self-center bg-gradient-to-r from-bg-green to-project-green" onClick={event}>{text}</button>
  </>;
}

export default Button;
 