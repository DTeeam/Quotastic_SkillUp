import { useQuery } from "react-query";
import * as API from "api/Api";
import authStore from "stores/auth.store";

const ProfileInfo = () => {
  let userID = "";
  if (authStore.user) {
    userID = authStore.user?.id;
  }

  const { data: dataQuotes } = useQuery(
    ["fetchQuotesCount"],
    () => API.fetchQuotesCount(userID),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const { data: dataVotes } = useQuery(
    ["fetchVotesCount"],
    () => API.fetchVotesCount(userID),
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
        {`${dataQuotes?.data}`}
      </div>
      <div>
        Quotastic karma
        <br />
        {`${dataVotes?.data.sum}`}
      </div>
    </>
  );
};

export default ProfileInfo;
