import { Suspense, unstable_SuspenseList as SuspenseList } from "react";
import { useQuery } from "react-query";
import getData from '../../utils/api';
import Avatar from "./Avatar";
import UserBookings from "./UserBookings";
import UserTodos from "./UserTodos";

export default function UserDetails({ userID, isPending }) {
  const { data: user } = useQuery(
    ["user", userID],
    () => getData(`http://localhost:3000/users/${userID}`),
    { suspense: true }
  );

  return (
    <div className={isPending ? "item user user-pending" : "item user"}>
      <div className="item-header">
        <h2>{user.username}</h2>
      </div>

      <Avatar
        src={`http://localhost:3030/img/${user.img}`}
        fallbackSrc="http://localhost:3000/img/avatar.gif"
        alt={user.username}
      />

      <div className="user-details">
        <h3>{user.title}</h3>
        <p>{user.notes}</p>
      </div>

      {/* <SuspenseList
        revealOrder="forwards"
      >
        <Suspense fallback={<p>Loading user bookings...</p>}>
          <UserBookings id={userID} />
        </Suspense>

        <Suspense fallback={<p>Loading user todos...</p>}>
          <UserTodos id={userID} />
        </Suspense>
      </SuspenseList> */}
    </div>
  )
}