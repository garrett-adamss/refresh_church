import Image from "next/image";
import { InfinitePhotoScroll } from "../components/InfinitePhotoScroll";
import GoogleReviewsCarousel from "../components/GoogleReviewsCarousel";

export default function ChristmasPage() {
  return (
    <main className="min-h-screen bg-[#fff9f5]">
      {/* This year's artwork includes the service date and times. */}
      <section className="bg-[#ff383f]">
        <Image
          src="/photos/christmas/starry-nights-2026.png"
          width={1920}
          height={1080}
          className="block h-auto w-full"
          alt="Starry Nights: Christmas at Refresh. December 23rd at 5pm and 6:30pm."
          priority
        />
      </section>

      <section className="m-0">
        <InfinitePhotoScroll event="christmas" />
      </section>

      <div className="container mx-auto px-8 sm:px-36 pt-12 pb-6">
        {/* section 1 */}
        <div className="flex flex-col lg:flex-row items-center mb-12">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Starry Nights at REFRESH
            </h1>
            <div className="text-gray-700 space-y-3 text-lg">
              <p className="font-semibold">
                December 23rd @ 5pm and 6:30pm
              </p>
              <p className="text-base hover:underline">
                <a href="https://www.google.com/maps/place/Refresh+Church/@43.6345987,-116.3929469,17z/data=!3m1!4b1!4m5!3m4!1s0x54afab6678a860ad:0x82e71e5f1b73360!8m2!3d43.6345987!4d-116.3929469">
                  3650 N Owyhee Storm Ave, Meridian, ID 83646
                </a>
              </p>
              <p className="text-lg">
              Remembering the reason for the season. Come join Refresh Church as we celebrate Christmas on Dec 23rd. Lots to do and be a part of this year. There will be a photo booth, REFRESHments, Christmas music, a kids’ program and choir, and a Christmas message with a candlelight ending. Services will last about an hour and have a &quot;come as you are&quot; feel. Bring the whole family and invite a friend. <strong className="text-[#a51c27]">Childcare is provided for children ages 3 and younger.</strong>
              </p>
              {/* ✅ Button 1 */}
              {/* <Link
                href="/plan-your-easter"
                className="inline-block bg-primaryDark text-white text-lg font-semibold py-3 px-6 rounded-full hover:bg-primary transition duration-300 ease-in-out mt-4"
              >
                PLAN A VISIT
              </Link> */}
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="w-full h-[250px] relative overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/photos/christmas/candlelight-service.jpg"
                layout="fill"
                objectFit="cover"
                alt="TJ on stage facing the congregation at a candlelight service"
              />
            </div>
          </div>
        </div>


        {/* section 2 */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row-reverse items-center">
            <div className="lg:w-1/2 lg:pl-8 mb-8 lg:mb-0">
              <h1 className="text-3xl font-semibold text-gray-900 mb-4">Join Refresh Church this holiday season!</h1>
              <div className="text-gray-700 text-lg space-y-3">
                <p>This is a family service, and a kids’ activity booklet is included.</p>
                <p>Services are at Owyhee High School with plenty of parking.</p>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="w-full h-[250px] relative overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/photos/christmas/IMG_5634.jpg"
                  layout="fill"
                  objectPosition="0 50%"
                  objectFit="cover"
                  alt="Evergreen branches and Christmas lights"
                />
              </div>
            </div>
          </div>
        </div>

        {/* section 3 */}
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">What to Expect</h1>
            <div className="text-gray-700 text-lg space-y-3">
              <p>Expect services to be modern, fairly loud, engaging, and fun for the whole family.</p>
              <p className="text-[#b7222b] font-semibold text-xl">
                We would love to see you and your loved ones. Invite a friend!
              </p>
            </div>
            {/* <Link
              href="/plan-your-easter"
              className="inline-block bg-primaryDark text-white text-lg font-semibold py-3 px-6 mt-3 rounded-full hover:bg-primary transition duration-300 ease-in-out"
            >
              Plan Your Visit
            </Link> */}
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="w-full h-[250px] relative overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/photos/easter/img13.webp"
                layout="fill"
                objectPosition="0 55%"
                objectFit="cover"
                alt="People gathered at Refresh Church"
              />
            </div>
          </div>
        </div>

        {/* google reviews */}
        <div className="my-16">
          <GoogleReviewsCarousel />
        </div>
      </div>

      <section className="bg-[#ff383f]">
        <Image
          src="/photos/christmas/starry-nights-no-times.png"
          width={1920}
          height={1080}
          className="block h-auto w-full"
          alt="Starry Nights: Christmas at Refresh"
        />
      </section>

      {/* <PlanVisitSticky
        message="Plan your visit for Christmas Sunday!"
        buttonText={<ArrowBigRight/>}
        href="/plan-your-easter"
        canBeClosed={false} 
      /> */}

    </main>
  )
}