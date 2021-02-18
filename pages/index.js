import Layout from "@components/Layout"; // Layout wrapper
import { getSession } from "next-auth/client"; // Session handling

// Page: Events
export default function Events() {
  return (
    <Layout>
      <span>Events</span>
    </Layout>
  );
}

// Run: server side
export async function getServerSideProps(context) {
  // Collect session
  const session = await getSession(context);

  // If session does not exist
  if (!session) {
    return {
      redirect: {
        // Redirect user to login page
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Else, return
  return {
    props: {},
  };
}
