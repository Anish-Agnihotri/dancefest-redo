import Link from "next/link";
import { signOut, useSession } from "next-auth/client"; // Authentication
import styles from "@styles/components/Layout.module.scss"; // Component styles

export default function Layout({ children }) {
  return (
    <div>
      {/* Layout: Header */}
      <Header />

      {/* Layout: Content */}
      <div className={styles.layout__content}>{children}</div>

      {/* Layout: Footer */}
      <Footer />
    </div>
  );
}

function Header() {
  const [session] = useSession();

  return (
    <div className={styles.layout__header}>
      <div className={styles.layout__header_logo}>
        <Link href="/">
          <a>
            <h1>DANCEFEST</h1>
          </a>
        </Link>
      </div>

      <div className={styles.layout__header_menu}>
        <ul>
          {session ? (
            <>
              <li>
                <Link href="/">
                  <a>Events</a>
                </Link>
              </li>
              <li>
                <Link href="/settings">
                  <a>Settings</a>
                </Link>
              </li>
              <li>
                <button onClick={() => signOut()}>Log Out</button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">
                <a>Log In</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className={styles.layout__footer}>
      <p>&copy; 2020 Dancefest Adjudication Portal. v0.0.1.</p>
      <p>
        A project by{" "}
        <a
          href="https://uwblueprint.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          UWBlueprint
        </a>
        .
      </p>
    </div>
  );
}
