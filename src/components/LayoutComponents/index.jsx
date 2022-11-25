import "./styles.css";

export const LayoutComponents = (props) => {
  return (
    <div className="conteudo">
      <div className="conteudo-login">
        <div className="conteudo-login-form">
          {props.children}
        </div>
      </div>
    </div>
  );
}