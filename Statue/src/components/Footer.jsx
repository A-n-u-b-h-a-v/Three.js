export default function Footer() {
  return (
    <footer
      id="connect"
      className="w-full font-[modernist-regular] text-xs sm:text-sm py-12 sm:py-16 mt-auto"
    >
      <div className="flex flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between sm:px-10 z-50">
        <a
          href="mailto:anubhavsingh.ag@gmail.com"
          className="uppercase text-xs font-semibold text-stone-600"
        >
          Connect
        </a>
        <div className="flex flex-wrap items-center justify-center gap-6 capitalize tracking-wide">
          <a
            href="https://github.com/A-n-u-b-h-a-v"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/anubhav-gusain/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:anubhavsingh.ag@gmail.com">Email</a>
          <a href="tel:+918368483423">Phone</a>
        </div>
      </div>
    </footer>
  );
}
