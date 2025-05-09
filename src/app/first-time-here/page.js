/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import Head from "next/head";

const FaqData = [
  {
    question: "Where is your church located?",
    answer: "Services are every Sunday @ Owyhee High School in Meridian, Idaho. Our office is open Mon - Thur at our HQ, located close to downtown Meridian, Idaho. "
  },
  {
    question: "Where do I park?",
    answer: "Lots of parking! Follow signs to the northside of the school. "
  },
  {
    question: "What denomination is your church affiliated with?",
    answer: "We are a non-denominational church."
  },
  {
    question: "What can I expect when I visit a service?",
    answer: "Expect a “come as you are vibe” no need to dress any certain way, be comfortable. Expect someone to welcome you but not too awkward :) Kids ministry check in will be off to your left, coffee to the right by auditorium stairs. Stop by the connections booth for info or for signing up for anything."
  },
  {
    question: "What time are your church services?",
    answer: "9 am & 10:30 am"
  },
  {
    question: "What do you offer for kids? (Do you offer Sunday School? Or “children’s ministry”?",
    answer: "We have age appropriate environments for kids with a trained and happy team ready to go!"
  },
  {
    question: "Who are the pastors?",
    answer: "Pastor T.J & Leah Hankey started the church in 2021."
  },
  {
    question: "Do I have to be a Christian to come to church?",
    answer: "Nope. We like everyone!"
  },
  {
    question: "How should I dress?",
    answer: "However you want."
  },
  {
    question: "How long are your church services?",
    answer: "1 hour to an hour and 10 min usually."
  },
  {
    question: "What style of church services do you have?",
    answer: "Modern, fun, sorta loud music with an engaging message. Youth normally sit down front but can sit anywhere they like."
  },
]

const FistTimeHereCardData = [
  {
    title: "Services",
    description: `Refresh Church meets every Sunday at <b>9:00am & 10:30am</b> for an hour to an hour and ten minutes in the <b>Owyhee High School Auditorium</b> located at <a href='https://maps.app.goo.gl/QVoYXC8LbYkQkN3s7' className="underline">3650 N. Owyhee Storm Ave. Meridian, ID 83646</a>. Our philosophy on church services is to laugh and learn, as we draw closer to God.`,
    isButton: true,
    buttonText: "Get Directions",
    buttonUrl: "https://www.google.com/maps/place/Refresh+Church/@43.638611,-116.4859239,17z/data=!3m1!4b1!4m6!3m5!1s0x54afab6678a860ad:0x82e71e5f1b73360!8m2!3d43.638611!4d-116.483349!16s%2Fg%2F11mr0q5s1n?entry=tts&g_ep=EgoyMDI0MDgyMy4wKgBIAVAD",
    isExternalLink: true
  },
  {
    title: "Kids Ministry",
    description: "Our team works hard to create a safe, clean, and fun environment for your child. Kids ministries are offered for ages birth through 5th grade. The kids’ check-in area and classrooms are easy to find and our leaders are eager to welcome your child. You can preregister your family and save time during the check-in process by clicking the link below!",
    isButton: true,
    buttonText: "Pre-Register",
    buttonUrl: "https://refresh.churchcenter.com/people/forms/303995",
    isExternalLink: true
  },
  {
    title: "Students",
    description: "During weekend services, students are invited to attend or serve during service. The Well is held every Wednesday at 6pm at the Refresh HQ where students can meet, hangout, worship and more.",
    isButton: true,
    buttonText: "Learn More",
    buttonUrl: "/refresh-youth",
    isExternalLink: false
  },
  {
    title: "Parking",
    description: "Owyhee High School has ample parking, and all the entrances and exits will be marked. When you arrive, feel free to park wherever you like and follow the signs toward the main entrance.",
    isButton: false,
    buttonText: " ",
    buttonUrl: " ",
  },
  {
    title: "Pre-Service",
    description: "Inside you will find smiling faces, warm welcomes, and freshly brewed coffee. Pre-service, you can check your kids into their classes and enjoy a conversation with a new or old friend.",
    isButton: false,
    buttonText: " ",
    buttonUrl: " ",
  },
  {
    title: "Post-Service",
    description: "When service ends, pick up your kids from their classrooms and hang out a while. Please let us know if you have any questions!",
    isButton: false,
    buttonText: " ",
    buttonUrl: " ",
  },

]

