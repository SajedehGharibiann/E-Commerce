import React from 'react'
import MainSlider from './MainSlider'
import Categories from './Categories'
import SaleSection from './SaleSection'

export default function Home() {
  return (
    <div className="w-full min-h-[75vh] flex flex-col items-center justify-center text-center px-6 py-16 animate-fadeIn">
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-4 drop-shadow-sm">
        Welcome to E‑commerce
      </h1>
        <MainSlider/>
      <p className="text-gray-700 text-xl max-w-3xl leading-relaxed">
        Your trusted destination for quality products and exceptional service.
      </p>
      <Categories/>
      <SaleSection/>
    </div>
  )
}
