const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scale = 30; 

// Fungsi untuk menggambar grid pada canvas
function gambarGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= canvas.width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Gambar sumbu x dan y
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
}

// Fungsi untuk menggambar garis menggunakan Algoritma Dasar
function algoritmaDasar() {
    const x1 = parseFloat(document.getElementById('x1').value);
    const y1 = parseFloat(document.getElementById('y1').value);
    const x2 = parseFloat(document.getElementById('x2').value);
    const y2 = parseFloat(document.getElementById('y2').value);

    gambarGrid();

    // Menghitung kemiringan (m) dan konstanta b
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;

    // Menentukan rentang x yang akan digunakan untuk plotting titik-titik
    let xStart = Math.min(x1, x2);
    let xEnd = Math.max(x1, x2);

    // Menggambar titik awal dan akhir
    ctx.fillStyle = 'red';
    ctx.fillRect(xToCanvas(x1), yToCanvas(y1), 5, 5);
    ctx.fillRect(xToCanvas(x2), yToCanvas(y2), 5, 5);

    // Menambahkan kolom untuk Algoritma Dasar
    const tableHead = document.querySelector('#hasilTable thead');
    tableHead.innerHTML = `
        <tr>
            <th>x</th>
            <th>Δx</th>
            <th>y(b)</th>
            <th>m</th>
            <th>y</th>
        </tr>
    `;

    // Menggambar titik-titik pada garis berdasarkan persamaan y = mx + b
    ctx.fillStyle = 'blue';
    const tableBody = document.querySelector('#hasilTable tbody');
    tableBody.innerHTML = ''; // Bersihkan tabel sebelum menambahkan baris baru

    for (let x = xStart; x <= xEnd; x += 0.5) {
        let y = m * x + b;
        ctx.fillRect(xToCanvas(x), yToCanvas(y), 2, 2); // Plot titik (x, y)

        // Menambahkan hasil perhitungan ke tabel
        const deltaX = (x - x1).toFixed(2);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${x.toFixed(2)}</td>
            <td>${deltaX}</td>
            <td>${b.toFixed(2)}</td>
            <td>${m.toFixed(2)}</td>
            <td>${y.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    }
}

// Fungsi untuk menggambar garis menggunakan Algoritma DDA
function algoritmaDDA() {
    const x1 = parseFloat(document.getElementById('x1').value);
    const y1 = parseFloat(document.getElementById('y1').value);
    const x2 = parseFloat(document.getElementById('x2').value);
    const y2 = parseFloat(document.getElementById('y2').value);

    gambarGrid();

    // Menghitung perbedaan dx dan dy
    const dx = x2 - x1;
    const dy = y2 - y1;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));

    const xIncrement = dx / steps;
    const yIncrement = dy / steps;

    let x = x1;
    let y = y1;

    // Menggambar titik awal
    ctx.fillStyle = 'red';
    ctx.fillRect(xToCanvas(x1), yToCanvas(y1), 5, 5);
    ctx.fillRect(xToCanvas(x2), yToCanvas(y2), 5, 5);

    // Menambahkan kolom untuk Algoritma DDA
    const tableHead = document.querySelector('#hasilTable thead');
    tableHead.innerHTML = `
        <tr>
            <th>k</th>
            <th>x</th>
            <th>y</th>
            <th>round(x)</th>
            <th>round(y)</th>
        </tr>
    `;

    // Menggambar titik-titik pada garis
    ctx.fillStyle = 'blue';
    const tableBody = document.querySelector('#hasilTable tbody');
    tableBody.innerHTML = ''; // Bersihkan tabel sebelum menambahkan baris baru

    for (let k = 0; k <= steps; k++) {
        ctx.fillRect(xToCanvas(x), yToCanvas(y), 2, 2); // Plot titik (x, y)

        // Menambahkan hasil perhitungan ke tabel
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${k}</td>
            <td>${x.toFixed(2)}</td>
            <td>${y.toFixed(2)}</td>
            <td>${Math.round(x)}</td>
            <td>${Math.round(y)}</td>
        `;
        tableBody.appendChild(row);

        x += xIncrement;
        y += yIncrement;
    }
}

// Fungsi untuk mengkonversi nilai x ke posisi pada canvas
function xToCanvas(x) {
    return canvas.width / 2 + x * scale;
}

// Fungsi untuk mengkonversi nilai y ke posisi pada canvas (dibalik untuk cocok dengan sistem koordinat canvas)
function yToCanvas(y) {
    return canvas.height / 2 - y * scale;
}

// Fungsi untuk menghapus semua inputan, tabel, dan canvas
function clearAll() {
    // Menghapus nilai input
    document.getElementById('x1').value = '';
    document.getElementById('y1').value = '';
    document.getElementById('x2').value = '';
    document.getElementById('y2').value = '';

    // Menghapus canvas (mengosongkan gambar)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gambarGrid(); // Gambar ulang grid

    // Menghapus isi tabel
    const tableBody = document.querySelector('#hasilTable tbody');
    tableBody.innerHTML = '';
}

// Memulai dengan menggambar grid
gambarGrid();