// FAQ Item Component
function FaqItem({ item }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center focus:outline-none "
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-bold text-gray-700">{item.question}</h3>
        <svg
          className={`w-6 h-6 text-primary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="p-6 pt-0">
          <p className="text-gray-700">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

// First Time Here Component
function FirstTimeHereCard({ item }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between">
      <div>
        <h4 className="text-xl font-bold text-primary mb-4">{item.title}</h4>
        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: item.description }} />
      </div>
      <div className="flex justify-end mt-4">
        {item.isButton && (
          <Link
            href={item.buttonUrl}
            target={item.isExternalLink ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            <button className="flex items-center bg-primaryDark text-white text-sm font-semibold py-2.5 px-6 rounded-full hover:bg-primary transition duration-300 ease-in-out">
              {item.buttonText}
              <svg
                className="w-4 h-4 ms-2 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                />
              </svg>
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default function FirstTimeHere() {
  return (
    <>
      {/* Meta title and description for SEO */}
      <Head>
        <title>Discover Community at Refresh - A Non-Denominational Church</title>
        <meta
          name="description"
          content="Experience a non-denominational church in Meridian, ID where every person is refreshed & every purpose is discovered. Explore services, kids ministry, and more."
        />
      </Head>
      {/* Invisible h tags for SEO */}
      <div className="hidden">
        <h1>First Time at Refresh Church?</h1>
        <h2>What to Expect at our Non-Denominational Church in Meridian, ID.</h2>
        <h3></h3>
      </div>

      <div className="container mx-auto px-8 sm:px-36 py-12">

        {/* Hero Carousel Section */}
        <div className="relative w-full h-[500px] mb-12 rounded-xl overflow-hidden">
          {/* <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={2000}
          className="rounded-2xl overflow-hidden"
        >
          <div className="relative w-full h-[500px] mb-12 rounded-xl overflow-hidden">
            <img
              src="/photos/first-time-here/fth-01.webp"
              className="w-full h-full object-contain user-select-none"
              alt="Image 1"
            />
          </div>
          <div className="relative block h-full">
            <img
              src="/photos//first-time-here/fth-02.webp"
              className="w-full h-full object-cover user-select-none"
              alt="Image 2"
            />
          </div>
          <div className="relative block h-full">
            <img
              src="/photos/first-time-here/fth-03.webp"
              className="w-full h-full object-cover user-select-none"
              alt="Image 3"
            />
          </div>
          <div className="relative block h-full">
            <img
              src="/photos/first-time-here/fth-04.webp"
              className="w-full h-full object-cover user-select-none"
              alt="Image 3"
            />
          </div>
          <div className="relative block h-full">
            <img
              src="/photos/first-time-here/fth-05.webp"
              className="w-full h-full object-cover user-select-none"
              alt="Image 3"
            />
          </div>
        </Carousel> */}
          <Image
            src='/photos/first-time-here/fth-03.webp'
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="First Time Here Image"
            draggable="false"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h3 className="text-white sm:text-7xl text-5xl font-bold max-[473px]:text-4xl z-100">First Time Here?</h3>
          </div>
        </div>

        {/* What to Expect Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-semibold text-gray-900 mb-8">What to Expect</h3>
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FistTimeHereCardData.map((item, index) => (
              <FirstTimeHereCard key={index} item={item} />
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12 pt-5">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="space-y-4">
              {FaqData.map((item, index) => (
                <FaqItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Church Slogan and Verse */}
        <div className="text-center mb-12 pt-8">
          <h3 className="text-2xl font-bold text-primary lowercase mb-4">every person refreshed. every purpose discovered.</h3>
          <p className="text-xl text-gray-700 italic">"A generous person will prosper; whoever refreshes others will be refreshed." - Proverbs 11:25</p>
        </div>

      </div>
    </>
  );
}
