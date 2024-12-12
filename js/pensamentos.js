document.addEventListener("DOMContentLoaded", () => {
  const pensamentoInput = document.getElementById("pensamento-input");
  const enviarButton = document.getElementById("enviar-pensamento");
  const pensamentosLista = document.getElementById("pensamentos-lista");
  const autorSelect = document.getElementById("autor"); // Agora vamos pegar o autor selecionado

  // Função para carregar pensamentos salvos
  const carregarPensamentos = async () => {
    try {
      const response = await fetch(
        "https://pensamentos-backend.onrender.com/thoughts"
      );
      if (!response.ok) {
        throw new Error(`Erro ao carregar pensamentos: ${response.statusText}`);
      }
      const pensamentos = await response.json();
      pensamentosLista.innerHTML = ""; // Limpa a lista antes de adicionar os novos pensamentos

      pensamentos.forEach((pensamento) => {
        const p = document.createElement("p");
        p.textContent = pensamento.text;

        if (pensamento.author === "João") {
          p.classList.add("meu-pensamento");
        } else {
          p.classList.add("pensamento-namorada");
        }

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
        const response = await fetch(
          "https://pensamentos-backend.onrender.com/thoughts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: novoPensamento,
              author: autor, // Envia o autor selecionado junto com o pensamento
            }),
          }
        );

        if (response.ok) {
          pensamentoInput.value = "";
          carregarPensamentos();
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

  enviarButton.addEventListener("click", salvarPensamento);
  carregarPensamentos();
});
