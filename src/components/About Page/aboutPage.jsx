import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import founder1 from "../../assets/Faiz.jpg";
import founder2 from "../../assets/Ahmad.jpg";
import founder3 from "../../assets/Masa.jpg";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const foundersRef = useRef(null);
  const paragraphRefs = useRef([]);
  const founderCardRefs = useRef([]);


  // Add refs to the arrays
  const addToParagraphRefs = (el) => {
    if (el && !paragraphRefs.current.includes(el)) {
      paragraphRefs.current.push(el);
    }
  };

  const addToFounderCardRefs = (el) => {
    if (el && !founderCardRefs.current.includes(el)) {
      founderCardRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out"
      }
    );

    // Paragraph animations
    paragraphRefs.current.forEach((paragraph, index) => {
      gsap.fromTo(
        paragraph,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: paragraph,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
        }
      );
    });

    // Founders section animation
    gsap.fromTo(
      foundersRef.current,
      { opacity: 0 },
      {
        scrollTrigger: {
          trigger: foundersRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    );

    // Founder cards animation
    founderCardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100 },
        {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.3 + index * 0.2,
          ease: "back.out(1.7)",
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-white mt-navbar">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
        
        <div ref={headerRef} className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
            Tentang Forum Kesiswaan
          </h1>
          <div className="h-1 w-20 bg-blue-400 mx-auto"></div>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-16 container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <p ref={addToParagraphRefs} className="text-lg leading-relaxed opacity-0">
            Forum kesiswaan merupakan sebuah wadah digital yang dirancang khusus untuk menampung dan menampilkan berbagai aktivitas siswa dari berbagai sekolah. Melalui platform ini, setiap sekolah memiliki kesempatan untuk mengunggah kegiatan-kegiatan yang dilakukan oleh siswa, baik itu dalam bidang akademik, non-akademik, maupun kegiatan sosial dan kultural. Hal ini memungkinkan adanya dokumentasi serta publikasi yang lebih luas dan terstruktur mengenai kehidupan sekolah sehari-hari.
          </p>
          
          <p ref={addToParagraphRefs} className="text-lg leading-relaxed opacity-0">
            Selain berfungsi sebagai media dokumentasi internal sekolah, forum ini juga berperan penting sebagai jendela informasi bagi masyarakat luas. Para orang tua, misalnya, dapat menggunakan website ini sebagai referensi untuk mengetahui sejauh mana keterlibatan anak-anak mereka dalam kegiatan sekolah. Mereka dapat melihat perkembangan anak mereka tidak hanya dari sisi akademis, tetapi juga dari keterlibatan sosial dan organisasi. Lebih dari itu, calon wali murid pun dapat memanfaatkan informasi yang tersedia untuk menilai kualitas dan dinamika kehidupan sekolah yang akan dituju oleh anak mereka.
          </p>
          
          <p ref={addToParagraphRefs} className="text-lg leading-relaxed opacity-0">
            Dengan adanya platform ini, transparansi kegiatan sekolah dapat terwujud. Informasi yang sebelumnya hanya terbatas pada lingkungan internal sekolah kini dapat diakses secara terbuka oleh publik. Hal ini tidak hanya meningkatkan kepercayaan terhadap institusi pendidikan, tetapi juga memacu sekolah-sekolah untuk terus berinovasi dalam menciptakan kegiatan yang bermakna dan berdampak positif bagi siswa.
          </p>
          
          <p ref={addToParagraphRefs} className="text-lg leading-relaxed opacity-0">
            Harapan besar kami, forum kesiswaan dapat menjadi pusat kolaborasi dan inspirasi antar sekolah. Dengan saling berbagi kegiatan, pengalaman, dan praktik baik, diharapkan terjadi pertukaran ide yang memperkaya mutu pendidikan secara menyeluruh. Forum ini bukan sekadar etalase informasi, tetapi juga sebagai sarana penghubung yang mempererat hubungan antara siswa, guru, orang tua, dan masyarakat.
          </p>
        </div>
      </section>

      {/* Founders Section */}
      <section ref={foundersRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Pendiri & Pengembang</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Founder 1 */}
            <Card 
              ref={addToFounderCardRefs}
              className="overflow-hidden opacity-0 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-60 overflow-hidden">
                <img 
                  src={founder1} 
                  alt="Dimas Faiz" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-xl mb-2">Dimas Faiz</h3>
                <p className="text-gray-600">Fullstack Developer</p>
              </CardContent>
            </Card>
            
            {/* Founder 2 */}
            <Card 
              ref={addToFounderCardRefs}
              className="overflow-hidden opacity-0 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-60 overflow-hidden">
                <img 
                  src={founder2} 
                  alt="Achmad Fadil" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-xl mb-2">Achmad Fadil</h3>
                <p className="text-gray-600">FrontEnd Developer</p>
              </CardContent>
            </Card>
            
            {/* Founder 3 */}
            <Card 
              ref={addToFounderCardRefs}
              className="overflow-hidden opacity-0 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-60 overflow-hidden">
                <img 
                  src={founder3} 
                  alt="Founder 3" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-xl mb-2">Massa Triya</h3>
                <p className="text-gray-600">Backend*</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p ref={addToParagraphRefs} className="text-lg opacity-0">
              "Pembuat aplikasi ini adalah 3 orang yang dulunya berminat kedalam dunia cyber, namun hanya 1 yang masih bertahan."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
