import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeProvider";
import ScrollToTop from "../../Scroller/ScrollToTop";

export default function HomePage() {
    const { isDarkMode } = useTheme();
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    const testimonials = [
        { name: "Emma Johnson", review: "Absolutely love the book collection here! Fast delivery and beautiful packaging." },
        { name: "Michael Brown", review: "The best bookstore online! Found rare titles I couldn’t get anywhere else." },
        { name: "Sophia Lee", review: "Customer service is top-notch! The team helped me find the perfect gift for my friend." },
        { name: "Liam Smith", review: "Amazing variety of books. I always find something new to read here!" },
        { name: "Olivia Davis", review: "Quick shipping and great quality. My kids love the children's corner!" },
        { name: "Noah Wilson", review: "Love the curated selections and recommendations. Highly recommend!" },
    ];

    const scrollToIndex = useCallback((index) => {
        if (carouselRef.current) {
            const width = carouselRef.current.clientWidth;
            carouselRef.current.scrollTo({ left: index * width, behavior: "smooth" });
            setCurrentIndex(index);
        }
    }, []);

    const nextSlide = useCallback(() => {
        const next = (currentIndex + 1) % testimonials.length;
        scrollToIndex(next);
    }, [currentIndex, scrollToIndex, testimonials.length]);

    const prevSlide = useCallback(() => {
        const prev = (currentIndex - 1 + testimonials.length) % testimonials.length;
        scrollToIndex(prev);
    }, [currentIndex, scrollToIndex, testimonials.length]);

    // Auto-scroll every 4 seconds
    useEffect(() => {
        if (!isAutoScrolling) return;
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(interval);
    }, [isAutoScrolling, nextSlide]);

    // Sync currentIndex with scroll position
    useEffect(() => {
        const ref = carouselRef.current;
        if (!ref) return;

        const handleScroll = () => {
            const width = ref.clientWidth;
            const newIndex = Math.round(ref.scrollLeft / width);
            if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
            }
        };

        ref.addEventListener("scroll", handleScroll);
        return () => ref.removeEventListener("scroll", handleScroll);
    }, [currentIndex]);

    // Pause auto-scroll on hover
    const handleMouseEnter = () => setIsAutoScrolling(false);
    const handleMouseLeave = () => setIsAutoScrolling(true);

    return (
        <div className={`transition-colors duration-500 pt-30 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* ===== Hero Section ===== */}
            <section
                className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative text-center z-10 px-4">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                        Discover Your Next Favorite Book 📚
                    </h1>
                    <p className="text-base sm:text-lg text-gray-200 mb-6">
                        Explore thousands of titles and find stories that inspire, entertain, and educate.
                    </p>
                    <Link to="/Books">
                        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
                            Shop Now
                        </button>
                    </Link>
                </div>
            </section>

            {/* ===== New Arrivals ===== */}
            <section className="py-16 px-6 max-w-7xl mx-auto">
                <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>New Arrivals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {[
                        {
                            img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
                            title: "The Midnight Library",
                            price: "$15.99",
                            oldprice: "$20.00",
                        },
                        {
                            img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
                            title: "Atomic Habits",
                            price: "$12.50",
                            oldprice: "$18.00",
                        },
                        {
                            img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
                            title: "Educated",
                            price: "$14.00",
                            oldprice: "$22.00",
                        }
                    ].map((book, index) => (
                        <div key={index} className={`border rounded-lg overflow-hidden hover:shadow-lg transition ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
                            <img
                                src={book.img}
                                alt={book.title}
                                className="h-60 w-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
                                {/* <p className={`font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{book.price}</p> */}
                                {/* <p className={`text-sm line-through ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{book.oldprice}</p> */}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Category Section (Fixed dark mode background) ===== */}
            <section className={`py-10 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className={`text-4xl font-bold mb-10 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Choose Your Category</h2>
                    <div className="flex items-center justify-start gap-6 overflow-x-auto px-4 py-4 scrollbar-hide snap-x snap-mandatory">
                        {[
                            { name: "Fiction", icon: "📘", link: "/category/fiction" },
                            { name: "Science", icon: "🔬", link: "/category/science" },
                            { name: "Business", icon: "💼", link: "/category/business" },
                            { name: "Technology", icon: "💻", link: "/category/technology" },
                            { name: "Health & Fitness", icon: "💪", link: "/category/health-fitness" },
                            { name: "Children", icon: "🧒", link: "/category/children" },
                        ].map((cat, i) => (
                            <Link key={i} to={cat.link}>
                                <div
                                    className={`min-w-[160px] snap-start border rounded-xl p-6 text-center transition cursor-pointer
                                        ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'}
                                        hover:bg-gradient-to-r hover:from-indigo-500 hover:to-blue-500 hover:text-white`}
                                >
                                    <div className="text-4xl mb-3">{cat.icon}</div>
                                    <h3 className="text-lg font-semibold">{cat.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-10">
                        <Link to="/collection">
                            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold">
                                View All →
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== Collections (Fixed image paths) ===== */}
            <section className="py-16 px-4 max-w-7xl mx-auto text-center">
                <h2 className={`text-4xl font-bold mb-10 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Collections</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {[
                        {
                            "title": "Children’s Corner",
                            "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
                            "link": "/category/kids"
                        },
                        {
                            "title": "Young Adult Picks",
                            "image": "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80",
                                "link": "/category/adults"
                        },
                        {
                            "title": "Family Favorites",
                            "image": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
                            "link": "/category/family"
                        }
                    ].map((col, index) => (
                        <div key={index} className={`relative border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg overflow-hidden hover:shadow-lg transition`}>
                            <img
                                src={col.image}
                                alt={col.title}
                                className="h-60 w-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end text-white p-4">
                                <h3 className="text-lg font-semibold">{col.title}</h3>
                                <Link
                                    to={col.link}
                                    className="mt-2 inline-flex items-center text-sm bg-white text-black rounded-full px-3 py-1 hover:bg-gray-200 transition"
                                >
                                    View →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`py-12 sm:py-16 px-4 sm:px-8 lg:px-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        About <span className="text-blue-600">EasyBook</span>
                    </h2>
                    <p className={`text-base sm:text-lg max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-semibold text-blue-600">EasyBook</span> is your one-stop online bookstore
                        offering a wide range of books for readers of all ages. From children’s stories to academic
                        materials and the latest bestsellers, we make it easy to discover, explore, and purchase your
                        favorite books — all in one place.
                    </p>
                    <div className="mt-10 sm:mt-12">
                        <a
                            href="/contact"
                            className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-medium hover:bg-blue-700 transition-transform transform hover:scale-105"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== Testimonials Carousel (Fixed auto-scroll + manual controls) ===== */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center relative">
                <h2 className={`text-3xl font-bold mb-10 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What Our Readers Say</h2>
                <div
                    ref={carouselRef}
                    className="flex overflow-x-auto snap-mandatory snap-x scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {testimonials.map((t, i) => (
                        <div key={i} className="min-w-full snap-start">
                            <div className={`border ${isDarkMode ? 'border-gray-900 bg-gray-800' : 'border-gray-1000 bg-white'} rounded-lg p-6 hover:shadow-lg transition mx-2`}>
                                <p className="italic mb-4">"{t.review}"</p>
                                <h4 className="font-semibold">{t.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Manual navigation buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-50 transform -translate-y-1/2 p-1.5 bg-blue-600 rounded-full transition hidden sm:block"
                    aria-label="Previous"
                >
                    ◀
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-50 transform -translate-y-1/2 p-1.5 bg-blue-600 rounded-full transition hidden sm:block"
                    aria-label="Next"
                >
                    ▶
                </button>
                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-4">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollToIndex(idx)}
                            className={`w-2 h-2 rounded-full transition ${idx === currentIndex ? 'bg-indigo-600 w-4' : 'bg-gray-400'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* ===== Brands (Fixed dark mode background) ===== */}
            <section className={`py-16 px-4 text-center transition-colors duration-500 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
                <h2 className="text-3xl font-bold mb-12">Our Trusted Brands</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {[
                        { icon: "https://img.icons8.com/color/96/book-shelf.png", label: "Premium Books" },
                        { icon: "https://img.icons8.com/color/96/story-book.png", label: "Story Books" },
                        { icon: "https://img.icons8.com/color/96/books.png", label: "Book Collections" },
                        { icon: "https://img.icons8.com/color/96/book-reading.png", label: "Educational" },
                        { icon: "https://img.icons8.com/color/96/magazine.png", label: "Magazines" },
                        { icon: "https://img.icons8.com/color/96/bookshop.png", label: "Book Shop" },
                    ].map((b, i) => (
                        <div
                            key={i}
                            className={`flex flex-col items-center justify-center p-4 border rounded-lg shadow hover:scale-105 transition-transform w-32 sm:w-40
                                ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'}`}
                        >
                            <img src={b.icon} alt={b.label} className="w-12 h-12 sm:w-16 sm:h-16 mb-2" />
                            <p className="text-sm font-medium">{b.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Scroll to Top Button - appears after scrolling down */}
            <ScrollToTop />
        </div>
    );
}