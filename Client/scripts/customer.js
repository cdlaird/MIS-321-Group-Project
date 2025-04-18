//should we be updating the tier status in backend or in front end



document.addEventListener("DOMContentLoaded", function () {
    const badge = document.querySelector(".tier-badge");
    if (badge.textContent.trim() === "Gold") {
      badge.style.backgroundColor = "#FFD700"; 
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const badge = document.querySelector(".tier-badge");
    if (badge.textContent.trim() === "Silver") {
      badge.style.backgroundColor = "#C0C0C0"; 
    }
  });