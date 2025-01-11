import React from 'react';  

const Footer = () => {  
    return (  
        <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-10">  
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-5">  
                {/* Logo and About Section */}  
                <div className="flex flex-col items-center md:items-start text-center md:text-left">  
                    <img src="https://i.ibb.co.com/Xs9T126/New-Project-2.png" alt="FastHelpBD Logo" className="h-24 mb-4" />  
                    <p className="text-lg font-semibold mb-4">FastHelpBD</p>  
                      
                </div>  

                {/* Services Section */}  
                <div>  
                    <h3 className="font-bold text-xl mb-6 border-b-2 border-blue-400 pb-2">Visit</h3>  
                    <ul className="space-y-3">  
                        <li><a href="/" className="hover:text-blue-300 transition">Home</a></li>  
                        <li><a href="/services" className="hover:text-blue-300 transition">See All Services</a></li>  
                    </ul>  
                </div>  

                {/* Social Media Section */}  
                <div>  
                    <h3 className="font-bold text-xl mb-6 border-b-2 border-blue-400 pb-2">Follow Us</h3>  
                    <div className="space-y-4">
                        <a href="https://facebook.com/spidergroupcm" className="flex items-center hover:text-blue-300 transition">
                            <i className="fab fa-facebook-f text-2xl mr-2"></i>
                            <span>Facebook</span>
                        </a>  
                        <a href="https://www.linkedin.com/in/asm-mohebullah/" className="flex items-center hover:text-blue-300 transition">
                            <i className="fab fa-linkedin-in text-2xl mr-2"></i>
                            <span>LinkedIn</span>
                        </a>  
                    </div>  
                </div>  

                {/* Contact Section */}  
                <div>  
                    <h3 className="font-bold text-xl mb-6 border-b-2 border-blue-400 pb-2">Contact</h3>  
                    <ul className="space-y-3">  
                        <li>
                            <a href="mailto:spidergroupcm@gmail.com" className="hover:text-blue-300 transition">
                                spidergroupcm@gmail.com
                            </a>
                        </li>  
                        <li>
                            <p className="text-gray-300">
                                Phone: +880-1789711089
                            </p>
                        </li>  
                    </ul>  
                </div>  
            </div>  

            <div className="border-t border-gray-600 mt-10 pt-6 text-center">
                <div className="text-sm text-gray-300">Designed with ❤️ and dedication by FastHelpBD.</div>
                <p className="mt-2 text-lg font-semibold">&copy; 2024 FastHelpBD. All rights reserved.</p>  
            </div>  
        </footer>  
    );  
};  

export default Footer;
