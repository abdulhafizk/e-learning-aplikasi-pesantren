import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-green-500 to-blue-500">
      <header className="bg-green-800 text-white py-6 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <h1 className="text-xl font-bold">E-Learning Hubbul Khoir</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="hover:underline">
              Beranda
            </Link>
            <Link href="/courses" className="hover:underline">
              Pelajaran
            </Link>
            <Link href="/about" className="hover:underline">
              Tentang Kami
            </Link>
            <Link href="/contact" className="hover:underline">
              Kontak
            </Link>
          </nav>
          <div className="flex gap-2">
            <Link href="/login">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-green-700"
              >
                Masuk
              </Button>
            </Link>
            <Link href="/register" className="hidden md:block">
              <Button className="bg-white text-green-800 hover:bg-gray-100">
                Daftar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-green-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Selamat Datang di Platform E-Learning
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Pondok Pesantren Hubbul Khoir
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Platform pembelajaran digital untuk meningkatkan kualitas
              pendidikan santri dan memudahkan ustadz dalam mengajar.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-white text-green-800 hover:bg-gray-100 w-full md:w-auto"
                >
                  Masuk ke Akun Anda
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-green-600 w-full md:w-auto"
                >
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Fitur Utama
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-green-800" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Materi Pembelajaran
                </h3>
                <p className="text-gray-600">
                  Akses materi pembelajaran dari berbagai kitab dan pelajaran
                  dengan mudah kapan saja dan di mana saja.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-green-800" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Tugas & Ujian</h3>
                <p className="text-gray-600">
                  Kerjakan tugas dan ujian secara online dengan sistem penilaian
                  yang transparan dan cepat.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-800" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Diskusi Interaktif
                </h3>
                <p className="text-gray-600">
                  Berinteraksi dengan ustadz dan sesama santri melalui forum
                  diskusi untuk memperdalam pemahaman.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                E-Learning Hubbul Khoir
              </h3>
              <p className="text-green-100">
                Platform pembelajaran digital untuk meningkatkan kualitas
                pendidikan di Pondok Pesantren Hubbul Khoir.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Tautan</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-green-100 hover:underline">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/courses"
                    className="text-green-100 hover:underline"
                  >
                    Pelajaran
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-green-100 hover:underline"
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-green-100 hover:underline"
                  >
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontak</h3>
              <address className="not-italic text-green-100">
                Pondok Pesantren Hubbul Khoir
                <br />
                Jl. Pesantren No. 123
                <br />
                Email: info@hubbulkhoir.ac.id
                <br />
                Telepon: (021) 1234-5678
              </address>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-6 text-center text-green-100">
            <p>
              &copy; {new Date().getFullYear()} E-Learning Pondok Pesantren
              Hubbul Khoir. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
