import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Phone, Heart, Clock, Camera, PlayCircle, Sparkles, Music } from "lucide-react";

// Backgrounds
import bg from "../public/bg.png";
import bg1 from "../public/bg1.png";
import bgimg2 from "../public/bgimg2.png";
import bgimg3 from "../public/bgimg3.png";
import bgimg4 from "../public/bgimg4.png";

// Main Image
import mainImg from "../public/mainImg.png";

// Gallery Images
import img1 from "../public/img1.png";
import img3 from "../public/img3.png";
import img7 from "../public/img7.png";
import img8 from "../public/img8.png";
import img9 from "../public/img9.png";
import img11 from "../public/img11.png";
// import img12 from "../public/img12.png";

// Video
import dilipVideo from "../public/dilip video.mp4";

const backgrounds = [bgimg4, bg, bg1, bgimg2, bgimg3, bgimg4];
const galleryImages = [
  mainImg, img1, img3, bgimg4, img7, bgimg2, img8, img9,
];

const events = [
  { name: "Haldi Ceremony", time: "06 May 2026 • 05:30 PM", location: "Rui, Tq: Ambad, Dist: Jalna", icon: Sparkles },
  { name: "Wedding Ceremony", time: "07 May 2026 • 12:30 PM", location: "Ghodegaon, Jalna MH", icon: Heart },
  // { name: "Reception", time: "08 May 2026 • 08:00 PM", location: "Jalna", icon: Music },
];

const contacts = [
  { name: "Sandip Shelke", phone: "+91 9588428417" },
  { name: "Yogesh Shelke", phone: "+91 9527047738" },
];

