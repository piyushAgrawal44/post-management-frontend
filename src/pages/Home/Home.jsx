import { ChevronRight, ChevronLeft, User, PenTool, MessageSquare, Globe } from 'lucide-react';
import Navbar from './Navbar';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const { t, i18n } = useTranslation();
    
    const [isArabic, setIsArabic] = useState(i18n.dir());

    useEffect(() => {
        setIsArabic(i18n.dir());
    }, [i18n.language])
    

    return (
        <div className={`min-h-screen bg-gray-50 `} dir={i18n.dir()}>
            {/* Navigation Bar */}
            <Navbar />

            {/* Hero Section */}
            <div className="bg-indigo-700 text-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl md:text-5xl">
                            {t('hero.title')} <br />
                        </h1>
                        <p className="block text-xl font-extrabold tracking-tight sm:text-2xl md:text-3xl text-indigo-300">{t('hero.subtitle')}</p>
                        <div className="mt-8 flex flex-col sm:flex-row">
                            <a
                                href="/signup"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 mb-3 sm:mb-0 sm:mr-3"
                            >
                                {t('nav.get_started')}
                                {isArabic ? (
                                    <ChevronLeft className="w-5 h-5 ml-2" />
                                ) : (
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                )}
                            </a>
                        </div>
                    </div>
                    <div className="md:w-1/2 md:pl-10">
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                            <div className="bg-indigo-100 p-4 flex items-center">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <div className="h-8 bg-indigo-500 rounded w-24"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">{t('features.title')}</h2>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            {t('features.subtitle')}
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Feature 1 */}
                        <FeatureCard
                            icon={<User className="h-6 w-6" />}
                            title={t('features.secureAuth.title')}
                            description={t('features.secureAuth.description')}
                        />
                        {/* Feature 2 */}
                        <FeatureCard
                            icon={<PenTool className="h-6 w-6" />}
                            title={t('features.contentSharing.title')}
                            description={t('features.contentSharing.description')}
                        />
                        {/* Feature 3 */}
                        <FeatureCard
                            icon={<MessageSquare className="h-6 w-6" />}
                            title={t('features.comments.title')}
                            description={t('features.comments.description')}
                        />
                        {/* Feature 4 */}
                        <FeatureCard
                            icon={<Globe className="h-6 w-6" />}
                            title={t('features.arabicSupport.title')}
                            description={t('features.arabicSupport.description')}
                        />
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div id="about" className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900">{t('about.title')}</h2>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            {t('about.subtitle')}
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="bg-white shadow overflow-hidden rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <p className="text-gray-700">{t('about.description')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex justify-center md:justify-start">
                            <h2 className="text-2xl font-bold">BlogShare</h2>
                        </div>
                        <div className="mt-8 md:mt-0">
                            <p className="text-center md:text-left text-gray-400">
                                &copy; 2025 BlogShare. {t('footer.rights')}
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Extracted reusable feature card
function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-5">
                    {icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
}
