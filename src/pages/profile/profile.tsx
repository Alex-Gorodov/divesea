import { UserProfile } from "../../components/user-profile/user-profile";
import { Spinner } from "../../components/spinner/spinner";
import { Layout } from "../../components/layout/layout";
import { NotFound } from "../not-found/not-found";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { users } from "../../mocks/users";
import { User } from "../../types/user";

export function Profile(): JSX.Element {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [profile, setProfile] = useState<User | null>(null);
  useEffect(() => {
    const userId = Number(id);
    const foundUser = users.find((user) => user.id === userId);
    if (foundUser) {
      setProfile(foundUser);
    } else {
      setProfile(null);
    }
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return <Spinner size={"40"} color={"#141416"}/>
  }

  if (!profile) {
    return <NotFound/>
  }

  return (
    <Layout>
      <Helmet>
        <title>DiveSea | {`${profile.firstname} ${profile.surname.charAt(0)}.`}</title>
      </Helmet>
      <UserProfile user={profile}/>
    </Layout>
  );
}
