document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("fade-out")) {
    document.body.classList.remove("fade-out");
    document.body.classList.add("fade-in");
  }

  if (window.location.pathname.endsWith("badge.html")) {
    const badgeHTML = localStorage.getItem("badgeHTML");
    if (badgeHTML) {
      const badgeContainer = document.getElementById("badgeContainer");
      if (badgeContainer) badgeContainer.innerHTML = badgeHTML;
    }
  }
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    document.body.classList.remove("fade-out");
    document.body.classList.add("fade-in");
  }
});

if (window.location.pathname.endsWith("index.html")) {
  document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.href;
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = target;
      }, 500);
    });
  });

  document.addEventListener("click", function (event) {
    if (event.target.tagName === "PRE") {
      const range = document.createRange();
      range.selectNodeContents(event.target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      try {
        document.execCommand("copy");
        const originalText = event.target.innerHTML;
        event.target.innerHTML = "Code copié dans le presse-papier!";
        setTimeout(() => {
          event.target.innerHTML = originalText;
        }, 1000);
      } catch (err) {
        alert("Impossible de copier le code.");
      }

      selection.removeAllRanges();
    }
  });
}

const artistes = {
  "Artiste n°1": artiste1,
  "Artiste n°2": artiste2,
  "Artiste n°3": artiste3,
  "Artiste n°4": artiste4,
  "Artiste n°5": artiste5,
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function generateText() {
  const artistSelect = document.getElementById("artisteType");
  const selectedArtist = artistSelect.options[artistSelect.selectedIndex].text;
  const artist = artistes[selectedArtist];

  const mots = [
    "Recherche",
    "Devis",
    "Tarifs",
    "Prix",
    "Reservation",
    "Cherche",
  ];
  const premierMot = mots[getRandomInt(mots.length)];

  let deuxiemeMot;
  if (Object.values(artist.styles).some((style) => style.name === "STYLE.DJ")) {
    deuxiemeMot = "DJ";
  } else if (artist.nbmembres > 2) {
    deuxiemeMot = "groupe de musique";
  } else {
    deuxiemeMot = "musicien";
  }

  const troisiemeMot =
    Math.random() < 0.5
      ? artist.localisation
      : Object.values(artist.styles)
          .map((style) => style.name)
          .join(" ");

  const altText = `${premierMot} ${deuxiemeMot} ${troisiemeMot}`;
  const badgeHTML = `<a href="https://www.themuse.com/advice/4-ways-to-show-that-you-really-really-want-the-job-without-looking-desperate" target="_blank">
      <img src="https://i.ytimg.com/vi/nWvirNZq3QM/sddefault.jpg?sqp=-oaymwEmCIAFEOAD8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgVChZMA8=&rs=AOn4CLB38eksJI-RBWMNXBGfmHnjYwRStw" alt="${altText}" style="width: 130px; height: 130px;">
    </a>`;

  const previousBadgeContainer = document.getElementById("generatedBadge");
  if (previousBadgeContainer) previousBadgeContainer.remove();

  const newBadgeContainer = document.createElement("div");
  newBadgeContainer.id = "generatedBadge";
  newBadgeContainer.innerHTML = `<div class="text-center"><pre class="code-box">${escapeHtml(
    badgeHTML
  )}</pre></div>`;

  const container = document.getElementById("generatedBadgeContainer");
  container.appendChild(newBadgeContainer);

  const badgePageButtonContainer = document.getElementById(
    "badgePageButtonContainer"
  );
  badgePageButtonContainer.innerHTML = `<button class="btn" onclick="goToBadgePage()">Voir le badge</button>`;

  localStorage.setItem("badgeHTML", badgeHTML);
  localStorage.setItem("altText", altText);
}


function goToBadgePage() {
  document.body.classList.add("fade-out");
  setTimeout(() => {
      window.location.href = "badge.html";
  }, 500);
}
