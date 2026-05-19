import {
  ArrowRight,
  Sparkles,
  BrainCircuit,
  ShieldCheck,
  Zap,
  Star,
  PlayCircle,
} from "lucide-react";

import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { getData } from "@/context/userContext";

const Hero = () => {
  const { user } = getData();
  const navigate = useNavigate();

  // ================= ANIMATIONS =================
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.8,
        delay,
      },
    }),
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white text-black">

      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-zinc-200 rounded-full blur-[120px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
          }}
          className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-zinc-300 rounded-full blur-[140px]"
        />

        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-100 rounded-full blur-[150px] opacity-70"
        />

      </div>

      {/* ================= MAIN CONTENT ================= */}
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-10 py-20">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >

            {/* USER INFO */}
            {user && (
              <motion.div
                custom={0.1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
              >

                <motion.div
                  whileHover={{
                    scale: 1.03,
                  }}
                  className="flex items-center gap-3 bg-white border border-zinc-200 shadow-sm rounded-full px-5 py-2"
                >

                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm uppercase">
                    {user.username?.charAt(0)}
                  </div>

                  <div className="text-left">
                    <p className="text-xs text-zinc-500">
                      Welcome Back
                    </p>

                    <h3 className="font-semibold text-sm sm:text-base">
                      {user.username}
                    </h3>
                  </div>

                </motion.div>

                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  className={`
                    px-4 py-2 rounded-full text-xs font-bold tracking-widest shadow-sm border
                    ${
                      user.role === "admin"
                        ? "bg-black text-white border-black"
                        : "bg-zinc-100 text-black border-zinc-200"
                    }
                  `}
                >
                  {user.role === "admin"
                    ? "ADMIN ACCESS"
                    : "STUDENT ACCESS"}
                </motion.div>

              </motion.div>
            )}

            {/* BADGE */}
            <motion.div
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Badge className="bg-black text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                AI Powered Learning Platform
              </Badge>
            </motion.div>

            {/* HEADING */}
            <motion.h1
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-tight tracking-tight"
            >

              Intelligent Learning

              <motion.span
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="block text-zinc-400 mt-2"
              >
                Designed For The Future
              </motion.span>

            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 max-w-2xl text-zinc-600 text-base sm:text-lg leading-relaxed"
            >

              Experience a modern AI-powered platform that helps students
              learn smarter, stay organized, and access secure educational
              content with a beautiful and responsive interface designed
              for productivity and growth.

            </motion.p>

            {/* BUTTONS */}
            <motion.div
              custom={0.5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"
            >

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}

                whileTap={{
                  scale: 0.95,
                }}
              >
                <Button
                  onClick={() => navigate("/create-todo")}
                  size="lg"
                  className="
                    h-14 px-8 rounded-2xl
                    bg-black text-white
                    hover:bg-zinc-800
                    shadow-xl
                    transition-all duration-300
                    text-base font-semibold
                  "
                >
                  Get Started

                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>

                </Button>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                }}

                whileTap={{
                  scale: 0.95,
                }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="
                    h-14 px-8 rounded-2xl
                    border-2 border-black
                    text-black
                    hover:bg-black hover:text-white
                    transition-all duration-300
                    text-base font-semibold
                  "
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <BrainCircuit className="mr-2 h-5 w-5" />
                  </motion.div>

                  Explore AI
                </Button>
              </motion.div>

            </motion.div>

            {/* TRUST LINE */}
            <motion.div
              custom={0.6}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 text-sm text-zinc-500"
            >

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <ShieldCheck size={18} />
                Secure Platform
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <Zap size={18} />
                Fast Performance
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <Star size={18} />
                Modern Experience
              </motion.div>

            </motion.div>

          </motion.div>

          {/* ================= RIGHT SIDE ================= */}
          <motion.div
            initial={{
              opacity: 0,
              x: 80,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              duration: 1,
            }}

            className="relative flex justify-center"
          >

            {/* FLOATING EFFECT */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="
                relative w-full max-w-2xl
                rounded-[35px]
                bg-white/80
                backdrop-blur-xl
                border border-zinc-200
                shadow-[0_20px_80px_rgba(0,0,0,0.12)]
                overflow-hidden
              "
            >

              {/* TOP BAR */}
              <div className="flex items-center gap-2 px-6 py-5 border-b border-zinc-200">

                <div className="w-3 h-3 rounded-full bg-red-400" />

                <div className="w-3 h-3 rounded-full bg-yellow-400" />

                <div className="w-3 h-3 rounded-full bg-green-400" />

              </div>

              {/* CONTENT */}
              <div className="p-6 sm:p-8">

                {/* HEADER */}
                <div className="flex items-center justify-between gap-4 mb-8">

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      Student Dashboard
                    </h2>

                    <p className="text-zinc-500 mt-2">
                      Manage your learning journey
                    </p>
                  </div>

                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg"
                  >
                    <BrainCircuit size={32} />
                  </motion.div>

                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* CARD */}
                  <motion.div
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                    }}
                    className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 hover:shadow-lg transition-all duration-300"
                  >

                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mb-5">
                      <PlayCircle size={28} />
                    </div>

                    <h3 className="text-xl font-bold">
                      Video Learning
                    </h3>

                    <p className="text-zinc-500 mt-3 leading-relaxed">
                      Watch secure lectures with advanced controls.
                    </p>

                  </motion.div>

                  {/* CARD */}
                  <motion.div
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                    }}
                    className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 hover:shadow-lg transition-all duration-300"
                  >

                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mb-5">
                      <ShieldCheck size={28} />
                    </div>

                    <h3 className="text-xl font-bold">
                      Secure Access
                    </h3>

                    <p className="text-zinc-500 mt-3 leading-relaxed">
                      Protected learning environment with role access.
                    </p>

                  </motion.div>

                  {/* CARD */}
                  <motion.div
                    whileHover={{
                      scale: 1.01,
                    }}
                    className="bg-black text-white rounded-3xl p-6 sm:col-span-2"
                  >

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                      <div>
                        <p className="text-zinc-400 text-sm">
                          Platform Status
                        </p>

                        <motion.h2
                          animate={{
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="text-4xl font-black mt-2"
                        >
                          Active & Ready
                        </motion.h2>
                      </div>

                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="bg-white text-black px-6 py-3 rounded-2xl font-bold w-fit"
                      >
                        AI Enabled
                      </motion.div>

                    </div>

                  </motion.div>

                </div>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </section>

    </div>
  );
};

export default Hero;