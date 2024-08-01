let createBackup = document.querySelector(".create");

createBackup.addEventListener("click", () => {
    const backupData = {
        NombreBd: "Base de datos",
        VersionBd: "V.1.15",
        Tipo: "Manual",
        Ubicacion: "/backup/",
        Informacion: "backup mensual"
    };

    fetch("http://backend:9200/backup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(backupData)
    })
        .then(res => res.json())
        .then(data => {
            console.log("Backup created successfully:", data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
});
