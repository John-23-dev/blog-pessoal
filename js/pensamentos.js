document.addEventListener("DOMContentLoaded", () => {
  const pensamentoInput = document.getElementById("pensamento-input");
  const enviarButton = document.getElementById("enviar-pensamento");
  const pensamentosLista = document.getElementById("pensamentos-lista");

  // Função para carregar pensamentos salvos do servidor
  const carregarPensamentos = async () => {
    try {
      const response = await fetch(
        "https://pensamentos-backend.onrender.com/thoughts" // URL corrigida para o backend
      );
      if (!response.ok) {
        throw new Error(`Erro ao carregar pensamentos: ${response.statusText}`);
      }
      const pensamentos = await response.json();
      pensamentosLista.innerHTML = ""; // Limpa a lista antes de adicionar os novos pensamentos

      pensamentos.forEach((pensamento) => {
        const p = document.createElement("p");
        p.textContent = pensamento.text; // Assumindo que 'text' é a propriedade do pensamento
        pensamentosLista.appendChild(p);
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar pensamentos. Tente novamente mais tarde.");
    }
  };

  // Função para salvar um novo pensamento no servidor
  const salvarPensamento = async () => {
    const novoPensamento = pensamentoInput.value.trim();
    if (novoPensamento) {
      try {
        const response = await fetch(
          "https://pensamentos-backend.onrender.com/thoughts", // URL corrigida para o backend
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: novoPensamento,
              author: "João", // Aqui você pode pegar o nome do usuário ou algo dinâmico
            }),
          }
        );

        if (response.ok) {
          pensamentoInput.value = ""; // Limpa o campo de input
          carregarPensamentos(); // Atualiza a lista de pensamentos
        } else {
          const result = await response.json();
          alert(`Erro ao enviar pensamento: ${result.message}`);
        }
      } catch (error) {
        console.error("Erro ao salvar pensamento:", error);
        alert("Erro ao salvar pensamento. Tente novamente mais tarde.");
      }
    } else {
      alert("Por favor, escreva algo antes de enviar!");
    }
  };

  // Configurar botão de envio
  enviarButton.addEventListener("click", salvarPensamento);

  // Carregar pensamentos ao iniciar
  carregarPensamentos();
});
