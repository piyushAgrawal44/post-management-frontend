import { Globe, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function Navbar() {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

   

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-indigo-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-white text-2xl font-bold">BlogShare</h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="#features" className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            {t('nav.features')}
                        </a>
                        <a href="#about" className="text-indigo-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            {t('nav.about')}
                        </a>

                        <button
                            className="flex items-center gap-1 text-gray-50 cursor-pointer"
                            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
                        >
                            <Globe className="w-4 h-4 mr-1" />
                            {t('nav.language_toggle')}
                        </button>

                        <a
                            href="/login"
                            className="ml-4 bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium flex items-center"
                        >
                            <User className="w-4 h-4 mr-1" />
                            {t('nav.login')}
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-indigo-100 hover:text-white focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={
                                        isMenuOpen
                                            ? 'M6 18L18 6M6 6l12 12'
                                            : 'M4 6h16M4 12h16M4 18h16'
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#features" className="text-indigo-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            {t('nav.features')}
                        </a>
                        <a href="#about" className="text-indigo-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            {t('nav.about')}
                        </a>
                        <button
                            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
                            className="flex items-center gap-1 text-indigo-100 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                        >
                            <Globe className="w-4 h-4 mr-1" />
                            {t('nav.language_toggle')}
                        </button>
                        <a
                            href="/login"
                            className="bg-white text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                        >
                            <User className="w-4 h-4 mr-1" />
                            {t('nav.login')}
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
