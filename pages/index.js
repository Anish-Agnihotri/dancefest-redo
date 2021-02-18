import Layout from "@components/Layout";
import { getSession } from "next-auth/client";

export default function Events() {
  return (
    <Layout>
      <span>Events</span>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
