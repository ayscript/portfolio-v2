import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPersonalInfo } from "@/lib/firebase-utils";
import { getProjects } from "@/lib/firebase-utils";
import { getCertifications } from "@/lib/firebase-utils";

// This is a server component that fetches data from Firebase
export async function PortfolioContent() {
  // Fetch data from Firebase
  const personalInfoPromise = getPersonalInfo();
  const projectsPromise = getProjects();
  const certificationsPromise = getCertifications();

  // Wait for all promises to resolve
  const [personalInfo, projects, certifications] = await Promise.all([
    personalInfoPromise,
    projectsPromise,
    certificationsPromise,
  ]);

  // Default skills if not provided in personalInfo
  const skills = personalInfo.skills || [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
  ];

  // Default stats if not provided in personalInfo
  const stats = personalInfo.stats || [
    {
      value: 5,
      label: "Programming Languages & Frameworks",
    },
    {
      value: 6,
      label: "Development Tools",
    },
    {
      value: 3,
      label: "Years of Experience",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="container mx-auto px-4 py-20 min-h-screen flex items-center"
      >
        <div className="grid md:grid-cols-[350px_1fr] gap-8">
          <div className="bg-zinc-900/60 rounded-xl p-6 border border-zinc-800 h-fit">
            <div className="flex flex-col items-center text-center">
              <Image
                src={personalInfo.profilePicture || "/avater.png"}
                alt="Profile"
                width={150}
                height={150}
                className="rounded-full border-4 border-cyan-500/20 mb-4"
              />
              <h2 className="text-2xl font-bold">{personalInfo.name}</h2>
              <p className="text-zinc-400 mb-4">{personalInfo.title}</p>

              <div className="space-y-2 w-full text-left">
                <p className="text-zinc-400 flex items-center gap-2">
                  <span className="text-cyan-500">✉</span> {personalInfo.email}
                </p>
                <p className="text-zinc-400 flex items-center gap-2">
                  <span className="text-cyan-500">📍</span>{" "}
                  {personalInfo.location}
                </p>
                <p className="text-zinc-400 flex items-center gap-2">
                  <span className="text-cyan-500">💼</span>{" "}
                  {personalInfo.jobStatus}
                </p>
                <p className="text-zinc-400 flex items-center gap-2">
                  <span className="text-cyan-500">🔗</span>{" "}
                  {personalInfo.website}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 my-4 justify-center">
                {skills.map((skill: string) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-medium mt-4">
                Download CV
              </Button>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-relaxed mb-2 text-cyan-500">
                Hi 👋
                <br />
                <br />
                I'm <span className="text-white">{personalInfo.name}</span>
                <br />
                <br />
                {personalInfo.title}
              </h1>
              <p className="text-zinc-400 max-w-2xl mt-6">{personalInfo.bio}</p>
              <Link href={"https://wa.me/+2347014329650"}>
                <Button className="mt-8 bg-transparent hover:bg-cyan-950/50 border border-cyan-500 text-cyan-500 flex items-center gap-2">
                  Let's Talk <MessageCircle size={18} />
                </Button>
              </Link>
            </div>

            <div className="bg-zinc-900/60 rounded-2xl p-8 border border-zinc-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat: any) => (
                  <div key={stat.label} className="flex items-center gap-4">
                    <div className="text-5xl font-bold text-cyan-500">
                      {stat.value}
                    </div>
                    <div className="text-sm text-zinc-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-8 text-cyan-500">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-zinc-300 mb-4">
              I'm a passionate {personalInfo.title} with a keen eye for creating
              elegant, efficient, and user-friendly websites. With{" "}
              {stats[2]?.value || 4} years of experience in the field, I've
              developed a strong understanding of web technologies and best
              practices.
            </p>
            <p className="text-zinc-300 mb-4">
              My journey in web development began when I discovered my passion
              for creating digital experiences that connect people and solve
              real-world problems. Since then, I've been constantly learning and
              improving my skills to stay at the forefront of web development
              trends.
            </p>
            <p className="text-zinc-300">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing my knowledge
              through blog posts and community engagement.
            </p>
          </div>
          <div className="bg-zinc-900/60 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-xl font-bold mb-4">My Expertise</h3>
            <ul className="space-y-3">
              <li className="flex flex-col">
                <span className="text-zinc-300 font-medium">
                  Frontend Development
                </span>
                <span className="text-zinc-400 text-sm">
                  Building responsive and interactive user interfaces
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-zinc-300 font-medium">
                  Backend Development
                </span>
                <span className="text-zinc-400 text-sm">
                  Developing robust server-side logic and APIs
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-zinc-300 font-medium">UI/UX Design</span>
                <span className="text-zinc-400 text-sm">
                  Creating intuitive and visually appealing designs
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-zinc-300 font-medium">
                  Performance Optimization
                </span>
                <span className="text-zinc-400 text-sm">
                  Ensuring fast and efficient web applications
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-zinc-300 font-medium">
                  Responsive Design
                </span>
                <span className="text-zinc-400 text-sm">
                  Developing websites that work on all devices
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-8 text-cyan-500">Projects</h2>
        <p className="text-zinc-400 mb-12 max-w-3xl">
          Here are some of the projects I've worked on. Each project represents
          a unique challenge and solution.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <Card
              key={project.id}
              className="bg-zinc-900/60 border-zinc-800 overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={project.image || "/placeholder.svg?height=400&width=600"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags &&
                    project.tags.map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-zinc-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-cyan-500 text-cyan-500 hover:bg-cyan-950/50"
                  >
                    View Project
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-8 text-cyan-500">
          Certifications
        </h2>
        <p className="text-zinc-400 mb-12 max-w-3xl">
          Professional certifications I've earned throughout my career.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert: any) => (
            <Card
              key={cert.id}
              className="bg-zinc-900/60 items-start flex flex-col border-zinc-800"
            >
              <div className="p-4 flex justify-center">
                <Image
                  src={cert.image || "/placeholder.svg?height=200&width=200"}
                  alt={cert.title}
                  width={200}
                  height={150}
                  className="w-full aspect-video object-cover rounded"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-center">{cert.title}</CardTitle>
              </CardHeader>
              <CardContent className="mt-auto">
                <p className="text-zinc-400">{cert.issuer}</p>
                <p className="text-zinc-500 text-sm">{cert.date}</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-500 text-cyan-500 hover:bg-cyan-950/50"
                  >
                    View Certificate
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-8 text-cyan-500">Contact</h2>
        <p className="text-zinc-400 mb-12 max-w-3xl">
          Feel free to reach out if you have any questions or would like to work
          together.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-900/60 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-xl font-bold mb-4">Get In Touch</h3>
            <div className="space-y-4">
              <div>
                <p className="text-zinc-400">Email</p>
                <p className="text-zinc-300">{personalInfo.email}</p>
              </div>
              <div>
                <p className="text-zinc-400">Location</p>
                <p className="text-zinc-300">{personalInfo.location}</p>
              </div>
              <div>
                <p className="text-zinc-400">Social Media</p>
                <div className="flex gap-4 mt-2">
                  <Link
                    href="https://github.com/ayscript"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-zinc-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </Button>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/ayomide-olaleye-32349a230/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-zinc-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </Button>
                  </Link>
                  <Link
                    href="https://x.com/ayscript_js"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-zinc-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width={25}
                        height={25}
                        fill="currentColor"
                        viewBox="0 0 50 50"
                      >
                        <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/60 rounded-xl p-6 border border-zinc-800">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-zinc-400">
                    Name
                  </label>
                  <input
                    id="name"
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-zinc-400">
                    Email
                  </label>
                  <input
                    id="email"
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    type="email"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm text-zinc-400">
                  Subject
                </label>
                <input
                  id="subject"
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  type="text"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-zinc-400">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 min-h-[150px]"
                  required
                ></textarea>
              </div>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-medium">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 text-center text-zinc-500 border-t border-zinc-800">
        <p>
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </>
  );
}
