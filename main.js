let books = []; // Array untuk menyimpan data buku

// Fungsi untuk merender data buku ke dalam rak
function renderBooks() {
  const unreadBooksContainer = document.getElementById('unreadBooks');
  const readBooksContainer = document.getElementById('readBooks');
  unreadBooksContainer.innerHTML = '';
  readBooksContainer.innerHTML = '';

  books.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.innerHTML = `
      <input type="checkbox" ${book.isComplete ? 'checked' : ''} onchange="toggleComplete(${book.id}, this.checked)">
      <span>${book.title} - ${book.author} (${book.year})</span>
      <button onclick="deleteBook(${book.id})">Hapus</button>
    `;

    if (book.isComplete) {
      readBooksContainer.appendChild(bookElement);
    } else {
      unreadBooksContainer.appendChild(bookElement);
    }
  });
}

// Fungsi untuk menambahkan buku baru
function addBook() {
  // Ambil nilai dari input form
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const year = parseInt(document.getElementById('year').value);
  const isComplete = document.getElementById('isComplete').checked;
  const id = +new Date(); // Buat id unik menggunakan timestamp

  // Validasi input
  if (title && author && year) {
    // Tambahkan buku baru ke dalam array
    books.push({ id, title, author, year, isComplete });
    // Render ulang rak buku
    renderBooks();
    // Reset nilai input form
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
    document.getElementById('isComplete').checked = false;
    // Simpan data buku ke dalam localStorage
    saveBooks();
  } else {
    alert('Mohon lengkapi data buku');
  }
}

// Fungsi untuk menandai buku sebagai selesai/belum selesai dibaca
function toggleComplete(id, isComplete) {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books[index].isComplete = isComplete;
    renderBooks();
    saveBooks();
  }
}

// Fungsi untuk menghapus buku dari rak
function deleteBook(id) {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    renderBooks();
    saveBooks();
  }
}

// Fungsi untuk memuat data buku dari localStorage saat halaman dimuat
function loadBooks() {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    renderBooks();
  }
}

// Fungsi untuk menyimpan data buku ke dalam localStorage
function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

// Panggil fungsi loadBooks saat halaman dimuat
window.onload = function() {
  loadBooks();
};
