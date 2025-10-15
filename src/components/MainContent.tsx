import { useStore } from "@nanostores/react";
import { currentView } from "@/stores/viewStore";
import CoinsAndHearts from "@/components/CoinsAndHearts";
import HomeComponent from "@/components/Home";

export default function ContentSwitcher() {
  const view = useStore(currentView);

  switch (view) {
    case "home":
      return <HomeComponent />;
    case "uebungen":
      return <div className="p-4">Übungen</div>;
    case "shop":
      return <CoinsAndHearts />;
    case "einstelugen":
      return <div className="p-4">Einstellungen</div>;
    default:
      return <div>Page not found</div>;
  }
}
