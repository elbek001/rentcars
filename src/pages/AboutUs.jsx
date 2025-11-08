import React, { useState } from "react";
import g from "../assets/g.png";
import video from './../assets/v.mp4';
import e from "../assets/e.png";
import q from "../assets/q.png";
import s from "../assets/car.png";
import a from "../assets/a.png";
import w from "../assets/w.png";
import m from "../assets/m.png";
import z from "../assets/z.png";
import y from "../assets/y.png";
import b from "../assets/b.png";
import i from "../assets/i.png";
import o from "../assets/o.png";


export default function AboutUs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does it work?",
      answer:
        "Our rental process is simple: choose your car, select the date, and confirm your booking online in just a few clicks.",
    },
    {
      question: "Can I rent a car without a credit card?",
      answer:
        "Yes, you can use a debit card, but additional ID and deposit may be required depending on the location.",
    },
    {
      question: "What are the requirements for renting a car?",
      answer:
        "You must be at least 21 years old with a valid driver’s license and proof of insurance.",
    },
    {
      question:
        "Does Car Rental offer coverage products for purchase with my rental?",
      answer:
        "Yes, we offer optional insurance and protection plans to give you peace of mind during your trip.",
    },
  ];

  return (

    <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-20 max-w-7xl mx-auto text-gray-800">
    
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold mb-3 tracking-tight">About Us</h2>
        <p className="text-gray-500 text-sm">Home / About Us</p>
      </div>

      {/* Top content */}
      <div className="grid md:grid-cols-3 gap-12 mb-20">
        <div>
          <h3 className="text-3xl font-bold mb-4 leading-snug">
            Where every drive feels extraordinary
          </h3>
          <p className="text-gray-500 text-base leading-relaxed">
            Variety Brands, Maximum Freedom, and Awesome Support.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-lg">Variety Brands</h4>
          <p className="text-gray-500 text-sm leading-relaxed">
            Choose from a vast selection of cars — from economy to luxury.
          </p>

          <h4 className="font-semibold mt-6 mb-2 text-lg">Maximum Freedom</h4>
          <p className="text-gray-500 text-sm leading-relaxed">
            Drive anywhere, anytime — no restrictions.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-lg">Awesome Support</h4>
          <p className="text-gray-500 text-sm leading-relaxed">
            24/7 customer assistance whenever you need it.
          </p>

          <h4 className="font-semibold mt-6 mb-2 text-lg">Flexibility On The Go</h4>
          <p className="text-gray-500 text-sm leading-relaxed">
            Pick up and drop off your car wherever convenient.
          </p>
        </div>
      </div>

      {/* Video block */}
      <div className="flex justify-center items-center rounded-3xl pb-20">
        <video controls className="rounded-2xl shadow-lg w-full max-w-3xl" src={video}></video>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 text-center mb-20 gap-10">
        <div>
          <h3 className="text-6xl font-extrabold text-purple-600 mb-2">20k+</h3>
          <p className="text-gray-500 text-sm uppercase tracking-wide">Happy customers</p>
        </div>
        <div>
          <h3 className="text-6xl font-extrabold text-purple-600 mb-2">540+</h3>
          <p className="text-gray-500 text-sm uppercase tracking-wide">Count of cars</p>
        </div>
        <div>
          <h3 className="text-6xl font-extrabold text-purple-600 mb-2">25+</h3>
          <p className="text-gray-500 text-sm uppercase tracking-wide">Years of experience</p>
        </div>
      </div>

      {/* Memories Section */}
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h3 className="text-3xl font-bold mb-5 leading-snug">
            Unlock unforgettable memories on the road
          </h3>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida.
            Quis nunc interdum gravida ullamcorper.
          </p>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <img className="w-6 h-6 mt-1" src={g} alt="" />
              <span>Velit semper morbi purus non eu cursus porttitor tristique et gravida.</span>
            </li>
            <li className="flex items-start gap-3">
              <img className="w-6 h-6 mt-1" src={g} alt="" />
              <span>Quis nunc interdum gravida ullamcorper et pharetra.</span>
            </li>
            <li className="flex items-start gap-3">
              <img className="w-6 h-6 mt-1" src={g} alt="" />
              <span>Etiam sagittis lacus et augue fermentum gravida.</span>
            </li>
            <li className="flex items-start gap-3">
              <img className="w-6 h-6 mt-1" src={g} alt="" />
              <span>Integer posuere lectus id odio malesuada dapibus.</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-center items-center rounded-3xl pb-20">
          <video controls className="rounded-2xl shadow-lg w-full max-w-3xl" src={video}></video>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="pt-24 pb-24 bg-gray-50">
        <h1 className="text-4xl font-extrabold text-center mb-14 text-gray-800">
          Reviews from our customers
        </h1>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            { text: "Amazing service! The car was spotless and ran perfectly. Definitely renting again!", author: "— John D." },
            { text: "Super flexible and easy to book. I had the best experience ever.", author: "— Emily R." },
            { text: "24/7 support is real! They helped me even late at night. Highly recommend.", author: "— Michael S." }
          ].map((review, index) => (
            <div key={index} className="bg-white shadow-md rounded-2xl p-10 text-center transition hover:shadow-xl">
              <img className="pb-4" src={e} alt="" />
              <p className="text-gray-600 italic mb-6 leading-relaxed">“{review.text}”</p>
              <h3 className="font-semibold text-lg text-purple-600">{review.author}</h3>
              <div className="flex pt-4 justify-center items-center">
                <img src={q} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-20">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Top Car Rental Questions
        </h1>

        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-xl mb-4 shadow-sm overflow-hidden">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left p-4 font-semibold text-gray-800 flex justify-between items-center"
            >
              {faq.question}
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>

            {openIndex === index && (
              <div className="p-4 text-gray-500 border-t bg-gray-50 transition-all duration-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="pt-20 " >
        <img src={s} alt="" />

      </div>



    </section>

  );
}
