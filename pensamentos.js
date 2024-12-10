document.addEventListener("DOMContentLoaded", () => {
  const pensamentoInput = document.getElementById("pensamento-input");
  const enviarButton = document.getElementById("enviar-pensamento");
  const pensamentosLista = document.getElementById("pensamentos-lista");

  // Carregar pensamentos salvos
  const carregarPensamentos = () => {
    const pensamentosSalvos =
      JSON.parse(localStorage.getItem("pensamentos")) || [];
    pensamentosLista.innerHTML = "";
    pensamentosSalvos.forEach((pensamento) => {
      const p = document.createElement("p");
      p.textContent = pensamento;
      pensamentosLista.appendChild(p);
    });
  };

  // Salvar um novo pensamento
  const salvarPensamento = () => {
    const novoPensamento = pensamentoInput.value.trim();
    if (novoPensamento) {
      const pensamentosSalvos =
        JSON.parse(localStorage.getItem("pensamentos")) || [];
      pensamentosSalvos.push(novoPensamento);
      localStorage.setItem("pensamentos", JSON.stringify(pensamentosSalvos));
      pensamentoInput.value = "";
      carregarPensamentos();
    } else {
      alert("Por favor, escreva algo antes de enviar!");
    }
  };

  // Configurar botão de envio
  enviarButton.addEventListener("click", salvarPensamento);

  // Carregar pensamentos ao iniciar
  carregarPensamentos();
});
