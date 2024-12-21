import React, { useState, useEffect } from "react";
import "./style.css";

function Operator() {
  const [lançar, setLançar] = useState("");
  const [saveValue, setSaveValue] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Carregar dados do localStorage ao montar o componente
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("cliente")) || [];
    setSaveValue(savedData);
  }, []);

  // Adicionar novo cliente ao estado e localStorage
  const handleLocalStorage = () => {
    if (lançar.trim() !== "") {
      const newEntry = { id: Date.now(), name: lançar };
      const newValue = [...saveValue, newEntry];
      setSaveValue(newValue);
      localStorage.setItem("cliente", JSON.stringify(newValue));
      setLançar("");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleLocalStorage();
    }
  };

  // Remover cliente (botão "OK!")
  const handleRemove = (id) => {
    const updatedValue = saveValue.filter((item) => item.id !== id);
    setSaveValue(updatedValue);
    localStorage.setItem("cliente", JSON.stringify(updatedValue));

    const removedClient = saveValue.find((item) => item.id === id);
    if (removedClient) {
      localStorage.setItem("removedName", removedClient.name);
      localStorage.setItem("triggerAnimation", "true");
    }
  };

  // Exclusão completa do cliente
  const handleDelete = (id) => {
    const updatedValue = saveValue.filter((item) => item.id !== id);
    setSaveValue(updatedValue);
    localStorage.setItem("cliente", JSON.stringify(updatedValue));
  };

  // Iniciar a edição do nome
  const handleEdit = (id, currentName) => {
    setIsEditing(id);
    setEditValue(currentName);
  };

  // Salvar a edição do nome
  const handleSaveEdit = (id) => {
    const updatedValue = saveValue.map((item) => {
      if (item.id === id) {
        return { ...item, name: editValue };
      }
      return item;
    });

    setSaveValue(updatedValue);
    localStorage.setItem("cliente", JSON.stringify(updatedValue));
    setIsEditing(null);
    setEditValue("");
  };

  return (
    <div className="containerfundo">
      <div className="painelcontainer">
        <div className="divpainel">
          <section className="lançador">
            <h1>PAINEL DE CONTROLE</h1>
            <label>Preparando Pedido</label>
            <input
              placeholder="Digite o nome do pedido"
              value={lançar}
              onKeyDown={handleEnter}
              onChange={(e) => setLançar(e.target.value)}
            />
            <button onClick={handleLocalStorage}>Lançar</button>
          </section>
        </div>
        <div>
          <section className="lisoperator">
            <h1>PREPARANDO PEDIDO</h1>
            <ul className="prepalist">
              {saveValue.map((cliente) => (
                <li className="lista" key={cliente.id}>
                  {isEditing === cliente.id ? (
                    <>
                      <input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                      <button onClick={() => handleSaveEdit(cliente.id)}>
                        Salvar
                      </button>
                      <button onClick={() => setIsEditing(null)}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      {cliente.name}
                      <button
                        onClick={() => handleRemove(cliente.id)}
                      >
                        OK!
                      </button>
                      <button onClick={() => handleEdit(cliente.id, cliente.name)}>
                        Editar
                      </button>
                      <button onClick={() => handleDelete(cliente.id)}>
                        Excluir
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Operator;
