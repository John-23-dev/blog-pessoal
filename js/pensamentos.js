document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://pensamentos-backend.onrender.com"; // Alterne para "http://localhost:3000" para usar localmente

  const pensamentoInput = document.getElementById("pensamento-input");
  const enviarButton = document.getElementById("enviar-pensamento");
  const pensamentosLista = document.getElementById("pensamentos-lista");
  const autorSelect = document.getElementById("autor"); // Pega o seletor de autor

  // Função para carregar pensamentos salvos
  const carregarPensamentos = async (author = "", limit = 5) => {
    try {
      const response = await fetch(
        `${API_URL}/thoughts?author=${author}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`Erro ao carregar pensamentos: ${response.statusText}`);
      }

      const pensamentos = await response.json();
      pensamentosLista.innerHTML = ""; // Limpa a lista antes de adicionar os novos pensamentos

      pensamentos.forEach((pensamento) => {
        const p = document.createElement("p");
        p.textContent = pensamento.text;
        p.classList.add(
          pensamento.author === "João"
            ? "meu-pensamento"
            : "pensamento-namorada"
        );
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
      const autor = autorSelect.value; // Pega o autor selecionado
      try {
        const response = await fetch(`${API_URL}/thoughts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: novoPensamento,
            author: autor, // Envia o autor selecionado junto com o pensamento
          }),
        });

        if (response.ok) {
          pensamentoInput.value = "";
          carregarPensamentos(autor); // Carrega os pensamentos do autor atual
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

  // Evento para carregar pensamentos do autor selecionado automaticamente
  autorSelect.addEventListener("change", () => {
    const autorAtual = autorSelect.value; // Pega o autor atual selecionado
    carregarPensamentos(autorAtual); // Atualiza a lista de pensamentos
  });

  enviarButton.addEventListener("click", salvarPensamento);
  carregarPensamentos(); // Inicializa a página carregando todos os pensamentos
});
