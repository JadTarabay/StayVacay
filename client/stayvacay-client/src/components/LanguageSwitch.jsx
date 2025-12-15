import { useLocation, Link } from "react-router-dom";
import "./CSS/LanguageSwitch.css";

const LanguageSwitch = () => {
  const { pathname } = useLocation();

  const isArabic = pathname.startsWith("/ar");

  const englishPath = isArabic
    ? pathname.replace("/ar", "")
    : pathname;

  const arabicPath = isArabic
    ? pathname
    : `/ar${pathname}`;

  return (
    <div className="language-switch">
      <Link
        to={englishPath}
        className={!isArabic ? "active" : ""}
      >
        EN
      </Link>
      <span>|</span>
      <Link
        to={arabicPath}
        className={isArabic ? "active" : ""}
      >
        العربية
      </Link>
    </div>
  );
};

export default LanguageSwitch;
