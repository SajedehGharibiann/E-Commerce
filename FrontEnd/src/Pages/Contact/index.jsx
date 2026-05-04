import React from 'react'

export default function Contact() {
  return (
    <div className="w-full min-h-[75vh] flex flex-col items-center justify-center text-center px-6 py-24 animate-fadeIn">
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-6 drop-shadow">
        Get in Touch
      </h1>

      <p className="text-gray-700 text-xl max-w-3xl leading-relaxed">
        Whether you have questions, feedback, or need support, our team is here for you.
      </p>
    </div>
  )
}
