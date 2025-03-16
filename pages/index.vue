<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            scroll-behavior: smooth;
            
        }
        
        body {
            background-color: #f5f5f5;
            color: #333;
        }
        
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 5%;
            background-color: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.5rem;
            font-weight: bold;
            color: #2c3e50;
        }
        
        .logo i {
            color: #3498db;
        }
        
        .nav-links {
            display: flex;
            gap: 2rem;
        }
        
        .nav-links a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
            transition: color 0.3s;
        }
        
        .nav-links a:hover {
            color: #3498db;
        }
        
        .login-btn {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 0.6rem 1.2rem;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        
        .login-btn:hover {
            background-color: #2980b9;
        }
        
        .hero {
            width: 100vw;
            height: 100vh;
            background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/default-cover.png') center/cover no-repeat;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            padding: 0 2rem;
            margin-top: 0;
        }
        
        .hero-content {
            min-width: 100vw;
        }
        
        .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
        }
        
        .hero p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        .hero-btns {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        .primary-btn {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 0.8rem 1.8rem;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s;
            text-decoration: none;
        }
        
        .primary-btn:hover {
            background-color: #2980b9;
        }
        
        .secondary-btn {
            background-color: transparent;
            color: white;
            border: 2px solid white;
            padding: 0.8rem 1.8rem;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
        }
        
        .secondary-btn:hover {
            background-color: white;
            color: #333;
        }
        
        .how-it-works {
            width: 100vw;
            padding: 5rem 5%;
            background-color: white;
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .section-title h2 {
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 1rem;
        }
        
        .section-title p {
            color: #7f8c8d;
            max-width: 100vw;
            margin: 0 auto;
        }
        
        .steps-container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .step-card {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 2rem;
            text-align: center;
            width: 250px;
            position: relative;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }
        
        .step-number {
            width: 40px;
            height: 40px;
            background-color: #3498db;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.2rem;
            margin: 0 auto 1.5rem;
        }
        
        .step-icon {
            width: 70px;
            height: 70px;
            background-color: #e3f2fd;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: #3498db;
            font-size: 1.8rem;
        }
        
        .step-card h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .step-card p {
            color: #7f8c8d;
            line-height: 1.6;
        }
        
        .features {
            width: 100vw;
            padding: 5rem 5%;
            background-color: #f5f5f5;
        }
        
        .feature-cards {
            width: 100vw;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .feature-card {
            background-color: white;
            border-radius: 8px;
            padding: 2rem;
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
            width: 70px;
            height: 70px;
            background-color: #e3f2fd;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: #3498db;
            font-size: 1.8rem;
        }
        
        .feature-card h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .feature-card p {
            color: #7f8c8d;
            line-height: 1.6;
        }
        
        .collections {
            padding: 5rem 5%;
            background-color: white;
        }
        
        .collection-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }
        
        .collection-card {
            background-color: #f9f9f9;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
        }
        
        .collection-card:hover {
            transform: translateY(-5px);
        }
        
        .collection-img {
            height: 200px;
            width: 100%;
            background-color: #eee;
        }
        
        .collection-content {
            padding: 1.5rem;
        }
        
        .collection-content h3 {
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }
        
        .collection-content p {
            color: #7f8c8d;
            margin-bottom: 1rem;
            line-height: 1.5;
        }
        
        .collection-content a {
            color: #3498db;
            text-decoration: none;
            font-weight: 600;
            display: inline-block;
        }
        
        .collection-content a:hover {
            text-decoration: underline;
        }
        
        .testimonials {
            padding: 5rem 5%;
            background-color: #f5f5f5;
        }
        
        .testimonial-slider {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        
        .testimonial-content {
            font-style: italic;
            color: #7f8c8d;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .testimonial-author {
            font-weight: 600;
            color: #2c3e50;
        }
        
        .testimonial-role {
            color: #7f8c8d;
            font-size: 0.9rem;
        }
        
        .rules {
            padding: 5rem 5%;
            background-color: white;
        }
        
        .rules-container {
            min-width: 100vw;
            margin: 0 auto;
        }
        
        .rule-item {
            margin-bottom: 1.5rem;
            padding-left: 2rem;
            position: relative;
        }
        
        .rule-item:before {
            content: "\f00c";
            font-family: "Font Awesome 5 Free";
            font-weight: 900;
            color: #3498db;
            position: absolute;
            left: 0;
            top: 0;
        }
        
        .rule-item h3 {
            color: #2c3e50;
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
        }
        
        .rule-item p {
            color: #7f8c8d;
            line-height: 1.6;
        }
        
        .stats {
            padding: 5rem 5%;
            background-color: #2c3e50;
            color: white;
            text-align: center;
        }
        
        .stats-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            max-width: 100vw;
            margin: 0 auto;
        }
        
        .stat-item h3 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            color: #3498db;
        }
        
        .stat-item p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        .cta {
            padding: 5rem 5%;
            text-align: center;
            background-color: white;
        }
        
        .cta-content {
            max-width: 100vw;
            margin: 0 auto;
        }
        
        .cta h2 {
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 1rem;
        }
        
        .cta p {
            color: #7f8c8d;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        footer {
            background-color: #2c3e50;
            color: white;
            padding: 4rem 5% 2rem;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        
        .footer-column h3 {
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
            color: #3498db;
        }
        
        .footer-links {
            list-style: none;
        }
        
        .footer-links li {
            margin-bottom: 0.8rem;
        }
        
        .footer-links a {
            text-decoration: none;
            color: #ecf0f1;
            transition: color 0.3s;
        }
        
        .footer-links a:hover {
            color: #3498db;
        }
        
        .social-links {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .social-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #34495e;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: background-color 0.3s;
        }
        
        .social-icon:hover {
            background-color: #3498db;
        }
        
        .footer-bottom {
            padding-top: 2rem;
            border-top: 1px solid #34495e;
            text-align: center;
            color: #bdc3c7;
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .navbar {
                padding: 1rem 5%;
            }
            
            .nav-links {
                display: none;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .hero p {
                font-size: 1rem;
            }
            
            .hero-btns {
                flex-direction: column;
                gap: 1rem;
            }
            
            .section-title h2 {
                font-size: 2rem;
            }
            
            .steps-container {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>

<template>
    <!-- Navbar -->
    <nav class="navbar">
        <div class="logo">
            <i class="fas fa-book-open"></i>
            <span>Perpustakaan Umum</span>
        </div>
        <div class="nav-links">
            <a href="#beranda">Beranda</a>
            <a href="#cara-kerja">Cara Pinjam</a>
            <a href="#koleksi">Koleksi</a>
            <a href="#peraturan">Peraturan</a>
            <a href="#kontak">Kontak</a>
        </div>
        <button class="login-btn" @click="goToLogin">Login</button>
    </nav>
    
    <!-- Hero Section -->
    <section id="beranda" class="hero">
        <div class="hero-content">
            <h1>Pinjam Buku dengan Mudah</h1>
            <p>Perpustakaan Umum menyediakan ribuan koleksi buku fisik yang dapat Anda pinjam dan baca di rumah. Daftar keanggotaan sekarang dan nikmati akses ke dunia pengetahuan.</p>
            <div class="hero-btns">
                <a href="#cara-kerja" class="primary-btn">Cara Meminjam</a>
                <a href="#koleksi" class="secondary-btn">Lihat Koleksi</a>
            </div>
        </div>
    </section>
    
    <!-- How It Works Section -->
    <section id="cara-kerja" class="how-it-works">
        <div class="section-title">
            <h2>Cara Meminjam Buku</h2>
            <p>Proses peminjaman buku di perpustakaan kami sangat mudah</p>
        </div>
        <div class="steps-container">
            <div class="step-card">
                <div class="step-number">1</div>
                <div class="step-icon">
                    <i class="fas fa-id-card"></i>
                </div>
                <h3>Daftar Keanggotaan</h3>
                <p>Buat kartu anggota perpustakaan dengan membawa KTP atau kartu identitas lainnya</p>
            </div>
            <div class="step-card">
                <div class="step-number">2</div>
                <div class="step-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>Cari Buku</h3>
                <p>Telusuri katalog atau langsung kunjungi rak-rak perpustakaan untuk menemukan buku</p>
            </div>
            <div class="step-card">
                <div class="step-number">3</div>
                <div class="step-icon">
                    <i class="fas fa-clipboard-check"></i>
                </div>
                <h3>Proses Peminjaman</h3>
                <p>Bawa buku dan kartu anggota ke meja petugas untuk diproses</p>
            </div>
            <div class="step-card">
                <div class="step-number">4</div>
                <div class="step-icon">
                    <i class="fas fa-book-reader"></i>
                </div>
                <h3>Nikmati & Kembalikan</h3>
                <p>Baca buku dan kembalikan sebelum tenggat waktu yang ditetapkan</p>
            </div>
        </div>
    </section>
    
    <!-- Features Section -->
    <section class="features">
        <div class="section-title">
            <h2>Keunggulan Kami</h2>
            <p>Berbagai keunggulan yang membuat perpustakaan kami berbeda</p>
        </div>
        <div class="feature-cards">
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-book"></i>
                </div>
                <h3>Koleksi Lengkap</h3>
                <p>Ribuan judul buku dari berbagai kategori dan genre untuk semua usia</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <h3>Durasi Peminjaman Fleksibel</h3>
                <p>Pinjam buku hingga 14 hari dengan opsi perpanjangan waktu</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-users"></i>
                </div>
                <h3>Staf yang Membantu</h3>
                <p>Staf perpustakaan yang ramah dan siap membantu menemukan buku yang Anda cari</p>
            </div>
        </div>
    </section>
    
    <!-- Collections Section -->
    <section id="koleksi" class="collections">
        <div class="section-title">
            <h2>Koleksi Buku Kami</h2>
            <p>Temukan berbagai kategori buku yang dapat Anda pinjam</p>
        </div>
        <div class="collection-grid">
            <div class="collection-card">
                <div class="collection-img">
                    <img src="/default-cover.png" alt="Fiksi Indonesia" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="collection-content">
                    <h3>Fiksi Indonesia</h3>
                    <p>Kumpulan novel, cerpen, dan puisi karya penulis Indonesia terbaik</p>
                    <a href="#">Lihat Koleksi →</a>
                </div>
            </div>
            <div class="collection-card">
                <div class="collection-img">
                    <img src="/default-cover.png" alt="Fiksi Internasional" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="collection-content">
                    <h3>Fiksi Internasional</h3>
                    <p>Karya sastra klasik dan kontemporer dari penulis terkenal dunia</p>
                    <a href="#">Lihat Koleksi →</a>
                </div>
            </div>
            <div class="collection-card">
                <div class="collection-img">
                    <img src="/default-cover.png" alt="Non-Fiksi" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="collection-content">
                    <h3>Non-Fiksi</h3>
                    <p>Biografi, sejarah, sains, self-help, dan buku pengembangan diri lainnya</p>
                    <a href="#">Lihat Koleksi →</a>
                </div>
            </div>
            <div class="collection-card">
                <div class="collection-img">
                    <img src="/default-cover.png" alt="Buku Anak" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="collection-content">
                    <h3>Buku Anak</h3>
                    <p>Buku cerita, ensiklopedia, dan buku aktivitas untuk anak-anak</p>
                    <a href="#">Lihat Koleksi →</a>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Testimonial Section -->
    <section class="testimonials">
        <div class="section-title">
            <h2>Apa Kata Anggota Kami</h2>
            <p>Pengalaman anggota perpustakaan yang telah menggunakan layanan kami</p>
        </div>
        <div class="testimonial-slider">
            <div class="testimonial-content">
                "Saya sangat senang bisa menjadi anggota Perpustakaan Umum. Koleksi bukunya sangat lengkap dan prosedur peminjamannya sangat mudah. Staf perpustakaan juga sangat ramah dan selalu siap membantu."
            </div>
            <div class="testimonial-author">Ahmad Satria</div>
            <div class="testimonial-role">Mahasiswa</div>
        </div>
    </section>
    
    <!-- Rules Section -->
    <section id="peraturan" class="rules">
        <div class="section-title">
            <h2>Peraturan Peminjaman</h2>
            <p>Beberapa hal yang perlu diperhatikan saat meminjam buku</p>
        </div>
        <div class="rules-container">
            <div class="rule-item">
                <h3>Durasi Peminjaman</h3>
                <p>Buku dapat dipinjam selama 14 hari kalender dan dapat diperpanjang satu kali untuk 7 hari tambahan.</p>
            </div>
            <div class="rule-item">
                <h3>Jumlah Maksimal</h3>
                <p>Setiap anggota dapat meminjam maksimal 3 buku pada saat yang bersamaan.</p>
            </div>
            <div class="rule-item">
                <h3>Denda Keterlambatan</h3>
                <p>Keterlambatan pengembalian buku akan dikenakan denda sebesar Rp 10.000 per hari per buku.</p>
            </div>
            <div class="rule-item">
                <h3>Tanggung Jawab</h3>
                <p>Anggota bertanggung jawab atas kondisi buku yang dipinjam. Kerusakan atau kehilangan akan dikenakan biaya penggantian.</p>
            </div>
            <div class="rule-item">
                <h3>Perpanjangan Peminjaman</h3>
                <p>Perpanjangan dapat dilakukan secara langsung di perpustakaan, via telepon, atau melalui website dengan login akun anggota.</p>
            </div>
        </div>
    </section>
    
    <!-- Stats Section -->
    <section class="stats">
        <div class="stats-container">
            <div class="stat-item">
                <h3>25,000+</h3>
                <p>Koleksi Buku</p>
            </div>
            <div class="stat-item">
                <h3>12,000+</h3>
                <p>Anggota Aktif</p>
            </div>
            <div class="stat-item">
                <h3>1,500+</h3>
                <p>Peminjaman per Bulan</p>
            </div>
            <div class="stat-item">
                <h3>30+</h3>
                <p>Buku Baru per Bulan</p>
            </div>
        </div>
    </section>
    
    <!-- CTA Section -->
    <section class="cta">
        <div class="cta-content">
            <h2>Jadilah Anggota Hari Ini</h2>
            <p>Daftar keanggotaan perpustakaan dan nikmati akses ke ribuan koleksi buku yang dapat Anda pinjam dan baca di rumah.</p>
            <a href="#" class="primary-btn">Daftar Sekarang</a>
        </div>
    </section>
    
    <!-- Footer -->
    <footer id="kontak">
        <div class="footer-content">
            <div class="footer-column">
                <h3>Perpustakaan Umum</h3>
                <p>Memberikan akses ke pengetahuan melalui layanan peminjaman buku berkualitas untuk semua lapisan masyarakat.</p>
                <div class="social-links">
                    <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
                </div>
            </div>
            <div class="footer-column">
                <h3>Menu Cepat</h3>
                <ul class="footer-links">
                    <li><a href="#beranda">Beranda</a></li>
                    <li><a href="#cara-kerja">Cara Pinjam</a></li>
                    <li><a href="#koleksi">Koleksi</a></li>
                    <li><a href="#peraturan">Peraturan</a></li>
                    <li><a href="#kontak">Kontak</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Jam Operasional</h3>
                <ul class="footer-links">
                    <li>Senin - Jumat: 08.00 - 20.00</li>
                    <li>Sabtu: 09.00 - 17.00</li>
                    <li>Minggu: 12.00 - 16.00</li>
                    <li>Hari Libur Nasional: Tutup</li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Hubungi Kami</h3>
                <ul class="footer-links">
                    <li><i class="fas fa-map-marker-alt"></i> Jl. Perpustakaan No. 123, Jakarta</li>
                    <li><i class="fas fa-phone"></i> (021) 1234-5678</li>
                    <li><i class="fas fa-envelope"></i> info@perpustakaanumum.id</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Perpustakaan Umum. Hak Cipta Dilindungi.</p>
        </div>
    </footer>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "fullscreen",
    auth: { unauthenticatedOnly: false, }
})
const router = useRouter();

const goToLogin = () => {
      router.push('/user/login');
}

const { data } = useAuth();
</script>