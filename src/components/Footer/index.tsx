'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-8 w-full">
      <div className="max-w-[100%] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="flex flex-col items-start">
            <img
              src="/img/ordinals-bot-logo.svg"
              alt="OrdinalsBot Logo"
              width={200}
              height={50}
            />
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                GENERAL
              </h3>
              <ul className="space-y-2">
                {['Home', 'Creators', 'Partners', 'Marketplace'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-xl font-semibold hover:text-gray-300 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                COMPANY
              </h3>
              <ul className="space-y-2">
                {['Developers', 'Guides', 'Help', 'Runes'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-xl font-semibold hover:text-gray-300 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-2 justify-between items-center text-ob-white">
          <div className="flex space-x-6 mb-4 sm:mb-2">
            {/* TODO - add real links */}
            <Link
              href="#privacy"
              className="text-sm hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              className="text-sm hover:text-gray-300 transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
          <div className="flex items-center mb-4 sm:mb-2">
            <span className="text-sm font-bold mr-2">Powered By</span>
            <img
              src="/img/ordinals-bot-logo.svg"
              alt="OrdinalsBot Logo"
              width={100}
              height={24}
            />
          </div>
          <div className="flex space-x-4">
            {['instagram', 'x', 'telegram', 'discord'].map((social) => (
              <Link
                key={social}
                href={`#${social}`}
                className="hover:opacity-75 transition-opacity"
              >
                <img
                  src={`/img/socials/${social}.svg`}
                  alt={`${social} icon`}
                  width={24}
                  height={24}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
