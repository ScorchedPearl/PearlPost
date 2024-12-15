"use client";
import React from "react";
import { Carousel, Card } from "../ui/apple-cards-carousel";

export function Cards() {

  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        What We Offer.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Ours is that you note down your Daily Routines.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes.
              We will help You capture every
              thought.
            </p>
          </div>
        );
      })}
    </>
  );
};
const data = [
  {
    category: "ClassNotes",
    title: "Quick Way To Write Notes.",
    src: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Secrets",
    title: "Things You Usually Dont Wanna Share.",
    src: "https://imgs.search.brave.com/fHGN8GL94XZmuvY0zbNgVQymmBRQbkdmyta32mz4JzU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8w/OC8xNy8wMS8zOS9t/eXN0ZXJ5LTE1OTk1/MjdfNjQwLmpwZw",
    content: <DummyContent />,
  },
  {
    category: "TodoStuff",
    title: "Track Down So Your Always Right On Time.",
    src: "https://imgs.search.brave.com/arxdyCC2GC6qstBy-8eKYSWXHNILUhLF-10D_kXIWpw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9u/b3RlYm9vay13aXRo/LWxpc3QtZGVzay13/aXRoLWN1cC1jb2Zm/ZWUtYmVzaWRlXzIz/LTIxNDg5Mzg3Mzgu/anBnP3NlbXQ9YWlz/X2h5YnJpZA",
    content: <DummyContent />,
  },

  {
    category: "Achievements",
    title: "Who Doesnt Like To See his Own Achievements.",
    src: "https://imgs.search.brave.com/vPYx4LpDkYSn7MpTUiEAQJLFKlcuaTuryVMx0Fo4Z34/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzEzLzM5LzQz/LzM2MF9GXzEwMTMz/OTQzMTlfMEF1b2Qz/VXBQVjJiU2JtMDZW/OUw4ZnRFcEdlWFNa/V2YuanBn",
    content: <DummyContent />,
  },
  {
    category: "Diary",
    title: "Jot Down Your Daily Events.",
    src: "https://imgs.search.brave.com/McrGupN292ToS-4kFKBucMRGT4wdvIXFSCK6TSdzJ4k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGljanVt/Ym8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy93b21hbi13cml0/aW5nLWluLWhlci1k/aWFyeS1vbi1zdW5k/YXktZnJlZS1waG90/by5qcGc_dz02MDAm/cXVhbGl0eT04MA",
    content: <DummyContent />,
  },
  {
    category: "Drawing",
    title: "Soon.",
    src: "https://imgs.search.brave.com/w0xP6OAVRgMkY1FVn1vM5wa-P6_qS7QeHL3_6X_zFso/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9kcmF3aW5nLXBh/cnJvdC13aXRoLXdo/aXRlLWJhY2tncm91/bmQtd2l0aC1ibGFj/ay13aGl0ZS1pbWFn/ZS1iaXJkXzk0NzA3/My03MTY2LmpwZz9z/ZW10PWFpc19oeWJy/aWQ",
    content: <DummyContent />,
  },
];
