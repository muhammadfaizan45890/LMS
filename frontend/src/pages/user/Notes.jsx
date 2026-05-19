import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FileText,
  BookOpen,
  X,
} from "lucide-react";

const Notes = () => {
  const [courses, setCourses] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // PDF VIEWER
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  const userId = localStorage.getItem("userId");

  const API = "http://localhost:8000";

  // ================= FETCH ACTIVE COURSES =================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${API}/enroll/my-courses/${userId}`
        );

        const activeCourses = (res.data || []).filter(
          (course) => course.status === "active"
        );

        setCourses(activeCourses);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) fetchCourses();
  }, [userId]);

  // ================= FETCH NOTES =================
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);

        let allNotes = [];

        for (let course of courses) {
          const courseId =
            course.courseId?._id || course.courseId;

          if (!courseId) continue;

          const res = await axios.get(
            `${API}/notes/course/${courseId}/${userId}`
          );

          if (Array.isArray(res.data)) {
            allNotes = [...allNotes, ...res.data];
          }
        }

        setNotes(allNotes);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (courses.length > 0) {
      fetchNotes();
    } else {
      setLoading(false);
    }
  }, [courses, userId]);

  // ================= OPEN PDF =================
  const openPdf = (pdf, title) => {
    setSelectedPdf(
      `${API}/files/notes/${pdf}#toolbar=0&navpanes=0&scrollbar=0`
    );

    setSelectedTitle(title);
  };

  // ================= CLOSE PDF =================
  const closePdf = () => {
    setSelectedPdf(null);
    setSelectedTitle("");
  };

  return (
    <div
      className="
        min-h-screen
        bg-zinc-100
        pt-12
        lg:pl-[60px]
        p-3
        sm:p-4
        md:p-6
      "
    >

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">

        <div className="bg-black text-white p-3 rounded-2xl">
          <FileText size={24} />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Course Notes
          </h1>

          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Access notes for your active courses
          </p>
        </div>

      </div>

      {/* ================= LOADING ================= */}
      {loading ? (

        <div className="text-center py-20 text-lg sm:text-xl font-semibold">
          Loading Notes...
        </div>

      ) : notes.length === 0 ? (

        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 text-center">

          <BookOpen
            size={50}
            className="mx-auto mb-4 text-gray-400"
          />

          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            No Notes Found
          </h2>

          <p className="text-gray-500 text-sm sm:text-base">
            Admin has not uploaded notes yet for your courses
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6">

          {notes.map((note) => (

            <div
              key={note._id}
              className="
                bg-white
                rounded-3xl
                shadow-lg
                hover:shadow-2xl
                transition
                p-5
                sm:p-6
                flex
                flex-col
              "
            >

              {/* TITLE */}
              <div className="flex items-start gap-2 mb-2">

                <BookOpen
                  size={18}
                  className="mt-1 flex-shrink-0"
                />

                <h2 className="font-bold text-base sm:text-lg break-words">
                  {note.title}
                </h2>

              </div>

              {/* COURSE */}
              <p className="text-sm text-gray-500 mb-3 break-words">
                {note.courseId?.title}
              </p>

              {/* DESCRIPTION */}
              <p className="text-gray-700 text-sm mb-6 line-clamp-4 flex-grow break-words">
                {note.description}
              </p>

              {/* BUTTON */}
              <button
                onClick={() =>
                  openPdf(note.pdf, note.title)
                }
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-black
                  text-white
                  py-3
                  rounded-2xl
                  hover:bg-zinc-800
                  transition
                  text-sm
                  sm:text-base
                "
              >

                <FileText size={18} />

                Read PDF

              </button>

            </div>

          ))}

        </div>

      )}

      {/* ================= PDF MODAL ================= */}
      {selectedPdf && (

        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-2 sm:p-4">

          <div
            className="
              bg-white
              w-full
              h-[100dvh]
              lg:h-[95vh]
              lg:w-[92%]
              rounded-none
              lg:rounded-3xl
              overflow-hidden
              relative
              shadow-2xl
              flex
              flex-col
            "
          >

            {/* TOP BAR */}
            <div className="flex items-center justify-between border-b px-4 sm:px-6 py-4 bg-white">

              <h2 className="font-bold text-sm sm:text-lg truncate pr-4">
                {selectedTitle}
              </h2>

              <button
                onClick={closePdf}
                className="
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  p-2
                  rounded-xl
                  flex-shrink-0
                "
              >
                <X size={20} />
              </button>

            </div>

            {/* PDF */}
            <div className="flex-1 bg-gray-200">

              <iframe
                src={selectedPdf}
                title="PDF Viewer"
                className="w-full h-full"
              />

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Notes;