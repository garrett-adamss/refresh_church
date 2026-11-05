/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from "next/image";
import Link from "next/link";

export default function YouthMinistry() {
  return (
    <div className="container mx-auto px-8 sm:px-36 py-12">
      <h2 className="text-4xl font-bold text-gray-900 tracking-tighter sm:text-4xl md:text-5xl mb-12">Youth Ministry</h2>

      {/* Introduction Section with Image */}
      <div className="flex flex-col lg:flex-row items-center mb-12">
        <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to The Well</h3>
          <p className="text-gray-700 text-lg mb-6">
            We believe ministering to the next generation is one of the most important ministries here at Refresh Church.
          </p>
          <Link href="https://refresh.churchcenter.com/groups/small-groups/youth-small-group" className="inline-block bg-primaryDark text-white text-lg font-semibold py-3 px-6 rounded-full hover:bg-primary transition duration-300 ease-in-out">
            Join Us at The Well
          </Link>
        </div>
        <div className="lg:w-1/2 w-full">
          <div className="w-full h-[350px] relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/photos/youth/01.jpg"
              layout="fill"
              objectFit="cover"
              alt="Youth at camp outdoors"
            />
          </div>
        </div>
      </div>

      {/* Time and Location Section */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row-reverse items-center">
          <div className="lg:w-1/2 lg:pl-8 mb-8 lg:mb-0">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Time & Location</h3>
            <p className="text-gray-700 text-lg">
              Students come together every <b>Wednesday Night from 6 - 7:30pm</b> to build relationships, learn about Jesus, and discover their purpose.
              We meet at the Refresh HQ: 601 E Schiller Ln in Meridian. <br />Our gathering consists of group games, devotional time, small group discussion, Bible study, and prayer. We also enjoy snacks, friendship, and lots of laughs
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="w-full h-[250px] relative overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/photos/youth/02.jpg"
                layout="fill"
                objectFit="cover"
                alt="Youth worship and singing together"
              />
            </div>
          </div>
        </div>
      </div>


      {/* Final Call to Action with Image */}
      <div className="flex flex-col lg:flex-row items-center text-center lg:text-left mt-12">
        <div className="lg:w-1/2 lg:pr-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Join us at The Well!</h3>
          <p className="text-gray-700 text-lg mb-6">
            We believe in the power of community. Our youth leaders recognize that they have a unique influence in the lives of the middle and high school students they serve. Their goal is to encourage authentic faith as they invest in a relationship with your student(s) and help them build a relationship with Jesus and others around them.
          </p>
          <Link href="https://refresh.churchcenter.com/groups/small-groups/youth-small-group" className="inline-block bg-primaryDark text-white text-lg font-semibold py-3 px-6 rounded-full hover:bg-primary transition duration-300 ease-in-out">
            Join Us for Youth Night
          </Link>
        </div>
        <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
          <div className="w-full h-[350px] relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/photos/youth/03.jpg"
              layout="fill"
              objectFit="cover"
              alt="Youth gathering and community"
            />
          </div>
        </div>
      </div>

      {/* Youth Program Photo Section */}
      {/* <div className="mb-12 mt-10">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">Youth in Action</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="w-full h-[250px] relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/path-to-youth-photo3.jpg" // Replace with the actual path to the image
              layout="fill"
              objectFit="cover"
              alt="Youth Program Photo 1"
            />
          </div>
          <div className="w-full h-[250px] relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/path-to-youth-photo4.jpg" // Replace with the actual path to the image
              layout="fill"
              objectFit="cover"
              alt="Youth Program Photo 2"
            />
          </div>
          <div className="w-full h-[250px] relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/path-to-youth-photo5.jpg" // Replace with the actual path to the image
              layout="fill"
              objectFit="cover"
              alt="Youth Program Photo 3"
            />
          </div>
          <div className="w-full h-[250px] relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/path-to-youth-photo6.jpg" // Replace with the actual path to the image
              layout="fill"
              objectFit="cover"
              alt="Youth Program Photo 4"
            />
          </div>
          <div className="w-full h-[250px] relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/path-to-youth-photo7.jpg" // Replace with the actual path to the image
              layout="fill"
              objectFit="cover"
              alt="Youth Program Photo 5"
            />
          </div>
          <div className="w-full h-[250px] relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/path-to-youth-photo8.jpg" // Replace with the actual path to the image
              layout="fill"
              objectFit="cover"
              alt="Youth Program Photo 6"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
}
