import Layout from "@components/Layout";
import styles from "@styles/pages/Login.module.scss";
import { useState } from "react";
import { TextInput } from "@components/Inputs";
import { FilledButton } from "@components/Buttons";
import { getSession, signIn } from "next-auth/client";

export default function Login() {
  const [email, setEmail] = useState("");

  const signInWithEmail = () => {
    signIn("email", { email: email });
  };

  return (
    <Layout>
      <div className={styles.page__login}>
        <img src="/vectors/logo.svg" alt="Dancefest logo" />

        <div className={styles.page__login_card}>
          <h3>Log In to your account</h3>
          <p>
            Please enter your email address to sign up or login to the Dancefest
            Adjudication portal.
          </p>
          <TextInput
            type="text"
            placeholder="email@address.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            onEnter={signInWithEmail}
          />
          <FilledButton fullWidth onClick={signInWithEmail}>
            Sign In
          </FilledButton>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
