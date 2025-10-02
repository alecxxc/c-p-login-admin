//Formato de fecha
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const date = new Date(dateString);
    
    return date.toLocaleString('es-CO', options); 
};

document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");
    const handleLogout = () => {
        localStorage.removeItem("jwtToken"); 
    
        window.location.href = "index.html"; 
    };

    if (logoutButton) {
        logoutButton.addEventListener("click", handleLogout);
    }

    const token = localStorage.getItem("jwtToken");

    if(!token) {
        alert("Acceso denegado. Por favor, inicie sesión.");
        window.location.href = "index.html";
        return;
    }

    console.log("Usuario autenticado.");

    fetch("https://c-p-backend.onrender.com/api/admin/viewtransactions", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
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
    });
})


