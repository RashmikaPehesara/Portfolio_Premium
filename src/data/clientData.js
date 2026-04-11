const clientData = {
  name: "John Doe",
  tagline: "Frontend Developer & UI/UX Designer",
  about: "I am a passionate frontend developer specializing in building modern, responsive, and performance-optimized web applications. With a strong eye for design and detail, I create seamless user experiences using Next.js and Tailwind CSS.",
  
  contact: {
    email: "hello@johndoe.com",
    phone: "+94 777 123 456",
    location: "New York, USA",
  },

  socialLinks: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },

  showDownloadCV: true,  //If client doesn't want to show download CV button, set this to "false" and remove cvLink
  cvLink: "/resume.pdf",  //CV rename as resume.pdf and place it in the public folder

  enableCustomCursor: true,  //If client doesn't want to show custom cursor, set this to "false"

  education: [
    {
      id: 1,
      school: "University of Technology",
      degree: "BSc in Computer Science",
      year: "2018 - 2022",
      description: "Graduated with honors. Specialized in software engineering and web technologies.",
    },
    {
      id: 2,
      school: "Modern Design Institute",
      degree: "Certificate in UI/UX Design",
      year: "2021",
      description: "Completed an intensive program focusing on user-centered design, typography, and wireframing.",
    },
    {
      id: 3,
      school: "Tech Academy",
      degree: "Diploma in Web Development",
      year: "2022",
      description: "Intensive 6-month bootcamp covering modern MERN stack development.",
    },
    {
      id: 4,
      school: "Design School Global",
      degree: "Advanced UI/UX Certification",
      year: "2023",
      description: "Specialized in advanced wireframing, prototyping, and accessibility standards.",
    }
  ],

  certificates: [
    {
      id: 1,
      title: "Advanced React Patterns",
      image: "https://picsum.photos/400/300?random=1",
      date: "2023",
      issuer: "Frontend Masters",
      description: "Mastered advanced component composition, custom hooks abstractions, and state management architectures."
    },
    {
      id: 2,
      title: "Tailwind CSS Mastery",
      image: "https://picsum.photos/400/300?random=2",
      date: "2023",
      issuer: "Udemy",
      description: "Completed an in-depth course covering responsive design, utility-first workflow, and modern UI practices."
    },
    {
      id: 3,
      title: "Full-Stack Next.js Developer",
      image: "https://picsum.photos/400/300?random=3",
      date: "2024",
      issuer: "Coursera",
      description: "Learned server-side rendering, API routes, and full-stack deployment scaling integrations natively."
    },
    {
      id: 4,
      title: "JavaScript Advanced Concepts",
      image: "https://picsum.photos/400/300?random=4",
      date: "2024",
      issuer: "Pluralsight",
      description: "Deep dive into JS closures, asynchronous event loops, prototypal inheritance and performance hooks."
    },
    {
      id: 5,
      title: "Responsive Web Design Mastery",
      image: "https://picsum.photos/400/300?random=5",
      date: "2025",
      issuer: "freeCodeCamp",
      description: "Built dozens of responsive user interfaces scaling exclusively with Flexbox and CSS Grid frameworks."
    },
    {
      id: 6,
      title: "Frontend Performance Optimization",
      image: "https://picsum.photos/400/300?random=6",
      date: "2025",
      issuer: "Google",
      description: "Engineered rendering paths achieving 99+ Lighthouse scores optimizing LCP, CLS, and asset caching."
    }
  ],

  showProjectsSection: true,
  projects: [
    {
      id: 1,
      title: "TaskFlow Manager",
      description: "A full-stack Kanban board system featuring drag-and-drop mechanics, real-time sync, and intelligent task filtering.",
      image: "https://picsum.photos/400/300?random=11",
      techStack: ["Next.js", "React", "Tailwind", "Node.js"],
      demoLink: "https://example.com",
      codeLink: "https://github.com",
      showCode: true,
    },
    {
      id: 2,
      title: "Finance Dashboard",
      description: "An analytics web application visualizing heavy metric payloads cleanly using complex chart interactivity natively.",
      image: "https://picsum.photos/400/300?random=12",
      techStack: ["React", "D3.js", "Firebase"],
      demoLink: "https://example.com",
      codeLink: "https://github.com",
      showCode: false,
    },
    {
      id: 3,
      title: "E-Commerce Storefront",
      description: "A highly optimized headless storefront leveraging static generation for aggressive performance mapping.",
      image: "https://picsum.photos/400/300?random=13",
      techStack: ["Next.js", "Stripe", "GraphQL", "Tailwind"],
      demoLink: "https://example.com",
      codeLink: "https://github.com",
      showCode: true,
    }
  ],

  showBlogsSection: true,
  blogs: [
    {
      id: 1,
      title: "Mastering Framer Motion",
      description: "Dive deep into physics-based UI animations building complex variants scaling beautifully across platforms.",
      image: "https://picsum.photos/400/300?random=21",
      date: "Oct 12, 2024",
      link: "https://medium.com/",
      category: "Animation",
      readingTime: "5 min read"
    },
    {
      id: 2,
      title: "The Power of Tailwind CSS",
      description: "How utility-first frameworks scale across enterprise applications drastically improving velocity and maintaining strict design boundaries.",
      image: "https://picsum.photos/400/300?random=22",
      date: "Nov 03, 2024",
      link: "https://dev.to/",
      category: "Engineering",
      readingTime: "8 min read"
    },
    {
      id: 3,
      title: "Next.js Rendering Strategies",
      description: "A comprehensive map analyzing ISR, SSR, and SSG performance trade-offs for scaling high-traffic products natively.",
      image: "https://picsum.photos/400/300?random=23",
      date: "Jan 15, 2025",
      link: "https://hashnode.com/",
      category: "Architecture",
      readingTime: "12 min read"
    }
  ],

  showAchievements: true,
  achievements: [
    {
      id: 1,
      title: "Best Developer Award",
      description: "Recognized as the top developer in the annual company awards for outstanding performance and project delivery.",
      date: "2024",
      image: "https://picsum.photos/400/300?random=31"
    },
    {
      id: 2,
      title: "Hackathon Winner",
      description: "First place in the Global Tech Innovators Hackathon by building an AI-powered accessibility tool.",
      date: "2023",
      image: "https://picsum.photos/400/300?random=32"
    },
    {
      id: 3,
      title: "1M+ App Downloads",
      description: "Lead the frontend architecture for an app that successfully crossed 1 million active downloads globally.",
      date: "2023",
      image: "https://picsum.photos/400/300?random=33"
    }
  ],

  showGallery: true,
  gallery: [
    {
      id: 1,
      folder: "Events",
      coverImage: "/gallery/events/img1.jpg",
      images: [
        "/gallery/events/img2.jpg",
        "/gallery/events/img3.jpg",
        "/gallery/events/img4.jpg",
        "/gallery/events/img5.jpg"
      ]
    },
    {
      id: 2,
      folder: "Workshops",
      coverImage: "https://picsum.photos/400/300?random=51",
      images: [
        "https://picsum.photos/800/600?random=52",
        "https://picsum.photos/800/600?random=53",
        "https://picsum.photos/800/600?random=54"
      ]
    },
    {
      id: 3,
      folder: "Meetups",
      coverImage: "https://picsum.photos/400/300?random=61",
      images: [
        "https://picsum.photos/800/600?random=62",
        "https://picsum.photos/800/600?random=63",
        "https://picsum.photos/800/600?random=64"
      ]
    },
    {
      id: 4,
      folder: "Trips",
      coverImage: "https://picsum.photos/400/300?random=71",
      images: [
        "https://picsum.photos/800/600?random=72",
        "https://picsum.photos/800/600?random=73",
        "https://picsum.photos/800/600?random=74"
      ]
    },
    {
      id: 5,
      folder: "Friends",
      coverImage: "https://picsum.photos/400/300?random=81",
      images: [
        "https://picsum.photos/800/600?random=82",
        "https://picsum.photos/800/600?random=83"
      ]
    }
  ]
};

export default clientData;