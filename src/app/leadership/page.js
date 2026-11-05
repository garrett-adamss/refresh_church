/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from "next/image";

export default function Leadership() {
  
  const staff = [
    {
      img: "/photos/leadership/sam.jpg",
      name: "Pastor Sam Pech",
      title: "Executive Pastor of Ministries",
    },
    {
      img: "/photos/leadership/dylan.jpg",
      name: "Pastor Dylan Cochran",
      title: "Worship & Production Pastor",
      objectPosition: "center 17%",
    },
    {
      img: "/photos/leadership/chris.jpg",
      name: "Pastor Chris Abernathy",
      title: "Adult Discipleship Pastor",
      objectPosition: "center 38%",
    },
    {
      img: "/photos/leadership/nicole.jpg",
      name: "Nicole Sherwood",
      title: "Pastoral & Admin Assistant",
    },
    {
      img: "/photos/leadership/jeanine.jpg",
      name: "Jeanine Abernathy",
      title: "Children’s Director",
    },
    {
      img: "/photos/leadership/cat.jpg",
      name: "Cat Howard",
      title: "Ministries Admin",
      objectPosition: "center 35%",
    },
    {
      img: "/photos/leadership/eric.jpg",
      name: "Eric Kemp",
      title: "Youth Director",
    },
  ]

  return (
    <div className="container mx-auto px-8 sm:px-36 py-12">
      <h2 className="text-3xl font-bold text-gray-900 tracking-tighter sm:text-3xl md:text-4xl mb-12">Our Leadership</h2>

      {/* Head Pastor Section */}
      <div className="bg-white shadow-lg rounded-2xl p-8 mb-12 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0 flex justify-center">
          <div className="relative xl:w-72 xl:h-72 w-56 h-56">
            <Image
              src="/photos/leadership/TJLeah.jpg"
              layout="fill"
              objectFit="cover"
              alt="Head Pastor"
              className="rounded-full shadow-md"
            />
          </div>
        </div>
        <div className="lg:w-2/3 lg:pl-8 text-center lg:text-left">
          <h3 className="text-3xl font-bold text-primary mb-4">Pastor TJ & Leah</h3>

          <p className="text-gray-700 text-lg text-left">
          In the summer of 2020, T.J. and Leah felt a clear call from God to plant a life-giving church in the Treasure Valley of Idaho - Refresh church launched in 2021 and has been going strong ever since.
            <br />
            <br />
            Pastor T.J. is a gifted teacher and communicator and has a particular bent on making the bible approachable to everyday life and to see others find freedom and passion in their lives. In their free time, T.J. and Leah like spending time outdoors, camping, fishing, and enjoying great food with their four children Mckenna, Addison, Cecelia, and Layton.
          </p>
        </div>
      </div>
      {/* <div className="bg-white shadow-lg rounded-2xl p-12 mb-12 flex flex-col lg:flex-row items-center">
        <p className="text-gray-700 text-lg">  
          In 2011, T.J. and Leah set out on the incredible adventure of planting a new, life-giving, church on the west side of Sarasota. On January 29th, 2012, The Shore Church had its first service. Over the next 8-and-a-half years, The Shore saw more than 1,000 people make the decision to follow Jesus with their entire lives.
          <br />
          <br />
          In the summer of 2020, T.J. and Leah once again felt a clear call from God to plant a life-giving church. This time, in the Treasure Valley of Idaho. Refresh Church launched in September of 2021 and has built an incredible team to see people refreshed by the presence of God and discover their purpose in Him.
          <br />
          <br />
          Pastor T.J. is a gifted teacher and communicator. He has a passion for making God’s word relatable and practical, and he has a heart for reaching people right where they are and introducing them to the refreshing message of Jesus. In their free time, T.J. and Leah like spending time outdoors with their four children Mckenna, Addison, Cecelia, and Layton.
        </p>
      </div> */}

      {/* Associate Pastors Section */}
      <h3 className="text-xl font-bold text-gray-900 tracking-tighter sm:text-4xl md:text-3xl mb-8">Associate Pastors & Staff</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {staff.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="w-48 h-48 relative">
              <Image
                src={item.img} // Replace with the actual path to the image
                layout="fill"
                objectFit="cover"
                objectPosition={item.objectPosition || "center"}
                alt={`${item.name} image`}
                className="rounded-full mb-4"
              />
            </div>
            <h4 className="text-xl font-bold text-primary">{item.name}</h4>
            <p className="text-gray-600">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
