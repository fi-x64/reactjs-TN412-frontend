import { useQuery } from "react-query";
import getData from "../../utils/api";
import Spinner from "../UI/Spinner";

export default function UsersList({ user, setUser, isPending }) {
  const { data: users } = useQuery(
    "users",
    () => getData("http://localhost:8080/users"),
    { suspense: true }
  );
  console.log('Check users:', users);
  return (
    <ul className="users items-list-nav">
      {users.map(u => (
        <li
          key={u.id}
          className={u.id === user?.id ? "selected" : null}
        >
          <button
            className="btn"
            onClick={() => setUser(u)}
          >
            {isPending && <Spinner />} {u.username} {isPending && <Spinner />}
          </button>
        </li>
      ))}
    </ul>
  );
}