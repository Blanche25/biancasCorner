const posts = [
  {
    title: "oh hey i have a website now",
    date: "2025-01-03",
    file: "oh hey i have a website now.html",
  },
  {
    title: "when the house leaves or smth",
    date: "2025-01-05",
    file: "when the house leaves or smth.html",
  },
  {
    title: "breaking nintendo's tos because i can",
    date: "2025-02-03",
    file: "breaking nintendo's tos because i can.html",
  },
  {
    title: "linux has consumed me",
    date: "2025-04-31",
    file: "linux has consumed me.html",
  },
];
// Get all posts
async function getAllPosts() {
  const allPosts = posts
    .filter((post) => post.file.endsWith(".html"))
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Most recent first

  return allPosts;
}
async function displayAllPosts() {
  const outputElement = document.getElementById("allposts-list");
  const allPosts = await getAllPosts();

  const ul = document.createElement("ul");
  allPosts.forEach((post) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `posts/${post.file}`;
    a.textContent = `${post.date} - ${post.title}`;
    li.appendChild(a);
    ul.appendChild(li);
  });

  outputElement.appendChild(ul);
}


// Get 3 most recent posts
async function getRecentPosts() {
  const recentPosts = posts
    .filter((post) => post.file.endsWith(".html"))
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date (most recent first)
    .slice(0, 3);

  return recentPosts;
}
async function displayPosts() {
  const outputElement = document.getElementById("posts-list");
  const recentPosts = await getRecentPosts();

  const ul = document.createElement("ul");
  recentPosts.forEach((post) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `posts/${post.file}`;
    a.textContent = `${post.date} - ${post.title}`;
    li.appendChild(a);
    ul.appendChild(li);
  });

  outputElement.appendChild(ul);
}


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

document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
  displayAllPosts();
});
