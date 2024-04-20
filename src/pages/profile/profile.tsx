import { useEffect, useState } from "react";
import { UserProfile } from "../../components/user-profile/user-profile";
import { useParams } from "react-router-dom";
import { Users } from "../../mocks/users";
import { Layout } from "../../components/layout/layout";
import { Helmet } from "react-helmet-async";
import { User } from "../../types/user";
import { NotFound } from "../not-found/not-found";

export function Profile(): JSX.Element {
  const { id } = useParams();

  const [profile, setProfile] = useState<User>();
  useEffect(() => {
    setProfile(Users.find((user) => user.id === Number(id)));
  }, [id]);

  return (
    profile
    ?
      <Layout>
        <Helmet>
          <title>DiveSea | {`${profile.firstname} ${profile.surname.charAt(0)}.`}</title>
        </Helmet>
        <UserProfile user={profile}/>
      </Layout>
    : <NotFound/>
  )
}
