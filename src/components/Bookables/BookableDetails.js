import { useState } from "react";
import { Link } from "react-router-dom";
import { days, sessions } from "../../static.json";
import { FaEdit } from "react-icons/fa";

export default function BookableDetails({ bookable }) {
  const [hasDetails, setHasDetails] = useState(true);

  function toggleDetails() {
    setHasDetails(has => !has);
  }
  return bookable ? (
    <div className="bookable-details item">
      <div className="item-header">
        <h2>{bookable.title}</h2>
        <span className="controls">
          <label>
            <input
              type="checkbox"
              onChange={toggleDetails}
              checked={hasDetails}
            />
            Show Details
          </label>
          <Link
            to={`/bookables/${bookable.id}/edit`}
            replace={true}
            className="btn btn-header"
          >
            <FaEdit />
            <span>Edit</span>
          </Link>
        </span>
      </div>

      <p>{bookable.notes}</p>

      {hasDetails && (
        <div className="item-details">
          <h3>Availability</h3>
          <div className="bookable-availability">
            <ul>
              {bookable.days
                .sort()
                .map((d, index) => <li key={index}>{d.name}</li>)
              }
            </ul>
            <ul>
              {bookable.sessions
                .map((s, index) => <li key={index}>{s.name}</li>)
              }
            </ul>
          </div>
        </div>
      )}
    </div>
  ) : null;
}