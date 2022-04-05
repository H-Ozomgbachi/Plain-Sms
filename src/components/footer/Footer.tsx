import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <div className="footer-container">
      <span className="footer-copyright">&copy; {currentYear} Plain Sms</span>
    </div>
  );
}
