import React, { useState } from "react";
import axios from "axios";
import {
  X,
  CreditCard,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageCircle,
} from "lucide-react";
import API from "../../config/api";

const UserPayment = ({ course, userId, onClose }) => {
  const [method, setMethod] = useState("jazzcash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ================= NUMBERS =================
  const paymentNumber = "03204606482";
  const whatsappNumber = "+92 300 1234567";

  // ================= SUBMIT =================
  const submitPayment = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (!userId || !course?._id) {
        setError("Missing user or course info");
        setLoading(false);
        return;
      }

      const payload = {
        userId,
        courseId: course._id,
        paymentMethod: method,
      };

      await axios.post("${API}/enroll/enroll", payload);

      setSuccess("Payment submitted successfully!");

      setTimeout(() => onClose(), 1200);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end sm:justify-center p-1 sm:p-4">

      {/* MODAL */}
      <div className="w-[78%] sm:w-full sm:max-w-md bg-white rounded-xl sm:rounded-3xl shadow-2xl max-h-[85vh] overflow-y-auto">

        {/* HEADER */}
        <div className="bg-black text-white p-3 flex justify-between items-center">
          <div>
            <h2 className="text-sm sm:text-lg font-bold">Enrollment</h2>
            <p className="text-[10px] sm:text-xs text-gray-300">
              {course?.title}
            </p>
          </div>

          <button onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-3 space-y-2">

          {/* ERROR */}
          {error && (
            <div className="text-[10px] bg-red-50 text-red-600 p-1.5 rounded flex items-center gap-1">
              <AlertCircle size={12} />
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="text-[10px] bg-green-50 text-green-600 p-1.5 rounded flex items-center gap-1">
              <CheckCircle2 size={12} />
              {success}
            </div>
          )}

          {/* COURSE INFO */}
          <div className="bg-gray-50 border rounded-lg p-2">
            <p className="font-semibold text-xs">{course?.title}</p>
            <p className="text-[10px] text-gray-500 line-clamp-2">
              {course?.description}
            </p>
          </div>

          {/* PAYMENT INFO */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-[10px] space-y-3">

            {/* PAYMENT NUMBER */}
            <div>
              <div className="flex items-center gap-1 text-green-700 font-semibold">
                <Smartphone size={12} />
                Payment Number
              </div>

              <p className="font-bold text-black text-xs mt-1">
                {paymentNumber}
              </p>

              {/* NOTE ADDED */}
              <p className="text-[10px] text-gray-600 mt-1 italic">
                Note: This is a JazzCash account number for payment.
              </p>
            </div>

            {/* WHATSAPP NUMBER */}
            <div className="pt-2 border-t border-green-200">
              <div className="flex items-center gap-1 text-green-700 font-semibold">
                <MessageCircle size={12} />
                WhatsApp Slip Number
              </div>

              <p className="font-bold text-black text-xs mt-1">
                {whatsappNumber}
              </p>

              <p className="text-gray-600">
                Send name, email and payment screenshot for verification
              </p>
            </div>

          </div>

          {/* PAYMENT METHOD */}
          <div className="grid grid-cols-2 gap-1">

            <button
              onClick={() => setMethod("jazzcash")}
              className={`p-2 rounded-lg border text-[10px] flex flex-col items-center gap-1 ${
                method === "jazzcash"
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              <Smartphone size={14} />
              JazzCash
            </button>

            <button
              onClick={() => setMethod("easypaisa")}
              className={`p-2 rounded-lg border text-[10px] flex flex-col items-center gap-1 ${
                method === "easypaisa"
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              <CreditCard size={14} />
              EasyPaisa
            </button>

          </div>

          {/* INFO */}
          <div className="bg-gray-100 text-[9px] p-1.5 rounded flex items-center gap-1">
            <ShieldCheck size={12} />
            Your enrollment will be approved by admin
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2 pt-1">

            <button
              onClick={submitPayment}
              disabled={loading}
              className="flex-1 bg-black text-white py-2 rounded-lg text-[11px] flex items-center justify-center gap-1"
            >
              {loading ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Processing
                </>
              ) : (
                "Confirm Payment"
              )}
            </button>

            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-[11px] rounded-lg"
            >
              Cancel
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default UserPayment;