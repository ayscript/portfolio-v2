'use client'
import { useState } from "react";
import { Rnd } from "react-rnd";
import { Button } from "@/components/ui/button";

export default function RetroPortfolio() {
  const [windows, setWindows] = useState({
    about: true,
    projects: false,
    contact: false,
  });

  const toggleWindow = (name) => {
    setWindows((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const Window = ({ title, children }) => (
    <Rnd
      default={{ x: 100, y: 100, width: 300, height: 200 }}
      minWidth={200}
      minHeight={150}
      className="bg-gray-100 border border-gray-400 shadow-md rounded-sm"
    >
      <div className="bg-blue-600 text-white text-sm p-1 font-mono flex justify-between">
        <span>{title}</span>
        <button className="px-2" onClick={() => toggleWindow(title.toLowerCase())}>X</button>
      </div>
      <div className="p-2 text-xs font-mono">{children}</div>
    </Rnd>
  );

  return (
    <div className="w-screen h-screen bg-teal-600 font-mono relative overflow-hidden">
      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gray-800 text-white text-xs flex items-center px-2">
        <Button className="bg-gray-600 text-white rounded-none h-full px-3" onClick={() => toggleWindow("about")}>Start</Button>
        <span className="ml-4">Retro Dev OS</span>
      </div>

      {/* Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-4 text-white text-xs">
        <div className="cursor-pointer" onClick={() => toggleWindow("about")}>🧑‍💻 About Me</div>
        <div className="cursor-pointer" onClick={() => toggleWindow("projects")}>📁 Projects</div>
        <div className="cursor-pointer" onClick={() => toggleWindow("contact")}>📨 Contact</div>
      </div>

      {/* Windows */}
      {windows.about && (
        <Window title="About">
          <p>Hello, I'm Ayomide (Ayscript) 👋</p>
          <p>A frontend dev who likes retro UIs and cool ideas!</p>
        </Window>
      )}
      {windows.projects && (
        <Window title="Projects">
          <ul>
            <li>🔧 File Share App</li>
            <li>📚 LMS Final Year Project</li>
            <li>⚙️ Word Editor w/ Mammoth.js</li>
          </ul>
        </Window>
      )}
      {windows.contact && (
        <Window title="Contact">
          <p>Email: ayscript@example.com</p>
          <p>Twitter: @ayscript_dev</p>
        </Window>
      )}
    </div>
  );
}