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

// Fungsi untuk menggambar garis menggunakan Algoritma Bresenham 
function algoritmaBresenham() {
    const x1 = parseFloat(document.getElementById('x1').value);
    const y1 = parseFloat(document.getElementById('y1').value);
    const x2 = parseFloat(document.getElementById('x2').value);
    const y2 = parseFloat(document.getElementById('y2').value);

    gambarGrid(); // Menggambar grid di canvas

    let x0 = Math.round(x1);
    let y0 = Math.round(y1);
    let xn = Math.round(x2);
    let yn = Math.round(y2);

    let dx = Math.abs(xn - x0);
    let dy = Math.abs(yn - y0);
    let sx = (x0 < xn) ? 1 : -1;
    let sy = (y0 < yn) ? 1 : -1;

    // Inisialisasi nilai parameter p0
    let p = 2 * dy - dx;
    let twoDy = 2 * dy;
    let twoDyMinusDx = 2 * (dy - dx);

    // Menggambar titik awal
    ctx.fillStyle = 'red';
    ctx.fillRect(xToCanvas(x0), yToCanvas(y0), 5, 5);
    ctx.fillRect(xToCanvas(xn), yToCanvas(yn), 5, 5);

    // Menambahkan kolom untuk Algoritma Bresenham ke tabel
    const tableHead = document.querySelector('#hasilTable thead');
    tableHead.innerHTML = `
        <tr>
            <th>k</th>
            <th>pk</th>
            <th>(xk+1</>, yk+1)</th>
        </tr>
    `;

    const tableBody = document.querySelector('#hasilTable tbody');
    tableBody.innerHTML = ''; 
    // Plot titik-titik garis menggunakan Algoritma Bresenham
    ctx.fillStyle = 'blue';
    let k = 0;

    while (x0 !== xn || y0 !== yn) {
        ctx.fillRect(xToCanvas(x0), yToCanvas(y0), 2, 2); // Plot titik (x0, y0)

        // Menambahkan hasil perhitungan ke tabel
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${k}</td>
            <td>${p}</td>
            <td>(${x0}, ${y0})</td>
        `;
        tableBody.appendChild(row);

        if (p < 0) {
            p += twoDy;
        } else {
            y0 += sy;
            p += twoDyMinusDx;
        }
        x0 += sx;
        k++; // Increment k setiap iterasi
    }

    // Menambahkan titik akhir ke dalam tabel
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${k}</td>
        <td>${p}</td>
        <td>(${xn}, ${yn})</td>
    `;
    tableBody.appendChild(row);
}
// Fungsi untuk menggambar lingkaran menggunakan Algoritma Bresenham
function algoritmaBresenhamLingkaran() {
    const r = parseInt(prompt("Masukkan radius lingkaran:")); // Ambil input radius lingkaran
    const xCenter = canvas.width / 2 / scale; // Titik pusat di tengah canvas
    const yCenter = canvas.height / 2 / scale; 

    gambarGrid(); // Menggambar grid pada canvas

    // Inisialisasi nilai awal untuk algoritma Bresenham lingkaran
    let x = 0;
    let y = r;
    let p = 1 - r;

    // Menambahkan kolom untuk Algoritma Bresenham Lingkaran ke tabel
    const tableHead = document.querySelector('#hasilTable thead');
    tableHead.innerHTML = `
        <tr>
            <th>k</th>
            <th>p<sub>k</sub></th>
            <th>xk+1, yk+1</th>
            <th>2xk+1</th>
            <th>2yk+1</th>
        </tr>
    `;

    const tableBody = document.querySelector('#hasilTable tbody');
    tableBody.innerHTML = ''; // Bersihkan tabel sebelum menambahkan baris baru

    // Fungsi untuk menggambar semua titik simetri pada lingkaran
    function drawCirclePoints(xCenter, yCenter, x, y) {
        ctx.fillStyle = 'blue';

        ctx.fillRect(xToCanvas(xCenter + x), yToCanvas(yCenter + y), 2, 2); // Oktan pertama
        ctx.fillRect(xToCanvas(xCenter - x), yToCanvas(yCenter + y), 2, 2); // Oktan kedua
        ctx.fillRect(xToCanvas(xCenter + x), yToCanvas(yCenter - y), 2, 2); // Oktan ketiga
        ctx.fillRect(xToCanvas(xCenter - x), yToCanvas(yCenter - y), 2, 2); // Oktan keempat
        ctx.fillRect(xToCanvas(xCenter + y), yToCanvas(yCenter + x), 2, 2); // Oktan kelima
        ctx.fillRect(xToCanvas(xCenter - y), yToCanvas(yCenter + x), 2, 2); // Oktan keenam
        ctx.fillRect(xToCanvas(xCenter + y), yToCanvas(yCenter - x), 2, 2); // Oktan ketujuh
        ctx.fillRect(xToCanvas(xCenter - y), yToCanvas(yCenter - x), 2, 2); // Oktan kedelapan
    }

    // Gambar titik awal pada lingkaran
    drawCirclePoints(xCenter, yCenter, x, y);

    // Menambahkan hasil perhitungan awal ke tabel
    let k = 0;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${k}</td>
        <td>${p}</td>
        <td>(${x}, ${y})</td>
        <td>${2 * (x + 1)}</td>
        <td>${2 * y}</td>
    `;
    tableBody.appendChild(row);

    // Loop menggambar lingkaran menggunakan Algoritma Bresenham
    while (x < y) {
        k++;
        x++;

        if (p < 0) {
            p += 2 * x + 1;
        } else {
            y--;
            p += 2 * (x - y) + 1;
        }

        // Gambar titik-titik lingkaran di semua oktan
        drawCirclePoints(xCenter, yCenter, x, y);

        // Tambahkan hasil perhitungan ke tabel
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${k}</td>
            <td>${p}</td>
            <td>(${x}, ${y})</td>
            <td>${2 * (x + 1)}</td>
            <td>${2 * (y)}</td>
        `;
        tableBody.appendChild(newRow);
    }
}
// Fungsi untuk menggambar lingkaran menggunakan Algoritma Flood Fill
function algoritmaFloodFill() {
    const x = parseInt(prompt("Masukkan nilai x untuk titik awal:"));
    const y = parseInt(prompt("Masukkan nilai y untuk titik awal:"));
    const fillColor = prompt("Masukkan warna untuk mengisi (misalnya 'blue' atau '#00f')");

    gambarGrid(); // Menggambar grid pada canvas
    floodFill(xToCanvas(x), yToCanvas(y), fillColor);
}

