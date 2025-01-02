import React from "react";
import { Button } from "@/components/ui/button";
import HeaderBar from "./HeaderBar";
import Link from "next/link";

const plans = [
  {
    name: "Free Plan",
    description:
      "Get all goodies for free, no credit card required. Start your journey to the moon!",
    price: "Free",
    features: [
      "Access to all basic features",
      "Watch up to 5 stocks",
      "Get 15min delayed data",
    ],
    buttonText: "Already using",
  },
  {
    name: "Pro Plan",
    description:
      "Get more features with Pro. Put yourself one step closer to the moon!",
    price: "$4.99/month",
    features: [
      "All in the free plan plus",
      "Watch unlimted stocks",
      "Get instant data",
      "Participate in the leaderboard",
      "Extra 5,000 coins at start of month",
    ],
    buttonText: "Buy now",
    mostPopular: true,
  },
  {
    name: "Exclusive Plan",
    description:
      "Set yourself up with the best in the industry. One way trip to the moon!",
    price: "$14.99/month",
    features: [
      "All in the pro plan plus",
      "Priority support",
      "Enterprise-grade security",
      "Extra 10,000 coins at start of month",
    ],
    buttonText: "Buy now",
  },
];

export const PlanDetails = () => {
  return (
    <div>
      <HeaderBar pageName="Subscription Plan" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-8 text-center">
              Choose the plan thats right for you!
            </h1>
            <p className="text-xl text-center mb-12">
              We want to help you but we need your help too.
              <br />
              Get started with paid monthly subscriptions for more features and
              access to the monthly leaderboard!
            </p>
          </div>

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`border-2  rounded-2xl shadow-sm divide-y `}
              >
                <div className="p-6">
                  <h3 className="text-2xl leading-6 font-medium">
                    {plan.name}
                  </h3>
                  <p className="mt-4 text-sm ">{plan.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold">
                      {plan.price}
                    </span>
                  </p>
                  <Button size="lg" className={`mt-8 w-full `}>
                    <Link
                      href="https://buy.stripe.com/test_eVa7tu5yl4XmfCMaEE"
                      target="_blank"
                    >
                      {plan.buttonText}
                    </Link>
                  </Button>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h4 className="text-xs font-medium tracking-wide uppercase">
                    Whats included
                  </h4>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex space-x-3">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