export default function App() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [activeNav, setActiveNav] = useState("home");
  const [currentBg, setCurrentBg] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Countdown Timer
    const target = new Date("May 07, 2026 12:30:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        setTime({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / (1000 * 60)) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    // Background Carousel
    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 4000);

    // Scroll Handler
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["home", "events", "video", "gallery", "contact"];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 300) {
          current = section;
        }
      }
      if (current) setActiveNav(current);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      clearInterval(bgInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveNav(id);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="bg-[#fcfaf5] text-stone-800 font-sans overflow-x-hidden selection:bg-amber-200 selection:text-stone-900">

      {/* NAVIGATION - Hidden on Mobile as requested */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-4"
          : "bg-transparent py-8"
          }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center w-full">
          <div className="font-serif text-2xl tracking-widest font-bold text-white cursor-pointer drop-shadow-md" onClick={() => scrollToSection("home")}>
            D <span className="text-amber-500 font-light">&</span> D
          </div>

          <div className="flex justify-center items-center gap-10">
            {["home", "events", "video", "gallery", "contact"].map((item) => (
              <div key={item} className="relative flex flex-col items-center justify-center">
                <button
                  onClick={() => scrollToSection(item)}
                  className={`capitalize text-xs font-semibold tracking-[0.2em] transition-colors duration-300 ${activeNav === item
                    ? "text-amber-500"
                    : (isScrolled ? "text-stone-600 hover:text-stone-900" : "text-white/80 hover:text-white drop-shadow-md")
                    }`}
                >
                  {item}
                </button>
                {activeNav === item && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-2 h-[2px] w-full bg-amber-500"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden w-full">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentBg}
            src={backgrounds[currentBg]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover z-0"
            alt="Wedding Background"
          />
        </AnimatePresence>

        {/* Flying Hearts Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-[-50px] text-rose-500/40"
              initial={{ y: 0, x: `${Math.random() * 100}vw`, opacity: 0, scale: 0.5 }}
              animate={{
                y: -1000,
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.2, 1, 0.5],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            >
              <Heart className="w-4 h-4 sm:w-6 sm:h-6 fill-rose-500/40" />
            </motion.div>
          ))}
        </div>

        {/* Beautiful Dark Overlay to let images pop, fading to cream at the bottom */}
        <div className="absolute inset-0 bg-black/50 z-10 w-full"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#fcfaf5] z-10 w-full"></div>

        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 mt-0 md:mt-10 w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="mb-8 md:mb-12 relative flex justify-center items-center"
          >
            <div className="absolute inset-0 rounded-2xl bg-amber-500/30 blur-[30px] animate-pulse"></div>
            <img
              src={mainImg}
              alt="Dilip & Diksha"
              className="w-48 h-48 md:w-64 md:h-64 rounded-2xl border-[4px] border-white/50 shadow-[0_15px_40px_rgba(0,0,0,0.5)] object-cover relative z-10"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center justify-center w-full"
          >
            <motion.p
              variants={fadeUp}
              className="text-amber-400 text-xs md:text-sm uppercase tracking-[0.4em] font-semibold mb-24 drop-shadow-md"
            >
              We Are Getting Married
            </motion.p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 w-full leading-none">
              <motion.h1
                variants={fadeUp}
                className="text-amber-400 text-6xl md:text-8xl lg:text-[140px] font-serif tracking-tight text-center drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
              >
                Dilip
              </motion.h1>
              <motion.span
                variants={fadeUp}
                className="cursive text-5xl md:text-7xl lg:text-8xl text-amber-400 my-2 md:my-0 drop-shadow-md"
              >
                &
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="text-6xl md:text-8xl lg:text-[140px] font-serif text-amber-400 tracking-tight text-center drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
              >
                Diksha
              </motion.h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-12 mt-12 w-full"
          >
            <div className="flex items-center justify-center gap-3 text-white">
              <Calendar className="text-black w-6 h-6 drop-shadow-md" />
              <span className="text-black font-semibold tracking-[0.2em] text-sm md:text-base drop-shadow-md">07 MAY 2026</span>
            </div>
            <div className="hidden sm:block w-[1px] h-6 bg-white/40"></div>
            <div className="flex items-center justify-center gap-3 text-white">
              <MapPin className="text-black w-6 h-6 drop-shadow-md" />
              <span className="text-black font-semibold tracking-[0.2em] text-sm md:text-base drop-shadow-md">Ghodegaon, Jalna, MH</span>
            </div>
          </motion.div>
        </div>
      </section>

      <br />
      {/* COUNTDOWN SECTION */}
      <section id="countdown" className="relative py-24 md:py-32 bg-[#fcfaf5] overflow-hidden flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-5xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center text-center mb-16 w-full"
          >
            <p className="text-amber-600 uppercase tracking-[0.4em] text-xs font-semibold mb-4">Save The Date</p>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800">The Countdown</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 w-full">
            {Object.entries(time).map(([unit, value], index) => (
              <motion.div
                key={unit}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-[#fcf5e8] rounded-[2.5rem] p-6 md:p-10 w-[45%] sm:w-32 md:w-40 flex flex-col items-center justify-center shadow-[0_15px_45px_rgba(0,0,0,0.05)] border border-[#f5ebdb] hover:border-amber-300 transition-all duration-500 group"
              >
                <div className="text-4xl md:text-6xl font-light font-serif text-amber-600 mb-2 group-hover:scale-110 transition-transform duration-500">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-500 font-bold">
                  {unit === 'd' ? 'Days' : unit === 'h' ? 'Hours' : unit === 'm' ? 'Mins' : 'Secs'}
                </div>
              </motion.div>
            ))}
            <div>_</div>

          </div>
        </div>
      </section>

      <br />
      {/* EVENTS SECTION */}
      <section id="events" className="py-24 md:py-32 bg-white relative flex flex-col items-center justify-center w-full border-t border-stone-100">
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center text-center mt-24 md:mt-32 mb-16 md:mb-20 w-full"
          >
            <p className="text-amber-600 uppercase tracking-[0.4em] text-xs font-semibold mb-6 md:mb-8">Celebrations</p>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800">Wedding Events</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            {events.map((event, index) => {
              const Icon = event.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className="bg-[#fcf5e8] rounded-[2rem] overflow-hidden group border border-amber-100 flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                >
                  <div className="p-10 flex flex-col items-center w-full">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-inner border border-amber-50 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-8 h-8 text-amber-500" />
                    </div>

                    <h3 className="text-2xl font-serif text-stone-800 mb-6">{event.name}</h3>

                    <div className="flex flex-col items-center gap-3 w-full text-stone-500 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="font-medium tracking-wide">{event.time}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="w-4 h-4 text-stone-400" />
                        <span className="font-medium tracking-wide">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <br />
      {/* VIDEO SECTION */}
      <section id="video" className="py-24 md:py-32 bg-[#fcfaf5] relative flex flex-col items-center justify-center w-full overflow-hidden border-t border-stone-100">
        <div className="w-full max-w-5xl mx-auto px-4  sm:px-6 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center text-center mt-24 md:mt-32 mb-16 md:mb-20 w-full"
          >
            <p className="text-amber-600 uppercase tracking-[0.4em] text-xs font-semibold mb-6 md:mb-8">Our Story</p>
            <h2 className="text-2xl md:text-5xl font-serif text-stone-800">Engagement Ceremony 💖</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="w-full relative group rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-8 border-white bg-black"
          >
            <video
              src={dilipVideo}
              controls
              className="w-full h-auto max-h-[60vh] object-contain"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>
      <br />
      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 md:py-32 bg-white relative flex flex-col items-center justify-center w-full border-t border-stone-100">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center text-center mt-24 md:mt-32 mb-16 md:mb-20 w-full"
          >
            <p className="text-amber-600 uppercase tracking-[0.4em] text-xs font-semibold mb-6 md:mb-8">Memories</p>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800">Capturing Moments</h2>
          </motion.div>

          <div className="columns-2 md:columns-3 gap-4 md:gap-8 w-full">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                className="relative group overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 w-full bg-stone-100 inline-block mb-4 md:mb-6"
              >
                <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  loading="lazy"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION & CONTACT COMBINED */}
      <section id="contact" className="pt-24 md:pt-32 pb-40 md:pb-56 bg-[#fcfaf5] flex flex-col items-center justify-center w-full border-t border-stone-100">
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
          <br />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center text-center mt-24 md:mt-32 mb-16 md:mb-20 w-full"
          >
            <p className="text-amber-600 uppercase tracking-[0.4em] text-xs font-semibold mb-6 md:mb-8">Join Us</p>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-800">Venue & Contact</h2>
            <br />

          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
            {/* Map Container */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              className="flex flex-col items-center w-full gap-12"
            >
              <div className="rounded-[2rem] overflow-hidden shadow-md border-[6px] border-white w-full h-[300px] md:h-[400px] mb-8">
                <iframe
                  className="w-full h-full"
                  src="https://maps.google.com/maps?q=Ghodegaon%20Jalna&t=&z=13&output=embed"
                  title="Venue Map"
                  loading="lazy"
                />
              </div>
              <motion.a
                href="https://maps.app.goo.gl/f9uqwMPxpnvwoucr5"
                target="_blank"
                rel="noopener noreferrer"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mt-12 group relative inline-flex justify-center items-center gap-4 px-12 py-8 bg-gradient-to-r from-amber-500 to-amber-900 text-white font-bold tracking-[0.2em] text-base uppercase rounded-full shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.5)] hover:from-amber-700 hover:to-amber-600 transition-all border border-amber-400/50 z-10"
              >
                <div className="absolute inset-0 rounded-md border-2 border-amber-200/20 animate-ping opacity-16"></div>
                <MapPin size={32} />
                Get Location
              </motion.a>
            </motion.div>

            {/* Contact Cards Container */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={staggerContainer}
              className="flex flex-col justify-center w-full"
            >
              <motion.h3 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-stone-900 mb-8 text-center sm:text-left drop-shadow-sm">Contact Information</motion.h3>
              <br />
              <div className="flex flex-col gap-6">
                {contacts.map((contact, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                    }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-4 p-8 rounded-2xl bg-[#fcf5e8] border border-[#f5ebdb] hover:border-green-200 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      <p className="text-red-600/80 uppercase tracking-[0.2em] text-[10px] font-bold mb-2"> Contact</p>
                      <h4 className="text-2xl font-serif text-stone-800">{contact.name}</h4>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="inline-flex justify-center items-center gap-3 text-sm font-semibold tracking-widest text-stone-600 hover:text-green-600 transition-colors duration-300 group/link"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center border border-green-200 group-hover/link:bg-green-100 group-hover/link:scale-110 transition-all duration-300">
                        <Phone className="w-4 h-4 text-green-600 group-hover/link:animate-pulse" />
                      </div>
                      {contact.phone}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <br />
      {/* FOOTER */}
      <footer className="py-32 md:py-48 bg-stone-900 text-center relative flex flex-col items-center justify-center w-full overflow-hidden">
        {/* Subtle Flying Hearts for Professional Look */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-[-50px] text-rose-00/40"
              initial={{ y: 0, x: `${Math.random() * 100}vw`, opacity: 0, scale: 0.5 }}
              animate={{
                y: -1500,
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.2, 1, 0.5],
              }}
              transition={{
                duration: 8 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            >
              <Heart className="w-8 h-8 sm:w-12 sm:h-12 fill-rose-600/30" />
            </motion.div>
          ))}
        </div>


        <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mb-8"
          >
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-8xl font-serif text-white mt-[100px] md:mt-[150px] mb-6 flex items-center justify-center gap-4 sm:gap-6 whitespace-nowrap"
          >
            <br /><br />
            <span className="text-amber-500">Dilip</span>
            <motion.span
              className="text-red-500 font-light flex items-center justify-center"
              animate={{ opacity: [0.4, 1, 0.4], y: [-8, 8, -8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-8 h-8 md:w-12 md:h-12 text-red-500 fill-red-500" />
            </motion.span>
            <span className="text-amber-500">Diksha</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-stone-400 cursive text-3xl md:text-5xl mb-16"
          >
            Thank you for being part of our special day
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-stone-500 text-[10px] md:text-xs tracking-[0.5em] font-semibold uppercase relative"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-stone-600"></div>
            © 2026 • Forever Begins
          </motion.div>
          <span className="mr-20 text-stone-300">  created by @yogesh_shelke</span>
        </div>
      </footer>
    </div>
  );
}





















//  <section id="gallery" className="py-24 md:py-32 bg-white relative flex flex-col items-center justify-center w-full border-t border-stone-100">
//         <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: false, amount: 0.2 }}
//             className="flex flex-col items-center text-center mt-24 md:mt-32 mb-16 md:mb-20 w-full"
//           >
//             <p className="text-amber-600 uppercase tracking-[0.4em] text-xs font-semibold mb-6 md:mb-8">Memories</p>
//             <h2 className="text-4xl md:text-5xl font-serif text-stone-800">Capturing Moments</h2>
//           </motion.div>

//           <div className="columns-2 md:columns-3 gap-4 md:gap-8 w-full">
//             {galleryImages.map((img, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.95, y: 20 }}
//                 whileInView={{ opacity: 1, scale: 1, y: 0 }}
//                 viewport={{ once: false, amount: 0.2 }}
//                 transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
//                 className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 w-full bg-stone-100 break-inside-avoid mb-16 md:mb-24"
//               >
//                 <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
//                 <img
//                   src={img}
//                   alt={`Gallery ${index + 1}`}
//                   loading="lazy"
//                   className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700 ease-out"
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>