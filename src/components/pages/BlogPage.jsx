


import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeProvider";

const blogPosts = [
  {
    id: 1,
    title: "The 10 Most Anticipated Book Releases of 2026",
    excerpt: "From sweeping fantasies to gripping thrillers — these upcoming novels are already stealing the spotlight.",
    date: "Apr 15, 2026",
    category: "New Releases",
    emoji: "📚",
  },
  {
    id: 2,
    title: "How to Start a Successful Book Club: Tips & Tricks",
    excerpt: "Bring fellow book lovers together with our ultimate guide: engaging discussions, snack ideas & reading schedules.",
    date: "Apr 5, 2026",
    category: "Community",
    emoji: "👥",
  },
  {
    id: 3,
    title: "Author Spotlight: Yuval Noah Harari",
    excerpt: "In-depth interview exploring Sapiens, Homo Deus, and the future of storytelling in the digital age.",
    date: "Mar 28, 2026",
    category: "Author Interviews",
    emoji: "🎙️",
  },
  {
    id: 4,
    title: "30% Off Bestsellers: Our Ultimate Reading List",
    excerpt: "Shop our curated list of discounted books this spring — from literary fiction to self‑development gems.",
    date: "Mar 20, 2026",
    category: "Deals",
    emoji: "🏷️",
  },
  {
    id: 5,
    title: "The Psychology of Reading: Why Books Make Us Happier",
    excerpt: "Studies show that reading reduces stress by 68%. Discover the science behind cozy reading sessions.",
    date: "Mar 12, 2026",
    category: "Wellness",
    emoji: "❤️",
  },
  {
    id: 6,
    title: "Behind the Scenes: Easy Shop Books' Journey",
    excerpt: "How we built a community-driven indie bookstore & e‑commerce platform — our story, values & future.",
    date: "Mar 1, 2026",
    category: "Announcements",
    emoji: "🏪",
  },
];

const BlogPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300
      ${isDarkMode
          ? "bg-gray-950 text-gray-100"
          : "bg-gradient-to-b from-white via-blue-50/30 to-indigo-100/20 text-gray-900"
        }`}
    >

      {/* HERO */}
      <section className="text-center py-12 px-4 pt-35">
        <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          Book Insights & Stories
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Discover trends, stories, and tips from the world of books.
        </p>
      </section>

      {/* BLOG GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className={`rounded-2xl overflow-hidden transition hover:scale-[1.03]
            ${isDarkMode
                ? "bg-gray-900 border border-gray-800"
                : "bg-white shadow-md"
              }`}
          >
            {/* Emoji Banner */}
            <div className="h-40 flex items-center justify-center text-5xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
              {post.emoji}
            </div>

            <div className="p-5">
              <div className="flex justify-between text-xs mb-2 text-gray-500">
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>

              <h3 className="text-lg font-bold mb-2">{post.title}</h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {post.excerpt}
              </p>

              <button
                onClick={() => alert(`"${post.title}" coming soon`)}
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Read more →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div
          className={`rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-4
          ${isDarkMode
              ? "bg-indigo-950/30 border border-indigo-800"
              : "bg-indigo-50 border"
            }`}
        >
          <div>
            <h3 className="text-2xl font-bold"> 🎉 Explore Our Books</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Discover trending collections and bestsellers.
            </p>
          </div>

          <Link to="/books">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full transition">
              Shop Now →
            </button>
          </Link>
        </div>
      </div>


      {/* FOOTER */}
      <footer className="text-center text-sm py-6 text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        © 2026 EasyShopBooks — All rights reserved.
      </footer>
    </div>
  );
};

export default BlogPage;