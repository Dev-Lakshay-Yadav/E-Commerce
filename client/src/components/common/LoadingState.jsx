"use client"

import { motion } from "framer-motion"

const BouncingDotsPreloader = ({ size = "large" }) => {
  const sizeClasses = {
    large: "w-8 h-8",
  }

  const containerClasses = {
    large: "gap-2",
  }

  const colors = ["bg-red-500", "bg-yellow-500", "bg-green-500", "bg-blue-500", "bg-purple-500"]

  return (
    <div className={`w-full h-screen flex items-center justify-center bg-gray-500 ${containerClasses[size]}`}>
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className={`${sizeClasses[size]} ${color} rounded-full`}
          animate={{
            y: ["0%", "-100%", "0%"],
          }}
          transition={{
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default BouncingDotsPreloader
