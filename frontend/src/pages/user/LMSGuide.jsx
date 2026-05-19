import React from "react";
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Video,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Mail,
  User,
  Smartphone,
  CreditCard,
} from "lucide-react";

const LMSGuide = () => {

  // ================= NUMBERS =================
  const paymentNumber = "03204606482";      // JazzCash / EasyPaisa
  const whatsappNumber = "03111222333";     // WhatsApp slip submission

  return (
    <div className="min-h-screen bg-zinc-100">

      {/* HERO */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_35%)]" />

        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles />
            <span className="text-sm tracking-widest uppercase text-zinc-300">
              LMS Guide
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black leading-tight">
            Learn Smarter With
            <span className="block text-zinc-400 mt-2">
              Modern LMS System
            </span>
          </h1>

          <p className="mt-6 text-zinc-300 max-w-2xl leading-relaxed">
            A complete guide to understand courses, video learning,
            secure access, and payment process with WhatsApp verification.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-4 sm:px-6 lg:px-10 py-20">
        <div className="max-w-5xl mx-auto">

          <div className="bg-white rounded-[40px] p-8 sm:p-12 shadow-xl border border-zinc-200 space-y-10">

            {/* ICON */}
            <div className="w-20 h-20 rounded-3xl bg-black text-white flex items-center justify-center shadow-lg">
              <GraduationCap size={34} />
            </div>

            {/* CONTENT */}
            <div className="space-y-6 text-zinc-700 text-lg leading-[2]">

              <p>
                Welcome to a modern LMS platform where students can explore courses,
                enroll securely, and access video lectures anytime.
              </p>

              {/* PAYMENT SECTION */}
              <div className="bg-gradient-to-r from-black to-zinc-800 text-white rounded-[35px] p-10 space-y-6">

                <div className="flex items-center gap-3">
                  <CreditCard />
                  <h2 className="text-2xl font-black">
                    Payment & WhatsApp Verification
                  </h2>
                </div>

                <p className="text-zinc-300">
                  After payment, send your slip on WhatsApp for approval.
                </p>

                {/* PAYMENT NUMBER */}
                <div className="bg-white/10 border border-white/20 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone size={18} />
                    <span className="font-semibold">
                      JazzCash / EasyPaisa Number
                    </span>
                  </div>

                  <p className="text-2xl font-bold tracking-widest">
                    {paymentNumber}
                  </p>

                  <p className="text-xs text-zinc-300 mt-2">
                    Note: This is a JazzCash account number for course payment only.
                  </p>
                </div>

                {/* WHATSAPP NUMBER */}
                <div className="bg-green-500/10 border border-green-400/30 rounded-2xl p-5">

                  <div className="flex items-center gap-2 mb-2 text-green-300">
                    <MessageCircle size={18} />
                    <span className="font-semibold">
                      WhatsApp Slip Submission Number
                    </span>
                  </div>

                  <p className="text-2xl font-bold tracking-widest text-white">
                    {whatsappNumber}
                  </p>

                  <p className="text-xs text-zinc-300 mt-2">
                    Send payment slip + name + email to this WhatsApp number
                  </p>
                </div>

                {/* REQUIRED DETAILS */}
                <div className="bg-white/10 border border-white/20 rounded-2xl p-5 space-y-2">

                  <h3 className="font-semibold mb-2">
                    Required WhatsApp Message:
                  </h3>

                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Full Name</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>Email Address</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} />
                    <span>Payment Screenshot (Slip)</span>
                  </div>

                  <div className="mt-3 text-sm bg-black/30 p-3 rounded-xl">
                    Example:
                    <br />
                    Name: Ali Khan <br />
                    Email: ali@gmail.com <br />
                    Course Payment Slip Attached
                  </div>

                </div>

              </div>

              {/* FINAL */}
              <div className="bg-black text-white rounded-[35px] p-10">

                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="text-green-400" />
                  <h3 className="text-2xl font-black">
                    Start Learning After Approval
                  </h3>
                </div>

                <p className="text-zinc-300">
                  Once verified, you will get full access to your courses and dashboard.
                </p>

              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default LMSGuide;