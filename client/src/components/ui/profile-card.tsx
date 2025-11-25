"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Check, Star, Clock, DollarSign, TrendingUp } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProfileCardProps {
  name?: string
  description?: string
  image?: string
  isVerified?: boolean
  rating?: number
  responseTime?: string
  priceRange?: string
  successRate?: number
  yearsExperience?: number
  enableAnimations?: boolean
  className?: string
  onExpand?: () => void
  onClick?: () => void
}

export function ProfileCard({
  name = "Sophie Bennett",
  description = "Immigration specialist with expertise in student visas.",
  image = "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=800&h=800&fit=crop&auto=format&q=80",
  isVerified = true,
  rating = 4.8,
  responseTime = "2 hours",
  priceRange = "$500-$2000",
  successRate = 95,
  yearsExperience = 8,
  enableAnimations = true,
  className,
  onExpand,
  onClick,
}: ProfileCardProps) {
  const [hovered, setHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = enableAnimations && !shouldReduceMotion

  const containerVariants = {
    rest: { 
      scale: 1,
      y: 0,
      filter: "blur(0px)",
    },
    hover: shouldAnimate ? { 
      scale: 1.02, 
      y: -4,
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 28,
        mass: 0.6,
      }
    } : {},
  }

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
  }

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(4px)",
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
        mass: 0.6,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      scale: 0.95,
      filter: "blur(2px)",
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      },
    },
  }

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 200,
        mass: 0.8,
      },
    },
  }

  return (
    <motion.div
      data-slot="profile-hover-card"
      data-testid={`profile-card-${name}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick || onExpand}
      initial="rest"
      whileHover="hover"
      variants={containerVariants}
      className={cn(
        "relative w-72 h-80 rounded-3xl border border-border/20 text-card-foreground overflow-hidden shadow-xl shadow-black/5 cursor-pointer group backdrop-blur-sm",
        "dark:shadow-black/20",
        className
      )}
    >
      {/* Full Cover Image */}
      <motion.img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        variants={imageVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Smooth Blur Overlay - Multiple layers for seamless fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 via-background/25 via-background/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background/90 via-background/60 via-background/35 to-transparent backdrop-blur-[1px]" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/85 via-background/45 to-transparent backdrop-blur-sm" />

      {/* Content */}
      <motion.div 
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-0 left-0 right-0 p-4 space-y-2"
      >
        {/* Name and Verification */}
        <motion.div variants={itemVariants} className="flex items-center gap-1">
          <motion.h2 
            className="text-lg font-bold text-foreground leading-tight"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.02,
                }
              }
            }}
          >
            {name.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h2>
          {isVerified && (
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-green-500 text-white flex-shrink-0"
              data-testid="badge-verified"
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                transition: { type: "spring", stiffness: 400, damping: 20 }
              }}
            >
              <Check className="w-2 h-2" />
            </motion.div>
          )}
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-muted-foreground text-xs leading-tight line-clamp-1"
        >
          {description}
        </motion.p>

        {/* Stats Grid - Compact */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 gap-1.5 pt-1"
        >
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />
            <span className="font-semibold">{rating}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span className="truncate text-xs">{responseTime}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <DollarSign className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span className="truncate text-xs">{priceRange}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingUp className="w-3 h-3 text-green-500 flex-shrink-0" />
            <span className="font-semibold">{successRate}%</span>
          </div>
        </motion.div>

        {/* View Details Button */}
        <motion.button
          variants={itemVariants}
          data-testid={`button-contact-${name}`}
          whileHover={{ 
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 25 }
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full cursor-pointer py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-200 bg-foreground text-background hover:bg-foreground/90 border border-border/20 shadow-sm transform-gpu mt-1"
        >
          View Details
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
