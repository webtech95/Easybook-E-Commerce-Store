import React from "react";
import { CreditCard, Wallet, Percent, Gift } from "lucide-react";
import { useTheme } from "../ThemeProvider";

const Offers = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`py-40 transition-colors duration-300
      ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
    >
      <section className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Latest{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            Offers & Discounts
          </span>
        </h1>

        {/* Offer Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Card Component */}
          {[
            {
              icon: <Wallet />,
              title: "Online Payment Offer",
              desc: "Get 10% instant discount when you pay using UPI, Net Banking, or Wallets.",
              note: "Valid on orders above ₹999",
            },
            {
              icon: <CreditCard />,
              title: "Debit Card Offer",
              desc: "Flat ₹150 off on payments made with any major bank debit card.",
              note: "Minimum order ₹1,200",
            },
            {
              icon: <Percent />,
              title: "Credit Card Offer",
              desc: "Enjoy 5% cashback on credit card payments with select banks.",
              note: "No minimum order value",
            },
            {
              icon: <Gift />,
              title: "Combo Deals",
              desc: "Buy 2 or more items and get an extra 15% off on your total bill.",
              note: "Auto-applied at checkout",
            },
            {
              icon: <Wallet />,
              title: "Wallet Cashback",
              desc: "Get up to ₹200 cashback when paying via Paytm or PhonePe wallets.",
              note: "Cashback credited within 48 hours",
            },
            {
              icon: <Gift />,
              title: "Festival Special Offer",
              desc: "Extra 20% off on all products this festive season!",
              note: "Use code FEST20 at checkout",
            },
          ].map((offer, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 text-center space-y-4 border transition-all duration-300 hover:-translate-y-1
              ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 shadow-md hover:shadow-gray-900/50"
                  : "bg-white border-gray-200 shadow-md hover:shadow-lg"
              }`}
            >
              <div className="flex justify-center">
                <div
                  className={`p-3 rounded-full
                  ${
                    isDarkMode
                      ? "bg-gray-700 text-indigo-400"
                      : "bg-gray-100 text-indigo-600"
                  }`}
                >
                  {React.cloneElement(offer.icon, {
                    className: "w-6 h-6",
                  })}
                </div>
              </div>

              <h2 className="text-xl font-semibold">
                {offer.title}
              </h2>

              <p
                className={`text-sm
                ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {offer.desc}
              </p>

              <p
                className={`text-xs font-medium
                ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                {offer.note}
              </p>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
};

export default Offers;