document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('toggle');
  const status = document.getElementById('status');

  // Lade den aktuellen Status
  browser.storage.local.get("active").then((data) => {
    if (data.active === false) {
      button.textContent = "Aktivieren";
      status.textContent = "Status: INAKTIV (GAFAM-Dienste erreichbar)";
    }
  });

  // Toggle-Funktion
  button.addEventListener('click', () => {
    browser.storage.local.get("active").then((data) => {
      const newStatus = !(data.active !== false);
      browser.storage.local.set({ active: newStatus });

      if (newStatus) {
        button.textContent = "Deaktivieren";
        status.textContent = "Status: AKTIV (GAFAM-Dienste blockiert!)";
      } else {
        button.textContent = "Aktivieren";
        status.textContent = "Status: INAKTIV (GAFAM-Dienste erreichbar)";
      }
    });
  });
});