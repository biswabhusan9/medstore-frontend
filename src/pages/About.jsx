import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-4xl font-bold  text-center">About QuickMed</h1>

        <p className="text-gray-700 text-lg">
          Welcome to <span className="font-semibold text-red-600">QuickMed</span>, your one-stop destination for the latest and greatest in medicines. From trusted prescriptions to must-have health essentials, we’re here to power up your wellness life with quality products and reliable service.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Our Mission</h2>
          <p className="text-gray-700 text-base">
            At QuickMed, our mission is to make quality healthcare accessible to everyone. We’re passionate about connecting people with the medicines and care they need to thrive in a healthy world — all at fair prices and delivered with speed and care.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Why Choose QuickMed?</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Top-quality medicines from trusted pharmacies</li>
            <li>Lightning-fast and secure doorstep delivery</li>
            <li>Reliable healthcare support, always ready to help</li>
            <li>Easy returns and hassle-free ordering experience</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Our Vision</h2>
          <p className="text-gray-700 text-base">
            We envision a future where healthcare elevates everyday life. At QuickMed, we’re committed to staying ahead of the curve, offering reliable solutions that are both practical and affordable.
          </p>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Join the QuickMed Family</h3>
          <p className="text-gray-700 mb-4">
            Whether you’re a patient, a caregiver, or just looking for something safe and reliable — QuickMed has something for everyone.
          </p>
         <Link to={'/products'}><button className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition duration-300">
            Start Shopping
          </button></Link> 
        </div>
      </div>
    </div>
  );
};

export default About;