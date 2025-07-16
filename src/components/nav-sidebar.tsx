import { useState, useEffect } from "react";

export function NavSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Effekt, um das Scrollen zu deaktivieren, wenn die Sidebar geöffnet ist
  useEffect(() => {
    if (isOpen) {
      // Verhindere das Scrollen, wenn die Sidebar geöffnet ist
      document.body.style.overflow = "hidden";
    } else {
      // Ermögliche das Scrollen, wenn die Sidebar geschlossen ist
      document.body.style.overflow = "auto";
    }

    // Cleanup-Funktion, um beim Verlassen der Seite das Scrollen wieder zu aktivieren
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]); // Der Effekt wird ausgeführt, wenn sich der Zustand von isOpen ändert

  return (
    <div>
      {/* Button zum Öffnen der Sidebar */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-4xl text-dark mb-1 hover:bg-gray-200 rounded-md px-1"
      >
        ☰
      </button>

      {/* Overlay (dunkler Hintergrund, deckt den gesamten Bildschirm ab) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 h-screen z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-5 transform transition-transform duration-300 ease-in-out z-50 h-screen ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close-Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          ✖
        </button>

        <nav>
          <ul className="space-y-4 mt-10">
            <li>
              <a href="/" className="block p-2 text-lg hover:bg-gray-700 rounded">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="block p-2 text-lg hover:bg-gray-700 rounded">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="block p-2 text-lg hover:bg-gray-700 rounded">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="block p-2 text-lg hover:bg-gray-700 rounded">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
