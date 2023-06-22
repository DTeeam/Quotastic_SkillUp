import DisplayRecentProfileQuotesForm from "components/quote/Profile_quotes/DisplayRecentQuoteForm";
import DisplayUpvotedProfileQuotesForm from "components/quote/Profile_quotes/DisplayUpvotedQuoteForm";
import Navbar from "components/ui/Navbar";
import ProfileInfo from "components/ui/ProfileInfo";
import { FC } from "react";
import Avatar from "react-avatar";
import authStore from "stores/auth.store";

const Profile: FC = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Avatar
          className="topbar__avatar"
          round
          src={`${process.env.REACT_APP_API_URL}/files/${authStore.user?.avatar}`}
          alt={
            authStore.user?.first_name || authStore.user?.last_name
              ? `${authStore.user?.first_name} ${authStore.user?.last_name}`
              : authStore.user?.email
          }
        />
        <br />
        {`${authStore.user?.first_name} ${authStore.user?.last_name}`}
      </div>
      <ProfileInfo />
      <div>
        <p className="orange">Most liked quotes</p>
        <DisplayUpvotedProfileQuotesForm />
      </div>
      <div>
        <p className="orange">Most Recent</p>
        <DisplayRecentProfileQuotesForm />
      </div>
    </div>
  );
};

export default Profile;
