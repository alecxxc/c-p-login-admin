// Formato de fecha
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('es-CO', options); 
};

document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");
    
    const handleLogout = () => {
        localStorage.removeItem("jwtToken"); 
        // Limpiar cache forzando recarga
        window.location.href = "index.html?logout=true"; 
    };

    if (logoutButton) {
        logoutButton.addEventListener("click", handleLogout);
    }

    const token = localStorage.getItem("jwtToken");

    // Verificación inmediata al cargar
    if(!token) {
        alert("Acceso denegado. Por favor, inicie sesión.");
        window.location.href = "index.html";
        return;
    }

    console.log("Usuario autenticado.");

    // Cargar transacciones con verificación de error
    fetch("https://c-p-backend.onrender.com/api/admin/viewtransactions", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.status === 401) {
            // Token inválido o expirado
            throw new Error('Token inválido');
        }
        return res.json();
    })
    .then(data => {
        const tbody = document.querySelector("#transactionsTable tbody");
        tbody.innerHTML = "";
        data.forEach(tx => {
            const tr = document.createElement("tr");
            const formattedDate = formatDate(tx.createdAt);
            tr.innerHTML = `
                <td>${tx.currency}</td>
                <td>${tx.value}</td>
                <td>${tx.description}</td>
                <td>${tx.name}</td>
                <td>${tx.typeDocument}</td>
                <td>${formattedDate}</td>
            `;
            tbody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Sesión expirada. Por favor, inicie sesión nuevamente.");
        localStorage.removeItem("jwtToken");
        window.location.href = "index.html";
    });

    // Prevenir cache del navegador
    window.addEventListener('pageshow', function(event) {
        if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
            // Página cargada desde cache
            if (!localStorage.getItem("jwtToken")) {
                window.location.href = "index.html";
            }
        }
    });
});