// Fungsi Flood Fill
function floodFill(x, y, fillColor) {
    const targetColor = ctx.getImageData(x, y, 1, 1).data; // Ambil warna awal
    const targetR = targetColor[0];
    const targetG = targetColor[1];
    const targetB = targetColor[2];

    const stack = [[x, y]];

    while (stack.length > 0) {
        const [currentX, currentY] = stack.pop();
        
        // Ambil warna pixel saat ini
        const currentColor = ctx.getImageData(currentX, currentY, 1, 1).data;
        if (currentColor[0] === targetR && currentColor[1] === targetG && currentColor[2] === targetB) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(currentX, currentY, 1, 1); // Mengisi pixel

            // Menambahkan tetangga ke stack
            stack.push([currentX + 1, currentY]);
            stack.push([currentX - 1, currentY]);
            stack.push([currentX, currentY + 1]);
            stack.push([currentX, currentY - 1]);
        }
    }
}

// Fungsi untuk menggambar lingkaran menggunakan Algoritma Boundary Fill
function algoritmaBoundaryFill() {
    const x = parseInt(prompt("Masukkan nilai x untuk titik awal:"));
    const y = parseInt(prompt("Masukkan nilai y untuk titik awal:"));
    const fillColor = prompt("Masukkan warna untuk mengisi (misalnya 'blue' atau '#00f')");
    const boundaryColor = ctx.getImageData(xToCanvas(x), yToCanvas(y), 1, 1).data; // Ambil warna batas

    gambarGrid(); // Menggambar grid pada canvas
    boundaryFill(xToCanvas(x), yToCanvas(y), fillColor, boundaryColor);
}

function boundaryFill(x, y, fillColor, boundaryColor) {
    const stack = [[x, y]];

    while (stack.length > 0) {
        const [currentX, currentY] = stack.pop();
        
        // Ambil warna pixel saat ini
        const currentColor = ctx.getImageData(currentX, currentY, 1, 1).data;

        // Memeriksa apakah pixel saat ini bukan warna batas dan bukan warna yang sudah diisi
        if (currentColor[3] !== 0 && // Pastikan pixel tidak transparan
            (currentColor[0] !== boundaryColor[0] || 
             currentColor[1] !== boundaryColor[1] || 
             currentColor[2] !== boundaryColor[2]) &&
            (currentColor[0] !== parseInt(fillColor.slice(1, 3), 16) || 
             currentColor[1] !== parseInt(fillColor.slice(3, 5), 16) || 
             currentColor[2] !== parseInt(fillColor.slice(5, 7), 16))) {
                 
            ctx.fillStyle = fillColor;
            ctx.fillRect(currentX, currentY, 1, 1); // Mengisi pixel

            // Menambahkan tetangga ke stack
            stack.push([currentX + 1, currentY]); // East
            stack.push([currentX - 1, currentY]); // West
            stack.push([currentX, currentY + 1]); // South
            stack.push([currentX, currentY - 1]); // North
        }
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
