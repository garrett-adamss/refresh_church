/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Refresh Grants",
  description:
    "See a need in your community and take action. Apply for a Refresh Grant when you want to help and cannot cover the cost yourself.",
};

const APPLICATION_URL =
  "https://refresh.churchcenter.com/people/forms/1348985";

const applyButtonClass =
  "inline-block bg-primaryDark text-white text-lg font-semibold py-3 px-6 rounded-full hover:bg-primary transition duration-300 ease-in-out";

const steps = [
  {
    number: "1",
    title: "See a need",
    body: "Notice someone in your community who needs practical help. That might be groceries, gas, a bill, lawn care, plumbing, or something else specific.",
  },
  {
    number: "2",
    title: "Fill out the application",
    body: "Tell us who needs help, what you want to do, and what it will cost. If the need is urgent, say so. Anyone in the church can apply.",
  },
  {
    number: "3",
    title: "Do Ministry",
    body: "If you are approved, you are the one who shows up, listens, and cares. The grant is there so the cost does not stop you.",
  },
];

const afterYouApply = [
  {
    title: "Application submitted",
    body: "You complete the application and send it in. Include the need, your plan, and a cost if you have a bill, estimate, or provider confirmation.",
  },
  {
    title: "Confirmation email",
    body: "You will get an email confirming that we received your application.",
  },
  {
    title: "Review and interview",
    body: "Your application enters review, and someone from the team will talk with you. We want to understand the need, what you are proposing, and how the grant would make that help possible. We will ask your permission before contacting the person you want to help or a company you want us to pay.",
  },
  {
    title: "A decision",
    body: "You will be told whether the request is approved, approved in part, still needs information, or declined. If more information is needed, we will tell you exactly what. If it is declined, we will tell you why, and you can send new information or a revised plan.",
  },
  {
    title: "Next steps and resources",
    body: "If you are approved, you will get an email or a phone call with the amount, what it is for, how payment works, and any conditions. You will also get help for the conversation itself: what to do and what not to do, how to pray, questions to ask, and how to follow up.",
  },
  {
    title: "Payment",
    body: "You send invoices, receipts, or other documentation. See how the money works below before you spend anything.",
  },
  {
    title: "Follow-up",
    body: "After the help is given, you will get a link to tell us how it went. That helps us see whether the need was met and how Refresh Grants are serving people.",
  },
];

export default function RefreshGrantsPage() {
  return (
    <div className="container mx-auto px-8 sm:px-36 py-12">
      <div className="bg-primaryDark rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-4xl font-bold text-white tracking-tighter sm:text-4xl md:text-5xl">
          Refresh Grants
        </h2>
        <p className="text-xl text-gray-200 pt-2">
          See a need. Fill out the application. Do ministry.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center mb-12">
        <div className="lg:w-2/3 mb-8 lg:mb-0 lg:pr-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            See a need and take action
          </h3>
          <p className="text-gray-700 text-lg mb-4">
            Refresh Grants are for people in our church who see a need and want
            to respond, even when they cannot cover the cost themselves. You
            bring the need and a practical plan. The grant team decides whether
            and how church funds can support that care.
          </p>
          <p className="text-gray-700 text-lg mb-6">
            You do not have to contribute your own money to apply, and you do
            not have to exhaust every other resource first. The grant can stand
            alongside other help. It fills the gap so you can do the ministry.
          </p>
          <Link
            href={APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={applyButtonClass}
          >
            Fill out the application
          </Link>
        </div>
        <div className="lg:w-1/3 w-full flex justify-center">
          <div className="bg-white shadow-lg rounded-2xl p-8 flex items-center justify-center">
            <Image
              src="/photos/refresh-grants-mark.png"
              alt="Refresh Grants"
              width={233}
              height={108}
              priority
              className="h-auto w-56"
            />
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Three steps
      </h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-8 mb-12">
        {steps.map((step) => (
          <div key={step.number} className="bg-white shadow-md rounded-2xl p-6 h-full">
            <p className="text-xl font-bold text-primary mb-2">{step.number}</p>
            <h4 className="text-xl font-bold text-gray-900 mb-4 text-balance">{step.title}</h4>
            <p className="text-gray-700 text-lg">{step.body}</p>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        What happens after you apply
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {afterYouApply.map((item, index) => (
          <div key={item.title} className="bg-white shadow-md rounded-2xl p-6 h-full">
            <h4 className="text-xl font-bold text-primary mb-4">
              {index + 1}. {item.title}
            </h4>
            <p className="text-gray-700 text-lg">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-8 mb-12">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          How the money works
        </h3>
        <p className="text-gray-700 text-lg mb-4">
          The person you are helping should receive goods, such as groceries or
          gas, services, such as lawn care or plumbing, or have a bill paid
          directly by you or by the church. We do not give cash to the person
          in need.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          If you cover an approved expense yourself, the church can reimburse
          you by check when you provide invoices, receipts, or other
          documentation. You can also send the bill to the grant team so the
          church pays the vendor directly, such as a landlord, a utility
          company, or a mortgage company.
        </p>
        <p className="text-gray-700 text-lg">
          Stay with the plan that was approved. If the cost or the purpose
          changes, talk to the grant team before any additional spending. If
          the same person needs help again, that is not an automatic no. Tell
          us what changed and what the earlier help accomplished.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white shadow-md rounded-2xl p-6 h-full">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            A simple way to pray
          </h3>
          <p className="text-gray-700 text-lg mb-4">
            Ask, “Would you like me to pray with you?” If they say yes, you
            can pray something like this:
          </p>
          <p className="text-gray-700 text-lg mb-4">
            “Jesus, thank you for loving [name]. Please bring peace, provide
            for their needs, and guide their next steps. Amen.”
          </p>
          <p className="text-gray-700 text-lg">
            If they decline, respect that answer.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 h-full">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            When to ask for help
          </h3>
          <p className="text-gray-700 text-lg mb-4">
            Contact the grant team or a pastor about a safety concern, another
            need, or a question about your next step. Share that privately with
            the people who can help.
          </p>
          <p className="text-gray-700 text-lg">
            If someone is in immediate danger, call 911.
          </p>
        </div>
      </div>

      <div className="bg-primaryDark rounded-2xl shadow-lg p-8 text-center">
        <h3 className="text-2xl font-semibold text-white mb-4">
          Ready to take action?
        </h3>
        <p className="text-lg text-gray-200 mb-6">
          Tell us the need you see and the plan you have.
        </p>
        <Link
          href={APPLICATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-primaryDark text-lg font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out"
        >
          Fill out the application
        </Link>
      </div>
    </div>
  );
}
