const posts = [
  {
    title: "oh hey i have a website now",
    date: "2025-01-03",
    description: "my first blog post!",
    file: "oh hey i have a website now.html",
  },
  {
    title: "when the house leaves or smth",
    date: "2025-01-05",
    description: "book👏review👏",
    image: "./assets/blogimgs/cantleaves.jpg",
    file: "when the house leaves or smth.html",
  },
  {
    title: "breaking nintendo's tos because i can",
    date: "2025-02-03",
    description: "modding my switch out of spite",
    image: "./assets/blogimgs/switch.jpg",
    file: "breaking nintendo's tos because i can.html",
  },
  {
    title: "linux has consumed me",
    date: "2025-04-30",
    description: "the best os",
    image: "./assets/blogimgs/deskbiscuit.png",
    file: "linux has consumed me.html",
  },
  {
    title: "doomscrolling and such",
    date: "2025-07-19",
    description: "it's that damn phone!!",
    image: "./assets/blogimgs/bedtimemindfulness.jpg",
    file: "doomscrolling and such.html",
  },
  {
    title: "jamiep when i get you jamiep",
    date: "2025-08-22",
    description: "weird internet music my beloved",
    file: "jamiep when i get you jamiep.html",
  },
  {
    title: "i luv me server",
    date: "2025-11-01",
    description: "love having a home server",
    image: "./assets/blogimgs/serverspecs.png",
    file: "i luv me server.html",
  },
];

async function getAllPosts() {
  return posts
    .filter((post) => post.file.endsWith(".html"))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

async function getRecentPosts() {
  return posts
    .filter((post) => post.file.endsWith(".html"))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);
}

function renderPosts(posts, containerId, layout = "list") {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  let html = "";

  if (layout === "post-item") {
    html = posts.map(post => `
      <div class="post-item">
        <div class="post-item-c">
          <h3><a href="posts/${post.file}">${post.title}</a></h3>
          <p>${post.description || "No description yet."}</p>
          <small class="date">${post.date}</small>
        </div>
        <div class="post-item-img">
          <img src="${post.image || "./assets/blogimgs/default.png"}" alt="${post.title}">
        </div>
      </div>
    `).join("");
  }

  else if (layout === "list") {
    html = `
      <ul class="post-list">
        ${posts.map(post => `
          <li class="tile">
            <a href="posts/${post.file}">
              <span class="date">${post.date}</span> ${post.title}
            </a>
          </li>
        `).join("")}
      </ul>
    `;
  }

  container.innerHTML = html;
}

async function displayAllPosts() {
  const allPosts = await getAllPosts();
  renderPosts(allPosts, "allposts-list", "post-item");
}

async function displayPosts() {
  const recentPosts = await getRecentPosts();
  renderPosts(recentPosts, "posts-list", "post-item");
}

document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
  displayAllPosts();
  loadNavbar();
});

// Image stuff
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const overlayImage = document.getElementById('overlayImage');
  document.querySelectorAll('.image-item img').forEach(img => {
    img.addEventListener('click', () => {
      overlayImage.src = img.src;
      overlay.style.display = 'flex';
    });
  });
  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlayImage.src = '';
  });
});

function loadNavbar() {
  fetch('/navbar.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('navbar').innerHTML = data;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
  displayAllPosts();
  loadNavbar();
});
