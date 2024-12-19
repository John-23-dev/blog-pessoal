document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://pensamentos-backend.onrender.com"; // Durante o desenvolvimento local http://localhost:3000 e deploy: https://pensamentos-backend.onrender.com

  const pensamentoInput = document.getElementById("pensamento-input");
  const enviarButton = document.getElementById("enviar-pensamento");
  const pensamentosLista = document.getElementById("pensamentos-lista");
  const autorSelect = document.getElementById("autor");

  // Função para carregar pensamentos
  const carregarPensamentos = async (author = "", limit = 5) => {
    try {
      console.log(
        "Buscando pensamentos com a URL:",
        `${API_URL}/thoughts?author=${author}&limit=${limit}`
      );
      const response = await fetch(
        `${API_URL}/thoughts?author=${author}&limit=${limit}`
      );
      const dados = await response.json();
      console.log("Resposta completa da API:", dados); // Adiciona para depuração

      const pensamentos = dados.thoughts || []; // Corrige para acessar a chave 'thoughts'

      pensamentosLista.innerHTML = ""; // Limpa a lista antes de adicionar os novos pensamentos

      pensamentos.forEach((pensamento) => {
        const p = document.createElement("p");
        p.textContent = pensamento.text;
        p.classList.add(
          pensamento.author === "João"
            ? "meu-pensamento"
            : "pensamento-namorada"
        );

        // Adiciona o botão de excluir para cada pensamento
        const excluirButton = document.createElement("button");
        excluirButton.textContent = "Excluir";
        excluirButton.classList.add("excluir-pensamento");
        excluirButton.onclick = () => onDeleteButtonClick(pensamento._id);

        const pensamentoContainer = document.createElement("div");
        pensamentoContainer.classList.add("pensamento-container");
        pensamentoContainer.appendChild(p);
        pensamentoContainer.appendChild(excluirButton);

        pensamentosLista.appendChild(pensamentoContainer);
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
    const autorAtual = autorSelect.value;
    carregarPensamentos(autorAtual);
  });

  // Adiciona evento para o botão de enviar pensamento
  enviarButton.addEventListener("click", salvarPensamento);

  carregarPensamentos(); // Inicializa a página carregando todos os pensamentos

  // Função para excluir um pensamento
  const excluirPensamento = async (id) => {
    try {
      const response = await fetch(`${API_URL}/thoughts/${id}`, {
        method: "DELETE", // Método DELETE para excluir
      });

      const data = await response.json();
      console.log("Resposta do servidor:", data); // Verifique o que o servidor retorna

      // Caso a exclusão tenha sido bem-sucedida
      if (response.ok) {
        alert(data.message); // Alerta com a mensagem do backend
        // Remove o pensamento excluído da lista de DOM
        const pensamentoElement = document.getElementById(id);
        if (pensamentoElement) {
          pensamentoElement.remove();
        }
      } else {
        alert("Erro ao excluir pensamento: " + data.message); // Exibe mensagem de erro do backend
      }
    } catch (error) {
      console.error("Erro ao tentar excluir o pensamento:", error);
      alert("Erro ao tentar excluir pensamento.");
    }
  };

  // Função que será chamada ao clicar no botão
  const onDeleteButtonClick = (id) => {
    if (
      window.confirm("Você tem certeza que deseja excluir este pensamento?")
    ) {
      excluirPensamento(id);
    }
  };
});
