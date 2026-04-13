export default function Footer() {
  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 py-8 relative z-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-2">
        <p className="text-gray-600 dark:text-gray-400 font-medium text-base transition-colors duration-300">
          © 2026 All Rights Reserved by Supun Dissanayake
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm transition-colors duration-300">
          Made with ❤️ by <a href="https://facebook.com/pixorastudio" target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors font-medium">Pixora Studio</a>
        </p>
      </div>
    </footer>
  );
}
