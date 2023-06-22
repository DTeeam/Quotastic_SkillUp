import { useQuery } from "react-query";
import * as API from "api/Api";
import authStore from "stores/auth.store";

const ProfileInfo = () => {
  let userID = "";
  if (authStore.user) {
    userID = authStore.user?.id;
  }

  const { data, isLoading } = useQuery(
    ["fetchQuoteCount"],
    () => API.fetchQuoteCount(userID),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <div>
        Quotes
        <br />
        {`${data.data}`}
      </div>
      <div>Quotastic karma</div>
    </>
  );
};

export default ProfileInfo;
