import React from "react";

// 🔹 Your Cleaned Club Data
const clubsData = [
  {
    id: 1,
    club_name: "SPICE Society",
    category: "Technical",
    description:
      "Society for Progression of Instrumentation and Control Engineering. Organizes workshops, expert lectures and industrial tours.",
    faculty_coordinators: ["Dr. Afzal Sikander"],
    student_coordinators: ["Arpit Jha"],
    contacts: ["9636880077"],
  },
  {
    id: 2,
    club_name: "NETRA Photography Club",
    category: "Creative",
    description:
      "Photography club focusing on exhibitions, photowalks and competitions.",
    faculty_coordinators: ["Dr. Abhinav Pratap Singh"],
    student_coordinators: ["Priyanshu Sahu", "Rahul Kumar"],
    contacts: ["9919525922", "7707967639"],
  },
  {
    id: 3,
    club_name: "Kalakaar",
    category: "Cultural",
    description:
      "Official dramatics club encouraging acting, music, writing and stage performances.",
    faculty_coordinators: ["Dr. Sumer Singh Meena"],
    student_coordinators: ["Malhar Kawatra", "Nidhi Khunteta"],
    contacts: ["8239937689", "7300208494"],
  },
  {
    id: 4,
    club_name: "Fine Arts Society",
    category: "Creative",
    description:
      "Promotes visual and graphic arts through competitions and workshops.",
    faculty_coordinators: ["Dr. Sadhika Khullar"],
    student_coordinators: ["Rahul Kumar", "Komal"],
    contacts: ["9931287524", "9915264496"],
  },
  {
    id: 5,
    club_name: "Zeal Society",
    category: "Development",
    description:
      "Focuses on communication, leadership and event management skills.",
    faculty_coordinators: ["Dr. Jagwinder Singh", "Dr. Shyamkiran Kaur"],
    student_coordinators: ["Chetan Jassal", "Shuchi Gupta"],
    contacts: ["9056373107"],
  },
  {
    id: 6,
    club_name: "Rural Activity Club",
    category: "Social",
    description:
      "Organizes rural awareness programs, technology guidance and education outreach.",
    faculty_coordinators: ["Dr. Ashok Kumar Bagha"],
    student_coordinators: ["Shivam Saini"],
    contacts: ["8264792688"],
  },
  {
    id: 7,
    club_name: "Google Developer Student Club (GDSC)",
    category: "Technical",
    description:
      "Empowers students with Google technologies and real-world project collaboration.",
    faculty_coordinators: ["Dr. Indu Saini"],
    student_coordinators: ["Naman Singla", "Namamish Awasthi"],
    contacts: ["9464139983", "8787226741"],
  },
];

const ClubsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-12 px-6">
      
      {/* Page Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          NITJ Clubs & Societies
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Explore student clubs, connect with coordinators, and join activities.
        </p>
      </div>

      {/* Clubs Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clubsData.map((club) => (
          <div
            key={club.id}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-600 rounded-full">
                {club.category}
              </span>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {club.club_name}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                {club.description}
              </p>

              <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <p>
                  <strong>Faculty:</strong>{" "}
                  {club.faculty_coordinators.join(", ")}
                </p>
                <p>
                  <strong>Students:</strong>{" "}
                  {club.student_coordinators.join(", ")}
                </p>
                <p>
                  <strong>Contact:</strong> {club.contacts.join(", ")}
                </p>
              </div>
            </div>

            {/* Join Button */}
            <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition">
              Join Club
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubsPage;